const URL = window.location.href;
const Timestamp = new Date() + 3;
const API_URL = "http://localhost:8000/api/v1/metrics";

const sendRequest = (TTFB, DomLoad, WindowLoad, Files) => {
  const request = setInterval(() => {
    let data = {
      URL,
      TTFB,
      FCP,
      DomLoad,
      WindowLoad,
      Timestamp: Timestamp.toISOString(),
      Files,
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => console.log("Successfully saved metrics."))
      .catch((err) => console.error(err));
    clearInterval(request);
  }, 500);
};

const measurePerformance = () => {
  const { responseStart, navigationStart, domContentLoadedEventEnd } =
    window.performance.toJSON().timing;
  const TTFB = msToSec(responseStart - navigationStart);
  const DomLoad = msToSec(domContentLoadedEventEnd - navigationStart);
  const WindowLoad = msToSec(Timestamp - navigationStart);
  const resourceEntries = window.performance.getEntriesByType("resource");
  const Files = resourceEntries.map((entry) => {
    return {
      type: entry.initiatorType,
      source: entry.name,
      responseTime: msToSec(entry.responseEnd - entry.responseStart),
      executionTime: msToSec(entry.responseEnd - entry.fetchStart),
      fetchTime: msToSec(entry.responseEnd - entry.fetchStart),
    };
  });
  sendRequest(TTFB, DomLoad, WindowLoad, Files);
};

window.addEventListener("load", () => {
  if ("performance" in window && "PerformanceObserver" in window) {
    let perfObserver = new PerformanceObserver((entryList) => {
      FCP = msToSec(
        entryList.getEntriesByName("first-contentful-paint")[0].startTime
      );
    });
    perfObserver.observe({ type: "paint", buffered: true });
    measurePerformance();
  } else {
    console.error("Error: Browser is not supported currently.");
  }
});

const msToSec = (ms) => ms / 1000;

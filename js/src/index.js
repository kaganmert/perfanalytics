(() => {
  var URL = window.location.href;
  var Timestamp = new Date();
  var API_URL = "http://localhost:8000/api/v1/metrics";
  var sendRequest = (TTFB, DomLoad, WindowLoad, Files) => {
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
      }).catch((err) => console.error(err));
      clearInterval(request);
    }, 500);
  };
  var millisToSeconds = (ms) => ms / 1e3;
  var measurePerformance = () => {
    const { responseStart, navigationStart, domContentLoadedEventEnd } =
      window.performance.toJSON().timing;
    const TTFB = millisToSeconds(responseStart - navigationStart);
    const DomLoad = millisToSeconds(domContentLoadedEventEnd - navigationStart);
    const WindowLoad = millisToSeconds(Timestamp - navigationStart);
    const resourceEntries = window.performance.getEntriesByType("resource");
    const Files = resourceEntries.map((entry) => {
      return {
        type: entry.initiatorType,
        source: entry.name,
        responseTime: millisToSeconds(entry.responseEnd - entry.responseStart),
        executionTime: millisToSeconds(entry.responseEnd - entry.fetchStart),
        fetchTime: millisToSeconds(entry.responseEnd - entry.fetchStart),
      };
    });
    sendRequest(TTFB, DomLoad, WindowLoad, Files);
  };
  window.addEventListener("load", () => {
    if ("performance" in window && "PerformanceObserver" in window) {
      let perfObserver = new PerformanceObserver((entryList) => {
        FCP = millisToSeconds(
          entryList.getEntriesByName("first-contentful-paint")[0].startTime
        );
      });
      perfObserver.observe({ type: "paint", buffered: true });
      measurePerformance();
    } else {
      console.error("Error: Browser is not supported currently.");
    }
  });
})();

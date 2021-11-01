import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
export const MarkInfo = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-opacity-50 duration-300 shadow-xl"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>{" "}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  What is {props.markType}?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 border-t pt-2">
                    {props.markType === "TTFB" ? (
                      <TTFBDetails />
                    ) : props.markType === "FCP" ? (
                      <FCPDetails />
                    ) : props.markType === "DomLoad" ? (
                      <DomLoadDetails />
                    ) : (
                      <WindowLoadDetails />
                    )}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const TTFBDetails = () => {
  return (
    <div>
      <p>
        TTFB is a metric that measures the time between the request for a
        resource and when the first byte of a response begins to arrive.
      </p>
      <h2 className="font-bold text-red-800 text-md mt-2 mb-1">
        What is a good TTFB score?
      </h2>
      <p>
        Due to the wide variation of network and application backend stacks, an
        arbitrary number can't be placed on what consists of a "good" TTFB
        score. Because TTFB precedes user-centric metrics such as First
        Contentful Paint (FCP) and Largest Contentful Paint (LCP), it's
        recommended that your server responds to navigation requests quickly
        enough so that the 75th percentile of users experience an FCP within the
        "good" threshold.
      </p>
      <Link to={{ pathname: "https://web.dev/ttfb/" }}>
        <p className="font-bold text-blue-800 mt-2">Resource: web.dev</p>
      </Link>
    </div>
  );
};

const FCPDetails = () => {
  return (
    <div>
      <p>
        The First Contentful Paint (FCP) metric measures the time from when the
        page starts loading to when any part of the page's content is rendered
        on the screen. For this metric, "content" refers to text, images
        (including background images), svg elements, or non-white canvas
        elements.
      </p>
      <h2 className="font-bold text-red-800 text-md mt-2 mb-1">
        What is a good FCP score?
      </h2>
      <p>
        To provide a good user experience, sites should strive to have a First
        Contentful Paint of 1.8 seconds or less. To ensure you're hitting this
        target for most of your users, a good threshold to measure is the 75th
        percentile of page loads, segmented across mobile and desktop devices.
      </p>
      <Link to={{ pathname: "https://web.dev/fcp/" }}>
        <p className="font-bold text-blue-800 mt-2">Resource: web.dev</p>
      </Link>
    </div>
  );
};

const DomLoadDetails = () => {
  return (
    <div>
      <p>
        DOM processing is the time it takes to parse the HTML into a DOM and
        retrieve or execute synchronous scripts. If the browser starts to
        download images in this phase, page load timing will capture the image
        load time.
      </p>
      <h2 className="font-bold text-red-800 text-md mt-2 mb-1">More Info</h2>
      <p>
        The DOM processing and page rendering layers include network time for
        static assets (assets that are not explicitly retrieved after page
        load). However, if a script on the page dynamically inserts image tags
        and loads images after the server or content delivery system (CDN)
        finishes, page load timing cannot capture the image load time.
      </p>
      <Link
        to={{
          pathname:
            "https://docs.newrelic.com/docs/browser/new-relic-browser/page-load-timing-resources/page-load-timing-process/#h3-dom",
        }}
      >
        <p className="font-bold text-blue-800 mt-2">Resource: New Relic</p>
      </Link>
    </div>
  );
};

const WindowLoadDetails = () => {
  return (
    <div>
      <p>
        The load event is fired when the whole page has loaded, including all
        dependent resources such as stylesheets and images. This is in contrast
        to DOMContentLoaded, which is fired as soon as the page DOM has been
        loaded, without waiting for resources to finish loading.{" "}
      </p>

      <Link
        to={{
          pathname:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event",
        }}
      >
        <p className="font-bold text-blue-800 mt-2">Resource: MDN Web Docs</p>
      </Link>
    </div>
  );
};

export default MarkInfo;

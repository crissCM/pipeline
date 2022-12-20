type BrowserName = "chrome" | "firefox" | "opera" | "safari" | "edge" | "brave";

function isAndroid() {
  return window?.navigator?.userAgent && /Android/i.test(window.navigator.userAgent);
}

function isIOS() {
  return (
    window?.navigator?.userAgent && /iPhone|iPad|iPod/i.test(window.navigator.userAgent)
  );
}

function isMobile() {
  return (
    window?.navigator?.userAgent &&
    /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
  );
}

/**
 * Detects the browser name
 * @returns {BrowserName} Browser name
 */
function detectBrowser() {
  if (window?.navigator) {
    const {userAgent} = window.navigator;
    let browserName: BrowserName | undefined;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = undefined;
    }

    // @ts-ignore brave object exists on Brave
    if (window.navigator.brave) {
      browserName = "brave";
    }
    return browserName;
  }
  return undefined;
}

export {isAndroid, isIOS, isMobile, detectBrowser};

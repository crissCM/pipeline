type BrowserName = "chrome" | "firefox" | "opera" | "safari" | "edge" | "brave";

function isAndroid() {
  return navigator && /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return navigator && /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return navigator && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * Detects the browser name
 * @returns {BrowserName} Browser name
 */
function detectBrowser() {
  if (navigator) {
    const {userAgent} = navigator;
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
    if (navigator.brave) {
      browserName = "brave";
    }
    return browserName;
  }
  return undefined;
}

export {isAndroid, isIOS, isMobile, detectBrowser};

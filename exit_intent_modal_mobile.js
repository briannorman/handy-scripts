/*
  ExitIntentMobile class based on the cromedics module for desktop,
  plus many articles such as: https://www.quora.com/Is-there-a-way-to-detect-exit-intent-in-mobile-devices
  Author: Amanda Smith
  Last Modified: 2/5/18
  Concept: on mobile, when the user wants to exit, they scroll back up,
  which brings up the address bar. Especially reliable when they've scrolled
  down a ways into the page.
  This module waits for the user to scroll past a certain point, then back up any amount.
  Then the callback is fired, which can for example show a modal.
  Usage:
  new ExitIntentMobile({
		scrollPoint: 0, // how far down the user needs to scroll
		cookie: 'mobileExitIntent_shown', // the name of the cookie
		cookieExp: 0, // cookie expiration in # of days; 0 = always show the popup
		delay: 5, // automatically run the callback after this many seconds
		showOnDelay: false, // whether to open after the delay specified above
		callback: () => {
			// exit intent fired, do your thing
		},
  });
  scrollPoint is the specific position on the page that the user needs to
  scroll to before the class starts waiting for them to scroll back up.
  Examples:
  $("body").height() / 2 = halfway down the page
  $("#element").offset().top = the top of a specific element
  Note that you may need to use window.jQuery.
  Use ?cro-debug to ignore the cookie and print debugging statements.
  Note: you have to scroll up at least 10px in one notch for it to count.
  This attempts to get around an issue where the smooth scrolling in iOS devices
  combined with the changing heights of the URL bar and bottom toolbar cause
  the calculated scrollTop to zigzag sometimes. If you run into this problem,
  try moving your scrollPoint further down the page.
*/

import cookie from './cookie';

export default class ExitIntentMobile {
  constructor(options) {
    this.shown = false;
    this.scrollPointInView = false;
    this.lastScrollTop = 0;

    // default values
    this.scrollPoint = 0;
    this.cookie = "mobileExitIntent_shown";
    this.cookieOverride = "cro-debug"; // query param used for debugging
    this.delay = 5;
    this.showOnDelay = false;
    this.cookieExp = 0;

    // handle options
    if (typeof options !== "undefined") {
      this.setOptions(options);
    }

    this.debugMode = (window.location.search.indexOf(this.cookieOverride) > -1);

    // once the DOM has fully loaded...
    this.domReady(() => {
      // don't do anything if the cookie is already set to true
      if (this.checkCookie()) {
        if (this.debugMode) console.log("[EIM] Already shown:", this.cookie);
        return;
      }

      // start waiting for the exit intent
      this.loadEvents();

      // handle showing after a delay
      if (this.showOnDelay) {
        setTimeout(() => {
          this.triggerIntent();
        }, this.delay * 1000);
      }
    });
  }

  // handle the cookie for whether the callback has already run
  // if cookie is present and true, return true
  // if cookie is not present or false, return false
  checkCookie() {
    // handle no cookie expiry set
    if (this.cookieExp <= 0) {
      cookie.del(this.cookie);
      return false;
    }

    // handle debug param (always run callback)
    if (this.debugMode) {
      return false;
    }

    // if the cookie is set to true (callback already called)
    if (cookie.get(this.cookie) === "true") {
      return true;
    }

    return false;
  }

  // run the callback, if it hasn't already been run
  // also create the cookie
  triggerIntent() {
    if (this.debugMode) console.log("[EIM] Intent triggered!");
    if (this.shown) return;

    if (this.debugMode) console.log("[EIM] Not shown already! Running callback...");
    this.shown = true;
    cookie.set(this.cookie, "true", this.cookieExp);
    this.callback();
  }

  // start listening for exit intent events
  loadEvents() {
    let scrollHandler = function () {
      var scrollTop = window.pageYOffset || (document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop);

      // watch for the scroll point to be above the bottom of the window
      if (!this.scrollPointInView) {
        var scrollBottom = scrollTop + (document.documentElement.clientHeight || window.innerHeight);
        if (this.debugMode) console.log(`[EIM] Scroll detected, scroll top/bottom are ${scrollTop} / ${scrollBottom}. Watching for scroll point...`);

        if (this.scrollPoint <= scrollBottom) {
          this.scrollPointInView = true;
          if (this.debugMode) console.log("[EIM] Scroll point is in view");
        }
      } else {
        // user has scrolled down far enough
        // watch for them to scroll back up instead
        if (this.debugMode) console.log(`[EIM] Scroll detected, scroll top is ${scrollTop}. Waiting for scroll up...`);
        if (scrollTop < this.lastScrollTop - 10) {
          this.triggerIntent(); // fire the callback!
          document.removeEventListener("scroll", scrollHandler);
        }
        this.lastScrollTop = scrollTop;
      }
    };

    scrollHandler = scrollHandler.bind(this); // bind scope so handler can access obj properties
    document.addEventListener("scroll", scrollHandler, false);
  }

  // set user defined options
  setOptions(options) {
    for (var o in options) {
      this[o] = (typeof options[o] === "undefined") ? this[o] : options[o];
    }
  }

  // pure JS listening for DOM ready
  domReady(callback) {
    (document.readyState === "interactive" || document.readyState === "complete") ? callback(): document.addEventListener("DOMContentLoaded", callback); /* eslint-disable-line */ /* jshint ignore: line */
  }
};

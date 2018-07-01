function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    }; // The length property of the from method is 1.


    return function from(arrayLike
    /* , mapFn, thisArg */
    ) {
      // 1. Let C be the this value.
      var C = this; // 2. Let items be ToObject(arrayLike).

      var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      } // 4. If mapfn is undefined, then let mapping be false.


      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


        if (arguments.length > 2) {
          T = arguments[2];
        }
      } // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).


      var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).

      var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

      var k = 0; // 17. Repeat, while k < len… (also steps a - h)

      var kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k += 1;
      } // 18. Let putStatus be Put(A, "length", len, true).


      A.length = len; // 20. Return A.

      return A;
    };
  }();
}

/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

/* eslint-disable no-unused-vars */
(function (document, window) {
  var el = document.body || document.documentElement,
      s = el.style,
      prefixAnimation = '',
      prefixTransition = '';
  if (s.WebkitAnimation == '') prefixAnimation = '-webkit-';
  if (s.MozAnimation == '') prefixAnimation = '-moz-';
  if (s.OAnimation == '') prefixAnimation = '-o-';
  if (s.WebkitTransition == '') prefixTransition = '-webkit-';
  if (s.MozTransition == '') prefixTransition = '-moz-';
  if (s.OTransition == '') prefixTransition = '-o-';
  Object.defineProperty(Object.prototype, 'onCSSAnimationEnd', {
    value: function value(callback) {
      var runOnce = function runOnce(e) {
        callback();
        e.target.removeEventListener(e.type, runOnce);
      };

      this.addEventListener('webkitAnimationEnd', runOnce);
      this.addEventListener('mozAnimationEnd', runOnce);
      this.addEventListener('oAnimationEnd', runOnce);
      this.addEventListener('oanimationend', runOnce);
      this.addEventListener('animationend', runOnce);
      if (prefixAnimation == '' && !('animation' in s) || getComputedStyle(this)[prefixAnimation + 'animation-duration'] == '0s') callback();
      return this;
    },
    enumerable: false,
    writable: true
  });
  Object.defineProperty(Object.prototype, 'onCSSTransitionEnd', {
    value: function value(callback) {
      var runOnce = function runOnce(e) {
        callback();
        e.target.removeEventListener(e.type, runOnce);
      };

      this.addEventListener('webkitTransitionEnd', runOnce);
      this.addEventListener('mozTransitionEnd', runOnce);
      this.addEventListener('oTransitionEnd', runOnce);
      this.addEventListener('transitionend', runOnce);
      this.addEventListener('transitionend', runOnce);
      if (prefixTransition == '' && !('transition' in s) || getComputedStyle(this)[prefixTransition + 'transition-duration'] == '0s') callback();
      return this;
    },
    enumerable: false,
    writable: true
  });
})(document, window, 0);

/**
 *  ACCORDION
 *
 * A lightwight vanilla JS accordion with an exstensible API
 */
// import uuid from 'uuid/v4';
// const uuidV4 = uuid;

/* eslint-disable no-unused-vars */
/**
 * CONSTRUCTOR
 * initialises the object
 */

var BadgerAccordion =
/*#__PURE__*/
function () {
  function BadgerAccordion(el, options) {
    _classCallCheck(this, BadgerAccordion);

    var container = typeof el === 'string' ? document.querySelector(el) : el; // If el is not defined

    if (container == null) {
      return;
    }

    var defaults = {
      headerClass: '.js-badger-accordion-header',
      panelClass: '.js-badger-accordion-panel',
      panelInnerClass: '.js-badger-accordion-panel-inner',
      hiddenClass: '-ba-is-hidden',

      get hidenClass() {
        return this.hiddenClass;
      },

      initalisedClass: 'badger-accordion--initalised',
      headerDataAttr: 'data-badger-accordion-header-id',
      openMultiplePanels: false,
      openHeadersOnLoad: [],
      headerOpenLabel: 'Open accordion panel',
      headerCloseLabel: 'Close accordion panel' // toggleEl:            // If you want to use a different element to trigger the accordion

    }; // Options

    this.settings = _extends({}, defaults, options); // Deprecating `settings.hidenClass` but adding fallback for older versions

    if (this.settings.hidenClass !== this.settings.hiddenClass) {
      this.settings.hiddenClass = this.settings.hidenClass;
    } // Setting getting elements


    this.container = container;
    this.headers = Array.from(this.container.querySelectorAll(this.settings.headerClass));
    this.panels = Array.from(this.container.querySelectorAll(this.settings.panelClass));
    this.toggleEl = this.settings.toggleEl !== undefined ? Array.from(this.container.querySelectorAll(this.settings.toggleEl)) : this.headers; // This is for managing state of the accordion. It by default sets
    // all accordion panels to be closed

    this.states = [].map.call(this.headers, function () {
      return {
        state: 'closed'
      };
    });
    this.ids = [].map.call(this.headers, function () {
      return {
        id: Math.floor(Math.random() * 1000000 + 1)
      };
    }); // This is to ensure that once an open/close event has been fired
    // another cannot start until the first event has finished.
    // @TODO - get this working...

    this.toggling = false; // Initiating the accordion

    if (this.container) {
      this.init();
    } else {
      /* eslint-disable no-console */
      console.log('Something is wrong with you markup...');
    }
  }
  /**
   *  INIT
   *
   *  Initalises the accordion
   */


  _createClass(BadgerAccordion, [{
    key: "init",
    value: function init() {
      // Sets up ID, aria attrs & data-attrs
      this._setupAttributes(); // Setting up the inital view of the accordion


      this._initalState(); // Setting the height of each panel


      this._setPanelHeight(); // Inserting data-attribute onto each `header`


      this._insertDataAttrs(); // Adding listeners to headers


      this._addListeners(); // Adds class to accordion for initalisation


      this._finishInitalisation();

      console.log("Loggin");
    }
    /**
     *  INSERT DATA ATTRS
     *
     *  Updates state object for inital loading of the accordion
     */

  }, {
    key: "_initalState",
    value: function _initalState() {
      // Sets state object as per `this.settings.openHeadersOnLoad`
      var headersToOpen = this.settings.openHeadersOnLoad;

      if (headersToOpen.length) {
        this._openHeadersOnLoad(headersToOpen);
      } // Render DOM as per the updates `this.states` object


      this._renderDom();
    }
    /**
     *  INSERT DATA ATTRS
     *
     *  Adds `headerDataAttr` to all headers
     */

  }, {
    key: "_insertDataAttrs",
    value: function _insertDataAttrs() {
      var _this2 = this;

      this.headers.forEach(function (header, index) {
        header.setAttribute(_this2.settings.headerDataAttr, index);
      });
    }
    /**
     *  FINISH INITALISATION
     *
     *  Adds in `initalisedClass` to accordion
     */

  }, {
    key: "_finishInitalisation",
    value: function _finishInitalisation() {
      this.container.classList.add(this.settings.initalisedClass);
      this.container.setAttribute('role', 'presentation');
    }
    /**
     *  ADD LISTENERS
     *
     *  Adds click event to each header
     */

  }, {
    key: "_addListeners",
    value: function _addListeners() {
      // So we can reference the badger-accordion object inside out eventListener
      var _this = this; // Adding click event to accordion


      this.headers.forEach(function (header, index) {
        header.addEventListener('click', function () {
          // Getting the target of the click
          // const clickedEl = event.target;
          _this.handleClick(header, index);
        });
      });
    }
    /**
     *  HANDLE CLICK
     *
     *  Handles click and checks if click was on an header element
     *  @param {object} targetHeader - The header node you want to open
     */

  }, {
    key: "handleClick",
    value: function handleClick(targetHeader, headerIndex) {
      // Removing current `.` from `this.settings.headerClass` class so it can
      // be checked against the `targetHeader` classList
      var targetHeaderClass = this.settings.headerClass.substr(1); // Checking that the thing that was clicked on was the accordions header

      if (targetHeader.classList.contains(targetHeaderClass) && this.toggling === false) {
        this.toggling = true; // Updating states

        this.setState(headerIndex); // Render DOM as per the updates `this.states` object

        this._renderDom();
      }
    }
    /**
     *  SET STATES
     *
     *  Sets the state for all headers. The 'target header' will have its state toggeled
     *  @param {object} targetHeaderId - The header node you want to open
     */

  }, {
    key: "setState",
    value: function setState(targetHeaderId) {
      var _this3 = this;

      var states = this.getState(); // If `this.settings.openMultiplePanels` is false we need to ensure only one panel
      // be can open at once. If it is false then all panels state APART from the one that
      // has just been clicked needs to be set to 'closed'.

      if (!this.settings.openMultiplePanels) {
        states.filter(function (state, index) {
          if (index != targetHeaderId) {
            state.state = 'closed';
          }
        });
      } // Toggles the state value of the target header. This was `array.find` but `find`
      // isnt supported in IE11


      states.filter(function (state, index) {
        if (index == targetHeaderId) {
          var newState = _this3.toggleState(state.state);

          return state.state = newState;
        }
      });
    }
    /**
     *  RENDER DOM
     *
     *  Renders the accordion in the DOM using the `this.states` object
     */

  }, {
    key: "_renderDom",
    value: function _renderDom() {
      var _this4 = this;

      // const states = this.getState();
      // Filter through all open headers and open them
      this.states.filter(function (state, index) {
        if (state.state === 'open') {
          _this4.open(index);
        }
      }); // Filter through all closed headers and closes them

      this.states.filter(function (state, index) {
        if (state.state === 'closed') {
          _this4.close(index);
        }
      });
    }
    /**
     *  OPEN
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to open
     */

  }, {
    key: "open",
    value: function open(headerIndex) {
      this.togglePanel('open', headerIndex);
    }
    /**
     *  CLOSE
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to close
     */

  }, {
    key: "close",
    value: function close(headerIndex) {
      this.togglePanel('closed', headerIndex);
    }
    /**
     *  OPEN ALL
     *
     *  Opens all panels
     */

  }, {
    key: "openAll",
    value: function openAll() {
      var _this5 = this;

      this.headers.forEach(function (header) {
        _this5.togglePanel('open', header);
      });
    }
    /**
     *  CLOSE ALL
     *
     *  Closes all panels
     */

  }, {
    key: "closeAll",
    value: function closeAll() {
      var _this6 = this;

      this.headers.forEach(function (header) {
        _this6.togglePanel('closed', header);
      });
    }
    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {string} animationAction - The animation you want to invoke
     *  @param {object} header          - The header node you want to animate
     */

  }, {
    key: "togglePanel",
    value: function togglePanel(animationAction, headerIndex) {
      var _this7 = this;

      if (animationAction !== undefined && headerIndex !== undefined) {
        if (animationAction === 'closed') {
          // 1. Getting ID of panel that we want to close
          var header = this.headers[headerIndex];
          var panelToClose = this.panels[headerIndex]; // 2. Closeing panel

          panelToClose.classList.add(this.settings.hiddenClass); // 3. Set aria attrs

          header.setAttribute('aria-expanded', false);
          header.setAttribute('aria-label', this.settings.headerOpenLabel); // 4. Resetting toggling so a new event can be fired

          panelToClose.onCSSTransitionEnd(function () {
            return _this7.toggling = false;
          });
        } else if (animationAction === 'open') {
          // 1. Getting ID of panel that we want to open
          var _header = this.headers[headerIndex];
          var panelToOpen = this.panels[headerIndex]; // 2. Closeing panel

          panelToOpen.classList.remove(this.settings.hiddenClass); // 3. Set aria attrs

          _header.setAttribute('aria-expanded', true);

          _header.setAttribute('aria-label', this.settings.headerCloseLabel); // 4. Resetting toggling so a new event can be fired


          panelToOpen.onCSSTransitionEnd(function () {
            return _this7.toggling = false;
          });
        }
      }
    } // @TODO - is this needed anymore?
    // checkState(headerId) {
    //     let state = this.states[headerId].state;
    //
    //     if(state === 'closed') {
    //         return state;
    //     } else if(state === 'open') {
    //         return state;
    //     }
    // }

    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {array} headerIds - Id/'s of the headers you want to check
     */

  }, {
    key: "getState",
    value: function getState() {
      var _this8 = this;

      var headerIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (headerIds.length && Array.isArray(headerIds)) {
        var states = headerIds.map(function (header) {
          return _this8.states[header];
        });
        return states;
      } else {
        return this.states;
      }
    }
    /**
     *  TOGGLE STATE
     *
     *  Toggling the state value
     *  @param {string} currentState - Current state value for a header
     */

  }, {
    key: "toggleState",
    value: function toggleState(currentState) {
      if (currentState !== undefined) {
        return currentState === 'closed' ? 'open' : 'closed';
      }
    }
    /**
     *  HEADERS TO OPEN
     *
     *  Setting which headers should be open when accordion is initalised
     *  @param {array} headersToOpen - Array of ID's for the headers to be open
     */

  }, {
    key: "_openHeadersOnLoad",
    value: function _openHeadersOnLoad() {
      var _this9 = this;

      var headersToOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (headersToOpen.length && Array.isArray(headersToOpen)) {
        var headers = headersToOpen.filter(function (header) {
          return header != undefined;
        });
        headers.forEach(function (header) {
          return _this9.states[header].state = 'open';
        });
      }
    }
    /**
     *  SET UP ATTRIBUTES
     *
     *  Initalises accordion attribute methods
     */

  }, {
    key: "_setupAttributes",
    value: function _setupAttributes() {
      // Adding ID & aria-controls
      this._setupHeaders(); // Adding ID & aria-labeledby


      this._setupPanels(); // Inserting data-attribute onto each `header`


      this._insertDataAttrs();
    }
    /**
     *  SET PANEL HEIGHT
     *
     *  Setting height for panels using pannels inner element
     */

  }, {
    key: "_setPanelHeight",
    value: function _setPanelHeight() {
      var _this10 = this;

      // [].forEach.(this.panels, (panel) => {
      this.panels.forEach(function (panel) {
        var panelInner = panel.querySelector(_this10.settings.panelInnerClass);
        var activeHeight = panelInner.offsetHeight;
        return panel.style.maxHeight = "".concat(activeHeight, "px");
      });
    }
    /**
     * SET UP HEADERS
     */

  }, {
    key: "_setupHeaders",
    value: function _setupHeaders() {
      var _this11 = this;

      this.headers.forEach(function (header, index) {
        header.setAttribute('id', "badger-accordion-header-".concat(_this11.ids[index].id));
        header.setAttribute('aria-controls', "badger-accordion-panel-".concat(_this11.ids[index].id));
        header.setAttribute('aria-label', _this11.settings.headerOpenLabel);
      });
    }
    /**
     * SET UP PANELS
     */

  }, {
    key: "_setupPanels",
    value: function _setupPanels() {
      var _this12 = this;

      this.panels.forEach(function (panel, index) {
        panel.setAttribute('id', "badger-accordion-panel-".concat(_this12.ids[index].id));
        panel.setAttribute('aria-labeledby', "badger-accordion-header-".concat(_this12.ids[index].id));
        panel.setAttribute('role', 'region');
      });
    }
  }]);

  return BadgerAccordion;
}(); // Export

export default BadgerAccordion;
//# sourceMappingURL=badger-accordion.esm.js.map

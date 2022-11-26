// window.theme = window.theme || {};

// /* ================ SLATE ================ */
// window.theme = window.theme || {};

// theme.Sections = function Sections() {
//   this.constructors = {};
//   this.instances = [];
  
//   $(document)
//     .on('shopify:section:load', this._onSectionLoad.bind(this))
//     .on('shopify:section:unload', this._onSectionUnload.bind(this))
//     .on('shopify:section:select', this._onSelect.bind(this))
//     .on('shopify:section:deselect', this._onDeselect.bind(this))
//     .on('shopify:block:select', this._onBlockSelect.bind(this))
//     .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
// };

// theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
//   _createInstance: function(container, constructor) {
//     var $container = $(container);
//     var id = $container.attr('data-section-id');
//     var type = $container.attr('data-section-type');

//     constructor = constructor || this.constructors[type];

//     if (_.isUndefined(constructor)) {
//       return;
//     }

//     var instance = _.assignIn(new constructor(container), {
//       id: id,
//       type: type,
//       container: container
//     });

//     this.instances.push(instance);
//   },

//   _onSectionLoad: function(evt) {
//     var container = $('[data-section-id]', evt.target)[0];
//     if (container) {
//       this._createInstance(container);
//     }
//   },

//   _onSectionUnload: function(evt) {
//     this.instances = _.filter(this.instances, function(instance) {
//       var isEventInstance = instance.id === evt.detail.sectionId;

//       if (isEventInstance) {
//         if (_.isFunction(instance.onUnload)) {
//           instance.onUnload(evt);
//         }
//       }

//       return !isEventInstance;
//     });
//   },

//   _onSelect: function(evt) {
//     // eslint-disable-next-line no-shadow
//     var instance = _.find(this.instances, function(instance) {
//       return instance.id === evt.detail.sectionId;
//     });

//     if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
//       instance.onSelect(evt);
//     }
//   },

//   _onDeselect: function(evt) {
//     // eslint-disable-next-line no-shadow
//     var instance = _.find(this.instances, function(instance) {
//       return instance.id === evt.detail.sectionId;
//     });

//     if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
//       instance.onDeselect(evt);
//     }
//   },

//   _onBlockSelect: function(evt) {
//     // eslint-disable-next-line no-shadow
//     var instance = _.find(this.instances, function(instance) {
//       return instance.id === evt.detail.sectionId;
//     });

//     if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
//       instance.onBlockSelect(evt);
//     }
//   },

//   _onBlockDeselect: function(evt) {
//     // eslint-disable-next-line no-shadow
//     var instance = _.find(this.instances, function(instance) {
//       return instance.id === evt.detail.sectionId;
//     });

//     if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
//       instance.onBlockDeselect(evt);
//     }
//   },

//   register: function(type, constructor) {
//     this.constructors[type] = constructor;

//     $('[data-section-type=' + type + ']').each(
//       function(index, container) {
//         this._createInstance(container, constructor);
//       }.bind(this)
//     );
//   }
// });

// window.slate = window.slate || {};

// /**
//  * Slate utilities
//  * -----------------------------------------------------------------------------
//  * A collection of useful utilities to help build your theme
//  *
//  *
//  * @namespace utils
//  */

// slate.utils = {
//   /**
//    * Get the query params in a Url
//    * Ex
//    * https://mysite.com/search?q=noodles&b
//    * getParameterByName('q') = "noodles"
//    * getParameterByName('b') = "" (empty value)
//    * getParameterByName('test') = null (absent)
//    */
//   getParameterByName: function(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//       results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
//   },

//   resizeSelects: function($selects) {
//     $selects.each(function() {
//       var $this = $(this);
//       var arrowWidth = 10;
//       // create test element
//       var text = $this.find('option:selected').text();
//       var $test = $('<span>').html(text);

//       // add to body, get width, and get out
//       $test.appendTo('body');
//       var width = $test.width();
//       $test.remove();

//       // set select width
//       $this.width(width + arrowWidth);
//     });
//   },

//   keyboardKeys: {
//     TAB: 9,
//     ENTER: 13,
//     ESCAPE: 27,
//     LEFTARROW: 37,
//     RIGHTARROW: 39
//   }
// };

// window.slate = window.slate || {};

// /**
//  * iFrames
//  * -----------------------------------------------------------------------------
//  * Wrap videos in div to force responsive layout.
//  *
//  * @namespace iframes
//  */

// slate.rte = {
//   /**
//    * Wrap tables in a container div to make them scrollable when needed
//    *
//    * @param {object} options - Options to be used
//    * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
//    * @param {string} options.tableWrapperClass - table wrapper class name
//    */
//   wrapTable: function(options) {
//     options.$tables.wrap(
//       '<div class="' + options.tableWrapperClass + '"></div>'
//     );
//   },

//   /**
//    * Wrap iframes in a container div to make them responsive
//    *
//    * @param {object} options - Options to be used
//    * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
//    * @param {string} options.iframeWrapperClass - class name used on the wrapping div
//    */
//   wrapIframe: function(options) {
//     options.$iframes.each(function() {
//       // Add wrapper to make video responsive
//       $(this).wrap('<div class="' + options.iframeWrapperClass + '"></div>');

//       // Re-set the src attribute on each iframe after page load
//       // for Chrome's "incorrect iFrame content on 'back'" bug.
//       // https://code.google.com/p/chromium/issues/detail?id=395791
//       // Need to specifically target video and admin bar
//       this.src = this.src;
//     });
//   }
// };

// window.slate = window.slate || {};

// /**
//  * A11y Helpers
//  * -----------------------------------------------------------------------------
//  * A collection of useful functions that help make your theme more accessible
//  * to users with visual impairments.
//  *
//  *
//  * @namespace a11y
//  */

// slate.a11y = {
//   /**
//    * For use when focus shifts to a container rather than a link
//    * eg for In-page links, after scroll, focus shifts to content area so that
//    * next `tab` is where user expects if focusing a link, just $link.focus();
//    *
//    * @param {JQuery} $element - The element to be acted upon
//    */
//   pageLinkFocus: function($element) {
//     var focusClass = 'js-focus-hidden';

//     $element
//       .first()
//       .attr('tabIndex', '-1')
//       .focus()
//       .addClass(focusClass)
//       .one('blur', callback);

//     function callback() {
//       $element
//         .first()
//         .removeClass(focusClass)
//         .removeAttr('tabindex');
//     }
//   },

//   /**
//    * If there's a hash in the url, focus the appropriate element
//    */
//   focusHash: function() {
//     var hash = window.location.hash;

//     // is there a hash in the url? is it an element on the page?
//     if (hash && document.getElementById(hash.slice(1))) {
//       this.pageLinkFocus($(hash));
//     }
//   },

//   /**
//    * When an in-page (url w/hash) link is clicked, focus the appropriate element
//    */
//   bindInPageLinks: function() {
//     $('a[href*=#]').on(
//       'click',
//       function(evt) {
//         this.pageLinkFocus($(evt.currentTarget.hash));
//       }.bind(this)
//     );
//   },

//   /**
//    * Traps the focus in a particular container
//    *
//    * @param {object} options - Options to be used
//    * @param {jQuery} options.$container - Container to trap focus within
//    * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
//    * @param {string} options.namespace - Namespace used for new focus event handler
//    */
//   trapFocus: function(options) {
//     var eventsName = {
//       focusin: options.namespace ? 'focusin.' + options.namespace : 'focusin',
//       focusout: options.namespace
//         ? 'focusout.' + options.namespace
//         : 'focusout',
//       keydown: options.namespace
//         ? 'keydown.' + options.namespace
//         : 'keydown.handleFocus'
//     };

//     /**
//      * Get every possible visible focusable element
//      */
//     var $focusableElements = options.$container.find(
//       $(
//         'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])'
//       ).filter(':visible')
//     );
//     var firstFocusable = $focusableElements[0];
//     var lastFocusable = $focusableElements[$focusableElements.length - 1];

//     if (!options.$elementToFocus) {
//       options.$elementToFocus = options.$container;
//     }

//     function _manageFocus(evt) {
//       if (evt.keyCode !== slate.utils.keyboardKeys.TAB) return;

//       /**
//        * On the last focusable element and tab forward,
//        * focus the first element.
//        */
//       if (evt.target === lastFocusable && !evt.shiftKey) {
//         evt.preventDefault();
//         firstFocusable.focus();
//       }
//       /**
//        * On the first focusable element and tab backward,
//        * focus the last element.
//        */
//       if (evt.target === firstFocusable && evt.shiftKey) {
//         evt.preventDefault();
//         lastFocusable.focus();
//       }
//     }

//     options.$container.attr('tabindex', '-1');
//     options.$elementToFocus.focus();

//     $(document).off('focusin');

//     $(document).on(eventsName.focusout, function() {
//       $(document).off(eventsName.keydown);
//     });

//     $(document).on(eventsName.focusin, function(evt) {
//       if (evt.target !== lastFocusable && evt.target !== firstFocusable) return;

//       $(document).on(eventsName.keydown, function(evt) {
//         _manageFocus(evt);
//       });
//     });
//   },

//   /**
//    * Removes the trap of focus in a particular container
//    *
//    * @param {object} options - Options to be used
//    * @param {jQuery} options.$container - Container to trap focus within
//    * @param {string} options.namespace - Namespace used for new focus event handler
//    */
//   removeTrapFocus: function(options) {
//     var eventName = options.namespace
//       ? 'focusin.' + options.namespace
//       : 'focusin';

//     if (options.$container && options.$container.length) {
//       options.$container.removeAttr('tabindex');
//     }

//     $(document).off(eventName);
//   },

//   /**
//    * Add aria-describedby attribute to external and new window links
//    *
//    * @param {object} options - Options to be used
//    * @param {object} options.messages - Custom messages to be used
//    * @param {jQuery} options.$links - Specific links to be targeted
//    */
//   accessibleLinks: function(options) {
//     var body = document.querySelector('body');

//     var idSelectors = {
//       newWindow: 'a11y-new-window-message',
//       external: 'a11y-external-message',
//       newWindowExternal: 'a11y-new-window-external-message'
//     };

//     if (options.$links === undefined || !options.$links.jquery) {
//       options.$links = $('a[href]:not([aria-describedby])');
//     }

//     function generateHTML(customMessages) {
//       if (typeof customMessages !== 'object') {
//         customMessages = {};
//       }

//       var messages = $.extend(
//         {
//           newWindow: 'Opens in a new window.',
//           external: 'Opens external website.',
//           newWindowExternal: 'Opens external website in a new window.'
//         },
//         customMessages
//       );

//       var container = document.createElement('ul');
//       var htmlMessages = '';

//       for (var message in messages) {
//         htmlMessages +=
//           '<li id=' + idSelectors[message] + '>' + messages[message] + '</li>';
//       }

//       container.setAttribute('hidden', true);
//       container.innerHTML = htmlMessages;

//       body.appendChild(container);
//     }

//     function _externalSite($link) {
//       var hostname = window.location.hostname;

//       return $link[0].hostname !== hostname;
//     }

//     $.each(options.$links, function() {
//       var $link = $(this);
//       var target = $link.attr('target');
//       var rel = $link.attr('rel');
//       var isExternal = _externalSite($link);
//       var isTargetBlank = target === '_blank';

//       if (isExternal) {
//         $link.attr('aria-describedby', idSelectors.external);
//       }
//       if (isTargetBlank) {
//         if (rel === undefined || rel.indexOf('noopener') === -1) {
//           $link.attr('rel', function(i, val) {
//             var relValue = val === undefined ? '' : val + ' ';
//             return relValue + 'noopener';
//           });
//         }
//         $link.attr('aria-describedby', idSelectors.newWindow);
//       }
//       if (isExternal && isTargetBlank) {
//         $link.attr('aria-describedby', idSelectors.newWindowExternal);
//       }
//     });

//     generateHTML(options.messages);
//   }
// };

// /**
//  * Image Helper Functions
//  * -----------------------------------------------------------------------------
//  * A collection of functions that help with basic image operations.
//  *
//  */

// theme.Images = (function() {
//   /**
//    * Preloads an image in memory and uses the browsers cache to store it until needed.
//    *
//    * @param {Array} images - A list of image urls
//    * @param {String} size - A shopify image size attribute
//    */

//   function preload(images, size) {
//     if (typeof images === 'string') {
//       images = [images];
//     }

//     for (var i = 0; i < images.length; i++) {
//       var image = images[i];
//       this.loadImage(this.getSizedImageUrl(image, size));
//     }
//   }

//   /**
//    * Loads and caches an image in the browsers cache.
//    * @param {string} path - An image url
//    */
//   function loadImage(path) {
//     new Image().src = path;
//   }

//   /**
//    * Swaps the src of an image for another OR returns the imageURL to the callback function
//    * @param image
//    * @param element
//    * @param callback
//    */
//   function switchImage(image, element, callback) {
//     var size = this.imageSize(element.src);
//     var imageUrl = this.getSizedImageUrl(image.src, size);

//     if (callback) {
//       callback(imageUrl, image, element); // eslint-disable-line callback-return
//     } else {
//       element.src = imageUrl;
//     }
//   }

//   /**
//    * +++ Useful
//    * Find the Shopify image attribute size
//    *
//    * @param {string} src
//    * @returns {null}
//    */
//   function imageSize(src) {
//     var match = src.match(
//       /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
//     );

//     if (match !== null) {
//       if (match[2] !== undefined) {
//         return match[1] + match[2];
//       } else {
//         return match[1];
//       }
//     } else {
//       return null;
//     }
//   }

//   /**
//    * +++ Useful
//    * Adds a Shopify size attribute to a URL
//    *
//    * @param src
//    * @param size
//    * @returns {*}
//    */
//   function getSizedImageUrl(src, size) {
//     if (size === null) {
//       return src;
//     }

//     if (size === 'master') {
//       return this.removeProtocol(src);
//     }

//     var match = src.match(
//       /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
//     );

//     if (match !== null) {
//       var prefix = src.split(match[0]);
//       var suffix = match[0];

//       return this.removeProtocol(prefix[0] + '_' + size + suffix);
//     }

//     return null;
//   }

//   function removeProtocol(path) {
//     return path.replace(/http(s)?:/, '');
//   }

//   return {
//     preload: preload,
//     loadImage: loadImage,
//     switchImage: switchImage,
//     imageSize: imageSize,
//     getSizedImageUrl: getSizedImageUrl,
//     removeProtocol: removeProtocol
//   };
// })();

// /**
//  * Currency Helpers
//  * -----------------------------------------------------------------------------
//  * A collection of useful functions that help with currency formatting
//  *
//  * Current contents
//  * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
//  *
//  * Alternatives
//  * - Accounting.js - http://openexchangerates.github.io/accounting.js/
//  *
//  */

// theme.Currency = (function() {
//   var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

//   function formatMoney(cents, format) {
//     if (typeof cents === 'string') {
//       cents = cents.replace('.', '');
//     }
//     var value = '';
//     var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
//     var formatString = format || moneyFormat;

//     function formatWithDelimiters(number, precision, thousands, decimal) {
//       thousands = thousands || ',';
//       decimal = decimal || '.';

//       if (isNaN(number) || number === null) {
//         return 0;
//       }

//       number = (number / 100.0).toFixed(precision);

//       var parts = number.split('.');
//       var dollarsAmount = parts[0].replace(
//         /(\d)(?=(\d\d\d)+(?!\d))/g,
//         '$1' + thousands
//       );
//       var centsAmount = parts[1] ? decimal + parts[1] : '';

//       return dollarsAmount + centsAmount;
//     }

//     switch (formatString.match(placeholderRegex)[1]) {
//       case 'amount':
//         value = formatWithDelimiters(cents, 2);
//         break;
//       case 'amount_no_decimals':
//         value = formatWithDelimiters(cents, 0);
//         break;
//       case 'amount_with_comma_separator':
//         value = formatWithDelimiters(cents, 2, '.', ',');
//         break;
//       case 'amount_no_decimals_with_comma_separator':
//         value = formatWithDelimiters(cents, 0, '.', ',');
//         break;
//       case 'amount_no_decimals_with_space_separator':
//         value = formatWithDelimiters(cents, 0, ' ');
//         break;
//       case 'amount_with_apostrophe_separator':
//         value = formatWithDelimiters(cents, 2, "'");
//         break;
//     }

//     return formatString.replace(placeholderRegex, value);
//   }

//   return {
//     formatMoney: formatMoney
//   };
// })();

// /**
//  * Variant Selection scripts
//  * ------------------------------------------------------------------------------
//  *
//  * Handles change events from the variant inputs in any `cart/add` forms that may
//  * exist.  Also updates the master select and triggers updates when the variants
//  * price or image changes.
//  *
//  * @namespace variants
//  */

// slate.Variants = (function() {
//   /**
//    * Variant constructor
//    *
//    * @param {object} options - Settings from `product.js`
//    */
//   function Variants(options) {
//     this.$container = options.$container;
//     this.product = options.product;
//     this.singleOptionSelector = options.singleOptionSelector;
//     this.originalSelectorId = options.originalSelectorId;
//     this.enableHistoryState = options.enableHistoryState;
//     this.currentVariant = this._getVariantFromOptions();

//     $(this.singleOptionSelector, this.$container).on(
//       'change',
//       this._onSelectChange.bind(this)
//     );
//   }

//   Variants.prototype = _.assignIn({}, Variants.prototype, {
//     /**
//      * Get the currently selected options from add-to-cart form. Works with all
//      * form input elements.
//      *
//      * @return {array} options - Values of currently selected variants
//      */
//     _getCurrentOptions: function() {
//       var currentOptions = _.map(
//         $(this.singleOptionSelector, this.$container),
//         function(element) {
//           var $element = $(element);
//           var type = $element.attr('type');
//           var currentOption = {};

//           if (type === 'radio' || type === 'checkbox') {
//             if ($element[0].checked) {
//               currentOption.value = $element.val();
//               currentOption.index = $element.data('index');

//               return currentOption;
//             } else {
//               return false;
//             }
//           } else {
//             currentOption.value = $element.val();
//             currentOption.index = $element.data('index');

//             return currentOption;
//           }
//         }
//       );

//       // remove any unchecked input values if using radio buttons or checkboxes
//       currentOptions = _.compact(currentOptions);

//       return currentOptions;
//     },

//     /**
//      * Find variant based on selected values.
//      *
//      * @param  {array} selectedValues - Values of variant inputs
//      * @return {object || undefined} found - Variant object from product.variants
//      */
//     _getVariantFromOptions: function() {
//       var selectedValues = this._getCurrentOptions();
//       var variants = this.product.variants;

//       var found = _.find(variants, function(variant) {
//         return selectedValues.every(function(values) {
//           return _.isEqual(variant[values.index], values.value);
//         });
//       });

//       return found;
//     },

//     /**
//      * Event handler for when a variant input changes.
//      */
//     _onSelectChange: function() {
//       var variant = this._getVariantFromOptions();

//       this.$container.trigger({
//         type: 'variantChange',
//         variant: variant
//       });

//       if (!variant) {
//         return;
//       }

//       this._updateMasterSelect(variant);
//       this._updateImages(variant);
//       this._updatePrice(variant);
//       this._updateSKU(variant);
//       this.currentVariant = variant;
      
      
//       if  (variant){
//       var cus_img = variant.featured_media.id;
//       var cus_slide_img = $('[data-image-id="'+cus_img+'"]').attr('data-slick-index');
//       $(".slider-image").slick("slickGoTo", cus_slide_img)
//       }
      
//       if (this.enableHistoryState) {
//         this._updateHistoryState(variant);
//       }
//     },

//     /**
//      * Trigger event when variant image changes
//      *
//      * @param  {object} variant - Currently selected variant
//      * @return {event}  variantImageChange
//      */
//     _updateImages: function(variant) {
//       var variantImage = variant.featured_image || {};
//       var currentVariantImage = this.currentVariant.featured_image || {};

//       if (
//         !variant.featured_image ||
//         variantImage.src === currentVariantImage.src
//       ) {
//         return;
//       }
      
//       this.$container.trigger({
//         type: 'variantImageChange',
//         variant: variant
//       });
//     },

//     /**
//      * Trigger event when variant price changes.
//      *
//      * @param  {object} variant - Currently selected variant
//      * @return {event} variantPriceChange
//      */
//     _updatePrice: function(variant) {
//       if (
        
//         variant.price === this.currentVariant.price &&
//         variant.compare_at_price === this.currentVariant.compare_at_price
        
//       ) {
        
//         return;
//       }

//       this.$container.trigger({
//         type: 'variantPriceChange',
//         variant: variant
//       });
//     },

//     /**
//      * Trigger event when variant sku changes.
//      *
//      * @param  {object} variant - Currently selected variant
//      * @return {event} variantSKUChange
//      */
//     _updateSKU: function(variant) {
//       if (variant.sku === this.currentVariant.sku) {
//         return;
//       }

//       this.$container.trigger({
//         type: 'variantSKUChange',
//         variant: variant
//       });
//     },

//     /**
//      * Update history state for product deeplinking
//      *
//      * @param  {variant} variant - Currently selected variant
//      * @return {k}         [description]
//      */
//     _updateHistoryState: function(variant) {
//       if (!history.replaceState || !variant) {
//         return;
//       }

//       var newurl =
//         window.location.protocol +
//         '//' +
//         window.location.host +
//         window.location.pathname +
//         '?variant=' +
//         variant.id;
//       window.history.replaceState({ path: newurl }, '', newurl);
//     },

//     /**
//      * Update hidden master select of variant change
//      *
//      * @param  {variant} variant - Currently selected variant
//      */
//     _updateMasterSelect: function(variant) {
//       $(this.originalSelectorId, this.$container).val(variant.id);
//     }
//   });

//   return Variants;
// })();

// this.Shopify = this.Shopify || {};
// this.Shopify.theme = this.Shopify.theme || {};
// this.Shopify.theme.PredictiveSearch = (function() {
//   'use strict';

//   function validateQuery(query) {
//     var error;

//     if (query === null || query === undefined) {
//       error = new TypeError("'query' is missing");
//       error.type = 'argument';
//       throw error;
//     }

//     if (typeof query !== 'string') {
//       error = new TypeError("'query' is not a string");
//       error.type = 'argument';
//       throw error;
//     }
//   }

//   function GenericError() {
//     var error = Error.call(this);

//     error.name = 'Server error';
//     error.message = 'Something went wrong on the server';
//     error.status = 500;

//     return error;
//   }

//   function NotFoundError(status) {
//     var error = Error.call(this);

//     error.name = 'Not found';
//     error.message = 'Not found';
//     error.status = status;

//     return error;
//   }

//   function ServerError() {
//     var error = Error.call(this);

//     error.name = 'Server error';
//     error.message = 'Something went wrong on the server';
//     error.status = 500;

//     return error;
//   }

//   function ContentTypeError(status) {
//     var error = Error.call(this);

//     error.name = 'Content-Type error';
//     error.message = 'Content-Type was not provided or is of wrong type';
//     error.status = status;

//     return error;
//   }

//   function JsonParseError(status) {
//     var error = Error.call(this);

//     error.name = 'JSON parse error';
//     error.message = 'JSON syntax error';
//     error.status = status;

//     return error;
//   }

//   function ThrottledError(status, name, message, retryAfter) {
//     var error = Error.call(this);

//     error.name = name;
//     error.message = message;
//     error.status = status;
//     error.retryAfter = retryAfter;

//     return error;
//   }

//   function InvalidParameterError(status, name, message) {
//     var error = Error.call(this);

//     error.name = name;
//     error.message = message;
//     error.status = status;

//     return error;
//   }

//   function ExpectationFailedError(status, name, message) {
//     var error = Error.call(this);

//     error.name = name;
//     error.message = message;
//     error.status = status;

//     return error;
//   }

//   function request(configParams, query, onSuccess, onError) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function() {
//       if (xhr.readyState !== XMLHttpRequest.DONE) {
//         return;
//       }

//       var contentType = xhr.getResponseHeader('Content-Type');

//       if (xhr.status >= 500) {
//         onError(new ServerError());

//         return;
//       }

//       if (xhr.status === 404) {
//         onError(new NotFoundError(xhr.status));

//         return;
//       }

//       if (
//         typeof contentType !== 'string' ||
//         contentType.toLowerCase().match('application/json') === null
//       ) {
//         onError(new ContentTypeError(xhr.status));

//         return;
//       }

//       if (xhr.status === 417) {
//         try {
//           var invalidParameterJson = JSON.parse(xhr.responseText);

//           onError(
//             new InvalidParameterError(
//               xhr.status,
//               invalidParameterJson.message,
//               invalidParameterJson.description
//             )
//           );
//         } catch (error) {
//           onError(new JsonParseError(xhr.status));
//         }

//         return;
//       }

//       if (xhr.status === 422) {
//         try {
//           var expectationFailedJson = JSON.parse(xhr.responseText);

//           onError(
//             new ExpectationFailedError(
//               xhr.status,
//               expectationFailedJson.message,
//               expectationFailedJson.description
//             )
//           );
//         } catch (error) {
//           onError(new JsonParseError(xhr.status));
//         }

//         return;
//       }

//       if (xhr.status === 429) {
//         try {
//           var throttledJson = JSON.parse(xhr.responseText);

//           onError(
//             new ThrottledError(
//               xhr.status,
//               throttledJson.message,
//               throttledJson.description,
//               xhr.getResponseHeader('Retry-After')
//             )
//           );
//         } catch (error) {
//           onError(new JsonParseError(xhr.status));
//         }

//         return;
//       }

//       if (xhr.status === 200) {
//         try {
//           var res = JSON.parse(xhr.responseText);
//           res.query = query;
//           onSuccess(res);
//         } catch (error) {
//           onError(new JsonParseError(xhr.status));
//         }

//         return;
//       }

//       try {
//         var genericErrorJson = JSON.parse(xhr.responseText);
//         onError(
//           new GenericError(
//             xhr.status,
//             genericErrorJson.message,
//             genericErrorJson.description
//           )
//         );
//       } catch (error) {
//         onError(new JsonParseError(xhr.status));
//       }

//       return;
//     };

//     xhr.open(
//       'get',
//       '/search/suggest.json?q=' + encodeURIComponent(query) + '&' + configParams
//     );

//     xhr.setRequestHeader('Content-Type', 'application/json');

//     xhr.send();
//   }

//   function Cache(config) {
//     this._store = {};
//     this._keys = [];
//     if (config && config.bucketSize) {
//       this.bucketSize = config.bucketSize;
//     } else {
//       this.bucketSize = 20;
//     }
//   }

//   Cache.prototype.set = function(key, value) {
//     if (this.count() >= this.bucketSize) {
//       var deleteKey = this._keys.splice(0, 1);
//       this.delete(deleteKey);
//     }

//     this._keys.push(key);
//     this._store[key] = value;

//     return this._store;
//   };

//   Cache.prototype.get = function(key) {
//     return this._store[key];
//   };

//   Cache.prototype.has = function(key) {
//     return Boolean(this._store[key]);
//   };

//   Cache.prototype.count = function() {
//     return Object.keys(this._store).length;
//   };

//   Cache.prototype.delete = function(key) {
//     var exists = Boolean(this._store[key]);
//     delete this._store[key];
//     return exists && !this._store[key];
//   };

//   function Dispatcher() {
//     this.events = {};
//   }

//   Dispatcher.prototype.on = function(eventName, callback) {
//     var event = this.events[eventName];
//     if (!event) {
//       event = new DispatcherEvent(eventName);
//       this.events[eventName] = event;
//     }
//     event.registerCallback(callback);
//   };

//   Dispatcher.prototype.off = function(eventName, callback) {
//     var event = this.events[eventName];
//     if (event && event.callbacks.indexOf(callback) > -1) {
//       event.unregisterCallback(callback);
//       if (event.callbacks.length === 0) {
//         delete this.events[eventName];
//       }
//     }
//   };

//   Dispatcher.prototype.dispatch = function(eventName, payload) {
//     var event = this.events[eventName];
//     if (event) {
//       event.fire(payload);
//     }
//   };

//   function DispatcherEvent(eventName) {
//     this.eventName = eventName;
//     this.callbacks = [];
//   }

//   DispatcherEvent.prototype.registerCallback = function(callback) {
//     this.callbacks.push(callback);
//   };

//   DispatcherEvent.prototype.unregisterCallback = function(callback) {
//     var index = this.callbacks.indexOf(callback);
//     if (index > -1) {
//       this.callbacks.splice(index, 1);
//     }
//   };

//   DispatcherEvent.prototype.fire = function(payload) {
//     var callbacks = this.callbacks.slice(0);
//     callbacks.forEach(function(callback) {
//       callback(payload);
//     });
//   };

//   function debounce(func, wait) {
//     var timeout = null;
//     return function() {
//       var context = this;
//       var args = arguments;
//       clearTimeout(timeout);
//       timeout = setTimeout(function() {
//         timeout = null;
//         func.apply(context, args);
//       }, wait || 0);
//     };
//   }

//   function objectToQueryParams(obj, parentKey) {
//     var output = '';
//     parentKey = parentKey || null;

//     Object.keys(obj).forEach(function(key) {
//       var outputKey = key + '=';
//       if (parentKey) {
//         outputKey = parentKey + '[' + key + ']';
//       }

//       switch (trueTypeOf(obj[key])) {
//         case 'object':
//           output += objectToQueryParams(obj[key], parentKey ? outputKey : key);
//           break;
//         case 'array':
//           output += outputKey + '=' + obj[key].join(',') + '&';
//           break;
//         default:
//           if (parentKey) {
//             outputKey += '=';
//           }
//           output += outputKey + encodeURIComponent(obj[key]) + '&';
//           break;
//       }
//     });

//     return output;
//   }

//   function trueTypeOf(obj) {
//     return Object.prototype.toString
//       .call(obj)
//       .slice(8, -1)
//       .toLowerCase();
//   }

//   var DEBOUNCE_RATE = 10;
//   var requestDebounced = debounce(request, DEBOUNCE_RATE);

//   function PredictiveSearch(config) {
//     if (!config) {
//       throw new TypeError('No config object was specified');
//     }

//     this._retryAfter = null;
//     this._currentQuery = null;

//     this.dispatcher = new Dispatcher();
//     this.cache = new Cache({ bucketSize: 40 });
//     this.configParams = objectToQueryParams(config);
//   }

//   PredictiveSearch.TYPES = {
//     PRODUCT: 'product',
//     PAGE: 'page',
//     ARTICLE: 'article'
//   };

//   PredictiveSearch.FIELDS = {
//     AUTHOR: 'author',
//     BODY: 'body',
//     PRODUCT_TYPE: 'product_type',
//     TAG: 'tag',
//     TITLE: 'title',
//     VARIANTS_BARCODE: 'variants.barcode',
//     VARIANTS_SKU: 'variants.sku',
//     VARIANTS_TITLE: 'variants.title',
//     VENDOR: 'vendor'
//   };

//   PredictiveSearch.UNAVAILABLE_PRODUCTS = {
//     SHOW: 'show',
//     HIDE: 'hide',
//     LAST: 'last'
//   };

//   PredictiveSearch.prototype.query = function query(query) {
//     try {
//       validateQuery(query);
//     } catch (error) {
//       this.dispatcher.dispatch('error', error);
//       return;
//     }

//     if (query === '') {
//       return this;
//     }

//     this._currentQuery = normalizeQuery(query);
//     var cacheResult = this.cache.get(this._currentQuery);
//     if (cacheResult) {
//       this.dispatcher.dispatch('success', cacheResult);
//       return this;
//     }

//     requestDebounced(
//       this.configParams,
//       query,
//       function(result) {
//         this.cache.set(normalizeQuery(result.query), result);
//         if (normalizeQuery(result.query) === this._currentQuery) {
//           this._retryAfter = null;
//           this.dispatcher.dispatch('success', result);
//         }
//       }.bind(this),
//       function(error) {
//         if (error.retryAfter) {
//           this._retryAfter = error.retryAfter;
//         }
//         this.dispatcher.dispatch('error', error);
//       }.bind(this)
//     );

//     return this;
//   };

//   PredictiveSearch.prototype.on = function on(eventName, callback) {
//     this.dispatcher.on(eventName, callback);

//     return this;
//   };

//   PredictiveSearch.prototype.off = function on(eventName, callback) {
//     this.dispatcher.off(eventName, callback);

//     return this;
//   };

//   function normalizeQuery(query) {
//     if (typeof query !== 'string') {
//       return null;
//     }

//     return query
//       .trim()
//       .replace(' ', '-')
//       .toLowerCase();
//   }

//   return PredictiveSearch;
// })();

// this.Shopify = this.Shopify || {};
// this.Shopify.theme = this.Shopify.theme || {};
// this.Shopify.theme.PredictiveSearchComponent = (function(PredictiveSearch) {
//   'use strict';

//   PredictiveSearch =
//     PredictiveSearch && PredictiveSearch.hasOwnProperty('default')
//       ? PredictiveSearch['default']
//       : PredictiveSearch;

//   var DEFAULT_PREDICTIVE_SEARCH_API_CONFIG = {
//     resources: {
//       type: [PredictiveSearch.TYPES.PRODUCT],
//       options: {
//         unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.LAST,
//         fields: [
//           PredictiveSearch.FIELDS.TITLE,
//           PredictiveSearch.FIELDS.VENDOR,
//           PredictiveSearch.FIELDS.PRODUCT_TYPE,
//           PredictiveSearch.FIELDS.VARIANTS_TITLE
//         ]
//       }
//     }
//   };

//   function PredictiveSearchComponent(config) {
//     // validate config
//     if (
//       !config ||
//       !config.selectors ||
//       !config.selectors.input ||
//       !isString(config.selectors.input) ||
//       !config.selectors.result ||
//       !isString(config.selectors.result) ||
//       !config.resultTemplateFct ||
//       !isFunction(config.resultTemplateFct) ||
//       !config.numberOfResultsTemplateFct ||
//       !isFunction(config.numberOfResultsTemplateFct) ||
//       !config.loadingResultsMessageTemplateFct ||
//       !isFunction(config.loadingResultsMessageTemplateFct)
//     ) {
//       var error = new TypeError(
//         'PredictiveSearchComponent config is not valid'
//       );
//       error.type = 'argument';
//       throw error;
//     }

//     // Find nodes
//     this.nodes = findNodes(config.selectors);

//     // Validate nodes
//     if (!isValidNodes(this.nodes)) {
//       // eslint-disable-next-line no-console
//       console.warn('Could not find valid nodes');
//       return;
//     }

//     // Store the keyword that was used for the search
//     this._searchKeyword = '';

//     // Assign result template
//     this.resultTemplateFct = config.resultTemplateFct;

//     // Assign number of results template
//     this.numberOfResultsTemplateFct = config.numberOfResultsTemplateFct;

//     // Assign loading state template function
//     this.loadingResultsMessageTemplateFct =
//       config.loadingResultsMessageTemplateFct;

//     // Assign number of search results
//     this.numberOfResults = config.numberOfResults || 4;

//     // Set classes
//     this.classes = {
//       visibleVariant: config.visibleVariant
//         ? config.visibleVariant
//         : 'predictive-search-wrapper--visible',
//       itemSelected: config.itemSelectedClass
//         ? config.itemSelectedClass
//         : 'predictive-search-item--selected',
//       clearButtonVisible: config.clearButtonVisibleClass
//         ? config.clearButtonVisibleClass
//         : 'predictive-search__clear-button--visible'
//     };

//     this.selectors = {
//       searchResult: config.searchResult
//         ? config.searchResult
//         : '[data-search-result]'
//     };

//     // Assign callbacks
//     this.callbacks = assignCallbacks(config);

//     // Add input attributes
//     addInputAttributes(this.nodes.input);

//     // Add input event listeners
//     this._addInputEventListeners();

//     // Add body listener
//     this._addBodyEventListener();

//     // Add accessibility announcer
//     this._addAccessibilityAnnouncer();

//     // Display the reset button if the input is not empty
//     this._toggleClearButtonVisibility();

//     // Instantiate Predictive Search API
//     this.predictiveSearch = new PredictiveSearch(
//       config.PredictiveSearchAPIConfig
//         ? config.PredictiveSearchAPIConfig
//         : DEFAULT_PREDICTIVE_SEARCH_API_CONFIG
//     );

//     // Add predictive search success event listener
//     this.predictiveSearch.on(
//       'success',
//       this._handlePredictiveSearchSuccess.bind(this)
//     );

//     // Add predictive search error event listener
//     this.predictiveSearch.on(
//       'error',
//       this._handlePredictiveSearchError.bind(this)
//     );
//   }

//   /**
//    * Private methods
//    */
//   function findNodes(selectors) {
//     return {
//       input: document.querySelector(selectors.input),
//       reset: document.querySelector(selectors.reset),
//       result: document.querySelector(selectors.result)
//     };
//   }

//   function isValidNodes(nodes) {
//     if (
//       !nodes ||
//       !nodes.input ||
//       !nodes.result ||
//       nodes.input.tagName !== 'INPUT'
//     ) {
//       return false;
//     }

//     return true;
//   }

//   function assignCallbacks(config) {
//     return {
//       onBodyMousedown: config.onBodyMousedown,
//       onBeforeOpen: config.onBeforeOpen,
//       onOpen: config.onOpen,
//       onBeforeClose: config.onBeforeClose,
//       onClose: config.onClose,
//       onInputFocus: config.onInputFocus,
//       onInputKeyup: config.onInputKeyup,
//       onInputBlur: config.onInputBlur,
//       onInputReset: config.onInputReset,
//       onBeforeDestroy: config.onBeforeDestroy,
//       onDestroy: config.onDestroy
//     };
//   }

//   function addInputAttributes(input) {
//     input.setAttribute('autocorrect', 'off');
//     input.setAttribute('autocomplete', 'off');
//     input.setAttribute('autocapitalize', 'off');
//     input.setAttribute('spellcheck', 'false');
//   }

//   function removeInputAttributes(input) {
//     input.removeAttribute('autocorrect', 'off');
//     input.removeAttribute('autocomplete', 'off');
//     input.removeAttribute('autocapitalize', 'off');
//     input.removeAttribute('spellcheck', 'false');
//   }

//   /**
//    * Public variables
//    */
//   PredictiveSearchComponent.prototype.isResultVisible = false;
//   PredictiveSearchComponent.prototype.results = {};

//   /**
//    * "Private" variables
//    */
//   PredictiveSearchComponent.prototype._latencyTimer = null;
//   PredictiveSearchComponent.prototype._resultNodeClicked = false;

//   /**
//    * "Private" instance methods
//    */
//   PredictiveSearchComponent.prototype._addInputEventListeners = function() {
//     var input = this.nodes.input;
//     var reset = this.nodes.reset;

//     if (!input) {
//       return;
//     }

//     this._handleInputFocus = this._handleInputFocus.bind(this);
//     this._handleInputBlur = this._handleInputBlur.bind(this);
//     this._handleInputKeyup = this._handleInputKeyup.bind(this);
//     this._handleInputKeydown = this._handleInputKeydown.bind(this);

//     input.addEventListener('focus', this._handleInputFocus);
//     input.addEventListener('blur', this._handleInputBlur);
//     input.addEventListener('keyup', this._handleInputKeyup);
//     input.addEventListener('keydown', this._handleInputKeydown);

//     if (reset) {
//       this._handleInputReset = this._handleInputReset.bind(this);
//       reset.addEventListener('click', this._handleInputReset);
//     }
//   };

//   PredictiveSearchComponent.prototype._removeInputEventListeners = function() {
//     var input = this.nodes.input;

//     input.removeEventListener('focus', this._handleInputFocus);
//     input.removeEventListener('blur', this._handleInputBlur);
//     input.removeEventListener('keyup', this._handleInputKeyup);
//     input.removeEventListener('keydown', this._handleInputKeydown);
//   };

//   PredictiveSearchComponent.prototype._addBodyEventListener = function() {
//     this._handleBodyMousedown = this._handleBodyMousedown.bind(this);

//     document
//       .querySelector('body')
//       .addEventListener('mousedown', this._handleBodyMousedown);
//   };

//   PredictiveSearchComponent.prototype._removeBodyEventListener = function() {
//     document
//       .querySelector('body')
//       .removeEventListener('mousedown', this._handleBodyMousedown);
//   };

//   PredictiveSearchComponent.prototype._removeClearButtonEventListener = function() {
//     var reset = this.nodes.reset;

//     if (!reset) {
//       return;
//     }

//     reset.removeEventListener('click', this._handleInputReset);
//   };

//   /**
//    * Event handlers
//    */
//   PredictiveSearchComponent.prototype._handleBodyMousedown = function(evt) {
//     if (this.isResultVisible && this.nodes !== null) {
//       if (
//         evt.target.isEqualNode(this.nodes.input) ||
//         this.nodes.input.contains(evt.target) ||
//         evt.target.isEqualNode(this.nodes.result) ||
//         this.nodes.result.contains(evt.target)
//       ) {
//         this._resultNodeClicked = true;
//       } else {
//         if (isFunction(this.callbacks.onBodyMousedown)) {
//           var returnedValue = this.callbacks.onBodyMousedown(this.nodes);
//           if (isBoolean(returnedValue) && returnedValue) {
//             this.close();
//           }
//         } else {
//           this.close();
//         }
//       }
//     }
//   };

//   PredictiveSearchComponent.prototype._handleInputFocus = function(evt) {
//     if (isFunction(this.callbacks.onInputFocus)) {
//       var returnedValue = this.callbacks.onInputFocus(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     if (evt.target.value.length > 0) {
//       this._search();
//     }

//     return true;
//   };

//   PredictiveSearchComponent.prototype._handleInputBlur = function() {
//     // This has to be done async, to wait for the focus to be on the next
//     // element and avoid closing the results.
//     // Example: Going from the input to the reset button.
//     setTimeout(
//       function() {
//         if (isFunction(this.callbacks.onInputBlur)) {
//           var returnedValue = this.callbacks.onInputBlur(this.nodes);
//           if (isBoolean(returnedValue) && !returnedValue) {
//             return false;
//           }
//         }

//         if (document.activeElement.isEqualNode(this.nodes.reset)) {
//           return false;
//         }

//         if (this._resultNodeClicked) {
//           this._resultNodeClicked = false;
//           return false;
//         }

//         this.close();
//       }.bind(this)
//     );

//     return true;
//   };

//   PredictiveSearchComponent.prototype._addAccessibilityAnnouncer = function() {
//     this._accessibilityAnnouncerDiv = window.document.createElement('div');

//     this._accessibilityAnnouncerDiv.setAttribute(
//       'style',
//       'position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;'
//     );

//     this._accessibilityAnnouncerDiv.setAttribute('data-search-announcer', '');
//     this._accessibilityAnnouncerDiv.setAttribute('aria-live', 'polite');
//     this._accessibilityAnnouncerDiv.setAttribute('aria-atomic', 'true');

//     this.nodes.result.parentElement.appendChild(
//       this._accessibilityAnnouncerDiv
//     );
//   };

//   PredictiveSearchComponent.prototype._removeAccessibilityAnnouncer = function() {
//     this.nodes.result.parentElement.removeChild(
//       this._accessibilityAnnouncerDiv
//     );
//   };

//   PredictiveSearchComponent.prototype._updateAccessibilityAttributesAfterSelectingElement = function(
//     previousSelectedElement,
//     currentSelectedElement
//   ) {
//     // Update the active descendant on the search input
//     this.nodes.input.setAttribute(
//       'aria-activedescendant',
//       currentSelectedElement.id
//     );

//     // Unmark the previousSelected elemented as selected
//     if (previousSelectedElement) {
//       previousSelectedElement.removeAttribute('aria-selected');
//     }

//     // Mark the element as selected
//     currentSelectedElement.setAttribute('aria-selected', true);
//   };

//   PredictiveSearchComponent.prototype._clearAriaActiveDescendant = function() {
//     this.nodes.input.setAttribute('aria-activedescendant', '');
//   };

//   PredictiveSearchComponent.prototype._announceNumberOfResultsFound = function(
//     results
//   ) {
//     var currentAnnouncedMessage = this._accessibilityAnnouncerDiv.innerHTML;
//     var newMessage = this.numberOfResultsTemplateFct(results);

//     // If the messages are the same, they won't get announced
//     // add white space so it gets announced
//     if (currentAnnouncedMessage === newMessage) {
//       newMessage = newMessage + '&nbsp;';
//     }

//     this._accessibilityAnnouncerDiv.innerHTML = newMessage;
//   };

//   PredictiveSearchComponent.prototype._announceLoadingState = function() {
//     this._accessibilityAnnouncerDiv.innerHTML = this.loadingResultsMessageTemplateFct();
//   };

//   PredictiveSearchComponent.prototype._handleInputKeyup = function(evt) {
//     var UP_ARROW_KEY_CODE = 38;
//     var DOWN_ARROW_KEY_CODE = 40;
//     var RETURN_KEY_CODE = 13;
//     var ESCAPE_KEY_CODE = 27;

//     if (isFunction(this.callbacks.onInputKeyup)) {
//       var returnedValue = this.callbacks.onInputKeyup(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     this._toggleClearButtonVisibility();

//     if (this.isResultVisible && this.nodes !== null) {
//       if (evt.keyCode === UP_ARROW_KEY_CODE) {
//         this._navigateOption(evt, 'UP');
//         return true;
//       }

//       if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
//         this._navigateOption(evt, 'DOWN');
//         return true;
//       }

//       if (evt.keyCode === RETURN_KEY_CODE) {
//         this._selectOption();
//         return true;
//       }

//       if (evt.keyCode === ESCAPE_KEY_CODE) {
//         this.close();
//       }
//     }

//     if (evt.target.value.length <= 0) {
//       this.close();
//       this._setKeyword('');
//     } else if (evt.target.value.length > 0) {
//       this._search();
//     }

//     return true;
//   };

//   PredictiveSearchComponent.prototype._handleInputKeydown = function(evt) {
//     var RETURN_KEY_CODE = 13;
//     var UP_ARROW_KEY_CODE = 38;
//     var DOWN_ARROW_KEY_CODE = 40;

//     // Prevent the form default submission if there is a selected option
//     if (evt.keyCode === RETURN_KEY_CODE && this._getSelectedOption() !== null) {
//       evt.preventDefault();
//     }

//     // Prevent the cursor from moving in the input when using the up and down arrow keys
//     if (
//       evt.keyCode === UP_ARROW_KEY_CODE ||
//       evt.keyCode === DOWN_ARROW_KEY_CODE
//     ) {
//       evt.preventDefault();
//     }
//   };

//   PredictiveSearchComponent.prototype._handleInputReset = function(evt) {
//     evt.preventDefault();

//     if (isFunction(this.callbacks.onInputReset)) {
//       var returnedValue = this.callbacks.onInputReset(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     this.nodes.input.value = '';
//     this.nodes.input.focus();
//     this._toggleClearButtonVisibility();
//     this.close();

//     return true;
//   };

//   PredictiveSearchComponent.prototype._navigateOption = function(
//     evt,
//     direction
//   ) {
//     var currentOption = this._getSelectedOption();

//     if (!currentOption) {
//       var firstOption = this.nodes.result.querySelector(
//         this.selectors.searchResult
//       );
//       firstOption.classList.add(this.classes.itemSelected);
//       this._updateAccessibilityAttributesAfterSelectingElement(
//         null,
//         firstOption
//       );
//     } else {
//       if (direction === 'DOWN') {
//         var nextOption = currentOption.nextElementSibling;
//         if (nextOption) {
//           currentOption.classList.remove(this.classes.itemSelected);
//           nextOption.classList.add(this.classes.itemSelected);
//           this._updateAccessibilityAttributesAfterSelectingElement(
//             currentOption,
//             nextOption
//           );
//         }
//       } else {
//         var previousOption = currentOption.previousElementSibling;
//         if (previousOption) {
//           currentOption.classList.remove(this.classes.itemSelected);
//           previousOption.classList.add(this.classes.itemSelected);
//           this._updateAccessibilityAttributesAfterSelectingElement(
//             currentOption,
//             previousOption
//           );
//         }
//       }
//     }
//   };

//   PredictiveSearchComponent.prototype._getSelectedOption = function() {
//     return this.nodes.result.querySelector('.' + this.classes.itemSelected);
//   };

//   PredictiveSearchComponent.prototype._selectOption = function() {
//     var selectedOption = this._getSelectedOption();

//     if (selectedOption) {
//       selectedOption.querySelector('a, button').click();
//     }
//   };

//   PredictiveSearchComponent.prototype._search = function() {
//     var newSearchKeyword = this.nodes.input.value;

//     if (this._searchKeyword === newSearchKeyword) {
//       return;
//     }

//     clearTimeout(this._latencyTimer);
//     this._latencyTimer = setTimeout(
//       function() {
//         this.results.isLoading = true;

//         // Annonuce that we're loading the results
//         this._announceLoadingState();

//         this.nodes.result.classList.add(this.classes.visibleVariant);
//         // NOTE: We could benifit in using DOMPurify.
//         // https://github.com/cure53/DOMPurify
//         this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
//       }.bind(this),
//       500
//     );

//     this.predictiveSearch.query(newSearchKeyword);
//     this._setKeyword(newSearchKeyword);
//   };

//   PredictiveSearchComponent.prototype._handlePredictiveSearchSuccess = function(
//     json
//   ) {
//     clearTimeout(this._latencyTimer);
//     this.results = json.resources.results;

//     this.results.isLoading = false;
//     this.results.products = this.results.products.slice(
//       0,
//       this.numberOfResults
//     );
//     this.results.canLoadMore =
//       this.numberOfResults <= this.results.products.length;
//     this.results.searchQuery = this.nodes.input.value;

//     if (this.results.products.length > 0 || this.results.searchQuery) {
//       this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
//       this._announceNumberOfResultsFound(this.results);
//       this.open();
//     } else {
//       this.nodes.result.innerHTML = '';

//       this._closeOnNoResults();
//     }
//   };

//   PredictiveSearchComponent.prototype._handlePredictiveSearchError = function() {
//     clearTimeout(this._latencyTimer);
//     this.nodes.result.innerHTML = '';

//     this._closeOnNoResults();
//   };

//   PredictiveSearchComponent.prototype._closeOnNoResults = function() {
//     if (this.nodes) {
//       this.nodes.result.classList.remove(this.classes.visibleVariant);
//     }

//     this.isResultVisible = false;
//   };

//   PredictiveSearchComponent.prototype._setKeyword = function(keyword) {
//     this._searchKeyword = keyword;
//   };

//   PredictiveSearchComponent.prototype._toggleClearButtonVisibility = function() {
//     if (!this.nodes.reset) {
//       return;
//     }

//     if (this.nodes.input.value.length > 0) {
//       this.nodes.reset.classList.add(this.classes.clearButtonVisible);
//     } else {
//       this.nodes.reset.classList.remove(this.classes.clearButtonVisible);
//     }
//   };

//   /**
//    * Public methods
//    */
//   PredictiveSearchComponent.prototype.open = function() {
//     if (this.isResultVisible) {
//       return;
//     }

//     if (isFunction(this.callbacks.onBeforeOpen)) {
//       var returnedValue = this.callbacks.onBeforeOpen(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     this.nodes.result.classList.add(this.classes.visibleVariant);
//     this.nodes.input.setAttribute('aria-expanded', true);
//     this.isResultVisible = true;

//     if (isFunction(this.callbacks.onOpen)) {
//       return this.callbacks.onOpen(this.nodes) || true;
//     }

//     return true;
//   };

//   PredictiveSearchComponent.prototype.close = function() {
//     if (!this.isResultVisible) {
//       return true;
//     }

//     if (isFunction(this.callbacks.onBeforeClose)) {
//       var returnedValue = this.callbacks.onBeforeClose(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     if (this.nodes) {
//       this.nodes.result.classList.remove(this.classes.visibleVariant);
//     }

//     this.nodes.input.setAttribute('aria-expanded', false);
//     this._clearAriaActiveDescendant();
//     this._setKeyword('');

//     if (isFunction(this.callbacks.onClose)) {
//       this.callbacks.onClose(this.nodes);
//     }

//     this.isResultVisible = false;
//     this.results = {};

//     return true;
//   };

//   PredictiveSearchComponent.prototype.destroy = function() {
//     this.close();

//     if (isFunction(this.callbacks.onBeforeDestroy)) {
//       var returnedValue = this.callbacks.onBeforeDestroy(this.nodes);
//       if (isBoolean(returnedValue) && !returnedValue) {
//         return false;
//       }
//     }

//     this.nodes.result.classList.remove(this.classes.visibleVariant);
//     removeInputAttributes(this.nodes.input);
//     this._removeInputEventListeners();
//     this._removeBodyEventListener();
//     this._removeAccessibilityAnnouncer();
//     this._removeClearButtonEventListener();

//     if (isFunction(this.callbacks.onDestroy)) {
//       this.callbacks.onDestroy(this.nodes);
//     }

//     return true;
//   };

//   PredictiveSearchComponent.prototype.clearAndClose = function() {
//     this.nodes.input.value = '';
//     this.close();
//   };

//   /**
//    * Utilities
//    */
//   function getTypeOf(value) {
//     return Object.prototype.toString.call(value);
//   }

//   function isString(value) {
//     return getTypeOf(value) === '[object String]';
//   }

//   function isBoolean(value) {
//     return getTypeOf(value) === '[object Boolean]';
//   }

//   function isFunction(value) {
//     return getTypeOf(value) === '[object Function]';
//   }

//   return PredictiveSearchComponent;
// })(Shopify.theme.PredictiveSearch);


// /* ================ GLOBAL ================ */
// /*============================================================================
//   Drawer modules
// ==============================================================================*/
// theme.Drawers = (function() {
//   function Drawer(id, position, options) {
//     var DEFAULT_OPEN_CLASS = 'js-drawer-open';
//     var DEFAULT_CLOSE_CLASS = 'js-drawer-close';

//     var defaults = {
//       selectors: {
//         openVariant: '.' + DEFAULT_OPEN_CLASS + '-' + position,
//         close: '.' + DEFAULT_CLOSE_CLASS
//       },
//       classes: {
//         open: DEFAULT_OPEN_CLASS,
//         openVariant: DEFAULT_OPEN_CLASS + '-' + position
//       },
//       withPredictiveSearch: false
//     };

//     this.nodes = {
//       $parent: $('html').add('body'),
//       $page: $('#PageContainer')
//     };

//     this.config = $.extend(defaults, options);
//     this.position = position;
//     this.$drawer = $('#' + id);

//     if (!this.$drawer.length) {
//       return false;
//     }

//     this.drawerIsOpen = false;
//     this.init();
//   }

//   Drawer.prototype.init = function() {
//     $(this.config.selectors.openVariant).on('click', $.proxy(this.open, this));
//     this.$drawer.on(
//       'click',
//       this.config.selectors.close,
//       $.proxy(this.close, this)
//     );
//   };

//   Drawer.prototype.open = function(evt) {
//     // Keep track if drawer was opened from a click, or called by another function
//     var externalCall = false;

//     // Prevent following href if link is clicked
//     if (evt) {
//       evt.preventDefault();
//     } else {
//       externalCall = true;
//     }

//     // Without this, the drawer opens, the click event bubbles up to nodes.$page
//     // which closes the drawer.
//     if (evt && evt.stopPropagation) {
//       evt.stopPropagation();
//       // save the source of the click, we'll focus to this on close
//       this.$activeSource = $(evt.currentTarget);
//     }

//     if (this.drawerIsOpen && !externalCall) {
//       return this.close();
//     }

//     // Add is-transitioning class to moved elements on open so drawer can have
//     // transition for close animation
//     if (!this.config.withPredictiveSearch) {
//       this.$drawer.prepareTransition();
//     }

//     this.nodes.$parent.addClass(
//       this.config.classes.open + ' ' + this.config.classes.openVariant
//     );
//     this.drawerIsOpen = true;

//     // Run function when draw opens if set
//     if (
//       this.config.onDrawerOpen &&
//       typeof this.config.onDrawerOpen === 'function'
//     ) {
//       if (!externalCall) {
//         this.config.onDrawerOpen();
//       }
//     }

//     if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
//       this.$activeSource.attr('aria-expanded', 'true');
//     }

//     // Set focus on drawer
//     var trapFocusConfig = {
//       $container: this.$drawer,
//       namespace: 'drawer_focus'
//     };
//     if (this.config.$elementToFocusOnOpen) {
//       trapFocusConfig.$elementToFocus = this.config.$elementToFocusOnOpen;
//     }

//     slate.a11y.trapFocus(trapFocusConfig);

//     this.bindEvents();

//     return this;
//   };

//   Drawer.prototype.close = function() {
//     if (!this.drawerIsOpen) {
//       // don't close a closed drawer
//       return;
//     }

//     // deselect any focused form elements
//     $(document.activeElement).trigger('blur');

//     // Ensure closing transition is applied to moved elements, like the nav
//     if (!this.config.withPredictiveSearch) {
//       this.$drawer.prepareTransition();
//     }

//     this.nodes.$parent.removeClass(
//       this.config.classes.open + ' ' + this.config.classes.openVariant
//     );

//     if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
//       this.$activeSource.attr('aria-expanded', 'false');
//     }

//     this.drawerIsOpen = false;

//     // Remove focus on drawer
//     slate.a11y.removeTrapFocus({
//       $container: this.$drawer,
//       namespace: 'drawer_focus'
//     });

//     this.unbindEvents();

//     // Run function when draw closes if set
//     if (
//       this.config.onDrawerClose &&
//       typeof this.config.onDrawerClose === 'function'
//     ) {
//       this.config.onDrawerClose();
//     }
//   };

//   Drawer.prototype.bindEvents = function() {
//     this.nodes.$parent.on(
//       'keyup.drawer',
//       $.proxy(function(evt) {
//         // close on 'esc' keypress
//         if (evt.keyCode === 27) {
//           this.close();
//           return false;
//         } else {
//           return true;
//         }
//       }, this)
//     );

//     // Lock scrolling on mobile
//     this.nodes.$page.on('touchmove.drawer', function() {
//       return false;
//     });

//     this.nodes.$page.on(
//       'click.drawer',
//       $.proxy(function() {
//         this.close();
//         return false;
//       }, this)
//     );
//   };

//   Drawer.prototype.unbindEvents = function() {
//     this.nodes.$page.off('.drawer');
//     this.nodes.$parent.off('.drawer');
//   };

//   return Drawer;
// })();

// theme.Helpers = (function() {
//   var touchDevice = false;

//   function setTouch() {
//     touchDevice = true;
//   }

//   function isTouch() {
//     return touchDevice;
//   }
//   return {
//     setTouch: setTouch,
//     isTouch: isTouch
//   };
// })();

// theme.LibraryLoader = (function() {
//   var types = {
//     link: 'link',
//     script: 'script'
//   };

//   var status = {
//     requested: 'requested',
//     loaded: 'loaded'
//   };

//   var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

//   var libraries = {
//     youtubeSdk: {
//       tagId: 'youtube-sdk',
//       src: 'https://www.youtube.com/iframe_api',
//       type: types.script
//     },
//     plyrShopifyStyles: {
//       tagId: 'plyr-shopify-styles',
//       src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
//       type: types.link
//     },
//     modelViewerUiStyles: {
//       tagId: 'shopify-model-viewer-ui-styles',
//       src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
//       type: types.link
//     }
//   };

//   function load(libraryName, callback) {
//     var library = libraries[libraryName];

//     if (!library) return;
//     if (library.status === status.requested) return;

//     callback = callback || function() {};
//     if (library.status === status.loaded) {
//       callback();
//       return;
//     }

//     library.status = status.requested;

//     var tag;

//     switch (library.type) {
//       case types.script:
//         tag = createScriptTag(library, callback);
//         break;
//       case types.link:
//         tag = createLinkTag(library, callback);
//         break;
//     }

//     tag.id = library.tagId;
//     library.element = tag;

//     var firstScriptTag = document.getElementsByTagName(library.type)[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//   }

//   function createScriptTag(library, callback) {
//     var tag = document.createElement('script');
//     tag.src = library.src;
//     tag.addEventListener('load', function() {
//       library.status = status.loaded;
//       callback();
//     });
//     return tag;
//   }

//   function createLinkTag(library, callback) {
//     var tag = document.createElement('link');
//     tag.href = library.src;
//     tag.rel = 'stylesheet';
//     tag.type = 'text/css';
//     tag.addEventListener('load', function() {
//       library.status = status.loaded;
//       callback();
//     });
//     return tag;
//   }

//   return {
//     load: load
//   };
// })();


// /* ================ MODULES ================ */
// window.theme = window.theme || {};

// theme.Header = (function() {
//   var selectors = {
//     body: 'body',
//     navigation: '#AccessibleNav',
//     siteNavHasDropdown: '[data-has-dropdowns]',
//     siteNavChildLinks: '.site-nav__child-link',
//     siteNavActiveDropdown: '.site-nav--active-dropdown',
//     siteNavHasCenteredDropdown: '.site-nav--has-centered-dropdown',
//     siteNavCenteredDropdown: '.site-nav__dropdown--centered',
//     siteNavLinkMain: '.site-nav__link--main',
//     siteNavChildLink: '.site-nav__link--last',
//     siteNavDropdown: '.site-nav__dropdown',
//     siteHeader: '.site-header'
//   };

//   var config = {
//     activeClass: 'site-nav--active-dropdown',
//     childLinkClass: 'site-nav__child-link',
//     rightDropdownClass: 'site-nav__dropdown--right',
//     leftDropdownClass: 'site-nav__dropdown--left'
//   };

//   var cache = {};

//   function init() {
//     cacheSelectors();
//     styleDropdowns($(selectors.siteNavHasDropdown));
//     positionFullWidthDropdowns();

//     cache.$parents.on('click.siteNav', function() {
//       var $el = $(this);
//       $el.hasClass(config.activeClass) ? hideDropdown($el) : showDropdown($el);
//     });

//     // check when we're leaving a dropdown and close the active dropdown
//     $(selectors.siteNavChildLink).on('focusout.siteNav', function() {
//       setTimeout(function() {
//         if (
//           $(document.activeElement).hasClass(config.childLinkClass) ||
//           !cache.$activeDropdown.length
//         ) {
//           return;
//         }

//         hideDropdown(cache.$activeDropdown);
//       });
//     });

//     // close dropdowns when on top level nav
//     cache.$topLevel.on('focus.siteNav', function() {
//       if (cache.$activeDropdown.length) {
//         hideDropdown(cache.$activeDropdown);
//       }
//     });

//     cache.$subMenuLinks.on('click.siteNav', function(evt) {
//       // Prevent click on body from firing instead of link
//       evt.stopImmediatePropagation();
//     });

//     $(window).resize(
//       $.debounce(50, function() {
//         styleDropdowns($(selectors.siteNavHasDropdown));
//         positionFullWidthDropdowns();
//       })
//     );
//   }

//   function cacheSelectors() {
//     cache = {
//       $nav: $(selectors.navigation),
//       $topLevel: $(selectors.siteNavLinkMain),
//       $parents: $(selectors.navigation).find(selectors.siteNavHasDropdown),
//       $subMenuLinks: $(selectors.siteNavChildLinks),
//       $activeDropdown: $(selectors.siteNavActiveDropdown),
//       $siteHeader: $(selectors.siteHeader)
//     };
//   }

//   function showDropdown($el) {
//     $el.addClass(config.activeClass);

//     // close open dropdowns
//     if (cache.$activeDropdown.length) {
//       hideDropdown(cache.$activeDropdown);
//     }

//     cache.$activeDropdown = $el;

//     // set expanded on open dropdown
//     $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'true');

//     setTimeout(function() {
//       $(window).on('keyup.siteNav', function(evt) {
//         if (evt.keyCode === 27) {
//           hideDropdown($el);
//         }
//       });

//       $(selectors.body).on('click.siteNav', function() {
//         hideDropdown($el);
//       });
//     }, 250);
//   }

//   function hideDropdown($el) {
//     // remove aria on open dropdown
//     $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'false');
//     $el.removeClass(config.activeClass);

//     // reset active dropdown
//     cache.$activeDropdown = $(selectors.siteNavActiveDropdown);

//     $(selectors.body).off('click.siteNav');
//     $(window).off('keyup.siteNav');
//   }

//   function styleDropdowns($dropdownListItems) {
//     $dropdownListItems.each(function() {
//       var $dropdownLi = $(this).find(selectors.siteNavDropdown);
//       if (!$dropdownLi.length) {
//         return;
//       }
//       var isRightOfLogo =
//         Math.ceil($(this).offset().left) >
//         Math.floor(cache.$siteHeader.outerWidth()) / 2
//           ? true
//           : false;
//       if (isRightOfLogo) {
//         $dropdownLi
//           .removeClass(config.leftDropdownClass)
//           .addClass(config.rightDropdownClass);
//       } else {
//         $dropdownLi
//           .removeClass(config.rightDropdownClass)
//           .addClass(config.leftDropdownClass);
//       }
//     });
//   }

//   function positionFullWidthDropdowns() {
//     var $listWithCenteredDropdown = $(selectors.siteNavHasCenteredDropdown);

//     $listWithCenteredDropdown.each(function() {
//       var $hasCenteredDropdown = $(this);
//       var $fullWidthDropdown = $hasCenteredDropdown.find(
//         selectors.siteNavCenteredDropdown
//       );

//       var fullWidthDropdownOffset = $hasCenteredDropdown.position().top + 41;
//       $fullWidthDropdown.css('top', fullWidthDropdownOffset);
//     });
//   }

//   function unload() {
//     $(window).off('.siteNav');
//     cache.$parents.off('.siteNav');
//     cache.$subMenuLinks.off('.siteNav');
//     cache.$topLevel.off('.siteNav');
//     $(selectors.siteNavChildLink).off('.siteNav');
//     $(selectors.body).off('.siteNav');
//   }

//   return {
//     init: init,
//     unload: unload
//   };
// })();

// window.theme = window.theme || {};

// theme.MobileNav = (function() {
//   var classes = {
//     mobileNavOpenIcon: 'mobile-nav--open',
//     mobileNavCloseIcon: 'mobile-nav--close',
//     navLinkWrapper: 'mobile-nav__item',
//     navLink: 'mobile-nav__link',
//     subNavLink: 'mobile-nav__sublist-link',
//     return: 'mobile-nav__return-btn',
//     subNavActive: 'is-active',
//     subNavClosing: 'is-closing',
//     navOpen: 'js-menu--is-open',
//     subNavShowing: 'sub-nav--is-open',
//     thirdNavShowing: 'third-nav--is-open',
//     subNavToggleBtn: 'js-toggle-submenu'
//   };
//   var cache = {};
//   var isTransitioning;
//   var $activeSubNav;
//   var $activeTrigger;
//   var menuLevel = 1;
//   // Breakpoints from src/stylesheets/global/variables.scss.liquid
//   var mediaQuerySmall = 'screen and (max-width: 749px)';

//   function init() {
//     cacheSelectors();

//     cache.$mobileNavToggle.on('click', toggleMobileNav);
//     cache.$subNavToggleBtn.on('click.subNav', toggleSubNav);

//     // Close mobile nav when unmatching mobile breakpoint
//     enquire.register(mediaQuerySmall, {
//       unmatch: function() {
//         if (cache.$mobileNavContainer.hasClass(classes.navOpen)) {
//           closeMobileNav();
//         }
//       }
//     });
//   }

//   function toggleMobileNav() {
//     if (cache.$mobileNavToggle.hasClass(classes.mobileNavCloseIcon)) {
//       closeMobileNav();
//     } else {
//       openMobileNav();
//     }
//   }

//   function cacheSelectors() {
//     cache = {
//       $pageContainer: $('#PageContainer'),
//       $siteHeader: $('.site-header'),
//       $mobileNavToggle: $('.js-mobile-nav-toggle'),
//       $mobileNavContainer: $('.mobile-nav-wrapper'),
//       $mobileNav: $('#MobileNav'),
//       $sectionHeader: $('#shopify-section-header'),
//       $subNavToggleBtn: $('.' + classes.subNavToggleBtn)
//     };
//   }

//   function openMobileNav() {
//     var translateHeaderHeight = cache.$siteHeader.outerHeight();

//     cache.$mobileNavContainer.prepareTransition().addClass(classes.navOpen);

//     cache.$mobileNavContainer.css({
//       transform: 'translateY(' + translateHeaderHeight + 'px)'
//     });

//     cache.$pageContainer.css({
//       transform:
//         'translate3d(0, ' + cache.$mobileNavContainer[0].scrollHeight + 'px, 0)'
//     });

//     slate.a11y.trapFocus({
//       $container: cache.$sectionHeader,
//       $elementToFocus: cache.$mobileNavToggle,
//       namespace: 'navFocus'
//     });

//     cache.$mobileNavToggle
//       .addClass(classes.mobileNavCloseIcon)
//       .removeClass(classes.mobileNavOpenIcon)
//       .attr('aria-expanded', true);

//     // close on escape
//     $(window).on('keyup.mobileNav', function(evt) {
//       if (evt.which === 27) {
//         closeMobileNav();
//       }
//     });
//   }

//   function closeMobileNav() {
//     cache.$mobileNavContainer.prepareTransition().removeClass(classes.navOpen);

//     cache.$mobileNavContainer.css({
//       transform: 'translateY(-100%)'
//     });

//     cache.$pageContainer.removeAttr('style');

//     slate.a11y.trapFocus({
//       $container: $('html'),
//       $elementToFocus: $('body')
//     });

//     cache.$mobileNavContainer.one(
//       'TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle',
//       function() {
//         slate.a11y.removeTrapFocus({
//           $container: cache.$mobileNav,
//           namespace: 'navFocus'
//         });
//       }
//     );

//     cache.$mobileNavToggle
//       .addClass(classes.mobileNavOpenIcon)
//       .removeClass(classes.mobileNavCloseIcon)
//       .attr('aria-expanded', false)
//       .focus();

//     $(window).off('keyup.mobileNav');

//     scrollTo(0, 0);
//   }

//   function toggleSubNav(evt) {
//     if (isTransitioning) {
//       return;
//     }

//     var $toggleBtn = $(evt.currentTarget);
//     var isReturn = $toggleBtn.hasClass(classes.return);
//     isTransitioning = true;

//     if (isReturn) {
//       // Close all subnavs by removing active class on buttons
//       $(
//         '.' + classes.subNavToggleBtn + '[data-level="' + (menuLevel - 1) + '"]'
//       ).removeClass(classes.subNavActive);

//       if ($activeTrigger && $activeTrigger.length) {
//         $activeTrigger.removeClass(classes.subNavActive);
//       }
//     } else {
//       $toggleBtn.addClass(classes.subNavActive);
//     }

//     $activeTrigger = $toggleBtn;

//     goToSubnav($toggleBtn.data('target'));
//   }

//   function goToSubnav(target) {
//     /*eslint-disable shopify/jquery-dollar-sign-reference */

//     var $targetMenu = target
//       ? $('.mobile-nav__dropdown[data-parent="' + target + '"]')
//       : cache.$mobileNav;

//     menuLevel = $targetMenu.data('level') ? $targetMenu.data('level') : 1;

//     if ($activeSubNav && $activeSubNav.length) {
//       $activeSubNav.prepareTransition().addClass(classes.subNavClosing);
//     }

//     $activeSubNav = $targetMenu;

//     /*eslint-enable shopify/jquery-dollar-sign-reference */

//     var translateMenuHeight = $targetMenu.outerHeight();

//     var openNavClass =
//       menuLevel > 2 ? classes.thirdNavShowing : classes.subNavShowing;

//     cache.$mobileNavContainer
//       .css('height', translateMenuHeight)
//       .removeClass(classes.thirdNavShowing)
//       .addClass(openNavClass);

//     if (!target) {
//       // Show top level nav
//       cache.$mobileNavContainer
//         .removeClass(classes.thirdNavShowing)
//         .removeClass(classes.subNavShowing);
//     }

//     /* if going back to first subnav, focus is on whole header */
//     var $container = menuLevel === 1 ? cache.$sectionHeader : $targetMenu;

//     var $menuTitle = $targetMenu.find('[data-menu-title=' + menuLevel + ']');
//     var $elementToFocus = $menuTitle ? $menuTitle : $targetMenu;

//     // Focusing an item in the subnav early forces element into view and breaks the animation.
//     cache.$mobileNavContainer.one(
//       'TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle',
//       function() {
//         slate.a11y.trapFocus({
//           $container: $container,
//           $elementToFocus: $elementToFocus,
//           namespace: 'subNavFocus'
//         });

//         cache.$mobileNavContainer.off('.subnavToggle');
//         isTransitioning = false;
//       }
//     );

//     // Match height of subnav
//     cache.$pageContainer.css({
//       transform: 'translateY(' + translateMenuHeight + 'px)'
//     });

//     $activeSubNav.removeClass(classes.subNavClosing);
//   }

//   return {
//     init: init,
//     closeMobileNav: closeMobileNav
//   };
// })(jQuery);

// (function() {
//   var selectors = {
//     backButton: '.return-link'
//   };

//   var $backButton = $(selectors.backButton);

//   if (!document.referrer || !$backButton.length || !window.history.length) {
//     return;
//   }

//   $backButton.one('click', function(evt) {
//     evt.preventDefault();

//     var referrerDomain = urlDomain(document.referrer);
//     var shopDomain = urlDomain(window.location.href);

//     if (shopDomain === referrerDomain) {
//       history.back();
//     }

//     return false;
//   });

//   function urlDomain(url) {
//     var anchor = document.createElement('a');
//     anchor.ref = url;

//     return anchor.hostname;
//   }
// })();

// theme.Slideshow = (function() {
//   this.$slideshow = null;
//   var classes = {
//     slideshow: 'slideshow',
//     slickActiveMobile: 'slick-active-mobile',
//     controlsHover: 'slideshow__controls--hover',
//     isPaused: 'is-paused'
//   };

//   var selectors = {
//     section: '.shopify-section',
//     wrapper: '#SlideshowWrapper-',
//     slides: '.slideshow__slide',
//     textWrapperMobile: '.slideshow__text-wrap--mobile',
//     textContentMobile: '.slideshow__text-content--mobile',
//     controls: '.slideshow__controls',
//     pauseButton: '.slideshow__pause',
//     dots: '.slick-dots',
//     arrows: '.slideshow__arrows',
//     arrowsMobile: '.slideshow__arrows--mobile',
//     arrowLeft: '.slideshow__arrow-left',
//     arrowRight: '.slideshow__arrow-right'
//   };

//   function slideshow(el, sectionId) {
//     var $slideshow = (this.$slideshow = $(el));
//     this.adaptHeight = this.$slideshow.data('adapt-height');
//     this.$wrapper = this.$slideshow.closest(selectors.wrapper + sectionId);
//     this.$section = this.$wrapper.closest(selectors.section);
//     this.$controls = this.$wrapper.find(selectors.controls);
//     this.$arrows = this.$section.find(selectors.arrows);
//     this.$arrowsMobile = this.$section.find(selectors.arrowsMobile);
//     this.$pause = this.$controls.find(selectors.pauseButton);
//     this.$textWrapperMobile = this.$section.find(selectors.textWrapperMobile);
//     this.autorotate = this.$slideshow.data('autorotate');
//     var autoplaySpeed = this.$slideshow.data('speed');
//     var loadSlideA11yString = this.$slideshow.data('slide-nav-a11y');

//     this.settings = {
//       accessibility: true,
//       arrows: false,
//       dots: true,
//       fade: true,
//       draggable: true,
//       touchThreshold: 20,
//       autoplay: this.autorotate,
//       autoplaySpeed: autoplaySpeed,
//       // eslint-disable-next-line shopify/jquery-dollar-sign-reference
//       appendDots: this.$arrows,
//       customPaging: function(slick, index) {
//         return (
//           '<a href="' +
//           selectors.wrapper +
//           sectionId +
//           '" aria-label="' +
//           loadSlideA11yString.replace('[slide_number]', index + 1) +
//           '" data-slide-number="' +
//           index +
//           '"></a>'
//         );
//       }
//     };

//     this.$slideshow.on('beforeChange', beforeChange.bind(this));
//     this.$slideshow.on('init', slideshowA11ySetup.bind(this));

//     // Add class to style mobile dots & show the correct text content for the
//     // first slide on mobile when the slideshow initialises
//     this.$slideshow.on(
//       'init',
//       function() {
//         this.$mobileDots
//           .find('li:first-of-type')
//           .addClass(classes.slickActiveMobile);
//         this.showMobileText(0);
//       }.bind(this)
//     );

//     // Stop the autorotate when you scroll past the mobile controls, resume when
//     // they are scrolled back into view
//     if (this.autorotate) {
//       $(document).scroll(
//         $.debounce(
//           250,
//           function() {
//             if (
//               this.$arrowsMobile.offset().top +
//                 this.$arrowsMobile.outerHeight() <
//               window.pageYOffset
//             ) {
//               $slideshow.slick('slickPause');
//             } else if (!this.$pause.hasClass(classes.isPaused)) {
//               $slideshow.slick('slickPlay');
//             }
//           }.bind(this)
//         )
//       );
//     }

//     if (this.adaptHeight) {
//       this.setSlideshowHeight();
//       $(window).resize($.debounce(50, this.setSlideshowHeight.bind(this)));
//     }

//     this.$slideshow.slick(this.settings);

//     // This can't be called when the slick 'init' event fires due to how slick
//     // adds a11y features.
//     slideshowPostInitA11ySetup.bind(this)();

//     this.$arrows.find(selectors.arrowLeft).on('click', function() {
//       $slideshow.slick('slickPrev');
//     });
//     this.$arrows.find(selectors.arrowRight).on('click', function() {
//       $slideshow.slick('slickNext');
//     });

//     this.$pause.on('click', this.togglePause.bind(this));
//   }

//   function slideshowA11ySetup(event, obj) {
//     var $slider = obj.$slider;
//     var $list = obj.$list;
//     this.$dots = this.$section.find(selectors.dots);
//     this.$mobileDots = this.$dots.eq(1);

//     // Remove default Slick aria-live attr until slider is focused
//     $list.removeAttr('aria-live');

//     this.$wrapper.on('keyup', keyboardNavigation.bind(this));
//     this.$controls.on('keyup', keyboardNavigation.bind(this));
//     this.$textWrapperMobile.on('keyup', keyboardNavigation.bind(this));

//     // When an element in the slider is focused
//     // pause slideshow and set aria-live.
//     this.$wrapper
//       .on(
//         'focusin',
//         function(evt) {
//           if (!this.$wrapper.has(evt.target).length) {
//             return;
//           }

//           $list.attr('aria-live', 'polite');
//           if (this.autorotate) {
//             $slider.slick('slickPause');
//           }
//         }.bind(this)
//       )
//       .on(
//         'focusout',
//         function(evt) {
//           if (!this.$wrapper.has(evt.target).length) {
//             return;
//           }

//           $list.removeAttr('aria-live');
//           if (this.autorotate) {
//             // Only resume playing if the user hasn't paused using the pause
//             // button
//             if (!this.$pause.is('.is-paused')) {
//               $slider.slick('slickPlay');
//             }
//           }
//         }.bind(this)
//       );

//     // Add arrow key support when focused
//     if (this.$dots) {
//       this.$dots
//         .find('a')
//         .each(function() {
//           var $dot = $(this);
//           $dot.on('click keyup', function(evt) {
//             if (
//               evt.type === 'keyup' &&
//               evt.which !== slate.utils.keyboardKeys.ENTER
//             )
//               return;

//             evt.preventDefault();

//             var slideNumber = $(evt.target).data('slide-number');

//             $slider.attr('tabindex', -1).slick('slickGoTo', slideNumber);

//             if (evt.type === 'keyup') {
//               $slider.focus();
//             }
//           });
//         })
//         .eq(0)
//         .attr('aria-current', 'true');
//     }

//     this.$controls
//       .on('focusin', highlightControls.bind(this))
//       .on('focusout', unhighlightControls.bind(this));
//   }

//   function slideshowPostInitA11ySetup() {
//     var $slides = this.$slideshow.find(selectors.slides);

//     $slides.removeAttr('role').removeAttr('aria-labelledby');
//     this.$dots
//       .removeAttr('role')
//       .find('li')
//       .removeAttr('role')
//       .removeAttr('aria-selected')
//       .each(function() {
//         var $dot = $(this);
//         var ariaControls = $dot.attr('aria-controls');
//         $dot
//           .removeAttr('aria-controls')
//           .find('a')
//           .attr('aria-controls', ariaControls);
//       });
//   }

//   function beforeChange(event, slick, currentSlide, nextSlide) {
//     var $dotLinks = this.$dots.find('a');
//     var $mobileDotLinks = this.$mobileDots.find('li');

//     $dotLinks
//       .removeAttr('aria-current')
//       .eq(nextSlide)
//       .attr('aria-current', 'true');

//     $mobileDotLinks
//       .removeClass(classes.slickActiveMobile)
//       .eq(nextSlide)
//       .addClass(classes.slickActiveMobile);
//     this.showMobileText(nextSlide);
//   }

//   function keyboardNavigation() {
//     if (event.keyCode === slate.utils.keyboardKeys.LEFTARROW) {
//       this.$slideshow.slick('slickPrev');
//     }
//     if (event.keyCode === slate.utils.keyboardKeys.RIGHTARROW) {
//       this.$slideshow.slick('slickNext');
//     }
//   }

//   function highlightControls() {
//     this.$controls.addClass(classes.controlsHover);
//   }

//   function unhighlightControls() {
//     this.$controls.removeClass(classes.controlsHover);
//   }

//   slideshow.prototype.togglePause = function() {
//     var slideshowSelector = getSlideshowId(this.$pause);
//     if (this.$pause.hasClass(classes.isPaused)) {
//       this.$pause.removeClass(classes.isPaused).attr('aria-pressed', 'false');
//       if (this.autorotate) {
//         $(slideshowSelector).slick('slickPlay');
//       }
//     } else {
//       this.$pause.addClass(classes.isPaused).attr('aria-pressed', 'true');
//       if (this.autorotate) {
//         $(slideshowSelector).slick('slickPause');
//       }
//     }
//   };

//   slideshow.prototype.setSlideshowHeight = function() {
//     var minAspectRatio = this.$slideshow.data('min-aspect-ratio');
//     this.$slideshow.height($(document).width() / minAspectRatio);
//   };

//   slideshow.prototype.showMobileText = function(slideIndex) {
//     var $allTextContent = this.$textWrapperMobile.find(
//       selectors.textContentMobile
//     );
//     var currentTextContentSelector =
//       selectors.textContentMobile + '-' + slideIndex;
//     var $currentTextContent = this.$textWrapperMobile.find(
//       currentTextContentSelector
//     );
//     if (
//       !$currentTextContent.length &&
//       this.$slideshow.find(selectors.slides).length === 1
//     ) {
//       this.$textWrapperMobile.hide();
//     } else {
//       this.$textWrapperMobile.show();
//     }
//     $allTextContent.hide();
//     $currentTextContent.show();
//   };

//   function getSlideshowId($el) {
//     return '#Slideshow-' + $el.data('id');
//   }

//   return slideshow;
// })();

// theme.Video = (function() {
//   var autoplayCheckComplete = false;
//   var playOnClickChecked = false;
//   var playOnClick = false;
//   var youtubeLoaded = false;
//   var videos = {};
//   var videoPlayers = [];
//   var videoOptions = {
//     ratio: 16 / 9,
//     scrollAnimationDuration: 400,
//     playerVars: {
//       // eslint-disable-next-line camelcase
//       iv_load_policy: 3,
//       modestbranding: 1,
//       autoplay: 0,
//       controls: 0,
//       wmode: 'opaque',
//       branding: 0,
//       autohide: 0,
//       rel: 0
//     },
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerChange
//     }
//   };
//   var classes = {
//     playing: 'video-is-playing',
//     paused: 'video-is-paused',
//     loading: 'video-is-loading',
//     loaded: 'video-is-loaded',
//     backgroundVideoWrapper: 'video-background-wrapper',
//     videoWithImage: 'video--image_with_play',
//     backgroundVideo: 'video--background',
//     userPaused: 'is-paused',
//     supportsAutoplay: 'autoplay',
//     supportsNoAutoplay: 'no-autoplay',
//     wrapperMinHeight: 'video-section-wrapper--min-height'
//   };

//   var selectors = {
//     section: '.video-section',
//     videoWrapper: '.video-section-wrapper',
//     playVideoBtn: '.video-control__play',
//     closeVideoBtn: '.video-control__close-wrapper',
//     pauseVideoBtn: '.video__pause',
//     pauseVideoStop: '.video__pause-stop',
//     pauseVideoResume: '.video__pause-resume',
//     fallbackText: '.icon__fallback-text'
//   };

//   /**
//    * Public functions
//    */
//   function init($video) {
//     if (!$video.length) {
//       return;
//     }

//     videos[$video.attr('id')] = {
//       id: $video.attr('id'),
//       videoId: $video.data('id'),
//       type: $video.data('type'),
//       status:
//         $video.data('type') === 'image_with_play' ? 'closed' : 'background', // closed, open, background
//       $video: $video,
//       $videoWrapper: $video.closest(selectors.videoWrapper),
//       $section: $video.closest(selectors.section),
//       controls: $video.data('type') === 'background' ? 0 : 1
//     };

//     if (!youtubeLoaded) {
//       // This code loads the IFrame Player API code asynchronously.
//       var tag = document.createElement('script');
//       tag.src = 'https://www.youtube.com/iframe_api';
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     }

//     playOnClickCheck();
//   }

//   function customPlayVideo(playerId) {
//     // Make sure we have carried out the playOnClick check first
//     if (!playOnClickChecked && !playOnClick) {
//       return;
//     }

//     if (playerId && typeof videoPlayers[playerId].playVideo === 'function') {
//       privatePlayVideo(playerId);
//     }
//   }

//   function pauseVideo(playerId) {
//     if (
//       videoPlayers[playerId] &&
//       typeof videoPlayers[playerId].pauseVideo === 'function'
//     ) {
//       videoPlayers[playerId].pauseVideo();
//     }
//   }

//   function loadVideos() {
//     for (var key in videos) {
//       if (videos.hasOwnProperty(key)) {
//         createPlayer(key);
//       }
//     }

//     initEvents();
//     youtubeLoaded = true;
//   }

//   function editorLoadVideo(key) {
//     if (!youtubeLoaded) {
//       return;
//     }
//     createPlayer(key);

//     initEvents();
//   }

//   /**
//    * Private functions
//    */

//   function privatePlayVideo(id, clicked) {
//     var videoData = videos[id];
//     var player = videoPlayers[id];
//     var $videoWrapper = videoData.$videoWrapper;

//     if (playOnClick) {
//       // playOnClick means we are probably on mobile (no autoplay).
//       // setAsPlaying will show the iframe, requiring another click
//       // to play the video.
//       setAsPlaying(videoData);
//     } else if (clicked || autoplayCheckComplete) {
//       // Play if autoplay is available or clicked to play
//       $videoWrapper.removeClass(classes.loading);
//       setAsPlaying(videoData);
//       player.playVideo();
//       return;
//     } else {
//       player.playVideo();
//     }
//   }

//   function setAutoplaySupport(supported) {
//     var supportClass = supported
//       ? classes.supportsAutoplay
//       : classes.supportsNoAutoplay;
//     $(document.documentElement)
//       .removeClass(classes.supportsAutoplay)
//       .removeClass(classes.supportsNoAutoplay)
//       .addClass(supportClass);

//     if (!supported) {
//       playOnClick = true;
//     }

//     autoplayCheckComplete = true;
//   }

//   function playOnClickCheck() {
//     // Bail early for a few instances:
//     // - small screen
//     // - device sniff mobile browser

//     if (playOnClickChecked) {
//       return;
//     }

//     if (isMobile()) {
//       playOnClick = true;
//     }

//     if (playOnClick) {
//       // No need to also do the autoplay check
//       setAutoplaySupport(false);
//     }

//     playOnClickChecked = true;
//   }

//   // The API will call this function when each video player is ready
//   function onPlayerReady(evt) {
//     evt.target.setPlaybackQuality('hd1080');
//     var videoData = getVideoOptions(evt);
//     var videoTitle = evt.target.getVideoData().title;
//     playOnClickCheck();

//     // Prevent tabbing through YouTube player controls until visible
//     $('#' + videoData.id).attr('tabindex', '-1');

//     sizeBackgroundVideos();
//     setButtonLabels(videoData.$videoWrapper, videoTitle);

//     // Customize based on options from the video ID
//     if (videoData.type === 'background') {
//       evt.target.mute();
//       privatePlayVideo(videoData.id);
//     }

//     videoData.$videoWrapper.addClass(classes.loaded);
//   }

//   function onPlayerChange(evt) {
//     var videoData = getVideoOptions(evt);
//     if (
//       videoData.status === 'background' &&
//       !isMobile() &&
//       !autoplayCheckComplete &&
//       (evt.data === YT.PlayerState.PLAYING ||
//         evt.data === YT.PlayerState.BUFFERING)
//     ) {
//       setAutoplaySupport(true);
//       autoplayCheckComplete = true;
//       videoData.$videoWrapper.removeClass(classes.loading);
//     }
//     switch (evt.data) {
//       case YT.PlayerState.ENDED:
//         setAsFinished(videoData);
//         break;
//       case YT.PlayerState.PAUSED:
//         // Seeking on a YouTube video also fires a PAUSED state change,
//         // checking the state after a delay prevents us pausing the video when
//         // the user is seeking instead of pausing
//         setTimeout(function() {
//           if (evt.target.getPlayerState() === YT.PlayerState.PAUSED) {
//             setAsPaused(videoData);
//           }
//         }, 200);
//         break;
//     }
//   }

//   function setAsFinished(videoData) {
//     switch (videoData.type) {
//       case 'background':
//         videoPlayers[videoData.id].seekTo(0);
//         break;
//       case 'image_with_play':
//         closeVideo(videoData.id);
//         toggleExpandVideo(videoData.id, false);
//         break;
//     }
//   }

//   function setAsPlaying(videoData) {
//     var $videoWrapper = videoData.$videoWrapper;
//     var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);

//     $videoWrapper.removeClass(classes.loading);

//     if ($pauseButton.hasClass(classes.userPaused)) {
//       $pauseButton.removeClass(classes.userPaused);
//     }

//     // Do not change element visibility if it is a background video
//     if (videoData.status === 'background') {
//       return;
//     }

//     $('#' + videoData.id).attr('tabindex', '0');

//     if (videoData.type === 'image_with_play') {
//       $videoWrapper.removeClass(classes.paused).addClass(classes.playing);
//     }

//     // Update focus to the close button so we stay within the video wrapper,
//     // allowing time for the scroll animation
//     setTimeout(function() {
//       $videoWrapper.find(selectors.closeVideoBtn).focus();
//     }, videoOptions.scrollAnimationDuration);
//   }

//   function setAsPaused(videoData) {
//     var $videoWrapper = videoData.$videoWrapper;

//     // YT's events fire after our click event. This status flag ensures
//     // we don't interact with a closed or background video.
//     if (videoData.type === 'image_with_play') {
//       if (videoData.status === 'closed') {
//         $videoWrapper.removeClass(classes.paused);
//       } else {
//         $videoWrapper.addClass(classes.paused);
//       }
//     }

//     $videoWrapper.removeClass(classes.playing);
//   }

//   function closeVideo(playerId) {
//     var videoData = videos[playerId];
//     var $videoWrapper = videoData.$videoWrapper;
//     var classesToRemove = [classes.paused, classes.playing].join(' ');

//     if (isMobile()) {
//       $videoWrapper.removeAttr('style');
//     }

//     $('#' + videoData.id).attr('tabindex', '-1');

//     videoData.status = 'closed';

//     switch (videoData.type) {
//       case 'image_with_play':
//         videoPlayers[playerId].stopVideo();
//         setAsPaused(videoData); // in case the video is already paused
//         break;
//       case 'background':
//         videoPlayers[playerId].mute();
//         setBackgroundVideo(playerId);
//         break;
//     }

//     $videoWrapper.removeClass(classesToRemove);
//   }

//   function getVideoOptions(evt) {
//     var id = evt.target.getIframe().id;
//     return videos[id];
//   }

//   function toggleExpandVideo(playerId, expand) {
//     var video = videos[playerId];
//     var elementTop = video.$videoWrapper.offset().top;
//     var $playButton = video.$videoWrapper.find(selectors.playVideoBtn);
//     var offset = 0;
//     var newHeight = 0;

//     if (isMobile()) {
//       video.$videoWrapper.parent().toggleClass('page-width', !expand);
//     }

//     if (expand) {
//       if (isMobile()) {
//         newHeight = $(window).width() / videoOptions.ratio;
//       } else {
//         newHeight = video.$videoWrapper.width() / videoOptions.ratio;
//       }
//       offset = ($(window).height() - newHeight) / 2;

//       video.$videoWrapper
//         .removeClass(classes.wrapperMinHeight)
//         .animate({ height: newHeight }, 600);

//       // Animate doesn't work in mobile editor, so we don't use it
//       if (!(isMobile() && Shopify.designMode)) {
//         $('html, body').animate(
//           {
//             scrollTop: elementTop - offset
//           },
//           videoOptions.scrollAnimationDuration
//         );
//       }
//     } else {
//       if (isMobile()) {
//         newHeight = video.$videoWrapper.data('mobile-height');
//       } else {
//         newHeight = video.$videoWrapper.data('desktop-height');
//       }

//       video.$videoWrapper
//         .height(video.$videoWrapper.width() / videoOptions.ratio)
//         .animate({ height: newHeight }, 600);
//       setTimeout(function() {
//         video.$videoWrapper.addClass(classes.wrapperMinHeight);
//       }, 600);
//       $playButton.focus();
//     }
//   }

//   function togglePause(playerId) {
//     var $pauseButton = videos[playerId].$videoWrapper.find(
//       selectors.pauseVideoBtn
//     );
//     var paused = $pauseButton.hasClass(classes.userPaused);
//     if (paused) {
//       $pauseButton.removeClass(classes.userPaused);
//       customPlayVideo(playerId);
//     } else {
//       $pauseButton.addClass(classes.userPaused);
//       pauseVideo(playerId);
//     }
//     $pauseButton.attr('aria-pressed', !paused);
//   }

//   function startVideoOnClick(playerId) {
//     var video = videos[playerId];

//     // add loading class to wrapper
//     video.$videoWrapper.addClass(classes.loading);

//     // Explicity set the video wrapper height (needed for height transition)
//     video.$videoWrapper.attr(
//       'style',
//       'height: ' + video.$videoWrapper.height() + 'px'
//     );

//     video.status = 'open';

//     switch (video.type) {
//       case 'image_with_play':
//         privatePlayVideo(playerId, true);
//         break;
//       case 'background':
//         unsetBackgroundVideo(playerId, video);
//         videoPlayers[playerId].unMute();
//         privatePlayVideo(playerId, true);
//         break;
//     }

//     toggleExpandVideo(playerId, true);

//     // esc to close video player
//     $(document).on('keydown.videoPlayer', function(evt) {
//       var playerId = $(document.activeElement).data('controls');
//       if (evt.keyCode !== slate.utils.keyboardKeys.ESCAPE || !playerId) {
//         return;
//       }

//       closeVideo(playerId);
//       toggleExpandVideo(playerId, false);
//     });
//   }

//   function sizeBackgroundVideos() {
//     $('.' + classes.backgroundVideo).each(function(index, el) {
//       sizeBackgroundVideo($(el));
//     });
//   }

//   function sizeBackgroundVideo($videoPlayer) {
//     if (!youtubeLoaded) {
//       return;
//     }

//     if (isMobile()) {
//       $videoPlayer.removeAttr('style');
//     } else {
//       var $videoWrapper = $videoPlayer.closest(selectors.videoWrapper);
//       var videoWidth = $videoWrapper.width();
//       var playerWidth = $videoPlayer.width();
//       var desktopHeight = $videoWrapper.data('desktop-height');

//       // when screen aspect ratio differs from video, video must center and underlay one dimension
//       if (videoWidth / videoOptions.ratio < desktopHeight) {
//         playerWidth = Math.ceil(desktopHeight * videoOptions.ratio); // get new player width
//         $videoPlayer
//           .width(playerWidth)
//           .height(desktopHeight)
//           .css({
//             left: (videoWidth - playerWidth) / 2,
//             top: 0
//           }); // player width is greater, offset left; reset top
//       } else {
//         // new video width < window width (gap to right)
//         desktopHeight = Math.ceil(videoWidth / videoOptions.ratio); // get new player height
//         $videoPlayer
//           .width(videoWidth)
//           .height(desktopHeight)
//           .css({
//             left: 0,
//             top: (desktopHeight - desktopHeight) / 2
//           }); // player height is greater, offset top; reset left
//       }

//       $videoPlayer.prepareTransition();
//       $videoWrapper.addClass(classes.loaded);
//     }
//   }

//   function unsetBackgroundVideo(playerId) {
//     // Switch the background video to a chrome-only player once played
//     $('#' + playerId)
//       .removeClass(classes.backgroundVideo)
//       .addClass(classes.videoWithImage);

//     setTimeout(function() {
//       $('#' + playerId).removeAttr('style');
//     }, 600);

//     videos[playerId].$videoWrapper
//       .removeClass(classes.backgroundVideoWrapper)
//       .addClass(classes.playing);

//     videos[playerId].status = 'open';
//   }

//   function setBackgroundVideo(playerId) {
//     $('#' + playerId)
//       .removeClass(classes.videoWithImage)
//       .addClass(classes.backgroundVideo);

//     videos[playerId].$videoWrapper.addClass(classes.backgroundVideoWrapper);

//     videos[playerId].status = 'background';
//     sizeBackgroundVideo($('#' + playerId));
//   }

//   function isMobile() {
//     return $(window).width() < 750 || window.mobileCheck();
//   }

//   function initEvents() {
//     $(document).on('click.videoPlayer', selectors.playVideoBtn, function(evt) {
//       var playerId = $(evt.currentTarget).data('controls');

//       startVideoOnClick(playerId);
//     });

//     $(document).on('click.videoPlayer', selectors.closeVideoBtn, function(evt) {
//       var playerId = $(evt.currentTarget).data('controls');

//       $(evt.currentTarget).blur();
//       closeVideo(playerId);
//       toggleExpandVideo(playerId, false);
//     });

//     $(document).on('click.videoPlayer', selectors.pauseVideoBtn, function(evt) {
//       var playerId = $(evt.currentTarget).data('controls');
//       togglePause(playerId);
//     });

//     // Listen to resize to keep a background-size:cover-like layout
//     $(window).on(
//       'resize.videoPlayer',
//       $.debounce(200, function() {
//         if (!youtubeLoaded) return;
//         var key;
//         var fullscreen = window.innerHeight === screen.height;

//         sizeBackgroundVideos();

//         if (isMobile()) {
//           for (key in videos) {
//             if (videos.hasOwnProperty(key)) {
//               if (videos[key].$videoWrapper.hasClass(classes.playing)) {
//                 if (!fullscreen) {
//                   pauseVideo(key);
//                   setAsPaused(videos[key]);
//                 }
//               }
//               videos[key].$videoWrapper.height(
//                 $(document).width() / videoOptions.ratio
//               );
//             }
//           }
//           setAutoplaySupport(false);
//         } else {
//           setAutoplaySupport(true);
//           for (key in videos) {
//             if (
//               videos[key].$videoWrapper.find('.' + classes.videoWithImage)
//                 .length
//             ) {
//               continue;
//             }
//             videoPlayers[key].playVideo();
//             setAsPlaying(videos[key]);
//           }
//         }
//       })
//     );

//     $(window).on(
//       'scroll.videoPlayer',
//       $.debounce(50, function() {
//         if (!youtubeLoaded) return;

//         for (var key in videos) {
//           if (videos.hasOwnProperty(key)) {
//             var $videoWrapper = videos[key].$videoWrapper;

//             // Close the video if more than 75% of it is scrolled out of view
//             if (
//               $videoWrapper.hasClass(classes.playing) &&
//               ($videoWrapper.offset().top + $videoWrapper.height() * 0.75 <
//                 $(window).scrollTop() ||
//                 $videoWrapper.offset().top + $videoWrapper.height() * 0.25 >
//                   $(window).scrollTop() + $(window).height())
//             ) {
//               closeVideo(key);
//               toggleExpandVideo(key, false);
//             }
//           }
//         }
//       })
//     );
//   }

//   function createPlayer(key) {
//     var args = $.extend({}, videoOptions, videos[key]);
//     args.playerVars.controls = args.controls;
//     videoPlayers[key] = new YT.Player(key, args);
//   }

//   function removeEvents() {
//     $(document).off('.videoPlayer');
//     $(window).off('.videoPlayer');
//   }

//   function setButtonLabels($videoWrapper, title) {
//     var $playButtons = $videoWrapper.find(selectors.playVideoBtn);
//     var $closeButton = $videoWrapper.find(selectors.closeVideoBtn);
//     var $pauseButton = $videoWrapper.find(selectors.pauseVideoBtn);
//     var $closeButtonText = $closeButton.find(selectors.fallbackText);
//     var $pauseButtonStopText = $pauseButton
//       .find(selectors.pauseVideoStop)
//       .find(selectors.fallbackText);
//     var $pauseButtonResumeText = $pauseButton
//       .find(selectors.pauseVideoResume)
//       .find(selectors.fallbackText);

//     // Insert the video title retrieved from YouTube into the instructional text
//     // for each button
//     $playButtons.each(function() {
//       var $playButton = $(this);
//       var $playButtonText = $playButton.find(selectors.fallbackText);

//       $playButtonText.text(
//         $playButtonText.text().replace('[video_title]', title)
//       );
//     });
//     $closeButtonText.text(
//       $closeButtonText.text().replace('[video_title]', title)
//     );
//     $pauseButtonStopText.text(
//       $pauseButtonStopText.text().replace('[video_title]', title)
//     );
//     $pauseButtonResumeText.text(
//       $pauseButtonResumeText.text().replace('[video_title]', title)
//     );
//   }

//   return {
//     init: init,
//     editorLoadVideo: editorLoadVideo,
//     loadVideos: loadVideos,
//     playVideo: customPlayVideo,
//     pauseVideo: pauseVideo,
//     removeEvents: removeEvents
//   };
// })();

// theme.ProductVideo = (function() {
//   var videos = {};

//   var hosts = {
//     html5: 'html5',
//     youtube: 'youtube'
//   };

//   var selectors = {
//     productMediaWrapper: '[data-product-single-media-wrapper]'
//   };

//   var attributes = {
//     enableVideoLooping: 'enable-video-looping',
//     videoId: 'video-id'
//   };

//   function init(videoContainer, sectionId) {
//     if (!videoContainer.length) {
//       return;
//     }

//     var videoElement = videoContainer.find('iframe, video')[0];
//     var mediaId = videoContainer.data('mediaId');

//     if (!videoElement) {
//       return;
//     }

//     videos[mediaId] = {
//       mediaId: mediaId,
//       sectionId: sectionId,
//       host: hostFromVideoElement(videoElement),
//       container: videoContainer,
//       element: videoElement,
//       ready: function() {
//         createPlayer(this);
//       }
//     };

//     var video = videos[mediaId];

//     switch (video.host) {
//       case hosts.html5:
//         window.Shopify.loadFeatures([
//           {
//             name: 'video-ui',
//             version: '1.0',
//             onLoad: setupPlyrVideos
//           }
//         ]);
//         theme.LibraryLoader.load('plyrShopifyStyles');
//         break;
//       case hosts.youtube:
//         theme.LibraryLoader.load('youtubeSdk', setupYouTubeVideos);
//         break;
//     }
//   }

//   function setupPlyrVideos(errors) {
//     if (errors) {
//       fallbackToNativeVideo();
//       return;
//     }

//     loadVideos(hosts.html5);
//   }

//   function setupYouTubeVideos() {
//     if (!window.YT.Player) return;

//     loadVideos(hosts.youtube);
//   }

//   function createPlayer(video) {
//     if (video.player) {
//       return;
//     }

//     var productMediaWrapper = video.container.closest(
//       selectors.productMediaWrapper
//     );
//     var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

//     switch (video.host) {
//       case hosts.html5:
//         // eslint-disable-next-line no-undef
//         video.player = new Shopify.Plyr(video.element, {
//           loop: { active: enableLooping }
//         });
//         break;
//       case hosts.youtube:
//         var videoId = productMediaWrapper.data(attributes.videoId);

//         video.player = new YT.Player(video.element, {
//           videoId: videoId,
//           events: {
//             onStateChange: function(event) {
//               if (event.data === 0 && enableLooping) event.target.seekTo(0);
//             }
//           }
//         });
//         break;
//     }

//     productMediaWrapper.on('mediaHidden xrLaunch', function() {
//       if (!video.player) return;

//       if (video.host === hosts.html5) {
//         video.player.pause();
//       }

//       if (video.host === hosts.youtube && video.player.pauseVideo) {
//         video.player.pauseVideo();
//       }
//     });

//     productMediaWrapper.on('mediaVisible', function() {
//       if (theme.Helpers.isTouch()) return;
//       if (!video.player) return;

//       if (video.host === hosts.html5) {
//         video.player.play();
//       }

//       if (video.host === hosts.youtube && video.player.playVideo) {
//         video.player.playVideo();
//       }
//     });
//   }

//   function hostFromVideoElement(video) {
//     if (video.tagName === 'VIDEO') {
//       return hosts.html5;
//     }

//     if (video.tagName === 'IFRAME') {
//       if (
//         /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
//           video.src
//         )
//       ) {
//         return hosts.youtube;
//       }
//     }
//     return null;
//   }

//   function loadVideos(host) {
//     for (var key in videos) {
//       if (videos.hasOwnProperty(key)) {
//         var video = videos[key];
//         if (video.host === host) {
//           video.ready();
//         }
//       }
//     }
//   }

//   function fallbackToNativeVideo() {
//     for (var key in videos) {
//       if (videos.hasOwnProperty(key)) {
//         var video = videos[key];

//         if (video.nativeVideo) continue;

//         if (video.host === hosts.html5) {
//           video.element.setAttribute('controls', 'controls');
//           video.nativeVideo = true;
//         }
//       }
//     }
//   }

//   function removeSectionVideos(sectionId) {
//     for (var key in videos) {
//       if (videos.hasOwnProperty(key)) {
//         var video = videos[key];

//         if (video.sectionId === sectionId) {
//           if (video.player) video.player.destroy();
//           delete videos[key];
//         }
//       }
//     }
//   }

//   return {
//     init: init,
//     hosts: hosts,
//     loadVideos: loadVideos,
//     removeSectionVideos: removeSectionVideos
//   };
// })();

// theme.ProductModel = (function() {
//   var modelJsonSections = {};
//   var models = {};
//   var xrButtons = {};

//   var selectors = {
//     mediaGroup: '[data-product-single-media-group]',
//     xrButton: '[data-shopify-xr]'
//   };

//   function init(modelViewerContainers, sectionId) {
//     modelJsonSections[sectionId] = {
//       loaded: false
//     };

//     modelViewerContainers.each(function(index) {
//       var $modelViewerContainer = $(this);
//       var mediaId = $modelViewerContainer.data('media-id');
//       var $modelViewerElement = $(
//         $modelViewerContainer.find('model-viewer')[0]
//       );
//       var modelId = $modelViewerElement.data('model-id');

//       if (index === 0) {
//         var $xrButton = $modelViewerContainer
//           .closest(selectors.mediaGroup)
//           .find(selectors.xrButton);
//         xrButtons[sectionId] = {
//           $element: $xrButton,
//           defaultId: modelId
//         };
//       }

//       models[mediaId] = {
//         modelId: modelId,
//         sectionId: sectionId,
//         $container: $modelViewerContainer,
//         $element: $modelViewerElement
//       };
//     });

//     window.Shopify.loadFeatures([
//       {
//         name: 'shopify-xr',
//         version: '1.0',
//         onLoad: setupShopifyXr
//       },
//       {
//         name: 'model-viewer-ui',
//         version: '1.0',
//         onLoad: setupModelViewerUi
//       }
//     ]);
//     theme.LibraryLoader.load('modelViewerUiStyles');
//   }

//   function setupShopifyXr(errors) {
//     if (errors) return;

//     if (!window.ShopifyXR) {
//       document.addEventListener('shopify_xr_initialized', function() {
//         setupShopifyXr();
//       });
//       return;
//     }

//     for (var sectionId in modelJsonSections) {
//       if (modelJsonSections.hasOwnProperty(sectionId)) {
//         var modelSection = modelJsonSections[sectionId];

//         if (modelSection.loaded) continue;
//         var $modelJson = $('#ModelJson-' + sectionId);

//         window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
//         modelSection.loaded = true;
//       }
//     }
//     window.ShopifyXR.setupXRElements();
//   }

//   function setupModelViewerUi(errors) {
//     if (errors) return;

//     for (var key in models) {
//       if (models.hasOwnProperty(key)) {
//         var model = models[key];
//         if (!model.modelViewerUi) {
//           model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
//         }
//         setupModelViewerListeners(model);
//       }
//     }
//   }

//   function setupModelViewerListeners(model) {
//     var xrButton = xrButtons[model.sectionId];

//     model.$container.on('mediaVisible', function() {
//       xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
//       if (theme.Helpers.isTouch()) return;
//       model.modelViewerUi.play();
//     });

//     model.$container
//       .on('mediaHidden', function() {
//         xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
//         model.modelViewerUi.pause();
//       })
//       .on('xrLaunch', function() {
//         model.modelViewerUi.pause();
//       });
//   }

//   function removeSectionModels(sectionId) {
//     for (var key in models) {
//       if (models.hasOwnProperty(key)) {
//         var model = models[key];
//         if (model.sectionId === sectionId) {
//           models[key].modelViewerUi.destroy();
//           delete models[key];
//         }
//       }
//     }
//     delete modelJsonSections[sectionId];
//   }

//   return {
//     init: init,
//     removeSectionModels: removeSectionModels
//   };
// })();

// window.theme = window.theme || {};

// theme.FormStatus = (function() {
//   var selectors = {
//     statusMessage: '[data-form-status]'
//   };

//   function init() {
//     this.$statusMessage = $(selectors.statusMessage);

//     if (!this.$statusMessage) return;

//     this.$statusMessage.attr('tabindex', -1).focus();

//     this.$statusMessage.on('blur', handleBlur.bind(this));
//   }

//   function handleBlur() {
//     this.$statusMessage.removeAttr('tabindex');
//   }

//   return {
//     init: init
//   };
// })();

// theme.Hero = (function() {
//   var classes = {
//     indexSectionFlush: 'index-section--flush'
//   };

//   var selectors = {
//     heroFixedWidthContent: '.hero-fixed-width__content',
//     heroFixedWidthImage: '.hero-fixed-width__image'
//   };

//   function hero(el, sectionId) {
//     this.$hero = $(el);
//     this.layout = this.$hero.data('layout');
//     var $parentSection = $('#shopify-section-' + sectionId);
//     var $heroContent = $parentSection.find(selectors.heroFixedWidthContent);
//     var $heroImage = $parentSection.find(selectors.heroFixedWidthImage);

//     if (this.layout !== 'fixed_width') {
//       return;
//     }

//     $parentSection.removeClass(classes.indexSectionFlush);
//     heroFixedHeight();
//     $(window).resize(
//       $.debounce(50, function() {
//         heroFixedHeight();
//       })
//     );

//     function heroFixedHeight() {
//       var contentHeight = $heroContent.height() + 50;
//       var imageHeight = $heroImage.height();

//       if (contentHeight > imageHeight) {
//         $heroImage.css('min-height', contentHeight);
//       }
//     }
//   }

//   return hero;
// })();

// // prettier-ignore
// window.theme = window.theme || {};

// theme.SearchResultsTemplate = (function() {
//   function renderResults(products, isLoading, searchQuery) {
//     return [
//       '<div class="predictive-search">',
//       renderHeader(products, isLoading),
//       renderProducts(products, searchQuery),
//       '</div>'
//     ].join('');
//   }

//   function renderHeader(products, isLoading) {
//     if (products.length === 0) {
//       return '';
//     }

//     return [
//       '<div class="predictive-search-title">',
//       '<h3 id="predictive-search" class="predictive-search-title__content">' +
//         theme.strings.products +
//         '</h3>',
//       '<span class="predictive-search-title__loading-spinner">' +
//         (isLoading
//           ? '<span class= "icon-predictive-search-spinner" ></span >'
//           : '') +
//         '</span>',
//       '</div>'
//     ].join('');
//   }

//   function loadingState() {
//     return [
//       '<div class="predictive-search">',
//       '<div class="predictive-search-loading">',
//       '<span class="visually-hidden">' + theme.strings.loading + '</span>',
//       '<span class="predictive-search-loading__icon">',
//       '<span class="icon-predictive-search-spinner"></span>',
//       '</span>',
//       '</div>',
//       '</div>'
//     ].join('');
//   }

//   function renderViewAll(searchQuery) {
//     return [
//       '<button type="submit" class="predictive-search-view-all__button" tabindex="-1">',
//       theme.strings.searchFor +
//         '<span class="predictive-search-view-all__query"> &ldquo;' +
//         _htmlEscape(searchQuery) +
//         '&rdquo;</span>',
//       '</button>'
//     ].join('');
//   }

//   function renderProducts(products, searchQuery) {
//     var resultsCount = products.length;

//     return [
//       '<ul id="predictive-search-results" class="predictive-search__list" role="listbox" aria-labelledby="predictive-search">',
//       products
//         .map(function(product, index) {
//           return renderProduct(normalizeProduct(product), index, resultsCount);
//         })
//         .join(''),
//       '<li id="search-all" class="predictive-search-view-all" role="option" data-search-result>' +
//         renderViewAll(searchQuery) +
//         '</li>',
//       '</ul>'
//     ].join('');
//   }

//   function renderProduct(product, index, resultsCount) {
//     return [
//       '<li id="search-result-' +
//         index +
//         '" class="predictive-search-item" role="option" data-search-result>',
//       '<a class="predictive-search-item__link" href="' +
//         product.url +
//         '" tabindex="-1">',
//       '<div class="predictive-search__column predictive-search__column--image" data-image-with-placeholder-wrapper>',
//       renderProductImage(product),
//       '</div>',
//       '<div class="predictive-search__column predictive-search__column--content ' +
//         (getDetailsCount() ? '' : 'predictive-search__column--center') +
//         '">',
//       '<span class="predictive-search-item__title">',
//       '<span class="predictive-search-item__title-text">' +
//         product.title +
//         '</span>',
//       '</span>' + (getDetailsCount() ? renderProductDetails(product) : ''),
//       '<span class="visually-hidden">, </span>',
//       '<span class="visually-hidden">' +
//         getNumberOfResultsString(index + 1, resultsCount) +
//         '</span>',
//       '</div>',
//       '</a>',
//       '</li>'
//     ].join('');
//   }

//   function renderProductImage(product) {
//     if (product.image === null) {
//       return '';
//     }

//     return [
//       '<div class="placeholder-background placeholder-background--animation" data-image-placeholder aria-hidden="true"></div>',
//       '<img class="predictive-search-item__image lazyload" src="' +
//         product.image.url +
//         '" data-src="' +
//         product.image.url +
//         '" data-image alt="' +
//         product.image.alt +
//         '" />'
//     ].join('');
//   }

//   function renderProductDetails(product) {
//     return [
//       '<dl class="predictive-search-item__details price' +
//         (product.isOnSale ? ' price--on-sale' : '') +
//         (!product.available ? ' price--sold-out' : '') +
//         (!product.isPriceVaries && product.isCompareVaries
//           ? ' price--compare-price-hidden'
//           : '') +
//         '">',
//       '<div class="predictive-search-item__detail">',
//       renderVendor(product),
//       '</div>',
//       '<div class="predictive-search-item__detail predictive-search-item__detail--inline">' +
//         renderProductPrice(product),
//       '</div>',
//       '</dl>'
//     ].join('');
//   }
//   function renderProductPrice(product) {
//     if (!theme.settings.predictiveSearchShowPrice) {
//       return '';
//     }

//     var accessibilityAnnounceComma = '<span class="visually-hidden">, </span>';

//     var priceMarkup =
//       '<div class="price__regular">' + renderPrice(product) + '</div>';

//     var salePriceMarkup =
//       '<div class="price__sale">' + renderSalePrice(product) + '</div>';

//     return (
//       accessibilityAnnounceComma +
//       '<div class="price__pricing-group">' +
//       (product.isOnSale ? salePriceMarkup : priceMarkup) +
//       '</div>'
//     );
//   }

//   function renderSalePrice(product) {
//     return [
//       '<dt>',
//       '<span class="visually-hidden">' + theme.strings.salePrice + '</span>',
//       '</dt>',
//       '<dd>',
//       '<span class="predictive-search-item__price predictive-search-item__price--sale">' +
//         (product.isPriceVaries
//           ? theme.strings.fromLowestPrice.replace('[price]', product.price)
//           : product.price) +
//         '</span>',
//       '</dd>',
//       '<div class="price__compare">' + renderCompareAtPrice(product) + '</div>'
//     ].join('');
//   }

//   function renderCompareAtPrice(product) {
//     return [
//       '<dt>',
//       '<span class="visually-hidden">' +
//         theme.strings.regularPrice +
//         '</span> ',
//       '</dt>',
//       '<dd>',
//       '<span class="predictive-search-item__price predictive-search-item__price--compare">' +
//         product.compareAtPrice +
//         '</span>',
//       '</dd>'
//     ].join('');
//   }

//   function renderPrice(product) {
//     return [
//       '<dt>',
//       '<span class="visually-hidden">' + theme.strings.regularPrice + '</span>',
//       '</dt>',
//       '<dd>',
//       '<span class="predictive-search-item__price">' +
//         (product.isPriceVaries
//           ? theme.strings.fromLowestPrice.replace('[price]', product.price)
//           : product.price) +
//         '</span>',
//       '</dd>'
//     ].join('');
//   }

//   function renderVendor(product) {
//     if (!theme.settings.predictiveSearchShowVendor || product.vendor === '') {
//       return '';
//     }

//     return [
//       '<dt>',
//       '<span class="visually-hidden">' + theme.strings.vendor + '</span>',
//       '</dt>',
//       '<dd class="predictive-search-item__vendor">' + product.vendor + '</dd>'
//     ].join('');
//   }

//   function normalizeProduct(product) {
//     var productOrVariant =
//       product.variants.length > 0 ? product.variants[0] : product;

//     return {
//       url: productOrVariant.url,
//       image: getProductImage(product),
//       title: product.title,
//       vendor: product.vendor || '',
//       price: theme.Currency.formatMoney(product.price_min, theme.moneyFormat),
//       compareAtPrice: theme.Currency.formatMoney(
//         product.compare_at_price_min,
//         theme.moneyFormat
//       ),
//       available: product.available,
//       isOnSale: isOnSale(product),
//       isPriceVaries: isPriceVaries(product),
//       isCompareVaries: isCompareVaries(product)
//     };
//   }

//   function getProductImage(product) {
//     var image;
//     var featuredImage;

//     if (product.variants.length > 0 && product.variants[0].image !== null) {
//       featuredImage = product.variants[0].featured_image;
//     } else if (product.image) {
//       featuredImage = product.featured_image;
//     } else {
//       image = null;
//     }

//     if (image !== null) {
//       image = {
//         url: theme.Images.getSizedImageUrl(featuredImage.url, '100x'),
//         alt: featuredImage.alt
//       };
//     }

//     return image;
//   }

//   function isOnSale(product) {
//     return (
//       product.compare_at_price_min !== null &&
//       parseInt(product.compare_at_price_min, 10) >
//         parseInt(product.price_min, 10)
//     );
//   }

//   function isPriceVaries(product) {
//     return product.price_max !== product.price_min;
//   }

//   function isCompareVaries(product) {
//     return product.compare_at_price_max !== product.compare_at_price_min;
//   }

//   // Returns the number of optional product details to be shown,
//   // values of the detailsList need to be boolean.
//   function getDetailsCount() {
//     var detailsList = [
//       theme.settings.predictiveSearchShowPrice,
//       theme.settings.predictiveSearchShowVendor
//     ];

//     var detailsCount = detailsList.reduce(function(acc, detail) {
//       return acc + (detail ? 1 : 0);
//     }, 0);

//     return detailsCount;
//   }

//   function getNumberOfResultsString(resultNumber, resultsCount) {
//     return theme.strings.number_of_results
//       .replace('[result_number]', resultNumber)
//       .replace('[results_count]', resultsCount);
//   }

//   function _htmlEscape(input) {
//     return input
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;')
//       .replace(/'/g, '&#39;');
//   }

//   return function(data) {
//     var products = data.products || [];
//     var isLoading = data.isLoading;
//     var searchQuery = data.searchQuery || '';

//     if (isLoading && products.length === 0) {
//       return loadingState();
//     }

//     return renderResults(products, isLoading, searchQuery);
//   };
// })();

// window.theme = window.theme || {};

// (function() {
//   // (a11y) This function will be used by the Predictive Search Component
//   // to announce the number of search results
//   function numberOfResultsTemplateFct(data) {
//     if (data.products.length === 1) {
//       return theme.strings.one_result_found;
//     } else {
//       return theme.strings.number_of_results_found.replace(
//         '[results_count]',
//         data.products.length
//       );
//     }
//   }

//   // (a11y) This function will be used by the Predictive Search Component
//   // to announce that it's loading results
//   function loadingResultsMessageTemplateFct() {
//     return theme.strings.loading;
//   }

//   function isPredictiveSearchSupported() {
//     var shopifyFeatures = JSON.parse($('#shopify-features').text());

//     return shopifyFeatures.predictiveSearch;
//   }

//   function isPredictiveSearchEnabled() {
//     return window.theme.settings.predictiveSearchEnabled;
//   }

//   function canInitializePredictiveSearch() {
//     return isPredictiveSearchSupported() && isPredictiveSearchEnabled();
//   }

//   // listen for search submits and validate query
//   function validateSearchHandler(searchEl, submitEl) {
//     submitEl.addEventListener(
//       'click',
//       validateSearchInput.bind(this, searchEl)
//     );
//   }

//   // if there is nothing in the search field, prevent submit
//   function validateSearchInput(searchEl, evt) {
//     var isInputValueEmpty = searchEl.value.trim().length === 0;
//     if (!isInputValueEmpty) {
//       return;
//     }

//     if (typeof evt !== 'undefined') {
//       evt.preventDefault();
//     }

//     searchEl.focus();
//   }

//   window.theme.SearchPage = (function() {
//     var selectors = {
//       searchReset: '[data-search-page-predictive-search-clear]',
//       searchInput: '[data-search-page-predictive-search-input]',
//       searchSubmit: '[data-search-page-predictive-search-submit]',
//       searchResults: '[data-predictive-search-mount="default"]'
//     };

//     var componentInstance;
//     var searchInput = document.querySelector(selectors.searchInput);
//     var searchSubmit = document.querySelector(selectors.searchSubmit);

//     function init(config) {
//       componentInstance = new window.Shopify.theme.PredictiveSearchComponent({
//         selectors: {
//           input: selectors.searchInput,
//           reset: selectors.searchReset,
//           result: selectors.searchResults
//         },
//         resultTemplateFct: window.theme.SearchResultsTemplate,
//         numberOfResultsTemplateFct: numberOfResultsTemplateFct,
//         loadingResultsMessageTemplateFct: loadingResultsMessageTemplateFct,
//         onOpen: function(nodes) {
//           if (config.isTabletAndUp) {
//             return;
//           }

//           var searchInputBoundingRect = $(
//             selectors.searchInput
//           )[0].getBoundingClientRect();
//           var bodyHeight = $('body').height();
//           var offset = 50;
//           var resultsMaxHeight =
//             bodyHeight - searchInputBoundingRect.bottom - offset;
//           $(nodes.result).css({
//             maxHeight: resultsMaxHeight
//           });
//         },
//         onBeforeDestroy: function(nodes) {
//           // If the viewport width changes from mobile to tablet
//           // reset the top position of the results
//           $(nodes.result).css({
//             maxHeight: ''
//           });
//         }
//       });

//       validateSearchHandler(searchInput, searchSubmit);
//     }

//     function unload() {
//       if (!componentInstance) {
//         return;
//       }
//       componentInstance.destroy();
//       componentInstance = null;
//     }

//     return {
//       init: init,
//       unload: unload
//     };
//   })();

//   window.theme.SearchHeader = (function() {
//     var selectors = {
//       searchInput: '[data-predictive-search-drawer-input]',
//       searchResults: '[data-predictive-search-mount="drawer"]',
//       searchFormContainer: '[data-search-form-container]',
//       searchSubmit: '[data-search-form-submit]'
//     };

//     var componentInstance;
//     var searchInput = document.querySelector(selectors.searchInput);
//     var searchSubmit = document.querySelector(selectors.searchSubmit);

//     function init(config) {
//       componentInstance = new window.Shopify.theme.PredictiveSearchComponent({
//         selectors: {
//           input: selectors.searchInput,
//           result: selectors.searchResults
//         },
//         resultTemplateFct: window.theme.SearchResultsTemplate,
//         numberOfResultsTemplateFct: numberOfResultsTemplateFct,
//         numberOfResults: config.numberOfResults,
//         loadingResultsMessageTemplateFct: loadingResultsMessageTemplateFct,
//         onInputBlur: function() {
//           return false;
//         },
//         onOpen: function(nodes) {
//           var searchInputBoundingRect = $(
//             searchInput
//           )[0].getBoundingClientRect();

//           // For tablet screens and up, stop the scroll area from extending past
//           // the bottom of the screen because we're locking the body scroll
//           var maxHeight =
//             window.innerHeight -
//             searchInputBoundingRect.bottom -
//             (config.isTabletAndUp ? 20 : 0);

//           $(nodes.result).css({
//             top: config.isTabletAndUp ? '' : searchInputBoundingRect.bottom,
//             maxHeight: maxHeight
//           });
//         },
//         onClose: function(nodes) {
//           $(nodes.result).css({
//             maxHeight: ''
//           });
//         },
//         onBeforeDestroy: function(nodes) {
//           // If the viewport width changes from mobile to tablet
//           // reset the top position of the results
//           $(nodes.result).css({
//             top: ''
//           });
//         }
//       });

//       validateSearchHandler(searchInput, searchSubmit);
//     }

//     function unload() {
//       if (!componentInstance) {
//         return;
//       }

//       componentInstance.destroy();
//       componentInstance = null;
//     }

//     function clearAndClose() {
//       if (!componentInstance) {
//         return;
//       }

//       componentInstance.clearAndClose();
//     }

//     return {
//       init: init,
//       unload: unload,
//       clearAndClose: clearAndClose
//     };
//   })();

//   window.theme.Search = (function() {
//     var classes = {
//       searchTemplate: 'template-search'
//     };
//     var selectors = {
//       siteHeader: '.site-header'
//     };
//     var mediaQueryList = {
//       mobile: window.matchMedia('(max-width: 749px)'),
//       tabletAndUp: window.matchMedia('(min-width: 750px)')
//     };

//     function init() {
//       if (!$(selectors.siteHeader).length) {
//         return;
//       }

//       if (!canInitializePredictiveSearch()) {
//         return;
//       }

//       Object.keys(mediaQueryList).forEach(function(device) {
//         mediaQueryList[device].addListener(initSearchAccordingToViewport);
//       });

//       initSearchAccordingToViewport();
//     }

//     function initSearchAccordingToViewport() {
//       theme.SearchDrawer.close();
//       theme.SearchHeader.unload();
//       theme.SearchPage.unload();

//       if (mediaQueryList.mobile.matches) {
//         theme.SearchHeader.init({
//           numberOfResults: 4,
//           isTabletAndUp: false
//         });

//         if (isSearchPage()) {
//           theme.SearchPage.init({ isTabletAndUp: false });
//         }
//       } else {
//         // Tablet and up
//         theme.SearchHeader.init({
//           numberOfResults: 4,
//           isTabletAndUp: true
//         });

//         if (isSearchPage()) {
//           theme.SearchPage.init({ isTabletAndUp: true });
//         }
//       }
//     }

//     function isSearchPage() {
//       return $('body').hasClass(classes.searchTemplate);
//     }

//     function unload() {
//       theme.SearchHeader.unload();
//       theme.SearchPage.unload();
//     }

//     return {
//       init: init,
//       unload: unload
//     };
//   })();
// })();

// window.theme = window.theme || {};

// theme.SearchDrawer = (function() {
//   var selectors = {
//     headerSection: '[data-header-section]',
//     drawer: '[data-predictive-search-drawer]',
//     drawerOpenButton: '[data-predictive-search-open-drawer]',
//     headerSearchInput: '[data-predictive-search-drawer-input]',
//     predictiveSearchWrapper: '[data-predictive-search-mount="drawer"]'
//   };

//   var drawerInstance;

//   function init() {
//     setAccessibilityProps();

//     drawerInstance = new theme.Drawers('SearchDrawer', 'top', {
//       onDrawerOpen: function() {
//         setHeight();
//         theme.MobileNav.closeMobileNav();
//         lockBodyScroll();
//       },
//       onDrawerClose: function() {
//         theme.SearchHeader.clearAndClose();
//         $(selectors.drawerOpenButton).focus();
//         unlockBodyScroll();
//       },
//       withPredictiveSearch: true,
//       $elementToFocusOnOpen: $(selectors.headerSearchInput)
//     });
//   }

//   function setAccessibilityProps() {
//     $(selectors.drawerOpenButton)
//       .attr('aria-controls', 'SearchDrawer')
//       .attr('aria-expanded', 'false')
//       .attr('aria-haspopup', 'dialog');
//   }

//   function setHeight() {
//     $(selectors.drawer).css({
//       height: $(selectors.headerSection).outerHeight()
//     });
//   }

//   function close() {
//     drawerInstance.close();
//   }

//   function lockBodyScroll() {
//     // Disable scroll except on the predictive search container.
//     window.bodyScrollLock.disableBodyScroll(
//       document.querySelector(selectors.predictiveSearchWrapper),
//       {
//         allowTouchMove: function(element) {
//           return (
//             // If the touch event is in an element under the predictive search
//             // we allow don't prevent default.
//             $(element).parents(selectors.predictiveSearchWrapper).length === 1
//           );
//         }
//       }
//     );
//   }

//   function unlockBodyScroll() {
//     window.bodyScrollLock.clearAllBodyScrollLocks();
//   }

//   return {
//     init: init,
//     close: close
//   };
// })();

// theme.Disclosure = (function() {
//   var selectors = {
//     disclosureList: '[data-disclosure-list]',
//     disclosureToggle: '[data-disclosure-toggle]',
//     disclosureInput: '[data-disclosure-input]',
//     disclosureOptions: '[data-disclosure-option]'
//   };

//   var classes = {
//     listVisible: 'disclosure-list--visible'
//   };

//   function Disclosure($disclosure) {
//     this.$container = $disclosure;
//     this.cache = {};
//     this._cacheSelectors();
//     this._connectOptions();
//     this._connectToggle();
//     this._onFocusOut();
//   }

//   Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
//     _cacheSelectors: function() {
//       this.cache = {
//         $disclosureList: this.$container.find(selectors.disclosureList),
//         $disclosureToggle: this.$container.find(selectors.disclosureToggle),
//         $disclosureInput: this.$container.find(selectors.disclosureInput),
//         $disclosureOptions: this.$container.find(selectors.disclosureOptions)
//       };
//     },

//     _connectToggle: function() {
//       this.cache.$disclosureToggle.on(
//         'click',
//         function(evt) {
//           var ariaExpanded =
//             $(evt.currentTarget).attr('aria-expanded') === 'true';
//           $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);

//           this.cache.$disclosureList.toggleClass(classes.listVisible);
//         }.bind(this)
//       );
//     },

//     _connectOptions: function() {
//       this.cache.$disclosureOptions.on(
//         'click',
//         function(evt) {
//           this._submitForm($(evt.currentTarget).data('value'));
//         }.bind(this)
//       );
//     },

//     _onFocusOut: function() {
//       this.cache.$disclosureToggle.on(
//         'focusout',
//         function(evt) {
//           var disclosureLostFocus =
//             this.$container.has(evt.relatedTarget).length === 0;

//           if (disclosureLostFocus) {
//             this._hideList();
//           }
//         }.bind(this)
//       );

//       this.cache.$disclosureList.on(
//         'focusout',
//         function(evt) {
//           var childInFocus =
//             $(evt.currentTarget).has(evt.relatedTarget).length > 0;
//           var isVisible = this.cache.$disclosureList.hasClass(
//             classes.listVisible
//           );

//           if (isVisible && !childInFocus) {
//             this._hideList();
//           }
//         }.bind(this)
//       );

//       this.$container.on(
//         'keyup',
//         function(evt) {
//           if (evt.which !== slate.utils.keyboardKeys.ESCAPE) return;
//           this._hideList();
//           this.cache.$disclosureToggle.focus();
//         }.bind(this)
//       );

//       $('body').on(
//         'click',
//         function(evt) {
//           var isOption = this.$container.has(evt.target).length > 0;
//           var isVisible = this.cache.$disclosureList.hasClass(
//             classes.listVisible
//           );

//           if (isVisible && !isOption) {
//             this._hideList();
//           }
//         }.bind(this)
//       );
//     },

//     _submitForm: function(value) {
//       this.cache.$disclosureInput.val(value);
//       this.$container.parents('form').submit();
//     },

//     _hideList: function() {
//       this.cache.$disclosureList.removeClass(classes.listVisible);
//       this.cache.$disclosureToggle.attr('aria-expanded', false);
//     },

//     unload: function() {
//       this.cache.$disclosureOptions.off();
//       this.cache.$disclosureToggle.off();
//       this.cache.$disclosureList.off();
//       this.$container.off();
//     }
//   });

//   return Disclosure;
// })();


// /* ================ TEMPLATES ================ */
// (function() {
//   var $filterBy = $('#BlogTagFilter');

//   if (!$filterBy.length) {
//     return;
//   }

//   slate.utils.resizeSelects($filterBy);

//   $filterBy.on('change', function() {
//     location.href = $(this).val();
//   });
// })();

// window.theme = theme || {};

// theme.customerTemplates = (function() {
//   var selectors = {
//     RecoverHeading: '#RecoverHeading',
//     RecoverEmail: '#RecoverEmail',
//     LoginHeading: '#LoginHeading'
//   };

//   function initEventListeners() {
//     this.$RecoverHeading = $(selectors.RecoverHeading);
//     this.$RecoverEmail = $(selectors.RecoverEmail);
//     this.$LoginHeading = $(selectors.LoginHeading);

//     // Show reset password form
//     $('#RecoverPassword').on(
//       'click',
//       function(evt) {
//         evt.preventDefault();
//         showRecoverPasswordForm();
//         this.$RecoverHeading.attr('tabindex', '-1').focus();
//       }.bind(this)
//     );

//     // Hide reset password form
//     $('#HideRecoverPasswordLink').on(
//       'click',
//       function(evt) {
//         evt.preventDefault();
//         hideRecoverPasswordForm();
//         this.$LoginHeading.attr('tabindex', '-1').focus();
//       }.bind(this)
//     );

//     this.$RecoverHeading.on('blur', function() {
//       $(this).removeAttr('tabindex');
//     });

//     this.$LoginHeading.on('blur', function() {
//       $(this).removeAttr('tabindex');
//     });
//   }

//   /**
//    *
//    *  Show/Hide recover password form
//    *
//    */

//   function showRecoverPasswordForm() {
//     $('#RecoverPasswordForm').removeClass('hide');
//     $('#CustomerLoginForm').addClass('hide');

//     if (this.$RecoverEmail.attr('aria-invalid') === 'true') {
//       this.$RecoverEmail.focus();
//     }
//   }

//   function hideRecoverPasswordForm() {
//     $('#RecoverPasswordForm').addClass('hide');
//     $('#CustomerLoginForm').removeClass('hide');
//   }

//   /**
//    *
//    *  Show reset password success message
//    *
//    */
//   function resetPasswordSuccess() {
//     var $formState = $('.reset-password-success');

//     // check if reset password form was successfully submited.
//     if (!$formState.length) {
//       return;
//     }

//     // show success message
//     $('#ResetSuccess')
//       .removeClass('hide')
//       .focus();
//   }

//   /**
//    *
//    *  Show/hide customer address forms
//    *
//    */
//   function customerAddressForm() {
//     var $newAddressForm = $('#AddressNewForm');
//     var $newAddressFormButton = $('#AddressNewButton');

//     if (!$newAddressForm.length) {
//       return;
//     }

//     // Initialize observers on address selectors, defined in shopify_common.js
//     if (Shopify) {
//       // eslint-disable-next-line no-new
//       new Shopify.CountryProvinceSelector(
//         'AddressCountryNew',
//         'AddressProvinceNew',
//         {
//           hideElement: 'AddressProvinceContainerNew'
//         }
//       );
//     }

//     // Initialize each edit form's country/province selector
//     $('.address-country-option').each(function() {
//       var formId = $(this).data('form-id');
//       var countrySelector = 'AddressCountry_' + formId;
//       var provinceSelector = 'AddressProvince_' + formId;
//       var containerSelector = 'AddressProvinceContainer_' + formId;

//       // eslint-disable-next-line no-new
//       new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
//         hideElement: containerSelector
//       });
//     });

//     // Toggle new/edit address forms
//     $('.address-new-toggle').on('click', function() {
//       var isExpanded = $newAddressFormButton.attr('aria-expanded') === 'true';

//       $newAddressForm.toggleClass('hide');
//       $newAddressFormButton.attr('aria-expanded', !isExpanded).focus();
//     });

//     $('.address-edit-toggle').on('click', function() {
//       var formId = $(this).data('form-id');
//       var $editButton = $('#EditFormButton_' + formId);
//       var $editAddress = $('#EditAddress_' + formId);
//       var isExpanded = $editButton.attr('aria-expanded') === 'true';

//       $editAddress.toggleClass('hide');
//       $editButton.attr('aria-expanded', !isExpanded).focus();
//     });

//     $('.address-delete').on('click', function() {
//       var $el = $(this);
//       var target = $el.data('target');
//       var confirmMessage = $el.data('confirm-message');

//       // eslint-disable-next-line no-alert
//       if (
//         confirm(
//           confirmMessage || 'Are you sure you wish to delete this address?'
//         )
//       ) {
//         Shopify.postLink(target, {
//           parameters: { _method: 'delete' }
//         });
//       }
//     });
//   }

//   /**
//    *
//    *  Check URL for reset password hash
//    *
//    */
//   function checkUrlHash() {
//     var hash = window.location.hash;

//     // Allow deep linking to recover password form
//     if (hash === '#recover') {
//       showRecoverPasswordForm.bind(this)();
//     }
//   }

//   return {
//     init: function() {
//       initEventListeners();
//       checkUrlHash();
//       resetPasswordSuccess();
//       customerAddressForm();
//     }
//   };
// })();


// /*================ SECTIONS ================*/
// window.theme = window.theme || {};

// theme.Cart = (function() {
//   var selectors = {
//     cartCount: '[data-cart-count]',
//     cartCountBubble: '[data-cart-count-bubble]',
//     cartDiscount: '[data-cart-discount]',
//     cartDiscountTitle: '[data-cart-discount-title]',
//     cartDiscountAmount: '[data-cart-discount-amount]',
//     cartDiscountWrapper: '[data-cart-discount-wrapper]',
//     cartErrorMessage: '[data-cart-error-message]',
//     cartErrorMessageWrapper: '[data-cart-error-message-wrapper]',
//     cartItem: '[data-cart-item]',
//     cartItemDetails: '[data-cart-item-details]',
//     cartItemDiscount: '[data-cart-item-discount]',
//     cartItemDiscountedPriceGroup: '[data-cart-item-discounted-price-group]',
//     cartItemDiscountTitle: '[data-cart-item-discount-title]',
//     cartItemDiscountAmount: '[data-cart-item-discount-amount]',
//     cartItemDiscountList: '[data-cart-item-discount-list]',
//     cartItemFinalPrice: '[data-cart-item-final-price]',
//     cartItemImage: '[data-cart-item-image]',
//     cartItemLinePrice: '[data-cart-item-line-price]',
//     cartItemOriginalPrice: '[data-cart-item-original-price]',
//     cartItemPrice: '[data-cart-item-price]',
//     cartItemPriceList: '[data-cart-item-price-list]',
//     cartItemProperty: '[data-cart-item-property]',
//     cartItemPropertyName: '[data-cart-item-property-name]',
//     cartItemPropertyValue: '[data-cart-item-property-value]',
//     cartItemRegularPriceGroup: '[data-cart-item-regular-price-group]',
//     cartItemRegularPrice: '[data-cart-item-regular-price]',
//     cartItemTitle: '[data-cart-item-title]',
//     cartItemOption: '[data-cart-item-option]',
//     cartLineItems: '[data-cart-line-items]',
//     cartNote: '[data-cart-notes]',
//     cartQuantityErrorMessage: '[data-cart-quantity-error-message]',
//     cartQuantityErrorMessageWrapper:
//       '[data-cart-quantity-error-message-wrapper]',
//     cartRemove: '[data-cart-remove]',
//     cartStatus: '[data-cart-status]',
//     cartSubtotal: '[data-cart-subtotal]',
//     cartTableCell: '[data-cart-table-cell]',
//     cartWrapper: '[data-cart-wrapper]',
//     emptyPageContent: '[data-empty-page-content]',
//     quantityInput: '[data-quantity-input]',
//     quantityInputMobile: '[data-quantity-input-mobile]',
//     quantityInputDesktop: '[data-quantity-input-desktop]',
//     quantityLabelMobile: '[data-quantity-label-mobile]',
//     quantityLabelDesktop: '[data-quantity-label-desktop]',
//     inputQty: '[data-quantity-input]',
//     thumbnails: '.cart__image',
//     unitPrice: '[data-unit-price]',
//     unitPriceBaseUnit: '[data-unit-price-base-unit]',
//     unitPriceGroup: '[data-unit-price-group]'
//   };

//   var classes = {
//     cartNoCookies: 'cart--no-cookies',
//     cartRemovedProduct: 'cart__removed-product',
//     hide: 'hide',
//     inputError: 'input--error'
//   };

//   var attributes = {
//     cartItemIndex: 'data-cart-item-index',
//     cartItemKey: 'data-cart-item-key',
//     cartItemQuantity: 'data-cart-item-quantity',
//     cartItemTitle: 'data-cart-item-title',
//     cartItemUrl: 'data-cart-item-url',
//     quantityItem: 'data-quantity-item'
//   };

//   theme.breakpoints = theme.breakpoints || {};

//   if (
//     isNaN(theme.breakpoints.medium) ||
//     theme.breakpoints.medium === undefined
//   ) {
//     theme.breakpoints.medium = 750;
//   }

//   var mediumUpQuery = '(min-width: ' + theme.breakpoints.medium + 'px)';

//   function Cart(container) {
//     this.$container = $(container);
//     this.$thumbnails = $(selectors.thumbnails, this.$container);
//     this.ajaxEnabled = this.$container.data('ajax-enabled');

//     if (!this.cookiesEnabled()) {
//       this.$container.addClass(classes.cartNoCookies);
//     }

//     this.$thumbnails.css('cursor', 'pointer');
//     this.$container.on(
//       'click',
//       selectors.thumbnails,
//       this._handleThumbnailClick
//     );

//     this.$container.on(
//       'change',
//       selectors.inputQty,
//       $.debounce(500, this._handleInputQty.bind(this))
//     );

//     this.mql = window.matchMedia(mediumUpQuery);
//     this.mql.addListener(this.setQuantityFormControllers.bind(this));
//     this.setQuantityFormControllers();

//     if (this.ajaxEnabled) {
//       /**
//        * Because the entire cart is recreated when a cart item is updated,
//        * we cannot cache the elements in the cart. Instead, we add the event
//        * listeners on the cart's container to allow us to retain the event
//        * listeners after rebuilding the cart when an item is updated.
//        */

//       this.$container.on(
//         'change',
//         selectors.cartNote,
//         this._onNoteChange.bind(this)
//       );

//       this.$container.on(
//         'click',
//         selectors.cartRemove,
//         this._onRemoveItem.bind(this)
//       );

//       this._setupCartTemplates();
//     }
//   }

//   Cart.prototype = _.assignIn({}, Cart.prototype, {
//     _setupCartTemplates: function() {
//       this.$itemTemplate = $(selectors.cartItem, this.$container)
//         .first()
//         .clone();
//       this.$itemDiscountTemplate = $(
//         selectors.cartItemDiscount,
//         this.$itemTemplate
//       ).clone();
//       this.$itemOptionTemplate = $(
//         selectors.cartItemOption,
//         this.$itemTemplate
//       ).clone();
//       this.$itemPropertyTemplate = $(
//         selectors.cartItemProperty,
//         this.$itemTemplate
//       ).clone();
//       this.$itemPriceListTemplate = $(
//         selectors.cartItemPriceList,
//         this.$itemTemplate
//       ).clone();
//       this.$itemLinePriceTemplate = $(
//         selectors.cartItemLinePrice,
//         this.$itemTemplate
//       ).clone();
//       this.$cartDiscountTemplate = $(
//         selectors.cartDiscount,
//         this.$container
//       ).clone();
//     },

//     _handleInputQty: function(evt) {
//       var $input = $(evt.target);
//       var itemIndex = $input.data('quantity-item');
//       var $itemElement = $input.closest(selectors.cartItem);
//       var $itemQtyInputs = $('[data-quantity-item=' + itemIndex + ']');
//       var value = parseInt($input.val());
//       var isValidValue = !(value < 0 || isNaN(value));
//       $itemQtyInputs.val(value);

//       this._hideCartError();
//       this._hideQuantityErrorMessage();

//       if (!isValidValue) {
//         this._showQuantityErrorMessages($itemElement);
//         return;
//       }

//       if (isValidValue && this.ajaxEnabled) {
//         this._updateItemQuantity(
//           itemIndex,
//           $itemElement,
//           $itemQtyInputs,
//           value
//         );
//       }
//     },

//     _updateItemQuantity: function(
//       itemIndex,
//       $itemElement,
//       $itemQtyInputs,
//       value
//     ) {
//       var key = $itemElement.attr(attributes.cartItemKey);
//       var index = $itemElement.attr(attributes.cartItemIndex);

//       var params = {
//         url: '/cart/change.js',
//         data: { quantity: value, line: index },
//         dataType: 'json'
//       };

//       $.post(params)
//         .done(
//           function(state) {
//             if (state.item_count === 0) {
//               this._emptyCart();
//             } else {
//               this._createCart(state);

//               if (value === 0) {
//                 this._showRemoveMessage($itemElement.clone());
//               } else {
//                 var $lineItem = $('[data-cart-item-key="' + key + '"]');
//                 var item = this.getItem(key, state);

//                 $(selectors.quantityInput, $lineItem).focus();
//                 this._updateLiveRegion(item);
//               }
//             }

//             this._setCartCountBubble(state.item_count);
//           }.bind(this)
//         )
//         .fail(
//           function() {
//             this._showCartError($itemQtyInputs);
//           }.bind(this)
//         );
//     },

//     getItem: function(key, state) {
//       return state.items.find(function(item) {
//         return item.key === key;
//       });
//     },

//     _liveRegionText: function(item) {
//       // Dummy content for live region
//       var liveRegionText =
//         theme.strings.update +
//         ': [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]';

//       // Update Quantity
//       liveRegionText = liveRegionText
//         .replace('[QuantityLabel]', theme.strings.quantity)
//         .replace('[Quantity]', item.quantity);

//       // Update pricing information
//       var regularLabel = '';
//       var regularPrice = theme.Currency.formatMoney(
//         item.original_line_price,
//         theme.moneyFormat
//       );
//       var discountLabel = '';
//       var discountPrice = '';
//       var discountInformation = '';

//       if (item.original_line_price > item.final_line_price) {
//         regularLabel = theme.strings.regularTotal;

//         discountLabel = theme.strings.discountedTotal;
//         discountPrice = theme.Currency.formatMoney(
//           item.final_line_price,
//           theme.moneyFormat
//         );

//         discountInformation = theme.strings.priceColumn;
//       }

//       liveRegionText = liveRegionText
//         .replace('[Regular]', regularLabel)
//         .replace('[$$]', regularPrice)
//         .replace('[DiscountedPrice]', discountLabel)
//         .replace('[$]', discountPrice)
//         .replace('[PriceInformation]', discountInformation)
//         .trim();

//       return liveRegionText;
//     },

//     _updateLiveRegion: function(item) {
//       var $liveRegion = $(selectors.cartStatus);
//       $liveRegion.html(this._liveRegionText(item)).attr('aria-hidden', false);

//       // hide content from accessibility tree after announcement
//       setTimeout(function() {
//         $liveRegion.attr('aria-hidden', true);
//       }, 1000);
//     },

//     _createCart: function(state) {
//       var cartDiscountList = this._createCartDiscountList(state);

//       $(selectors.cartLineItems, this.$container).html(
//         this._createLineItemList(state)
//       );

//       this.setQuantityFormControllers();

//       $(selectors.cartNote, this.$container).val(state.note);

//       if (cartDiscountList.length === 0) {
//         $(selectors.cartDiscountWrapper, this.$container)
//           .html('')
//           .addClass(classes.hide);
//       } else {
//         $(selectors.cartDiscountWrapper, this.$container)
//           .html(cartDiscountList)
//           .removeClass(classes.hide);
//       }

//       $(selectors.cartSubtotal, this.$container).html(
//         theme.Currency.formatMoney(
//           state.total_price,
//           theme.moneyFormatWithCurrency
//         )
//       );
//     },

//     _createCartDiscountList: function(cart) {
//       return $.map(
//         cart.cart_level_discount_applications,
//         function(discount) {
//           var $discount = this.$cartDiscountTemplate.clone();
//           $discount.find(selectors.cartDiscountTitle).text(discount.title);
//           $discount
//             .find(selectors.cartDiscountAmount)
//             .html(
//               theme.Currency.formatMoney(
//                 discount.total_allocated_amount,
//                 theme.moneyFormat
//               )
//             );
//           return $discount[0];
//         }.bind(this)
//       );
//     },

//     _createLineItemList: function(state) {
//       return $.map(
//         state.items,
//         function(item, index) {
//           var $item = this.$itemTemplate.clone();
//           var $itemPriceList = this.$itemPriceListTemplate.clone();

//           this._setLineItemAttributes($item, item, index);
//           this._setLineItemImage($item, item.featured_image);

//           $(selectors.cartItemTitle, $item)
//             .text(item.product_title)
//             .attr('href', item.url);

//           var productDetailsList = this._createProductDetailsList(
//             item.product_has_only_default_variant,
//             item.options_with_values,
//             item.properties
//           );
//           this._setProductDetailsList($item, productDetailsList);

//           this._setItemRemove($item, item.title);

//           $itemPriceList.html(
//             this._createItemPrice(
//               item.original_price,
//               item.final_price,
//               this.$itemPriceListTemplate
//             )
//           );

//           if (item.unit_price_measurement) {
//             $itemPriceList.append(
//               this._createUnitPrice(
//                 item.unit_price,
//                 item.unit_price_measurement,
//                 this.$itemPriceListTemplate
//               )
//             );
//           }

//           this._setItemPrice($item, $itemPriceList);

//           var itemDiscountList = this._createItemDiscountList(item);
//           this._setItemDiscountList($item, itemDiscountList);

//           this._setQuantityInputs($item, item, index);

//           var itemLinePrice = this._createItemPrice(
//             item.original_line_price,
//             item.final_line_price,
//             this.$itemLinePriceTemplate
//           );
//           this._setItemLinePrice($item, itemLinePrice);

//           return $item[0];
//         }.bind(this)
//       );
//     },

//     _setLineItemAttributes: function($item, item, index) {
//       $item
//         .attr(attributes.cartItemKey, item.key)
//         .attr(attributes.cartItemUrl, item.url)
//         .attr(attributes.cartItemTitle, item.title)
//         .attr(attributes.cartItemIndex, index + 1)
//         .attr(attributes.cartItemQuantity, item.quantity);
//     },

//     _setLineItemImage: function($item, featuredImage) {
//       var $image = $(selectors.cartItemImage, $item);

//       var sizedImageUrl =
//         featuredImage.url !== null
//           ? theme.Images.getSizedImageUrl(featuredImage.url, 'x190')
//           : null;

//       if (sizedImageUrl) {
//         $image
//           .attr('alt', featuredImage.alt)
//           .attr('src', sizedImageUrl)
//           .removeClass(classes.hide);
//       } else {
//         $image.remove();
//       }
//     },

//     _setProductDetailsList: function($item, productDetailsList) {
//       var $itemDetails = $(selectors.cartItemDetails, $item);

//       if (productDetailsList.length === 0) {
//         $itemDetails.addClass(classes.hide).text('');
//       } else {
//         $itemDetails.removeClass(classes.hide).html(productDetailsList);
//       }
//     },

//     _setItemPrice: function($item, price) {
//       $(selectors.cartItemPrice, $item).html(price);
//     },

//     _setItemDiscountList: function($item, discountList) {
//       var $itemDiscountList = $(selectors.cartItemDiscountList, $item);

//       if (discountList.length === 0) {
//         $itemDiscountList.html('').addClass(classes.hide);
//       } else {
//         $itemDiscountList.html(discountList).removeClass(classes.hide);
//       }
//     },

//     _setItemRemove: function($item, title) {
//       $(selectors.cartRemove, $item).attr(
//         'aria-label',
//         theme.strings.removeLabel.replace('[product]', title)
//       );
//     },

//     _setQuantityInputs: function($item, item, index) {
//       $(selectors.quantityInputMobile, $item)
//         .attr('id', 'updates_' + item.key)
//         .attr(attributes.quantityItem, index + 1)
//         .val(item.quantity);

//       $(selectors.quantityInputDesktop, $item)
//         .attr('id', 'updates_large_' + item.key)
//         .attr(attributes.quantityItem, index + 1)
//         .val(item.quantity);

//       $(selectors.quantityLabelMobile, $item).attr(
//         'for',
//         'updates_' + item.key
//       );

//       $(selectors.quantityLabelDesktop, $item).attr(
//         'for',
//         'updates_large_' + item.key
//       );
//     },

//     setQuantityFormControllers: function() {
//       if (this.mql.matches) {
//         $(selectors.quantityInputDesktop).attr('name', 'updates[]');
//         $(selectors.quantityInputMobile).removeAttr('name');
//       } else {
//         $(selectors.quantityInputMobile).attr('name', 'updates[]');
//         $(selectors.quantityInputDesktop).removeAttr('name');
//       }
//     },

//     _setItemLinePrice: function($item, price) {
//       $(selectors.cartItemLinePrice, $item).html(price);
//     },

//     _createProductDetailsList: function(
//       product_has_only_default_variant,
//       options,
//       properties
//     ) {
//       var optionsPropertiesHTML = [];

//       if (!product_has_only_default_variant) {
//         optionsPropertiesHTML = optionsPropertiesHTML.concat(
//           this._getOptionList(options)
//         );
//       }

//       if (properties !== null && Object.keys(properties).length !== 0) {
//         optionsPropertiesHTML = optionsPropertiesHTML.concat(
//           this._getPropertyList(properties)
//         );
//       }

//       return optionsPropertiesHTML;
//     },

//     _getOptionList: function(options) {
//       return $.map(
//         options,
//         function(option) {
//           var $optionElement = this.$itemOptionTemplate.clone();

//           $optionElement
//             .text(option.name + ': ' + option.value)
//             .removeClass(classes.hide);

//           return $optionElement[0];
//         }.bind(this)
//       );
//     },

//     _getPropertyList: function(properties) {
//       var propertiesArray =
//         properties !== null ? Object.entries(properties) : [];

//       return $.map(
//         propertiesArray,
//         function(property) {
//           var $propertyElement = this.$itemPropertyTemplate.clone();

//           // Line item properties prefixed with an underscore are not to be displayed
//           if (property[0].charAt(0) === '_') return;

//           // if the property value has a length of 0 (empty), don't display it
//           if (property[1].length === 0) return;

//           $propertyElement
//             .find(selectors.cartItemPropertyName)
//             .text(property[0]);

//           if (property[0].indexOf('/uploads/') === -1) {
//             $propertyElement
//               .find(selectors.cartItemPropertyValue)
//               .text(': ' + property[1]);
//           } else {
//             $propertyElement
//               .find(selectors.cartItemPropertyValue)
//               .html(
//                 ': <a href="' +
//                   property[1] +
//                   '"> ' +
//                   property[1].split('/').pop() +
//                   '</a>'
//               );
//           }

//           $propertyElement.removeClass(classes.hide);

//           return $propertyElement[0];
//         }.bind(this)
//       );
//     },

//     _createItemPrice: function(original_price, final_price, $priceTemplate) {
//       if (original_price !== final_price) {
//         var $discountedPrice = $(
//           selectors.cartItemDiscountedPriceGroup,
//           $priceTemplate
//         ).clone();

//         $(selectors.cartItemOriginalPrice, $discountedPrice).html(
//           theme.Currency.formatMoney(original_price, theme.moneyFormat)
//         );
//         $(selectors.cartItemFinalPrice, $discountedPrice).html(
//           theme.Currency.formatMoney(final_price, theme.moneyFormat)
//         );
//         $discountedPrice.removeClass(classes.hide);

//         return $discountedPrice[0];
//       } else {
//         var $regularPrice = $(
//           selectors.cartItemRegularPriceGroup,
//           $priceTemplate
//         ).clone();

//         $(selectors.cartItemRegularPrice, $regularPrice).html(
//           theme.Currency.formatMoney(original_price, theme.moneyFormat)
//         );

//         $regularPrice.removeClass(classes.hide);

//         return $regularPrice[0];
//       }
//     },

//     _createUnitPrice: function(
//       unitPrice,
//       unitPriceMeasurement,
//       $itemPriceGroup
//     ) {
//       var $unitPriceGroup = $(
//         selectors.unitPriceGroup,
//         $itemPriceGroup
//       ).clone();

//       var unitPriceBaseUnit =
//         (unitPriceMeasurement.reference_value !== 1
//           ? unitPriceMeasurement.reference_value
//           : '') + unitPriceMeasurement.reference_unit;

//       $(selectors.unitPriceBaseUnit, $unitPriceGroup).text(unitPriceBaseUnit);
//       $(selectors.unitPrice, $unitPriceGroup).html(
//         theme.Currency.formatMoney(unitPrice, theme.moneyFormat)
//       );

//       $unitPriceGroup.removeClass(classes.hide);

//       return $unitPriceGroup[0];
//     },

//     _createItemDiscountList: function(item) {
//       return $.map(
//         item.line_level_discount_allocations,
//         function(discount) {
//           var $discount = this.$itemDiscountTemplate.clone();
//           $discount
//             .find(selectors.cartItemDiscountTitle)
//             .text(discount.discount_application.title);
//           $discount
//             .find(selectors.cartItemDiscountAmount)
//             .html(
//               theme.Currency.formatMoney(discount.amount, theme.moneyFormat)
//             );
//           return $discount[0];
//         }.bind(this)
//       );
//     },

//     _showQuantityErrorMessages: function(itemElement) {
//       $(selectors.cartQuantityErrorMessage, itemElement).text(
//         theme.strings.quantityMinimumMessage
//       );

//       $(selectors.cartQuantityErrorMessageWrapper, itemElement).removeClass(
//         classes.hide
//       );

//       $(selectors.inputQty, itemElement)
//         .addClass(classes.inputError)
//         .focus();
//     },

//     _hideQuantityErrorMessage: function() {
//       var $errorMessages = $(
//         selectors.cartQuantityErrorMessageWrapper
//       ).addClass(classes.hide);

//       $(selectors.cartQuantityErrorMessage, $errorMessages).text('');

//       $(selectors.inputQty, this.$container).removeClass(classes.inputError);
//     },

//     _handleThumbnailClick: function(evt) {
//       var url = $(evt.target)
//         .closest(selectors.cartItem)
//         .data('cart-item-url');

//       window.location.href = url;
//     },

//     _onNoteChange: function(evt) {
//       var note = evt.currentTarget.value;
//       this._hideCartError();
//       this._hideQuantityErrorMessage();

//       var params = {
//         url: '/cart/update.js',
//         data: { note: note },
//         dataType: 'json'
//       };

//       $.post(params).fail(
//         function() {
//           this._showCartError(evt.currentTarget);
//         }.bind(this)
//       );
//     },

//     _showCartError: function(elementToFocus) {
//       $(selectors.cartErrorMessage).text(theme.strings.cartError);

//       $(selectors.cartErrorMessageWrapper).removeClass(classes.hide);

//       elementToFocus.focus();
//     },

//     _hideCartError: function() {
//       $(selectors.cartErrorMessageWrapper).addClass(classes.hide);
//       $(selectors.cartErrorMessage).text('');
//     },

//     _onRemoveItem: function(evt) {
//       evt.preventDefault();
//       var $remove = $(evt.target);
//       var $lineItem = $remove.closest(selectors.cartItem);
//       var index = $lineItem.attr(attributes.cartItemIndex);
//       this._hideCartError();

//       var params = {
//         url: '/cart/change.js',
//         data: { quantity: 0, line: index },
//         dataType: 'json'
//       };

//       $.post(params)
//         .done(
//           function(state) {
//             if (state.item_count === 0) {
//               this._emptyCart();
//             } else {
//               this._createCart(state);
//               this._showRemoveMessage($lineItem.clone());
//             }

//             this._setCartCountBubble(state.item_count);
//           }.bind(this)
//         )
//         .fail(
//           function() {
//             this._showCartError(null);
//           }.bind(this)
//         );
//     },

//     _showRemoveMessage: function(lineItem) {
//       var index = lineItem.data('cart-item-index');
//       var removeMessage = this._getRemoveMessage(lineItem);
//       var $lineItemAtIndex;

//       if (index - 1 === 0) {
//         $lineItemAtIndex = $('[data-cart-item-index="1"]', this.$container);
//         $(removeMessage).insertBefore($lineItemAtIndex);
//       } else {
//         $lineItemAtIndex = $(
//           '[data-cart-item-index="' + (index - 1) + '"]',
//           this.$container
//         );
//         removeMessage.insertAfter($lineItemAtIndex);
//       }
//       removeMessage.focus();
//     },

//     _getRemoveMessage: function(lineItem) {
//       var formattedMessage = this._formatRemoveMessage(lineItem);

//       var $tableCell = $(selectors.cartTableCell, lineItem).clone();
//       $tableCell
//         .removeClass()
//         .addClass(classes.cartRemovedProduct)
//         .attr('colspan', '4')
//         .html(formattedMessage);

//       lineItem
//         .attr('role', 'alert')
//         .html($tableCell)
//         .attr('tabindex', '-1');

//       return lineItem;
//     },

//     _formatRemoveMessage: function(lineItem) {
//       var quantity = lineItem.data('cart-item-quantity');
//       var url = lineItem.attr(attributes.cartItemUrl);
//       var title = lineItem.attr(attributes.cartItemTitle);

//       return theme.strings.removedItemMessage
//         .replace('[quantity]', quantity)
//         .replace(
//           '[link]',
//           '<a ' +
//             'href="' +
//             url +
//             '" class="text-link text-link--accent">' +
//             title +
//             '</a>'
//         );
//     },

//     _setCartCountBubble: function(quantity) {
//       this.$cartCountBubble =
//         this.$cartCountBubble || $(selectors.cartCountBubble);
//       this.$cartCount = this.$cartCount || $(selectors.cartCount);

//       if (quantity > 0) {
//         this.$cartCountBubble.removeClass(classes.hide);
//         this.$cartCount.html(quantity);
//       } else {
//         this.$cartCountBubble.addClass(classes.hide);
//         this.$cartCount.html('');
//       }
//     },

//     _emptyCart: function() {
//       this.$emptyPageContent =
//         this.$emptyPageContent ||
//         $(selectors.emptyPageContent, this.$container);
//       this.$cartWrapper =
//         this.$cartWrapper || $(selectors.cartWrapper, this.$container);

//       this.$emptyPageContent.removeClass(classes.hide);
//       this.$cartWrapper.addClass(classes.hide);
//     },

//     cookiesEnabled: function() {
//       var cookieEnabled = navigator.cookieEnabled;

//       if (!cookieEnabled) {
//         document.cookie = 'testcookie';
//         cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
//       }
//       return cookieEnabled;
//     }
//   });

//   return Cart;
// })();

// window.theme = window.theme || {};

// theme.Filters = (function() {
//   var settings = {
//     // Breakpoints from src/stylesheets/global/variables.scss.liquid
//     mediaQueryMediumUp: 'screen and (min-width: 750px)'
//   };

//   var selectors = {
//     mainContent: '#MainContent',
//     filterSelection: '#FilterTags',
//     sortSelection: '#SortBy'
//   };

//   var data = {
//     sortBy: 'data-default-sortby'
//   };

//   function Filters(container) {
//     var $container = (this.$container = $(container));

//     this.$filterSelect = $(selectors.filterSelection, $container);
//     this.$sortSelect = $(selectors.sortSelection, $container);
//     this.$selects = $(selectors.filterSelection, $container).add(
//       $(selectors.sortSelection, $container)
//     );

//     this.defaultSort = this._getDefaultSortValue();
//     this.$selects.removeClass('hidden');

//     this.$filterSelect.on('change', this._onFilterChange.bind(this));
//     this.$sortSelect.on('change', this._onSortChange.bind(this));
//     this._initBreakpoints();
//     this._initParams();
//   }

//   Filters.prototype = _.assignIn({}, Filters.prototype, {
//     _initBreakpoints: function() {
//       var self = this;

//       enquire.register(settings.mediaQueryMediumUp, {
//         match: function() {
//           slate.utils.resizeSelects(self.$selects);
//         }
//       });
//     },

//     _initParams: function() {
//       self.queryParams = {};
//       if (location.search.length) {
//         var aKeyValue;
//         var aCouples = location.search.substr(1).split('&');
//         for (var i = 0; i < aCouples.length; i++) {
//           aKeyValue = aCouples[i].split('=');
//           if (aKeyValue.length > 1) {
//             self.queryParams[
//               decodeURIComponent(aKeyValue[0])
//             ] = decodeURIComponent(aKeyValue[1]);
//           }
//         }
//       }
//     },

//     _onSortChange: function() {
//       self.queryParams.sort_by = this._getSortValue();
      
//         var sort_val = "/collections/all?" + $.param(self.queryParams);
//       var val= $(".cus-filter-y").find("a").attr('href')
//   $.ajax({
//        type: 'GET',
//        url: sort_val,
//        dataType: 'html',
//        success: function(data) {
         
//          $(data).find(".grid--uniform").html();
//          $(".grid--uniform").html( $(data).find(".grid--uniform").html());
//          window.history.pushState(location.href,'' , sort_val + val );
//     }
//    });

//       if (self.queryParams.page) {
//         delete self.queryParams.page;
//       }
// //       window.location.search = decodeURIComponent($.param(self.queryParams));
//     },

//     _onFilterChange: function() {
//       document.location.href = this._getFilterValue();
//     },

//     _getFilterValue: function() {
//       return this.$filterSelect.val();
//     },

//     _getSortValue: function() {
//       return this.$sortSelect.val() || this.defaultSort;
//     },

//     _getDefaultSortValue: function() {
//       return this.$sortSelect.attr(data.sortBy);
//     },

//     onUnload: function() {
//       this.$filterSelect.off('change', this._onFilterChange);
//       this.$sortSelect.off('change', this._onSortChange);
//     }
//   });

//   return Filters;
// })();

// window.theme = window.theme || {};

// theme.HeaderSection = (function() {
//   function Header() {
//     theme.Header.init();
//     theme.MobileNav.init();
//     theme.SearchDrawer.init();
//     theme.Search.init();
//   }

//   Header.prototype = _.assignIn({}, Header.prototype, {
//     onUnload: function() {
//       theme.Header.unload();
//       theme.Search.unload();
//     }
//   });

//   return Header;
// })();

// theme.Maps = (function() {
//   var config = {
//     zoom: 14
//   };
//   var apiStatus = null;
//   var mapsToLoad = [];

//   var errors = {
//     addressNoResults: theme.strings.addressNoResults,
//     addressQueryLimit: theme.strings.addressQueryLimit,
//     addressError: theme.strings.addressError,
//     authError: theme.strings.authError
//   };

//   var selectors = {
//     section: '[data-section-type="map"]',
//     map: '[data-map]',
//     mapOverlay: '[data-map-overlay]'
//   };

//   var classes = {
//     mapError: 'map-section--load-error',
//     errorMsg: 'map-section__error errors text-center'
//   };

//   // Global function called by Google on auth errors.
//   // Show an auto error message on all map instances.
//   // eslint-disable-next-line camelcase, no-unused-vars
//   window.gm_authFailure = function() {
//     if (!Shopify.designMode) {
//       return;
//     }

//     $(selectors.section).addClass(classes.mapError);
//     $(selectors.map).remove();
//     $(selectors.mapOverlay).after(
//       '<div class="' +
//         classes.errorMsg +
//         '">' +
//         theme.strings.authError +
//         '</div>'
//     );
//   };

//   function Map(container) {
//     this.$container = $(container);
//     this.$map = this.$container.find(selectors.map);
//     this.key = this.$map.data('api-key');

//     if (typeof this.key === 'undefined') {
//       return;
//     }

//     if (apiStatus === 'loaded') {
//       this.createMap();
//     } else {
//       mapsToLoad.push(this);

//       if (apiStatus !== 'loading') {
//         apiStatus = 'loading';
//         if (typeof window.google === 'undefined') {
//           $.getScript(
//             'https://maps.googleapis.com/maps/api/js?key=' + this.key
//           ).then(function() {
//             apiStatus = 'loaded';
//             initAllMaps();
//           });
//         }
//       }
//     }
//   }

//   function initAllMaps() {
//     // API has loaded, load all Map instances in queue
//     $.each(mapsToLoad, function(index, instance) {
//       instance.createMap();
//     });
//   }

//   function geolocate($map) {
//     var deferred = $.Deferred();
//     var geocoder = new google.maps.Geocoder();
//     var address = $map.data('address-setting');

//     geocoder.geocode({ address: address }, function(results, status) {
//       if (status !== google.maps.GeocoderStatus.OK) {
//         deferred.reject(status);
//       }

//       deferred.resolve(results);
//     });

//     return deferred;
//   }

//   Map.prototype = _.assignIn({}, Map.prototype, {
//     createMap: function() {
//       var $map = this.$map;

//       return geolocate($map)
//         .then(
//           function(results) {
//             var mapOptions = {
//               zoom: config.zoom,
//               center: results[0].geometry.location,
//               draggable: false,
//               clickableIcons: false,
//               scrollwheel: false,
//               disableDoubleClickZoom: true,
//               disableDefaultUI: true
//             };

//             var map = (this.map = new google.maps.Map($map[0], mapOptions));
//             var center = (this.center = map.getCenter());

//             //eslint-disable-next-line no-unused-vars
//             var marker = new google.maps.Marker({
//               map: map,
//               position: map.getCenter()
//             });

//             google.maps.event.addDomListener(
//               window,
//               'resize',
//               $.debounce(250, function() {
//                 google.maps.event.trigger(map, 'resize');
//                 map.setCenter(center);
//                 $map.removeAttr('style');
//               })
//             );
//           }.bind(this)
//         )
//         .fail(function() {
//           var errorMessage;

//           switch (status) {
//             case 'ZERO_RESULTS':
//               errorMessage = errors.addressNoResults;
//               break;
//             case 'OVER_QUERY_LIMIT':
//               errorMessage = errors.addressQueryLimit;
//               break;
//             case 'REQUEST_DENIED':
//               errorMessage = errors.authError;
//               break;
//             default:
//               errorMessage = errors.addressError;
//               break;
//           }

//           // Show errors only to merchant in the editor.
//           if (Shopify.designMode) {
//             $map
//               .parent()
//               .addClass(classes.mapError)
//               .html(
//                 '<div class="' +
//                   classes.errorMsg +
//                   '">' +
//                   errorMessage +
//                   '</div>'
//               );
//           }
//         });
//     },

//     onUnload: function() {
//       if (this.$map.length === 0) {
//         return;
//       }
//       google.maps.event.clearListeners(this.map, 'resize');
//     }
//   });

//   return Map;
// })();

// /* eslint-disable no-new */
// theme.Product = (function() {
//   function Product(container) {
//     var $container = (this.$container = $(container));
//     var sectionId = $container.attr('data-section-id');
//     this.ajaxEnabled = $container.data('ajax-enabled');

//     this.settings = {
//       // Breakpoints from src/stylesheets/global/variables.scss.liquid
//       mediaQueryMediumUp: 'screen and (min-width: 750px)',
//       mediaQuerySmall: 'screen and (max-width: 749px)',
//       bpSmall: false,
//       enableHistoryState: $container.data('enable-history-state') || false,
//       namespace: '.slideshow-' + sectionId,
//       sectionId: sectionId,
//       sliderActive: false,
//       zoomEnabled: false
//     };

//     this.selectors = {
//       addToCart: '[data-add-to-cart]',
//       addToCartText: '[data-add-to-cart-text]',
//       cartCount: '[data-cart-count]',
//       cartCountBubble: '[data-cart-count-bubble]',
//       cartPopup: '[data-cart-popup]',
//       cartPopupCartQuantity: '[data-cart-popup-cart-quantity]',
//       cartPopupClose: '[data-cart-popup-close]',
//       cartPopupDismiss: '[data-cart-popup-dismiss]',
//       cartPopupImage: '[data-cart-popup-image]',
//       cartPopupImageWrapper: '[data-cart-popup-image-wrapper]',
//       cartPopupImagePlaceholder: '[data-cart-popup-image-placeholder]',
//       cartPopupPlaceholderSize: '[data-placeholder-size]',
//       cartPopupProductDetails: '[data-cart-popup-product-details]',
//       cartPopupQuantity: '[data-cart-popup-quantity]',
//       cartPopupQuantityLabel: '[data-cart-popup-quantity-label]',
//       cartPopupTitle: '[data-cart-popup-title]',
//       cartPopupWrapper: '[data-cart-popup-wrapper]',
//       loader: '[data-loader]',
//       loaderStatus: '[data-loader-status]',
//       quantity: '[data-quantity-input]',
//       SKU: '.variant-sku',
//       productStatus: '[data-product-status]',
//       originalSelectorId: '#ProductSelect-' + sectionId,
//       productForm: '[data-product-form]',
//       errorMessage: '[data-error-message]',
//       errorMessageWrapper: '[data-error-message-wrapper]',
//       imageZoomWrapper: '[data-image-zoom-wrapper]',
//       productMediaWrapper: '[data-product-single-media-wrapper]',
//       productThumbImages: '.product-single__thumbnail--' + sectionId,
//       productThumbs: '.product-single__thumbnails-' + sectionId,
//       productThumbListItem: '.product-single__thumbnails-item',
//       productThumbsWrapper: '.thumbnails-wrapper',
//       saleLabel: '.product-price__sale-label-' + sectionId,
//       singleOptionSelector: '.single-option-selector-' + sectionId,
//       shopifyPaymentButton: '.shopify-payment-button',
//       productMediaTypeVideo: '[data-product-media-type-video]',
//       productMediaTypeModel: '[data-product-media-type-model]',
//       priceContainer: '[data-price]',
//       regularPrice: '[data-regular-price]',
//       salePrice: '[data-sale-price]',
//       unitPrice: '[data-unit-price]',
//       unitPriceBaseUnit: '[data-unit-price-base-unit]',
//       productPolicies: '[data-product-policies]'
//     };

//     this.classes = {
//       cartPopupWrapperHidden: 'cart-popup-wrapper--hidden',
//       hidden: 'hide',
//       visibilityHidden: 'visibility-hidden',
//       inputError: 'input--error',
//       jsZoomEnabled: 'js-zoom-enabled',
//       productOnSale: 'price--on-sale',
//       productUnitAvailable: 'price--unit-available',
//       productUnavailable: 'price--unavailable',
//       productSoldOut: 'price--sold-out',
//       cartImage: 'cart-popup-item__image',
//       productFormErrorMessageWrapperHidden:
//         'product-form__error-message-wrapper--hidden',
//       activeClass: 'active-thumb',
//       variantSoldOut: 'product-form--variant-sold-out'
//     };

//     this.$quantityInput = $(this.selectors.quantity, $container);
//     this.$errorMessageWrapper = $(
//       this.selectors.errorMessageWrapper,
//       $container
//     );
//     this.$addToCart = $(this.selectors.addToCart, $container);
//     this.$addToCartText = $(this.selectors.addToCartText, this.$addToCart);
//     this.$shopifyPaymentButton = $(
//       this.selectors.shopifyPaymentButton,
//       $container
//     );
//     this.$productPolicies = $(this.selectors.productPolicies, $container);

//     this.$loader = $(this.selectors.loader, this.$addToCart);
//     this.$loaderStatus = $(this.selectors.loaderStatus, $container);

//     // Stop parsing if we don't have the product json script tag when loading
//     // section in the Theme Editor
//     if (!$('#ProductJson-' + sectionId).html()) {
//       return;
//     }

//     this.productSingleObject = JSON.parse(
//       document.getElementById('ProductJson-' + sectionId).innerHTML
//     );

//     this.settings.zoomEnabled = $(this.selectors.imageZoomWrapper).hasClass(
//       this.classes.jsZoomEnabled
//     );

//     this._initBreakpoints();
//     this._stringOverrides();
//     this._initVariants();
//     this._initMediaSwitch();
//     this._initAddToCart();
//     this._setActiveThumbnail();
//     this._initProductVideo();
//     this._initModelViewerLibraries();
//     this._initShopifyXrLaunch();
//   }

//   Product.prototype = _.assignIn({}, Product.prototype, {
//     _stringOverrides: function() {
//       theme.productStrings = theme.productStrings || {};
//       $.extend(theme.strings, theme.productStrings);
//     },

//     _initBreakpoints: function() {
//       var self = this;

//       enquire.register(this.settings.mediaQuerySmall, {
//         match: function() {
//           // initialize thumbnail slider on mobile if more than four thumbnails
//           if ($(self.selectors.productThumbImages).length > 4) {
//             self._initThumbnailSlider();
//           }

//           // destroy image zooming if enabled
//           if (self.settings.zoomEnabled) {
//             $(self.selectors.imageZoomWrapper).each(function() {
//               _destroyZoom(this);
//             });
//           }

//           self.settings.bpSmall = true;
//         },
//         unmatch: function() {
//           if (self.settings.sliderActive) {
//             self._destroyThumbnailSlider();
//           }

//           self.settings.bpSmall = false;
//         }
//       });

//       enquire.register(this.settings.mediaQueryMediumUp, {
//         match: function() {
//           if (self.settings.zoomEnabled) {
//             $(self.selectors.imageZoomWrapper).each(function() {
//               _enableZoom(this);
//             });
//           }
//         }
//       });
//     },

//     _initVariants: function() {
//       var options = {
//         $container: this.$container,
//         enableHistoryState:
//           this.$container.data('enable-history-state') || false,
//         singleOptionSelector: this.selectors.singleOptionSelector,
//         originalSelectorId: this.selectors.originalSelectorId,
//         product: this.productSingleObject
//       };

//       this.variants = new slate.Variants(options);

//       this.$container.on(
//         'variantChange' + this.settings.namespace,
//         this._updateAvailability.bind(this)
//       );
//       this.$container.on(
//         'variantImageChange' + this.settings.namespace,
//         this._updateMedia.bind(this)
//       );
//       this.$container.on(
//         'variantPriceChange' + this.settings.namespace,
//         this._updatePrice.bind(this)
//       );
//       this.$container.on(
//         'variantSKUChange' + this.settings.namespace,
//         this._updateSKU.bind(this)
//       );
//     },

//     _initMediaSwitch: function() {
//       if (!$(this.selectors.productThumbImages).length) {
//         return;
//       }

//       var self = this;

//       $(this.selectors.productThumbImages)
//         .on('click', function(evt) {
//           evt.preventDefault();
//           var $el = $(this);

//           var mediaId = $el.data('thumbnail-id');

//           self._switchMedia(mediaId);
//           self._setActiveThumbnail(mediaId);
//         })
//         .on('keyup', self._handleMediaFocus.bind(self));
//     },

//     _initAddToCart: function() {
//       $(this.selectors.productForm, this.$container).on(
//         'submit',
//         function(evt) {
//           if (this.$addToCart.is('[aria-disabled]')) {
//             evt.preventDefault();
//             return;
//           }

//           if (!this.ajaxEnabled) return;

//           evt.preventDefault();

//           this.$previouslyFocusedElement = $(':focus');

//           var isInvalidQuantity = this.$quantityInput.val() <= 0;

//           if (isInvalidQuantity) {
//             this._showErrorMessage(theme.strings.quantityMinimumMessage);
//             return;
//           }

//           if (!isInvalidQuantity && this.ajaxEnabled) {
//             // disable the addToCart and dynamic checkout button while
//             // request/cart popup is loading and handle loading state
//             this._handleButtonLoadingState(true);
//             var $data = $(this.selectors.productForm, this.$container);
//             this._addItemToCart($data);
//             return;
//           }
//         }.bind(this)
//       );
//     },

//     _initProductVideo: function() {
//       var sectionId = this.settings.sectionId;

//       $(this.selectors.productMediaTypeVideo, this.$container).each(function() {
//         var $el = $(this);
//         theme.ProductVideo.init($el, sectionId);
//       });
//     },

//     _initModelViewerLibraries: function() {
//       var $modelViewerElements = $(
//         this.selectors.productMediaTypeModel,
//         this.$container
//       );
//       if ($modelViewerElements.length < 1) return;
//       theme.ProductModel.init($modelViewerElements, this.settings.sectionId);
//     },

//     _initShopifyXrLaunch: function() {
//       var self = this;
//       $(document).on('shopify_xr_launch', function() {
//         var $currentMedia = $(
//           self.selectors.productMediaWrapper +
//             ':not(.' +
//             self.classes.hidden +
//             ')',
//           self.$container
//         );
//         $currentMedia.trigger('xrLaunch');
//       });
//     },

//     _addItemToCart: function(data) {
//       var params = {
//         url: '/cart/add.js',
//         data: $(data).serialize(),
//         dataType: 'json'
//       };

//       $.post(params)
//         .done(
//           function(item) {
//             this._hideErrorMessage();
//             this._setupCartPopup(item);
//           }.bind(this)
//         )
//         .fail(
//           function(response) {
//             this.$previouslyFocusedElement.focus();
//             var errorMessage = response.responseJSON
//               ? response.responseJSON.description
//               : theme.strings.cartError;
//             this._showErrorMessage(errorMessage);
//             this._handleButtonLoadingState(false);
//           }.bind(this)
//         );
//     },

//     _handleButtonLoadingState: function(isLoading) {
//       if (isLoading) {
//         this.$addToCart.attr('aria-disabled', true);
//         this.$addToCartText.addClass(this.classes.hidden);
//         this.$loader.removeClass(this.classes.hidden);
//         this.$shopifyPaymentButton.attr('disabled', true);
//         this.$loaderStatus.attr('aria-hidden', false);
//       } else {
//         this.$addToCart.removeAttr('aria-disabled');
//         this.$addToCartText.removeClass(this.classes.hidden);
//         this.$loader.addClass(this.classes.hidden);
//         this.$shopifyPaymentButton.removeAttr('disabled');
//         this.$loaderStatus.attr('aria-hidden', true);
//       }
//     },

//     _showErrorMessage: function(errorMessage) {
//       $(this.selectors.errorMessage, this.$container).html(errorMessage);

//       if (this.$quantityInput.length !== 0) {
//         this.$quantityInput.addClass(this.classes.inputError);
//       }

//       this.$errorMessageWrapper
//         .removeClass(this.classes.productFormErrorMessageWrapperHidden)
//         .attr('aria-hidden', true)
//         .removeAttr('aria-hidden');
//     },

//     _hideErrorMessage: function() {
//       this.$errorMessageWrapper.addClass(
//         this.classes.productFormErrorMessageWrapperHidden
//       );

//       if (this.$quantityInput.length !== 0) {
//         this.$quantityInput.removeClass(this.classes.inputError);
//       }
//     },

//     _setupCartPopup: function(item) {
//       this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup);
//       this.$cartPopupWrapper =
//         this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper);
//       this.$cartPopupTitle =
//         this.$cartPopupTitle || $(this.selectors.cartPopupTitle);
//       this.$cartPopupQuantity =
//         this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity);
//       this.$cartPopupQuantityLabel =
//         this.$cartPopupQuantityLabel ||
//         $(this.selectors.cartPopupQuantityLabel);
//       this.$cartPopupClose =
//         this.$cartPopupClose || $(this.selectors.cartPopupClose);
//       this.$cartPopupDismiss =
//         this.$cartPopupDismiss || $(this.selectors.cartPopupDismiss);
//       this.$cartPopupImagePlaceholder =
//         this.$cartPopupImagePlaceholder ||
//         $(this.selectors.cartPopupImagePlaceholder);

//       this._setupCartPopupEventListeners();

//       this._updateCartPopupContent(item);
//     },

//     _updateCartPopupContent: function(item) {
//       var quantity = this.$quantityInput.length ? this.$quantityInput.val() : 1;

//       this.$cartPopupTitle.text(item.product_title);
//       this.$cartPopupQuantity.text(quantity);
//       this.$cartPopupQuantityLabel.text(
//         theme.strings.quantityLabel.replace('[count]', quantity)
//       );

//       this._setCartPopupPlaceholder(
//         item.featured_image.url,
//         item.featured_image.aspect_ratio
//       );
//       this._setCartPopupImage(item.featured_image.url, item.featured_image.alt);
//       this._setCartPopupProductDetails(
//         item.product_has_only_default_variant,
//         item.options_with_values,
//         item.properties
//       );

//       $.getJSON('/cart.js').then(
//         function(cart) {
//           this._setCartQuantity(cart.item_count);
//           this._setCartCountBubble(cart.item_count);
//           this._showCartPopup();
//         }.bind(this)
//       );
//     },

//     _setupCartPopupEventListeners: function() {
//       this.$cartPopupWrapper.on(
//         'keyup',
//         function(event) {
//           if (event.keyCode === slate.utils.keyboardKeys.ESCAPE) {
//             this._hideCartPopup(event);
//           }
//         }.bind(this)
//       );

//       this.$cartPopupClose.on('click', this._hideCartPopup.bind(this));
//       this.$cartPopupDismiss.on('click', this._hideCartPopup.bind(this));
//       $('body').on('click', this._onBodyClick.bind(this));
//     },

//     _setCartPopupPlaceholder: function(imageUrl, imageAspectRatio) {
//       this.$cartPopupImageWrapper =
//         this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper);

//       if (imageUrl === null) {
//         this.$cartPopupImageWrapper.addClass(this.classes.hidden);
//         return;
//       }

//       var $placeholder = $(this.selectors.cartPopupPlaceholderSize);
//       var maxWidth = 95 * imageAspectRatio;
//       var heightRatio = 100 / imageAspectRatio;

//       this.$cartPopupImagePlaceholder.css('max-width', maxWidth);

//       $placeholder.css('padding-top', heightRatio + '%');
//     },

//     _setCartPopupImage: function(imageUrl, imageAlt) {
//       if (imageUrl === null) return;

//       this.$cartPopupImageWrapper.removeClass(this.classes.hidden);
//       var sizedImageUrl = theme.Images.getSizedImageUrl(imageUrl, '200x');
//       var image = document.createElement('img');
//       image.src = sizedImageUrl;
//       image.alt = imageAlt;
//       image.classList.add(this.classes.cartImage);
//       image.dataset.cartPopupImage = '';

//       image.onload = function() {
//         this.$cartPopupImagePlaceholder.addClass(this.classes.hidden);
//         this.$cartPopupImageWrapper.append(image);
//       }.bind(this);
//     },

//     _setCartPopupProductDetails: function(
//       product_has_only_default_variant,
//       options,
//       properties
//     ) {
//       this.$cartPopupProductDetails =
//         this.$cartPopupProductDetails ||
//         $(this.selectors.cartPopupProductDetails);
//       var variantPropertiesHTML = '';

//       if (!product_has_only_default_variant) {
//         variantPropertiesHTML =
//           variantPropertiesHTML + this._getVariantOptionList(options);
//       }

//       if (properties !== null && Object.keys(properties).length !== 0) {
//         variantPropertiesHTML =
//           variantPropertiesHTML + this._getPropertyList(properties);
//       }

//       if (variantPropertiesHTML.length === 0) {
//         this.$cartPopupProductDetails.html('');
//         this.$cartPopupProductDetails.attr('hidden', '');
//       } else {
//         this.$cartPopupProductDetails.html(variantPropertiesHTML);
//         this.$cartPopupProductDetails.removeAttr('hidden');
//       }
//     },

//     _getVariantOptionList: function(variantOptions) {
//       var variantOptionListHTML = '';

//       variantOptions.forEach(function(variantOption) {
//         variantOptionListHTML =
//           variantOptionListHTML +
//           '<li class="product-details__item product-details__item--variant-option">' +
//           variantOption.name +
//           ': ' +
//           variantOption.value +
//           '</li>';
//       });

//       return variantOptionListHTML;
//     },

//     _getPropertyList: function(properties) {
//       var propertyListHTML = '';
//       var propertiesArray = Object.entries(properties);

//       propertiesArray.forEach(function(property) {
//         // Line item properties prefixed with an underscore are not to be displayed
//         if (property[0].charAt(0) === '_') return;

//         // if the property value has a length of 0 (empty), don't display it
//         if (property[1].length === 0) return;

//         propertyListHTML =
//           propertyListHTML +
//           '<li class="product-details__item product-details__item--property">' +
//           '<span class="product-details__property-label">' +
//           property[0] +
//           ': </span>' +
//           property[1];
//         ': ' + '</li>';
//       });

//       return propertyListHTML;
//     },

//     _setCartQuantity: function(quantity) {
//       this.$cartPopupCartQuantity =
//         this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity);
//       var ariaLabel;

//       if (quantity === 1) {
//         ariaLabel = theme.strings.oneCartCount;
//       } else if (quantity > 1) {
//         ariaLabel = theme.strings.otherCartCount.replace('[count]', quantity);
//       }

//       this.$cartPopupCartQuantity.text(quantity).attr('aria-label', ariaLabel);
//     },

//     _setCartCountBubble: function(quantity) {
//       this.$cartCountBubble =
//         this.$cartCountBubble || $(this.selectors.cartCountBubble);
//       this.$cartCount = this.$cartCount || $(this.selectors.cartCount);

//       this.$cartCountBubble.removeClass(this.classes.hidden);
//       this.$cartCount.text(quantity);
//     },

//     _showCartPopup: function() {
//       this.$cartPopupWrapper
//         .prepareTransition()
//         .removeClass(this.classes.cartPopupWrapperHidden);
//       this._handleButtonLoadingState(false);

//       slate.a11y.trapFocus({
//         $container: this.$cartPopupWrapper,
//         $elementToFocus: this.$cartPopup,
//         namespace: 'cartPopupFocus'
//       });
//     },

//     _hideCartPopup: function(event) {
//       var setFocus = event.detail === 0 ? true : false;
//       this.$cartPopupWrapper
//         .prepareTransition()
//         .addClass(this.classes.cartPopupWrapperHidden);

//       $(this.selectors.cartPopupImage).remove();
//       this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden);

//       slate.a11y.removeTrapFocus({
//         $container: this.$cartPopupWrapper,
//         namespace: 'cartPopupFocus'
//       });

//       if (setFocus) this.$previouslyFocusedElement[0].focus();

//       this.$cartPopupWrapper.off('keyup');
//       this.$cartPopupClose.off('click');
//       this.$cartPopupDismiss.off('click');
//       $('body').off('click');
//     },

//     _onBodyClick: function(event) {
//       var $target = $(event.target);

//       if (
//         $target[0] !== this.$cartPopupWrapper[0] &&
//         !$target.parents(this.selectors.cartPopup).length
//       ) {
//         this._hideCartPopup(event);
//       }
//     },

//     _setActiveThumbnail: function(mediaId) {
//       // If there is no element passed, find it by the current product image
//       if (typeof mediaId === 'undefined') {
//         mediaId = $(
//           this.selectors.productMediaWrapper + ':not(.hide)',
//           this.$container
//         ).data('media-id');
//       }

//       var $thumbnailWrappers = $(
//         this.selectors.productThumbListItem + ':not(.slick-cloned)',
//         this.$container
//       );

//       var $activeThumbnail = $thumbnailWrappers.find(
//         this.selectors.productThumbImages +
//           "[data-thumbnail-id='" +
//           mediaId +
//           "']"
//       );

//       $(this.selectors.productThumbImages)
//         .removeClass(this.classes.activeClass)
//         .removeAttr('aria-current');

//       $activeThumbnail.addClass(this.classes.activeClass);
//       $activeThumbnail.attr('aria-current', true);

//       if (!$thumbnailWrappers.hasClass('slick-slide')) {
//         return;
//       }

//       var slideIndex = $activeThumbnail.parent().data('slick-index');

//       $(this.selectors.productThumbs).slick('slickGoTo', slideIndex, true);
//     },

//     _switchMedia: function(mediaId) {
//       var $currentMedia = $(
//         this.selectors.productMediaWrapper +
//           ':not(.' +
//           this.classes.hidden +
//           ')',
//         this.$container
//       );

//       var $newMedia = $(
//         this.selectors.productMediaWrapper +
//           "[data-media-id='" +
//           mediaId +
//           "']",
//         this.$container
//       );

//       var $otherMedia = $(
//         this.selectors.productMediaWrapper +
//           ":not([data-media-id='" +
//           mediaId +
//           "'])",
//         this.$container
//       );

//       $currentMedia.trigger('mediaHidden');
//       $newMedia.removeClass(this.classes.hidden).trigger('mediaVisible');
//       //$otherMedia.addClass(this.classes.hidden);
//     },

//     _handleMediaFocus: function(evt) {
//       if (evt.keyCode !== slate.utils.keyboardKeys.ENTER) return;

//       var mediaId = $(evt.currentTarget).data('thumbnail-id');

//       $(
//         this.selectors.productMediaWrapper +
//           "[data-media-id='" +
//           mediaId +
//           "']",
//         this.$container
//       ).focus();
//     },

//     _initThumbnailSlider: function() {
//       var options = {
//         slidesToShow: 3,
//         slidesToScroll: 2,
//         infinite: false,
//         prevArrow: '.thumbnails-slider__prev--' + this.settings.sectionId,
//         nextArrow: '.thumbnails-slider__next--' + this.settings.sectionId
//       };

//       $(this.selectors.productThumbs).slick(options);

//       // Accessibility concerns not yet fixed in Slick Slider
//       $(this.selectors.productThumbsWrapper, this.$container)
//         .find('.slick-list')
//         .removeAttr('aria-live');
//       $(this.selectors.productThumbsWrapper, this.$container)
//         .find('.slick-disabled')
//         .removeAttr('aria-disabled');

//       this.settings.sliderActive = true;
//     },

//     _destroyThumbnailSlider: function() {
//       $(this.selectors.productThumbs).slick('unslick');
//       this.settings.sliderActive = false;

//       // Accessibility concerns not yet fixed in Slick Slider
//       $(this.selectors.productThumbsWrapper, this.$container)
//         .find('[tabindex="-1"]')
//         .removeAttr('tabindex');
//     },

//     _liveRegionText: function(variant) {
//       // Dummy content for live region
//       var liveRegionText =
//         '[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]';

//       if (!variant) {
//         liveRegionText = theme.strings.unavailable;
//         return liveRegionText;
//       }

//       // Update availability
//       var availability = variant.available ? '' : theme.strings.soldOut + ',';
//       liveRegionText = liveRegionText.replace('[Availability]', availability);

//       // Update pricing information
//       var regularLabel = '';
//       var regularPrice = theme.Currency.formatMoney(
//         variant.price,
//         theme.moneyFormat
//       );
//       var saleLabel = '';
//       var salePrice = '';
//       var unitLabel = '';
//       var unitPrice = '';

//       if (variant.compare_at_price > variant.price) {
//         regularLabel = theme.strings.regularPrice;
//         regularPrice =
//           theme.Currency.formatMoney(
//             variant.compare_at_price,
//             theme.moneyFormat
//           ) + ',';
//         saleLabel = theme.strings.sale;
//         salePrice = theme.Currency.formatMoney(
//           variant.price,
//           theme.moneyFormat
//         );
//       }

//       if (variant.unit_price) {
//         unitLabel = theme.strings.unitPrice;
//         unitPrice =
//           theme.Currency.formatMoney(variant.unit_price, theme.moneyFormat) +
//           ' ' +
//           theme.strings.unitPriceSeparator +
//           ' ' +
//           this._getBaseUnit(variant);
//       }

//       liveRegionText = liveRegionText
//         .replace('[Regular]', regularLabel)
//         .replace('[$$]', regularPrice)
//         .replace('[Sale]', saleLabel)
//         .replace('[$]', salePrice)
//         .replace('[UnitPrice]', unitLabel)
//         .replace('[$$$]', unitPrice)
//         .trim();

//       return liveRegionText;
//     },

//     _updateLiveRegion: function(evt) {
//       var variant = evt.variant;
//       var liveRegion = this.container.querySelector(
//         this.selectors.productStatus
//       );
//       liveRegion.innerHTML = this._liveRegionText(variant);
//       liveRegion.setAttribute('aria-hidden', false);

//       // hide content from accessibility tree after announcement
//       setTimeout(function() {
//         liveRegion.setAttribute('aria-hidden', true);
//       }, 1000);
//     },

//     _updateAddToCart: function(evt) {
//       var variant = evt.variant;

//       if (variant) {
//         if (variant.available) {
//           this.$addToCart
//             .removeAttr('aria-disabled')
//             .attr('aria-label', theme.strings.addToCart);
//           $(this.selectors.addToCartText, this.$container).text(
//             theme.strings.addToCart
//           );
//           $(this.selectors.productForm, this.container).removeClass(
//             this.classes.variantSoldOut
//           );
//         } else {
//           // Variant is sold out, disable submit button and change the text.
//           this.$addToCart
//             .attr('aria-disabled', true)
//             .attr('aria-label', theme.strings.soldOut);
//           $(this.selectors.addToCartText, this.$container).text(
//             theme.strings.soldOut
//           );
//           $(this.selectors.productForm, this.container).addClass(
//             this.classes.variantSoldOut
//           );
//         }
//       } else {
//         // The variant doesn't exist, disable submit button and change the text.
//         this.$addToCart
//           .attr('aria-disabled', true)
//           .attr('aria-label', theme.strings.unavailable);
//         $(this.selectors.addToCartText, this.$container).text(
//           theme.strings.unavailable
//         );
//         $(this.selectors.productForm, this.container).addClass(
//           this.classes.variantSoldOut
//         );
//       }
//     },

//     _updateAvailability: function(evt) {
//       // remove error message if one is showing
//       this._hideErrorMessage();

//       // update form submit
//       this._updateAddToCart(evt);
//       // update live region
//       this._updateLiveRegion(evt);

//       this._updatePrice(evt);
//     },

//     _updateMedia: function(evt) {
//       var variant = evt.variant;
//       var mediaId = variant.featured_media.id;
//       var sectionMediaId = this.settings.sectionId + '-' + mediaId;

//       this._switchMedia(sectionMediaId);
//       this._setActiveThumbnail(sectionMediaId);
//     },

//     _updatePrice: function(evt) {
//       var variant = evt.variant;
//       var $priceContainer = $(this.selectors.priceContainer, this.$container);
//       var $regularPrice = $(this.selectors.regularPrice, $priceContainer);
//       var $salePrice = $(this.selectors.salePrice, $priceContainer);
//       var $unitPrice = $(this.selectors.unitPrice, $priceContainer);
//       var $unitPriceBaseUnit = $(
//         this.selectors.unitPriceBaseUnit,
//         $priceContainer
//       );

//       // Reset product price state
//       $priceContainer
//         .removeClass(this.classes.productUnavailable)
//         .removeClass(this.classes.productOnSale)
//         .removeClass(this.classes.productUnitAvailable)
//         .removeClass(this.classes.productSoldOut)
//         .removeAttr('aria-hidden');

//       this.$productPolicies.removeClass(this.classes.visibilityHidden);

//       // Unavailable
//       if (!variant) {
//         $priceContainer
//           .addClass(this.classes.productUnavailable)
//           .attr('aria-hidden', true);

//         this.$productPolicies.addClass(this.classes.visibilityHidden);
//         return;
//       }

//       // Sold out
//       if (!variant.available) {
//         $priceContainer.addClass(this.classes.productSoldOut);
//       }

//       // On sale
//       if (variant.compare_at_price > variant.price) {
//         $regularPrice.html(
//           theme.Currency.formatMoney(
//             variant.compare_at_price,
//             theme.moneyFormat
//           )
//         );
//         $salePrice.html(
//           theme.Currency.formatMoney(variant.price, theme.moneyFormat)
//         );
//         $priceContainer.addClass(this.classes.productOnSale);
//       } else {
//         // Regular price
//         $regularPrice.html(
//           theme.Currency.formatMoney(variant.price, theme.moneyFormat)
//         );
//       }

//       // Unit price
//       if (variant.unit_price) {
//         $unitPrice.html(
//           theme.Currency.formatMoney(variant.unit_price, theme.moneyFormat)
//         );
//         $unitPriceBaseUnit.html(this._getBaseUnit(variant));
//         $priceContainer.addClass(this.classes.productUnitAvailable);
//       }
//     },

//     _getBaseUnit: function(variant) {
//       return variant.unit_price_measurement.reference_value === 1
//         ? variant.unit_price_measurement.reference_unit
//         : variant.unit_price_measurement.reference_value +
//             variant.unit_price_measurement.reference_unit;
//     },

//     _updateSKU: function(evt) {
//       var variant = evt.variant;

//       // Update the sku
//       $(this.selectors.SKU).html(variant.sku);
//     },

//     onUnload: function() {
//       this.$container.off(this.settings.namespace);
//       theme.ProductVideo.removeSectionVideos(this.settings.sectionId);
//       theme.ProductModel.removeSectionModels(this.settings.sectionId);
//     }
//   });

//   function _enableZoom(el) {
//     var zoomUrl = $(el).data('zoom');
//     $(el).zoom({
//       url: zoomUrl
//     });
//   }

//   function _destroyZoom(el) {
//     $(el).trigger('zoom.destroy');
//   }

//   return Product;
// })();

// theme.ProductRecommendations = (function() {
//   function ProductRecommendations(container) {
//     this.$container = $(container);

//     var baseUrl = this.$container.data('baseUrl');
//     var productId = this.$container.data('productId');
//     var recommendationsSectionUrl =
//       baseUrl +
//       '?section_id=product-recommendations&product_id=' +
//       productId +
//       '&limit=4';

//     $.get(recommendationsSectionUrl).then(
//       function(section) {
//         var recommendationsMarkup = $(section).html();
//         if (recommendationsMarkup.trim() !== '') {
//           this.$container.html(recommendationsMarkup);
//         }
//       }.bind(this)
//     );
//   }

//   return ProductRecommendations;
// })();

// theme.Quotes = (function() {
//   var config = {
//     mediaQuerySmall: 'screen and (max-width: 749px)',
//     mediaQueryMediumUp: 'screen and (min-width: 750px)',
//     slideCount: 0
//   };
//   var defaults = {
//     accessibility: true,
//     arrows: true,
//     dots: false,
//     autoplay: false,
//     touchThreshold: 20,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };

//   function Quotes(container) {
//     var $container = (this.$container = $(container));
//     var sectionId = $container.attr('data-section-id');
//     var wrapper = (this.wrapper = '.quotes-wrapper');
//     var slider = (this.slider = '#Quotes-' + sectionId);
//     var $slider = $(slider, wrapper);

//     var sliderActive = false;
//     var mobileOptions = $.extend({}, defaults, {
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: true,
//       adaptiveHeight: true
//     });

//     config.slideCount = $slider.data('count');

//     // Override slidesToShow/Scroll if there are not enough blocks
//     if (config.slideCount < defaults.slidesToShow) {
//       defaults.slidesToShow = config.slideCount;
//       defaults.slidesToScroll = config.slideCount;
//     }

//     $slider.on('init', this.a11y.bind(this));

//     enquire.register(config.mediaQuerySmall, {
//       match: function() {
//         initSlider($slider, mobileOptions);
//       }
//     });

//     enquire.register(config.mediaQueryMediumUp, {
//       match: function() {
//         initSlider($slider, defaults);
//       }
//     });

//     function initSlider(sliderObj, args) {
//       if (sliderActive) {
//         sliderObj.slick('unslick');
//         sliderActive = false;
//       }

//       sliderObj.slick(args);
//       sliderActive = true;
//     }
//   }

//   Quotes.prototype = _.assignIn({}, Quotes.prototype, {
//     onUnload: function() {
//       enquire.unregister(config.mediaQuerySmall);
//       enquire.unregister(config.mediaQueryMediumUp);

//       $(this.slider, this.wrapper).slick('unslick');
//     },

//     onBlockSelect: function(evt) {
//       // Ignore the cloned version
//       var $slide = $(
//         '.quotes-slide--' + evt.detail.blockId + ':not(.slick-cloned)'
//       );
//       var slideIndex = $slide.data('slick-index');

//       // Go to selected slide, pause autoplay
//       $(this.slider, this.wrapper).slick('slickGoTo', slideIndex);
//     },

//     a11y: function(event, obj) {
//       var $list = obj.$list;
//       var $wrapper = $(this.wrapper, this.$container);

//       // Remove default Slick aria-live attr until slider is focused
//       $list.removeAttr('aria-live');

//       // When an element in the slider is focused set aria-live
//       $wrapper.on('focusin', function(evt) {
//         if ($wrapper.has(evt.target).length) {
//           $list.attr('aria-live', 'polite');
//         }
//       });

//       // Remove aria-live
//       $wrapper.on('focusout', function(evt) {
//         if ($wrapper.has(evt.target).length) {
//           $list.removeAttr('aria-live');
//         }
//       });
//     }
//   });

//   return Quotes;
// })();

// theme.slideshows = {};

// theme.SlideshowSection = (function() {
//   function SlideshowSection(container) {
//     var $container = (this.$container = $(container));
//     var sectionId = $container.attr('data-section-id');
//     var slideshow = (this.slideshow = '#Slideshow-' + sectionId);

//     theme.slideshows[slideshow] = new theme.Slideshow(slideshow, sectionId);
//   }

//   return SlideshowSection;
// })();

// theme.SlideshowSection.prototype = _.assignIn(
//   {},
//   theme.SlideshowSection.prototype,
//   {
//     onUnload: function() {
//       delete theme.slideshows[this.slideshow];
//     },

//     onBlockSelect: function(evt) {
//       var $slideshow = $(this.slideshow);
//       var adaptHeight = $slideshow.data('adapt-height');

//       if (adaptHeight) {
//         theme.slideshows[this.slideshow].setSlideshowHeight();
//       }

//       // Ignore the cloned version
//       var $slide = $(
//         '.slideshow__slide--' + evt.detail.blockId + ':not(.slick-cloned)'
//       );
//       var slideIndex = $slide.data('slick-index');

//       // Go to selected slide, pause auto-rotate
//       $slideshow.slick('slickGoTo', slideIndex).slick('slickPause');
//     },

//     onBlockDeselect: function() {
//       // Resume auto-rotate
//       $(this.slideshow).slick('slickPlay');
//     }
//   }
// );

// theme.slideshows = {};

// theme.VideoSection = (function() {
//   function VideoSection(container) {
//     var $container = (this.$container = $(container));

//     $('.video', $container).each(function() {
//       var $el = $(this);
//       theme.Video.init($el);
//       theme.Video.editorLoadVideo($el.attr('id'));
//     });
//   }

//   return VideoSection;
// })();

// theme.VideoSection.prototype = _.assignIn({}, theme.VideoSection.prototype, {
//   onUnload: function() {
//     theme.Video.removeEvents();
//   }
// });

// theme.heros = {};

// theme.HeroSection = (function() {
//   function HeroSection(container) {
//     var $container = (this.$container = $(container));
//     var sectionId = $container.attr('data-section-id');
//     var hero = '#Hero-' + sectionId;
//     theme.heros[hero] = new theme.Hero(hero, sectionId);
//   }

//   return HeroSection;
// })();

// window.theme = window.theme || {};

// var selectors = {
//   disclosureLocale: '[data-disclosure-locale]',
//   disclosureCurrency: '[data-disclosure-currency]'
// };

// theme.FooterSection = (function() {
//   function Footer(container) {
//     this.$container = $(container);
//     this.cache = {};
//     this.cacheSelectors();

//     if (this.cache.$localeDisclosure.length) {
//       this.localeDisclosure = new theme.Disclosure(
//         this.cache.$localeDisclosure
//       );
//     }

//     if (this.cache.$currencyDisclosure.length) {
//       this.currencyDisclosure = new theme.Disclosure(
//         this.cache.$currencyDisclosure
//       );
//     }
//   }

//   Footer.prototype = _.assignIn({}, Footer.prototype, {
//     cacheSelectors: function() {
//       this.cache = {
//         $localeDisclosure: this.$container.find(selectors.disclosureLocale),
//         $currencyDisclosure: this.$container.find(selectors.disclosureCurrency)
//       };
//     },

//     onUnload: function() {
//       if (this.cache.$localeDisclosure.length) {
//         this.localeDisclosure.unload();
//       }

//       if (this.cache.$currencyDisclosure.length) {
//         this.currencyDisclosure.unload();
//       }
//     }
//   });

//   return Footer;
// })();


// $(document).ready(function() {
//   var sections = new theme.Sections();

//   sections.register('cart-template', theme.Cart);
//   sections.register('product', theme.Product);
//   sections.register('collection-template', theme.Filters);
//   sections.register('product-template', theme.Product);
//   sections.register('header-section', theme.HeaderSection);
//   sections.register('map', theme.Maps);
//   sections.register('slideshow-section', theme.SlideshowSection);
//   sections.register('video-section', theme.VideoSection);
//   sections.register('quotes', theme.Quotes);
//   sections.register('hero-section', theme.HeroSection);
//   sections.register('product-recommendations', theme.ProductRecommendations);
//   sections.register('footer-section', theme.FooterSection);
// });

// theme.init = function() {
//   theme.customerTemplates.init();

//   // Theme-specific selectors to make tables scrollable
//   var tableSelectors = '.rte table,' + '.custom__item-inner--html table';

//   slate.rte.wrapTable({
//     $tables: $(tableSelectors),
//     tableWrapperClass: 'scrollable-wrapper'
//   });

//   // Theme-specific selectors to make iframes responsive
//   var iframeSelectors =
//     '.rte iframe[src*="youtube.com/embed"],' +
//     '.rte iframe[src*="player.vimeo"],' +
//     '.custom__item-inner--html iframe[src*="youtube.com/embed"],' +
//     '.custom__item-inner--html iframe[src*="player.vimeo"]';

//   slate.rte.wrapIframe({
//     $iframes: $(iframeSelectors),
//     iframeWrapperClass: 'video-wrapper'
//   });

//   // Common a11y fixes
//   slate.a11y.pageLinkFocus($(window.location.hash));

//   $('.in-page-link').on('click', function(evt) {
//     slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
//   });

//   $('a[href="#"]').on('click', function(evt) {
//     evt.preventDefault();
//   });

//   slate.a11y.accessibleLinks({
//     messages: {
//       newWindow: theme.strings.newWindow,
//       external: theme.strings.external,
//       newWindowExternal: theme.strings.newWindowExternal
//     },
//     $links: $('a[href]:not([aria-describedby], .product-single__thumbnail)')
//   });

//   theme.FormStatus.init();

//   var selectors = {
//     image: '[data-image]',
//     imagePlaceholder: '[data-image-placeholder]',
//     imageWithPlaceholderWrapper: '[data-image-with-placeholder-wrapper]',
//     lazyloaded: '.lazyloaded'
//   };

//   var classes = {
//     hidden: 'hide'
//   };

//   $(document).on('lazyloaded', function(e) {
//     var $target = $(e.target);

//     if ($target.data('bgset')) {
//       var $image = $target.find(selectors.lazyloaded);
//       if ($image.length) {
//         var alt = $target.data('alt');
//         var src = $image.data('src') ? $image.data('src') : $target.data('bg');

//         $image.attr('alt', alt ? alt : '');
//         $image.attr('src', src ? src : '');
//       }
//     }

//     if (!$target.is(selectors.image)) {
//       return;
//     }

//     $target
//       .closest(selectors.imageWithPlaceholderWrapper)
//       .find(selectors.imagePlaceholder)
//       .addClass(classes.hidden);
//   });

//   // When the theme loads, lazysizes might load images before the "lazyloaded"
//   // event listener has been attached. When this happens, the following function
//   // hides the loading placeholders.
//   function onLoadHideLazysizesAnimation() {
//     $(selectors.image + '.lazyloaded')
//       .closest(selectors.imageWithPlaceholderWrapper)
//       .find(selectors.imagePlaceholder)
//       .addClass(classes.hidden);
//   }

//   onLoadHideLazysizesAnimation();
//   $(document).one('touchstart', function() {
//     theme.Helpers.setTouch();
//   });
// };

// // Youtube API callback
// // eslint-disable-next-line no-unused-vars
// function onYouTubeIframeAPIReady() {
//   theme.Video.loadVideos();
//   theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
// }

// $(theme.init);

//         $('.collection-slider').slick({
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               autoplay:false,
//               autoplaySpeed: 2000,
//               arrows: true,
//               prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
//               nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
//         });

//         $('.bg-img-slider').slick({
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               autoplay:false,
//               autoplaySpeed: 2000,
//               arrows: true,
//               prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
//               nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
//         });



// // ============================ajax=add=to=cart

// $(".ad-to-cart-home-page").click(function(e) {
// 		e.preventDefault();
//   var val= $(this)
//   $.ajax({
//        type: 'POST',
//        url: '/cart/add.js',
//        data: $(this).closest('form').serialize(),
//        dataType: 'json',
//        success: function(cart) {
//          min_cart();
//          $.getJSON("/cart.js", function(cart) {
// //            console.log(cart);
//            //$("#navigate span").text('Total ' + Shopify.formatMoney(cart.total_price));
//            $("#cus-cart-atc").html(cart.item_count);
//            $("#cus-cart-atc-price").html(theme.Currency.formatMoney(cart.items_subtotal_price,theme.moneyFormat));
           
           
//          });
//          val.closest(".grid__item").find('.cus-cart-info').html('ADDED TO CART');
//        },
//      	 error: function() {
//             val.closest(".grid__item").find('.cus-cart-info').html('NOT TO CART');
//        }
//    });
// });

// function min_cart(){
//   $.ajax({
//     url:'/',
//     type:'GET',
//     success: function(data){
// //       console.log('data is'+data);
//       $('.cus-cart-popup').html($(data).find('.cus-cart-popup').html());
//       $('.site-header__cart-count').html($(data).find('.site-header__cart-count').html());
//       $(".cus-cart-popup, .cus-popup-overlay").delay( 1000 ).addClass("open-modal");
//     }
//   });
// }

// $(document).on("click",'.cart__remove',function(e){
//   e.preventDefault();
//   var vid = $(this).attr('data-vid');
//   var p_data = {
//     id: vid,
//     quantity: 0
//   }
//   $.ajax({
//     type: "POST",
//     context: this,
//     url: '/cart/change.js',
//     data: p_data,
//     dataType: 'json',
//     success: function(responce){
//       min_cart();
      
//     }
//   });
// });

// // ============================sticky=header


// $(window).scroll(function(){
//   var sticky = $('.site-header'),
//       scroll = $(window).scrollTop();

//   if (scroll >= 100) sticky.addClass('fixed');
//   else sticky.removeClass('fixed');
// });

 
// // ============================variant=price=available=or=not=and=quantity

// 	  $(document).on('change',".product-select", function () {
			
//         $(this).closest(".slick-slide").find("[data-cus-price]").html($(this).find(":selected").attr("data-price"));
//       	$(this).closest(".cus-product-detail").find("[data-cus-price]").html($(this).find(":selected").attr("data-price"));	
//             var invntry_quantity = $(this).find(":selected").attr("data-inventory")
                
//             if(invntry_quantity > 0){
//               $(this).closest(".grid__item").find('.variant-quantity p').html(+invntry_quantity+ '&nbsp;products available')
//             }
//             else{
//               $(this).closest(".grid__item").find('.variant-quantity p').html(" This product not available")
//           }
//  		});

//         $(".tabbing-index a").click(function(e) {
//               e.preventDefault();
//               var val= $(this).attr('href');

// 			$(".tabbing-index a.nav-active").removeClass("nav-active");
//           	$(this).addClass("nav-active");
// 			$(".index-product.active").removeClass("active");
//           	$(val).addClass("active");
          	
//         });


//   $('.slider-image').slick({
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay:false,
//       autoplaySpeed: 2000,
//       arrows: true,
//       prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
//       nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
//   });



// $(window).load(function () {
//   $(".trigger_popup_fricc").click(function(){
//     $('.hover_bkgr_fricc').show();
//   });
//   $('.hover_bkgr_fricc').click(function(){
//     $('.hover_bkgr_fricc').hide();
//   });
//   $('.popupCloseButton').click(function(){
//     $('.hover_bkgr_fricc').hide();
//   });
// });



// // ============================ajax=filter

// $(document).on("click", '.cus-filter-y' , function(e){

// 		e.preventDefault();

//   var val= $(this).find("a").attr('href')
//   $.ajax({
//        type: 'GET',
//        url: val,
//        dataType: 'html',
//        success: function(data) {
         
//          $(data).find(".grid--uniform").html();
//          $(".grid--uniform").html($(data).find(".grid--uniform").html());
//          $(data).find(".cus-filter-t").html();
//          $(".cus-filter-t").html($(data).find(".cus-filter-t").html());
//          window.history.pushState(location.href,'' , val);
//     }
//    });
// });

// // ============================pagination

// $(document).on("click", '.loadmore-pagination' , function(e){
// 		e.preventDefault();
//   var val= $(this).attr('href')
//   $.ajax({
//        type: 'GET',
//        url: val,
//        dataType: 'html',
//        success: function(data) {
	   
//           $(data).find(".grid--uniform").html();
//           $(".grid--uniform").append($(data).find(".grid--uniform").html());
//           $(data).find(".show-more-cus").html();
//           $(".show-more-cus").html($(data).find(".show-more-cus").html());
//           if(typeof  val !== "undefined") {
//             $(this).prop("disabled",true);
//           }
//        }
//    });
// });


// // ============================variant image change with price with slider


// $(document).ready(function() {
//   thumbnails = $('#ProductThumbs-product img[src*="/products/"]');
//   if (thumbnails.length) {
//     thumbnails.on('click', function() {
//       var arrImage = $(this).attr('src').split('?')[0].split('.');
//       var strExtention = arrImage.pop();
//       var strRemaining = arrImage.pop()
//       .replace(/_(pico|icon|thumb|small|compact|medium|large|grande)/gi, '')
//       .replace(/_[a-zA-Z0-9@]+$/,'');
//       var strNewImage = arrImage.join('.')+"."+strRemaining+"."+strExtention;
//       if (typeof variantImages[strNewImage] !== 'undefined') {
//           productOptions.forEach(function (value, i) {
//            optionValue = variantImages[strNewImage]['option-'+i];
//            if (optionValue !== null && optionValue !== 'undefined' && $('.single-option-selector:eq('+i+') option').filter(function() {
//              var text = $(this).text();
//              if(theme !== null && theme.strings !== 'undefined' ){
//                 text = text.replace(" - "+theme.strings.Unavailable, "").replace(" - "+theme.strings.soldOut, "")
//              }
//              return text === optionValue }).length) {
//              $('.single-option-selector:eq('+i+')').val(optionValue).trigger('change');
//            }
//         });
//       }
//     });
//   }
// });



// $(document).on("click",".product-single__thumbnails-item", function(){
     

//     var cus_slide_img = $(this).find('a').attr('data-thumbnail-id');
  
//   var data_index = $('[data-thumbnail-id="'+cus_slide_img+'"]').attr("data-slick-index");
  
//     $(".slider-image").slick("slickGoTo", data_index);

// });


// // ============================

// $(".title-tabbing li a").click(function(e) {
//   e.preventDefault();
//   var val= $(this).attr('href');
//   $(".title-tabbing li a.nav-active").removeClass("nav-active");
//   $(this).addClass("nav-active");
//   $(".cus-block-img-filter.active").removeClass("active");
//   $(val).addClass("active");
// });

// $(document).on("click",".cus-showmore-btn",function(e){  
//   var counter=parseInt($(this).attr('data-counter'));
//   var counter=counter+4;
//   var total=parseInt($(this).attr('data-count-total'));
//   var val=$(this).attr('data-href');
//   for(var i=1;i<=counter;i++){
//     $(val+' div[data-counter="'+i+'"]').show();
//   }
//   $(this).attr("data-counter",counter);
//   if(counter >= total){
//     $(this).attr("disabled","disabled")
//   }
// });  


// $(document).on("click",".cus-overlay",function(e){  
//   e.preventDefault();
//   $(".cus-cart-popup, .cus-popup-overlay").removeClass("open-modal")
// });
// $(document).on("click",".site-header__cart",function(e){ 
//   e.preventDefault();
//   $(".cus-cart-popup, .cus-popup-overlay").addClass("open-modal")
// });



window.theme=window.theme||{},window.theme=window.theme||{},theme.Sections=function(){this.constructors={},this.instances=[],$(document).on("shopify:section:load",this._onSectionLoad.bind(this)).on("shopify:section:unload",this._onSectionUnload.bind(this)).on("shopify:section:select",this._onSelect.bind(this)).on("shopify:section:deselect",this._onDeselect.bind(this)).on("shopify:block:select",this._onBlockSelect.bind(this)).on("shopify:block:deselect",this._onBlockDeselect.bind(this))},theme.Sections.prototype=_.assignIn({},theme.Sections.prototype,{_createInstance:function(e,t){var i=$(e),a=i.attr("data-section-id"),s=i.attr("data-section-type");if(t=t||this.constructors[s],!_.isUndefined(t)){var r=_.assignIn(new t(e),{id:a,type:s,container:e});this.instances.push(r)}},_onSectionLoad:function(e){var t=$("[data-section-id]",e.target)[0];t&&this._createInstance(t)},_onSectionUnload:function(e){this.instances=_.filter(this.instances,function(t){var i=t.id===e.detail.sectionId;return i&&_.isFunction(t.onUnload)&&t.onUnload(e),!i})},_onSelect:function(e){var t=_.find(this.instances,function(t){return t.id===e.detail.sectionId});!_.isUndefined(t)&&_.isFunction(t.onSelect)&&t.onSelect(e)},_onDeselect:function(e){var t=_.find(this.instances,function(t){return t.id===e.detail.sectionId});!_.isUndefined(t)&&_.isFunction(t.onDeselect)&&t.onDeselect(e)},_onBlockSelect:function(e){var t=_.find(this.instances,function(t){return t.id===e.detail.sectionId});!_.isUndefined(t)&&_.isFunction(t.onBlockSelect)&&t.onBlockSelect(e)},_onBlockDeselect:function(e){var t=_.find(this.instances,function(t){return t.id===e.detail.sectionId});!_.isUndefined(t)&&_.isFunction(t.onBlockDeselect)&&t.onBlockDeselect(e)},register:function(e,t){this.constructors[e]=t,$("[data-section-type="+e+"]").each(function(e,i){this._createInstance(i,t)}.bind(this))}}),window.slate=window.slate||{},slate.utils={getParameterByName:function(e,t){t||(t=window.location.href),e=e.replace(/[[\]]/g,"\\$&");var i=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null},resizeSelects:function(e){e.each(function(){var e=$(this),t=e.find("option:selected").text(),i=$("<span>").html(t);i.appendTo("body");var a=i.width();i.remove(),e.width(a+10)})},keyboardKeys:{TAB:9,ENTER:13,ESCAPE:27,LEFTARROW:37,RIGHTARROW:39}},window.slate=window.slate||{},slate.rte={wrapTable:function(e){e.$tables.wrap('<div class="'+e.tableWrapperClass+'"></div>')},wrapIframe:function(e){e.$iframes.each(function(){$(this).wrap('<div class="'+e.iframeWrapperClass+'"></div>'),this.src=this.src})}},window.slate=window.slate||{},slate.a11y={pageLinkFocus:function(e){var t="js-focus-hidden";e.first().attr("tabIndex","-1").focus().addClass(t).one("blur",function(){e.first().removeClass(t).removeAttr("tabindex")})},focusHash:function(){var e=window.location.hash;e&&document.getElementById(e.slice(1))&&this.pageLinkFocus($(e))},bindInPageLinks:function(){$("a[href*=#]").on("click",function(e){this.pageLinkFocus($(e.currentTarget.hash))}.bind(this))},trapFocus:function(e){var t={focusin:e.namespace?"focusin."+e.namespace:"focusin",focusout:e.namespace?"focusout."+e.namespace:"focusout",keydown:e.namespace?"keydown."+e.namespace:"keydown.handleFocus"},i=e.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),a=i[0],s=i[i.length-1];e.$elementToFocus||(e.$elementToFocus=e.$container),e.$container.attr("tabindex","-1"),e.$elementToFocus.focus(),$(document).off("focusin"),$(document).on(t.focusout,function(){$(document).off(t.keydown)}),$(document).on(t.focusin,function(e){e.target!==s&&e.target!==a||$(document).on(t.keydown,function(e){!function(e){e.keyCode===slate.utils.keyboardKeys.TAB&&(e.target!==s||e.shiftKey||(e.preventDefault(),a.focus()),e.target===a&&e.shiftKey&&(e.preventDefault(),s.focus()))}(e)})})},removeTrapFocus:function(e){var t=e.namespace?"focusin."+e.namespace:"focusin";e.$container&&e.$container.length&&e.$container.removeAttr("tabindex"),$(document).off(t)},accessibleLinks:function(e){var t=document.querySelector("body"),i={newWindow:"a11y-new-window-message",external:"a11y-external-message",newWindowExternal:"a11y-new-window-external-message"};void 0!==e.$links&&e.$links.jquery||(e.$links=$("a[href]:not([aria-describedby])")),$.each(e.$links,function(){var e=$(this),t=e.attr("target"),a=e.attr("rel"),s=function(e){var t=window.location.hostname;return e[0].hostname!==t}(e),r="_blank"===t;s&&e.attr("aria-describedby",i.external),r&&(void 0!==a&&-1!==a.indexOf("noopener")||e.attr("rel",function(e,t){return(void 0===t?"":t+" ")+"noopener"}),e.attr("aria-describedby",i.newWindow)),s&&r&&e.attr("aria-describedby",i.newWindowExternal)}),function(e){"object"!=typeof e&&(e={});var a=$.extend({newWindow:"Opens in a new window.",external:"Opens external website.",newWindowExternal:"Opens external website in a new window."},e),s=document.createElement("ul"),r="";for(var n in a)r+="<li id="+i[n]+">"+a[n]+"</li>";s.setAttribute("hidden",!0),s.innerHTML=r,t.appendChild(s)}(e.messages)}},theme.Images=function(){return{preload:function(e,t){"string"==typeof e&&(e=[e]);for(var i=0;i<e.length;i++){var a=e[i];this.loadImage(this.getSizedImageUrl(a,t))}},loadImage:function(e){(new Image).src=e},switchImage:function(e,t,i){var a=this.imageSize(t.src),s=this.getSizedImageUrl(e.src,a);i?i(s,e,t):t.src=s},imageSize:function(e){var t=e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/);return null!==t?void 0!==t[2]?t[1]+t[2]:t[1]:null},getSizedImageUrl:function(e,t){if(null===t)return e;if("master"===t)return this.removeProtocol(e);var i=e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null!==i){var a=e.split(i[0]),s=i[0];return this.removeProtocol(a[0]+"_"+t+s)}return null},removeProtocol:function(e){return e.replace(/http(s)?:/,"")}}}(),theme.Currency=function(){var e="${{amount}}";return{formatMoney:function(t,i){"string"==typeof t&&(t=t.replace(".",""));var a="",s=/\{\{\s*(\w+)\s*\}\}/,r=i||e;function n(e,t,i,a){if(i=i||",",a=a||".",isNaN(e)||null===e)return 0;var s=(e=(e/100).toFixed(t)).split(".");return s[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+i)+(s[1]?a+s[1]:"")}switch(r.match(s)[1]){case"amount":a=n(t,2);break;case"amount_no_decimals":a=n(t,0);break;case"amount_with_comma_separator":a=n(t,2,".",",");break;case"amount_no_decimals_with_comma_separator":a=n(t,0,".",",");break;case"amount_no_decimals_with_space_separator":a=n(t,0," ");break;case"amount_with_apostrophe_separator":a=n(t,2,"'")}return r.replace(s,a)}}}(),slate.Variants=function(){function e(e){this.$container=e.$container,this.product=e.product,this.singleOptionSelector=e.singleOptionSelector,this.originalSelectorId=e.originalSelectorId,this.enableHistoryState=e.enableHistoryState,this.currentVariant=this._getVariantFromOptions(),$(this.singleOptionSelector,this.$container).on("change",this._onSelectChange.bind(this))}return e.prototype=_.assignIn({},e.prototype,{_getCurrentOptions:function(){var e=_.map($(this.singleOptionSelector,this.$container),function(e){var t=$(e),i=t.attr("type"),a={};return"radio"===i||"checkbox"===i?!!t[0].checked&&(a.value=t.val(),a.index=t.data("index"),a):(a.value=t.val(),a.index=t.data("index"),a)});return e=_.compact(e)},_getVariantFromOptions:function(){var e=this._getCurrentOptions(),t=this.product.variants;return _.find(t,function(t){return e.every(function(e){return _.isEqual(t[e.index],e.value)})})},_onSelectChange:function(){var e=this._getVariantFromOptions();if(this.$container.trigger({type:"variantChange",variant:e}),e){if(this._updateMasterSelect(e),this._updateImages(e),this._updatePrice(e),this._updateSKU(e),this.currentVariant=e,e){var t=e.featured_media.id,i=$('[data-image-id="'+t+'"]').attr("data-slick-index");$(".slider-image").slick("slickGoTo",i)}this.enableHistoryState&&this._updateHistoryState(e)}},_updateImages:function(e){var t=e.featured_image||{},i=this.currentVariant.featured_image||{};e.featured_image&&t.src!==i.src&&this.$container.trigger({type:"variantImageChange",variant:e})},_updatePrice:function(e){e.price===this.currentVariant.price&&e.compare_at_price===this.currentVariant.compare_at_price||this.$container.trigger({type:"variantPriceChange",variant:e})},_updateSKU:function(e){e.sku!==this.currentVariant.sku&&this.$container.trigger({type:"variantSKUChange",variant:e})},_updateHistoryState:function(e){if(history.replaceState&&e){var t=window.location.protocol+"//"+window.location.host+window.location.pathname+"?variant="+e.id;window.history.replaceState({path:t},"",t)}},_updateMasterSelect:function(e){$(this.originalSelectorId,this.$container).val(e.id)}}),e}(),this.Shopify=this.Shopify||{},this.Shopify.theme=this.Shopify.theme||{},this.Shopify.theme.PredictiveSearch=function(){"use strict";function e(){var e=Error.call(this);return e.name="Server error",e.message="Something went wrong on the server",e.status=500,e}function t(e){var t=Error.call(this);return t.name="Not found",t.message="Not found",t.status=e,t}function i(){var e=Error.call(this);return e.name="Server error",e.message="Something went wrong on the server",e.status=500,e}function a(e){var t=Error.call(this);return t.name="Content-Type error",t.message="Content-Type was not provided or is of wrong type",t.status=e,t}function s(e){var t=Error.call(this);return t.name="JSON parse error",t.message="JSON syntax error",t.status=e,t}function r(e,t,i,a){var s=Error.call(this);return s.name=t,s.message=i,s.status=e,s.retryAfter=a,s}function n(e,t,i){var a=Error.call(this);return a.name=t,a.message=i,a.status=e,a}function o(e,t,i){var a=Error.call(this);return a.name=t,a.message=i,a.status=e,a}function c(e){this._store={},this._keys=[],e&&e.bucketSize?this.bucketSize=e.bucketSize:this.bucketSize=20}function l(){this.events={}}function d(e){this.eventName=e,this.callbacks=[]}function u(e,t){var i="";return t=t||null,Object.keys(e).forEach(function(a){var s=a+"=";switch(t&&(s=t+"["+a+"]"),function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}(e[a])){case"object":i+=u(e[a],t?s:a);break;case"array":i+=s+"="+e[a].join(",")+"&";break;default:t&&(s+="="),i+=s+encodeURIComponent(e[a])+"&"}}),i}c.prototype.set=function(e,t){if(this.count()>=this.bucketSize){var i=this._keys.splice(0,1);this.delete(i)}return this._keys.push(e),this._store[e]=t,this._store},c.prototype.get=function(e){return this._store[e]},c.prototype.has=function(e){return Boolean(this._store[e])},c.prototype.count=function(){return Object.keys(this._store).length},c.prototype.delete=function(e){var t=Boolean(this._store[e]);return delete this._store[e],t&&!this._store[e]},l.prototype.on=function(e,t){var i=this.events[e];i||(i=new d(e),this.events[e]=i),i.registerCallback(t)},l.prototype.off=function(e,t){var i=this.events[e];i&&i.callbacks.indexOf(t)>-1&&(i.unregisterCallback(t),0===i.callbacks.length&&delete this.events[e])},l.prototype.dispatch=function(e,t){var i=this.events[e];i&&i.fire(t)},d.prototype.registerCallback=function(e){this.callbacks.push(e)},d.prototype.unregisterCallback=function(e){var t=this.callbacks.indexOf(e);t>-1&&this.callbacks.splice(t,1)},d.prototype.fire=function(e){this.callbacks.slice(0).forEach(function(t){t(e)})};var h,p,m,f=(h=function(c,l,d,u){var h=new XMLHttpRequest;h.onreadystatechange=function(){if(h.readyState===XMLHttpRequest.DONE){var c=h.getResponseHeader("Content-Type");if(h.status>=500)u(new i);else if(404!==h.status)if("string"==typeof c&&null!==c.toLowerCase().match("application/json"))if(417!==h.status)if(422!==h.status)if(429!==h.status)if(200!==h.status)try{var p=JSON.parse(h.responseText);u(new e(h.status,p.message,p.description))}catch(e){u(new s(h.status))}else try{var m=JSON.parse(h.responseText);m.query=l,d(m)}catch(e){u(new s(h.status))}else try{var f=JSON.parse(h.responseText);u(new r(h.status,f.message,f.description,h.getResponseHeader("Retry-After")))}catch(e){u(new s(h.status))}else try{var v=JSON.parse(h.responseText);u(new o(h.status,v.message,v.description))}catch(e){u(new s(h.status))}else try{var g=JSON.parse(h.responseText);u(new n(h.status,g.message,g.description))}catch(e){u(new s(h.status))}else u(new a(h.status));else u(new t(h.status))}},h.open("get","/search/suggest.json?q="+encodeURIComponent(l)+"&"+c),h.setRequestHeader("Content-Type","application/json"),h.send()},p=10,m=null,function(){var e=this,t=arguments;clearTimeout(m),m=setTimeout(function(){m=null,h.apply(e,t)},p||0)});function v(e){if(!e)throw new TypeError("No config object was specified");this._retryAfter=null,this._currentQuery=null,this.dispatcher=new l,this.cache=new c({bucketSize:40}),this.configParams=u(e)}function g(e){return"string"!=typeof e?null:e.trim().replace(" ","-").toLowerCase()}return v.TYPES={PRODUCT:"product",PAGE:"page",ARTICLE:"article"},v.FIELDS={AUTHOR:"author",BODY:"body",PRODUCT_TYPE:"product_type",TAG:"tag",TITLE:"title",VARIANTS_BARCODE:"variants.barcode",VARIANTS_SKU:"variants.sku",VARIANTS_TITLE:"variants.title",VENDOR:"vendor"},v.UNAVAILABLE_PRODUCTS={SHOW:"show",HIDE:"hide",LAST:"last"},v.prototype.query=function(e){try{!function(e){var t;if(null==e)throw(t=new TypeError("'query' is missing")).type="argument",t;if("string"!=typeof e)throw(t=new TypeError("'query' is not a string")).type="argument",t}(e)}catch(e){return void this.dispatcher.dispatch("error",e)}if(""===e)return this;this._currentQuery=g(e);var t=this.cache.get(this._currentQuery);return t?(this.dispatcher.dispatch("success",t),this):(f(this.configParams,e,function(e){this.cache.set(g(e.query),e),g(e.query)===this._currentQuery&&(this._retryAfter=null,this.dispatcher.dispatch("success",e))}.bind(this),function(e){e.retryAfter&&(this._retryAfter=e.retryAfter),this.dispatcher.dispatch("error",e)}.bind(this)),this)},v.prototype.on=function(e,t){return this.dispatcher.on(e,t),this},v.prototype.off=function(e,t){return this.dispatcher.off(e,t),this},v}(),this.Shopify=this.Shopify||{},this.Shopify.theme=this.Shopify.theme||{},this.Shopify.theme.PredictiveSearchComponent=function(e){"use strict";var t={resources:{type:[(e=e&&e.hasOwnProperty("default")?e.default:e).TYPES.PRODUCT],options:{unavailable_products:e.UNAVAILABLE_PRODUCTS.LAST,fields:[e.FIELDS.TITLE,e.FIELDS.VENDOR,e.FIELDS.PRODUCT_TYPE,e.FIELDS.VARIANTS_TITLE]}}};function i(i){if(!(i&&i.selectors&&i.selectors.input&&s(i.selectors.input)&&i.selectors.result&&s(i.selectors.result)&&i.resultTemplateFct&&n(i.resultTemplateFct)&&i.numberOfResultsTemplateFct&&n(i.numberOfResultsTemplateFct)&&i.loadingResultsMessageTemplateFct&&n(i.loadingResultsMessageTemplateFct))){var a=new TypeError("PredictiveSearchComponent config is not valid");throw a.type="argument",a}var r,o;(this.nodes=(r=i.selectors,{input:document.querySelector(r.input),reset:document.querySelector(r.reset),result:document.querySelector(r.result)}),function(e){if(!e||!e.input||!e.result||"INPUT"!==e.input.tagName)return!1;return!0}(this.nodes))?(this._searchKeyword="",this.resultTemplateFct=i.resultTemplateFct,this.numberOfResultsTemplateFct=i.numberOfResultsTemplateFct,this.loadingResultsMessageTemplateFct=i.loadingResultsMessageTemplateFct,this.numberOfResults=i.numberOfResults||4,this.classes={visibleVariant:i.visibleVariant?i.visibleVariant:"predictive-search-wrapper--visible",itemSelected:i.itemSelectedClass?i.itemSelectedClass:"predictive-search-item--selected",clearButtonVisible:i.clearButtonVisibleClass?i.clearButtonVisibleClass:"predictive-search__clear-button--visible"},this.selectors={searchResult:i.searchResult?i.searchResult:"[data-search-result]"},this.callbacks=function(e){return{onBodyMousedown:e.onBodyMousedown,onBeforeOpen:e.onBeforeOpen,onOpen:e.onOpen,onBeforeClose:e.onBeforeClose,onClose:e.onClose,onInputFocus:e.onInputFocus,onInputKeyup:e.onInputKeyup,onInputBlur:e.onInputBlur,onInputReset:e.onInputReset,onBeforeDestroy:e.onBeforeDestroy,onDestroy:e.onDestroy}}(i),(o=this.nodes.input).setAttribute("autocorrect","off"),o.setAttribute("autocomplete","off"),o.setAttribute("autocapitalize","off"),o.setAttribute("spellcheck","false"),this._addInputEventListeners(),this._addBodyEventListener(),this._addAccessibilityAnnouncer(),this._toggleClearButtonVisibility(),this.predictiveSearch=new e(i.PredictiveSearchAPIConfig?i.PredictiveSearchAPIConfig:t),this.predictiveSearch.on("success",this._handlePredictiveSearchSuccess.bind(this)),this.predictiveSearch.on("error",this._handlePredictiveSearchError.bind(this))):console.warn("Could not find valid nodes")}function a(e){return Object.prototype.toString.call(e)}function s(e){return"[object String]"===a(e)}function r(e){return"[object Boolean]"===a(e)}function n(e){return"[object Function]"===a(e)}return i.prototype.isResultVisible=!1,i.prototype.results={},i.prototype._latencyTimer=null,i.prototype._resultNodeClicked=!1,i.prototype._addInputEventListeners=function(){var e=this.nodes.input,t=this.nodes.reset;e&&(this._handleInputFocus=this._handleInputFocus.bind(this),this._handleInputBlur=this._handleInputBlur.bind(this),this._handleInputKeyup=this._handleInputKeyup.bind(this),this._handleInputKeydown=this._handleInputKeydown.bind(this),e.addEventListener("focus",this._handleInputFocus),e.addEventListener("blur",this._handleInputBlur),e.addEventListener("keyup",this._handleInputKeyup),e.addEventListener("keydown",this._handleInputKeydown),t&&(this._handleInputReset=this._handleInputReset.bind(this),t.addEventListener("click",this._handleInputReset)))},i.prototype._removeInputEventListeners=function(){var e=this.nodes.input;e.removeEventListener("focus",this._handleInputFocus),e.removeEventListener("blur",this._handleInputBlur),e.removeEventListener("keyup",this._handleInputKeyup),e.removeEventListener("keydown",this._handleInputKeydown)},i.prototype._addBodyEventListener=function(){this._handleBodyMousedown=this._handleBodyMousedown.bind(this),document.querySelector("body").addEventListener("mousedown",this._handleBodyMousedown)},i.prototype._removeBodyEventListener=function(){document.querySelector("body").removeEventListener("mousedown",this._handleBodyMousedown)},i.prototype._removeClearButtonEventListener=function(){var e=this.nodes.reset;e&&e.removeEventListener("click",this._handleInputReset)},i.prototype._handleBodyMousedown=function(e){if(this.isResultVisible&&null!==this.nodes)if(e.target.isEqualNode(this.nodes.input)||this.nodes.input.contains(e.target)||e.target.isEqualNode(this.nodes.result)||this.nodes.result.contains(e.target))this._resultNodeClicked=!0;else if(n(this.callbacks.onBodyMousedown)){var t=this.callbacks.onBodyMousedown(this.nodes);r(t)&&t&&this.close()}else this.close()},i.prototype._handleInputFocus=function(e){if(n(this.callbacks.onInputFocus)){var t=this.callbacks.onInputFocus(this.nodes);if(r(t)&&!t)return!1}return e.target.value.length>0&&this._search(),!0},i.prototype._handleInputBlur=function(){return setTimeout(function(){if(n(this.callbacks.onInputBlur)){var e=this.callbacks.onInputBlur(this.nodes);if(r(e)&&!e)return!1}return!document.activeElement.isEqualNode(this.nodes.reset)&&(this._resultNodeClicked?(this._resultNodeClicked=!1,!1):void this.close())}.bind(this)),!0},i.prototype._addAccessibilityAnnouncer=function(){this._accessibilityAnnouncerDiv=window.document.createElement("div"),this._accessibilityAnnouncerDiv.setAttribute("style","position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;"),this._accessibilityAnnouncerDiv.setAttribute("data-search-announcer",""),this._accessibilityAnnouncerDiv.setAttribute("aria-live","polite"),this._accessibilityAnnouncerDiv.setAttribute("aria-atomic","true"),this.nodes.result.parentElement.appendChild(this._accessibilityAnnouncerDiv)},i.prototype._removeAccessibilityAnnouncer=function(){this.nodes.result.parentElement.removeChild(this._accessibilityAnnouncerDiv)},i.prototype._updateAccessibilityAttributesAfterSelectingElement=function(e,t){this.nodes.input.setAttribute("aria-activedescendant",t.id),e&&e.removeAttribute("aria-selected"),t.setAttribute("aria-selected",!0)},i.prototype._clearAriaActiveDescendant=function(){this.nodes.input.setAttribute("aria-activedescendant","")},i.prototype._announceNumberOfResultsFound=function(e){var t=this._accessibilityAnnouncerDiv.innerHTML,i=this.numberOfResultsTemplateFct(e);t===i&&(i+="&nbsp;"),this._accessibilityAnnouncerDiv.innerHTML=i},i.prototype._announceLoadingState=function(){this._accessibilityAnnouncerDiv.innerHTML=this.loadingResultsMessageTemplateFct()},i.prototype._handleInputKeyup=function(e){if(n(this.callbacks.onInputKeyup)){var t=this.callbacks.onInputKeyup(this.nodes);if(r(t)&&!t)return!1}if(this._toggleClearButtonVisibility(),this.isResultVisible&&null!==this.nodes){if(38===e.keyCode)return this._navigateOption(e,"UP"),!0;if(40===e.keyCode)return this._navigateOption(e,"DOWN"),!0;if(13===e.keyCode)return this._selectOption(),!0;27===e.keyCode&&this.close()}return e.target.value.length<=0?(this.close(),this._setKeyword("")):e.target.value.length>0&&this._search(),!0},i.prototype._handleInputKeydown=function(e){13===e.keyCode&&null!==this._getSelectedOption()&&e.preventDefault(),38!==e.keyCode&&40!==e.keyCode||e.preventDefault()},i.prototype._handleInputReset=function(e){if(e.preventDefault(),n(this.callbacks.onInputReset)){var t=this.callbacks.onInputReset(this.nodes);if(r(t)&&!t)return!1}return this.nodes.input.value="",this.nodes.input.focus(),this._toggleClearButtonVisibility(),this.close(),!0},i.prototype._navigateOption=function(e,t){var i=this._getSelectedOption();if(i)if("DOWN"===t){var a=i.nextElementSibling;a&&(i.classList.remove(this.classes.itemSelected),a.classList.add(this.classes.itemSelected),this._updateAccessibilityAttributesAfterSelectingElement(i,a))}else{var s=i.previousElementSibling;s&&(i.classList.remove(this.classes.itemSelected),s.classList.add(this.classes.itemSelected),this._updateAccessibilityAttributesAfterSelectingElement(i,s))}else{var r=this.nodes.result.querySelector(this.selectors.searchResult);r.classList.add(this.classes.itemSelected),this._updateAccessibilityAttributesAfterSelectingElement(null,r)}},i.prototype._getSelectedOption=function(){return this.nodes.result.querySelector("."+this.classes.itemSelected)},i.prototype._selectOption=function(){var e=this._getSelectedOption();e&&e.querySelector("a, button").click()},i.prototype._search=function(){var e=this.nodes.input.value;this._searchKeyword!==e&&(clearTimeout(this._latencyTimer),this._latencyTimer=setTimeout(function(){this.results.isLoading=!0,this._announceLoadingState(),this.nodes.result.classList.add(this.classes.visibleVariant),this.nodes.result.innerHTML=this.resultTemplateFct(this.results)}.bind(this),500),this.predictiveSearch.query(e),this._setKeyword(e))},i.prototype._handlePredictiveSearchSuccess=function(e){clearTimeout(this._latencyTimer),this.results=e.resources.results,this.results.isLoading=!1,this.results.products=this.results.products.slice(0,this.numberOfResults),this.results.canLoadMore=this.numberOfResults<=this.results.products.length,this.results.searchQuery=this.nodes.input.value,this.results.products.length>0||this.results.searchQuery?(this.nodes.result.innerHTML=this.resultTemplateFct(this.results),this._announceNumberOfResultsFound(this.results),this.open()):(this.nodes.result.innerHTML="",this._closeOnNoResults())},i.prototype._handlePredictiveSearchError=function(){clearTimeout(this._latencyTimer),this.nodes.result.innerHTML="",this._closeOnNoResults()},i.prototype._closeOnNoResults=function(){this.nodes&&this.nodes.result.classList.remove(this.classes.visibleVariant),this.isResultVisible=!1},i.prototype._setKeyword=function(e){this._searchKeyword=e},i.prototype._toggleClearButtonVisibility=function(){this.nodes.reset&&(this.nodes.input.value.length>0?this.nodes.reset.classList.add(this.classes.clearButtonVisible):this.nodes.reset.classList.remove(this.classes.clearButtonVisible))},i.prototype.open=function(){if(!this.isResultVisible){if(n(this.callbacks.onBeforeOpen)){var e=this.callbacks.onBeforeOpen(this.nodes);if(r(e)&&!e)return!1}return this.nodes.result.classList.add(this.classes.visibleVariant),this.nodes.input.setAttribute("aria-expanded",!0),this.isResultVisible=!0,n(this.callbacks.onOpen)&&this.callbacks.onOpen(this.nodes)||!0}},i.prototype.close=function(){if(!this.isResultVisible)return!0;if(n(this.callbacks.onBeforeClose)){var e=this.callbacks.onBeforeClose(this.nodes);if(r(e)&&!e)return!1}return this.nodes&&this.nodes.result.classList.remove(this.classes.visibleVariant),this.nodes.input.setAttribute("aria-expanded",!1),this._clearAriaActiveDescendant(),this._setKeyword(""),n(this.callbacks.onClose)&&this.callbacks.onClose(this.nodes),this.isResultVisible=!1,this.results={},!0},i.prototype.destroy=function(){if(this.close(),n(this.callbacks.onBeforeDestroy)){var e=this.callbacks.onBeforeDestroy(this.nodes);if(r(e)&&!e)return!1}var t;return this.nodes.result.classList.remove(this.classes.visibleVariant),(t=this.nodes.input).removeAttribute("autocorrect","off"),t.removeAttribute("autocomplete","off"),t.removeAttribute("autocapitalize","off"),t.removeAttribute("spellcheck","false"),this._removeInputEventListeners(),this._removeBodyEventListener(),this._removeAccessibilityAnnouncer(),this._removeClearButtonEventListener(),n(this.callbacks.onDestroy)&&this.callbacks.onDestroy(this.nodes),!0},i.prototype.clearAndClose=function(){this.nodes.input.value="",this.close()},i}(Shopify.theme.PredictiveSearch),theme.Drawers=function(){function e(e,t,i){var a={selectors:{openVariant:".js-drawer-open-"+t,close:".js-drawer-close"},classes:{open:"js-drawer-open",openVariant:"js-drawer-open-"+t},withPredictiveSearch:!1};if(this.nodes={$parent:$("html").add("body"),$page:$("#PageContainer")},this.config=$.extend(a,i),this.position=t,this.$drawer=$("#"+e),!this.$drawer.length)return!1;this.drawerIsOpen=!1,this.init()}return e.prototype.init=function(){$(this.config.selectors.openVariant).on("click",$.proxy(this.open,this)),this.$drawer.on("click",this.config.selectors.close,$.proxy(this.close,this))},e.prototype.open=function(e){var t=!1;if(e?e.preventDefault():t=!0,e&&e.stopPropagation&&(e.stopPropagation(),this.$activeSource=$(e.currentTarget)),this.drawerIsOpen&&!t)return this.close();this.config.withPredictiveSearch||this.$drawer.prepareTransition(),this.nodes.$parent.addClass(this.config.classes.open+" "+this.config.classes.openVariant),this.drawerIsOpen=!0,this.config.onDrawerOpen&&"function"==typeof this.config.onDrawerOpen&&(t||this.config.onDrawerOpen()),this.$activeSource&&this.$activeSource.attr("aria-expanded")&&this.$activeSource.attr("aria-expanded","true");var i={$container:this.$drawer,namespace:"drawer_focus"};return this.config.$elementToFocusOnOpen&&(i.$elementToFocus=this.config.$elementToFocusOnOpen),slate.a11y.trapFocus(i),this.bindEvents(),this},e.prototype.close=function(){this.drawerIsOpen&&($(document.activeElement).trigger("blur"),this.config.withPredictiveSearch||this.$drawer.prepareTransition(),this.nodes.$parent.removeClass(this.config.classes.open+" "+this.config.classes.openVariant),this.$activeSource&&this.$activeSource.attr("aria-expanded")&&this.$activeSource.attr("aria-expanded","false"),this.drawerIsOpen=!1,slate.a11y.removeTrapFocus({$container:this.$drawer,namespace:"drawer_focus"}),this.unbindEvents(),this.config.onDrawerClose&&"function"==typeof this.config.onDrawerClose&&this.config.onDrawerClose())},e.prototype.bindEvents=function(){this.nodes.$parent.on("keyup.drawer",$.proxy(function(e){return 27!==e.keyCode||(this.close(),!1)},this)),this.nodes.$page.on("touchmove.drawer",function(){return!1}),this.nodes.$page.on("click.drawer",$.proxy(function(){return this.close(),!1},this))},e.prototype.unbindEvents=function(){this.nodes.$page.off(".drawer"),this.nodes.$parent.off(".drawer")},e}(),theme.Helpers=function(){var e=!1;return{setTouch:function(){e=!0},isTouch:function(){return e}}}(),theme.LibraryLoader=function(){var e={link:"link",script:"script"},t={requested:"requested",loaded:"loaded"},i="https://cdn.shopify.com/shopifycloud/",a={youtubeSdk:{tagId:"youtube-sdk",src:"https://www.youtube.com/iframe_api",type:e.script},plyrShopifyStyles:{tagId:"plyr-shopify-styles",src:i+"shopify-plyr/v1.0/shopify-plyr.css",type:e.link},modelViewerUiStyles:{tagId:"shopify-model-viewer-ui-styles",src:i+"model-viewer-ui/assets/v1.0/model-viewer-ui.css",type:e.link}};return{load:function(i,s){var r=a[i];if(r&&r.status!==t.requested)if(s=s||function(){},r.status!==t.loaded){var n;switch(r.status=t.requested,r.type){case e.script:n=function(e,i){var a=document.createElement("script");return a.src=e.src,a.addEventListener("load",function(){e.status=t.loaded,i()}),a}(r,s);break;case e.link:n=function(e,i){var a=document.createElement("link");return a.href=e.src,a.rel="stylesheet",a.type="text/css",a.addEventListener("load",function(){e.status=t.loaded,i()}),a}(r,s)}n.id=r.tagId,r.element=n;var o=document.getElementsByTagName(r.type)[0];o.parentNode.insertBefore(n,o)}else s()}}}(),window.theme=window.theme||{},theme.Header=function(){var e={body:"body",navigation:"#AccessibleNav",siteNavHasDropdown:"[data-has-dropdowns]",siteNavChildLinks:".site-nav__child-link",siteNavActiveDropdown:".site-nav--active-dropdown",siteNavHasCenteredDropdown:".site-nav--has-centered-dropdown",siteNavCenteredDropdown:".site-nav__dropdown--centered",siteNavLinkMain:".site-nav__link--main",siteNavChildLink:".site-nav__link--last",siteNavDropdown:".site-nav__dropdown",siteHeader:".site-header"},t={activeClass:"site-nav--active-dropdown",childLinkClass:"site-nav__child-link",rightDropdownClass:"site-nav__dropdown--right",leftDropdownClass:"site-nav__dropdown--left"},i={};function a(a){a.find(e.siteNavLinkMain).attr("aria-expanded","false"),a.removeClass(t.activeClass),i.$activeDropdown=$(e.siteNavActiveDropdown),$(e.body).off("click.siteNav"),$(window).off("keyup.siteNav")}function s(a){a.each(function(){var a=$(this).find(e.siteNavDropdown);a.length&&(Math.ceil($(this).offset().left)>Math.floor(i.$siteHeader.outerWidth())/2?a.removeClass(t.leftDropdownClass).addClass(t.rightDropdownClass):a.removeClass(t.rightDropdownClass).addClass(t.leftDropdownClass))})}function r(){$(e.siteNavHasCenteredDropdown).each(function(){var t=$(this),i=t.find(e.siteNavCenteredDropdown),a=t.position().top+41;i.css("top",a)})}return{init:function(){i={$nav:$(e.navigation),$topLevel:$(e.siteNavLinkMain),$parents:$(e.navigation).find(e.siteNavHasDropdown),$subMenuLinks:$(e.siteNavChildLinks),$activeDropdown:$(e.siteNavActiveDropdown),$siteHeader:$(e.siteHeader)},s($(e.siteNavHasDropdown)),r(),i.$parents.on("click.siteNav",function(){var s=$(this);s.hasClass(t.activeClass)?a(s):function(s){s.addClass(t.activeClass),i.$activeDropdown.length&&a(i.$activeDropdown),i.$activeDropdown=s,s.find(e.siteNavLinkMain).attr("aria-expanded","true"),setTimeout(function(){$(window).on("keyup.siteNav",function(e){27===e.keyCode&&a(s)}),$(e.body).on("click.siteNav",function(){a(s)})},250)}(s)}),$(e.siteNavChildLink).on("focusout.siteNav",function(){setTimeout(function(){!$(document.activeElement).hasClass(t.childLinkClass)&&i.$activeDropdown.length&&a(i.$activeDropdown)})}),i.$topLevel.on("focus.siteNav",function(){i.$activeDropdown.length&&a(i.$activeDropdown)}),i.$subMenuLinks.on("click.siteNav",function(e){e.stopImmediatePropagation()}),$(window).resize($.debounce(50,function(){s($(e.siteNavHasDropdown)),r()}))},unload:function(){$(window).off(".siteNav"),i.$parents.off(".siteNav"),i.$subMenuLinks.off(".siteNav"),i.$topLevel.off(".siteNav"),$(e.siteNavChildLink).off(".siteNav"),$(e.body).off(".siteNav")}}}(),window.theme=window.theme||{},theme.MobileNav=function(){var e,t,i,a={mobileNavOpenIcon:"mobile-nav--open",mobileNavCloseIcon:"mobile-nav--close",navLinkWrapper:"mobile-nav__item",navLink:"mobile-nav__link",subNavLink:"mobile-nav__sublist-link",return:"mobile-nav__return-btn",subNavActive:"is-active",subNavClosing:"is-closing",navOpen:"js-menu--is-open",subNavShowing:"sub-nav--is-open",thirdNavShowing:"third-nav--is-open",subNavToggleBtn:"js-toggle-submenu"},s={},r=1,n="screen and (max-width: 749px)";function o(){var e;s.$mobileNavToggle.hasClass(a.mobileNavCloseIcon)?c():(e=s.$siteHeader.outerHeight(),s.$mobileNavContainer.prepareTransition().addClass(a.navOpen),s.$mobileNavContainer.css({transform:"translateY("+e+"px)"}),s.$pageContainer.css({transform:"translate3d(0, "+s.$mobileNavContainer[0].scrollHeight+"px, 0)"}),slate.a11y.trapFocus({$container:s.$sectionHeader,$elementToFocus:s.$mobileNavToggle,namespace:"navFocus"}),s.$mobileNavToggle.addClass(a.mobileNavCloseIcon).removeClass(a.mobileNavOpenIcon).attr("aria-expanded",!0),$(window).on("keyup.mobileNav",function(e){27===e.which&&c()}))}function c(){s.$mobileNavContainer.prepareTransition().removeClass(a.navOpen),s.$mobileNavContainer.css({transform:"translateY(-100%)"}),s.$pageContainer.removeAttr("style"),slate.a11y.trapFocus({$container:$("html"),$elementToFocus:$("body")}),s.$mobileNavContainer.one("TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle",function(){slate.a11y.removeTrapFocus({$container:s.$mobileNav,namespace:"navFocus"})}),s.$mobileNavToggle.addClass(a.mobileNavOpenIcon).removeClass(a.mobileNavCloseIcon).attr("aria-expanded",!1).focus(),$(window).off("keyup.mobileNav"),scrollTo(0,0)}function l(n){if(!e){var o=$(n.currentTarget),c=o.hasClass(a.return);e=!0,c?($("."+a.subNavToggleBtn+'[data-level="'+(r-1)+'"]').removeClass(a.subNavActive),i&&i.length&&i.removeClass(a.subNavActive)):o.addClass(a.subNavActive),i=o,function(i){var n=i?$('.mobile-nav__dropdown[data-parent="'+i+'"]'):s.$mobileNav;r=n.data("level")?n.data("level"):1,t&&t.length&&t.prepareTransition().addClass(a.subNavClosing);t=n;var o=n.outerHeight(),c=r>2?a.thirdNavShowing:a.subNavShowing;s.$mobileNavContainer.css("height",o).removeClass(a.thirdNavShowing).addClass(c),i||s.$mobileNavContainer.removeClass(a.thirdNavShowing).removeClass(a.subNavShowing);var l=1===r?s.$sectionHeader:n,d=n.find("[data-menu-title="+r+"]"),u=d||n;s.$mobileNavContainer.one("TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle",function(){slate.a11y.trapFocus({$container:l,$elementToFocus:u,namespace:"subNavFocus"}),s.$mobileNavContainer.off(".subnavToggle"),e=!1}),s.$pageContainer.css({transform:"translateY("+o+"px)"}),t.removeClass(a.subNavClosing)}(o.data("target"))}}return{init:function(){(s={$pageContainer:$("#PageContainer"),$siteHeader:$(".site-header"),$mobileNavToggle:$(".js-mobile-nav-toggle"),$mobileNavContainer:$(".mobile-nav-wrapper"),$mobileNav:$("#MobileNav"),$sectionHeader:$("#shopify-section-header"),$subNavToggleBtn:$("."+a.subNavToggleBtn)}).$mobileNavToggle.on("click",o),s.$subNavToggleBtn.on("click.subNav",l),enquire.register(n,{unmatch:function(){s.$mobileNavContainer.hasClass(a.navOpen)&&c()}})},closeMobileNav:c}}(jQuery),function(){var e=$(".return-link");function t(e){var t=document.createElement("a");return t.ref=e,t.hostname}document.referrer&&e.length&&window.history.length&&e.one("click",function(e){e.preventDefault();var i=t(document.referrer);return t(window.location.href)===i&&history.back(),!1})}(),theme.Slideshow=function(){this.$slideshow=null;var e={slideshow:"slideshow",slickActiveMobile:"slick-active-mobile",controlsHover:"slideshow__controls--hover",isPaused:"is-paused"},t={section:".shopify-section",wrapper:"#SlideshowWrapper-",slides:".slideshow__slide",textWrapperMobile:".slideshow__text-wrap--mobile",textContentMobile:".slideshow__text-content--mobile",controls:".slideshow__controls",pauseButton:".slideshow__pause",dots:".slick-dots",arrows:".slideshow__arrows",arrowsMobile:".slideshow__arrows--mobile",arrowLeft:".slideshow__arrow-left",arrowRight:".slideshow__arrow-right"};function i(i,s){var r=this.$slideshow=$(i);this.adaptHeight=this.$slideshow.data("adapt-height"),this.$wrapper=this.$slideshow.closest(t.wrapper+s),this.$section=this.$wrapper.closest(t.section),this.$controls=this.$wrapper.find(t.controls),this.$arrows=this.$section.find(t.arrows),this.$arrowsMobile=this.$section.find(t.arrowsMobile),this.$pause=this.$controls.find(t.pauseButton),this.$textWrapperMobile=this.$section.find(t.textWrapperMobile),this.autorotate=this.$slideshow.data("autorotate");var n=this.$slideshow.data("speed"),o=this.$slideshow.data("slide-nav-a11y");this.settings={accessibility:!0,arrows:!1,dots:!0,fade:!0,draggable:!0,touchThreshold:20,autoplay:this.autorotate,autoplaySpeed:n,appendDots:this.$arrows,customPaging:function(e,i){return'<a href="'+t.wrapper+s+'" aria-label="'+o.replace("[slide_number]",i+1)+'" data-slide-number="'+i+'"></a>'}},this.$slideshow.on("beforeChange",function(t,i,a,s){var r=this.$dots.find("a"),n=this.$mobileDots.find("li");r.removeAttr("aria-current").eq(s).attr("aria-current","true"),n.removeClass(e.slickActiveMobile).eq(s).addClass(e.slickActiveMobile),this.showMobileText(s)}.bind(this)),this.$slideshow.on("init",function(i,s){var r=s.$slider,n=s.$list;this.$dots=this.$section.find(t.dots),this.$mobileDots=this.$dots.eq(1),n.removeAttr("aria-live"),this.$wrapper.on("keyup",a.bind(this)),this.$controls.on("keyup",a.bind(this)),this.$textWrapperMobile.on("keyup",a.bind(this)),this.$wrapper.on("focusin",function(e){this.$wrapper.has(e.target).length&&(n.attr("aria-live","polite"),this.autorotate&&r.slick("slickPause"))}.bind(this)).on("focusout",function(e){this.$wrapper.has(e.target).length&&(n.removeAttr("aria-live"),this.autorotate&&(this.$pause.is(".is-paused")||r.slick("slickPlay")))}.bind(this)),this.$dots&&this.$dots.find("a").each(function(){var e=$(this);e.on("click keyup",function(e){if("keyup"!==e.type||e.which===slate.utils.keyboardKeys.ENTER){e.preventDefault();var t=$(e.target).data("slide-number");r.attr("tabindex",-1).slick("slickGoTo",t),"keyup"===e.type&&r.focus()}})}).eq(0).attr("aria-current","true");this.$controls.on("focusin",function(){this.$controls.addClass(e.controlsHover)}.bind(this)).on("focusout",function(){this.$controls.removeClass(e.controlsHover)}.bind(this))}.bind(this)),this.$slideshow.on("init",function(){this.$mobileDots.find("li:first-of-type").addClass(e.slickActiveMobile),this.showMobileText(0)}.bind(this)),this.autorotate&&$(document).scroll($.debounce(250,function(){this.$arrowsMobile.offset().top+this.$arrowsMobile.outerHeight()<window.pageYOffset?r.slick("slickPause"):this.$pause.hasClass(e.isPaused)||r.slick("slickPlay")}.bind(this))),this.adaptHeight&&(this.setSlideshowHeight(),$(window).resize($.debounce(50,this.setSlideshowHeight.bind(this)))),this.$slideshow.slick(this.settings),function(){this.$slideshow.find(t.slides).removeAttr("role").removeAttr("aria-labelledby"),this.$dots.removeAttr("role").find("li").removeAttr("role").removeAttr("aria-selected").each(function(){var e=$(this),t=e.attr("aria-controls");e.removeAttr("aria-controls").find("a").attr("aria-controls",t)})}.bind(this)(),this.$arrows.find(t.arrowLeft).on("click",function(){r.slick("slickPrev")}),this.$arrows.find(t.arrowRight).on("click",function(){r.slick("slickNext")}),this.$pause.on("click",this.togglePause.bind(this))}function a(){event.keyCode===slate.utils.keyboardKeys.LEFTARROW&&this.$slideshow.slick("slickPrev"),event.keyCode===slate.utils.keyboardKeys.RIGHTARROW&&this.$slideshow.slick("slickNext")}return i.prototype.togglePause=function(){var t="#Slideshow-"+this.$pause.data("id");this.$pause.hasClass(e.isPaused)?(this.$pause.removeClass(e.isPaused).attr("aria-pressed","false"),this.autorotate&&$(t).slick("slickPlay")):(this.$pause.addClass(e.isPaused).attr("aria-pressed","true"),this.autorotate&&$(t).slick("slickPause"))},i.prototype.setSlideshowHeight=function(){var e=this.$slideshow.data("min-aspect-ratio");this.$slideshow.height($(document).width()/e)},i.prototype.showMobileText=function(e){var i=this.$textWrapperMobile.find(t.textContentMobile),a=t.textContentMobile+"-"+e,s=this.$textWrapperMobile.find(a);s.length||1!==this.$slideshow.find(t.slides).length?this.$textWrapperMobile.show():this.$textWrapperMobile.hide(),i.hide(),s.show()},i}(),theme.Video=function(){var e=!1,t=!1,i=!1,a=!1,s={},r=[],n={ratio:16/9,scrollAnimationDuration:400,playerVars:{iv_load_policy:3,modestbranding:1,autoplay:0,controls:0,wmode:"opaque",branding:0,autohide:0,rel:0},events:{onReady:function(e){e.target.setPlaybackQuality("hd1080");var t=g(e),i=e.target.getVideoData().title;p(),$("#"+t.id).attr("tabindex","-1"),_(),a=t.$videoWrapper,s=i,r=a.find(c.playVideoBtn),n=a.find(c.closeVideoBtn),l=a.find(c.pauseVideoBtn),d=n.find(c.fallbackText),h=l.find(c.pauseVideoStop).find(c.fallbackText),m=l.find(c.pauseVideoResume).find(c.fallbackText),r.each(function(){var e=$(this),t=e.find(c.fallbackText);t.text(t.text().replace("[video_title]",s))}),d.text(d.text().replace("[video_title]",s)),h.text(h.text().replace("[video_title]",s)),m.text(m.text().replace("[video_title]",s)),"background"===t.type&&(e.target.mute(),u(t.id));var a,s,r,n,l,d,h,m;t.$videoWrapper.addClass(o.loaded)},onStateChange:function(t){var i=g(t);"background"!==i.status||C()||e||t.data!==YT.PlayerState.PLAYING&&t.data!==YT.PlayerState.BUFFERING||(h(!0),e=!0,i.$videoWrapper.removeClass(o.loading));switch(t.data){case YT.PlayerState.ENDED:!function(e){switch(e.type){case"background":r[e.id].seekTo(0);break;case"image_with_play":v(e.id),y(e.id,!1)}}(i);break;case YT.PlayerState.PAUSED:setTimeout(function(){t.target.getPlayerState()===YT.PlayerState.PAUSED&&f(i)},200)}}}},o={playing:"video-is-playing",paused:"video-is-paused",loading:"video-is-loading",loaded:"video-is-loaded",backgroundVideoWrapper:"video-background-wrapper",videoWithImage:"video--image_with_play",backgroundVideo:"video--background",userPaused:"is-paused",supportsAutoplay:"autoplay",supportsNoAutoplay:"no-autoplay",wrapperMinHeight:"video-section-wrapper--min-height"},c={section:".video-section",videoWrapper:".video-section-wrapper",playVideoBtn:".video-control__play",closeVideoBtn:".video-control__close-wrapper",pauseVideoBtn:".video__pause",pauseVideoStop:".video__pause-stop",pauseVideoResume:".video__pause-resume",fallbackText:".icon__fallback-text"};function l(e){(t||i)&&e&&"function"==typeof r[e].playVideo&&u(e)}function d(e){r[e]&&"function"==typeof r[e].pauseVideo&&r[e].pauseVideo()}function u(t,a){var n=s[t],c=r[t],l=n.$videoWrapper;if(i)m(n);else{if(a||e)return l.removeClass(o.loading),m(n),void c.playVideo();c.playVideo()}}function h(t){var a=t?o.supportsAutoplay:o.supportsNoAutoplay;$(document.documentElement).removeClass(o.supportsAutoplay).removeClass(o.supportsNoAutoplay).addClass(a),t||(i=!0),e=!0}function p(){t||(C()&&(i=!0),i&&h(!1),t=!0)}function m(e){var t=e.$videoWrapper,i=t.find(c.pauseVideoBtn);t.removeClass(o.loading),i.hasClass(o.userPaused)&&i.removeClass(o.userPaused),"background"!==e.status&&($("#"+e.id).attr("tabindex","0"),"image_with_play"===e.type&&t.removeClass(o.paused).addClass(o.playing),setTimeout(function(){t.find(c.closeVideoBtn).focus()},n.scrollAnimationDuration))}function f(e){var t=e.$videoWrapper;"image_with_play"===e.type&&("closed"===e.status?t.removeClass(o.paused):t.addClass(o.paused)),t.removeClass(o.playing)}function v(e){var t=s[e],i=t.$videoWrapper,a=[o.paused,o.playing].join(" ");switch(C()&&i.removeAttr("style"),$("#"+t.id).attr("tabindex","-1"),t.status="closed",t.type){case"image_with_play":r[e].stopVideo(),f(t);break;case"background":r[e].mute(),function(e){$("#"+e).removeClass(o.videoWithImage).addClass(o.backgroundVideo),s[e].$videoWrapper.addClass(o.backgroundVideoWrapper),s[e].status="background",w($("#"+e))}(e)}i.removeClass(a)}function g(e){var t=e.target.getIframe().id;return s[t]}function y(e,t){var i=s[e],a=i.$videoWrapper.offset().top,r=i.$videoWrapper.find(c.playVideoBtn),l=0,d=0;C()&&i.$videoWrapper.parent().toggleClass("page-width",!t),t?(d=C()?$(window).width()/n.ratio:i.$videoWrapper.width()/n.ratio,l=($(window).height()-d)/2,i.$videoWrapper.removeClass(o.wrapperMinHeight).animate({height:d},600),C()&&Shopify.designMode||$("html, body").animate({scrollTop:a-l},n.scrollAnimationDuration)):(d=C()?i.$videoWrapper.data("mobile-height"):i.$videoWrapper.data("desktop-height"),i.$videoWrapper.height(i.$videoWrapper.width()/n.ratio).animate({height:d},600),setTimeout(function(){i.$videoWrapper.addClass(o.wrapperMinHeight)},600),r.focus())}function b(e){var t=s[e];switch(t.$videoWrapper.addClass(o.loading),t.$videoWrapper.attr("style","height: "+t.$videoWrapper.height()+"px"),t.status="open",t.type){case"image_with_play":u(e,!0);break;case"background":!function(e){$("#"+e).removeClass(o.backgroundVideo).addClass(o.videoWithImage),setTimeout(function(){$("#"+e).removeAttr("style")},600),s[e].$videoWrapper.removeClass(o.backgroundVideoWrapper).addClass(o.playing),s[e].status="open"}(e),r[e].unMute(),u(e,!0)}y(e,!0),$(document).on("keydown.videoPlayer",function(e){var t=$(document.activeElement).data("controls");e.keyCode===slate.utils.keyboardKeys.ESCAPE&&t&&(v(t),y(t,!1))})}function _(){$("."+o.backgroundVideo).each(function(e,t){w($(t))})}function w(e){if(a)if(C())e.removeAttr("style");else{var t=e.closest(c.videoWrapper),i=t.width(),s=e.width(),r=t.data("desktop-height");i/n.ratio<r?(s=Math.ceil(r*n.ratio),e.width(s).height(r).css({left:(i-s)/2,top:0})):(r=Math.ceil(i/n.ratio),e.width(i).height(r).css({left:0,top:(r-r)/2})),e.prepareTransition(),t.addClass(o.loaded)}}function C(){return $(window).width()<750||window.mobileCheck()}function S(){$(document).on("click.videoPlayer",c.playVideoBtn,function(e){b($(e.currentTarget).data("controls"))}),$(document).on("click.videoPlayer",c.closeVideoBtn,function(e){var t=$(e.currentTarget).data("controls");$(e.currentTarget).blur(),v(t),y(t,!1)}),$(document).on("click.videoPlayer",c.pauseVideoBtn,function(e){!function(e){var t=s[e].$videoWrapper.find(c.pauseVideoBtn),i=t.hasClass(o.userPaused);i?(t.removeClass(o.userPaused),l(e)):(t.addClass(o.userPaused),d(e)),t.attr("aria-pressed",!i)}($(e.currentTarget).data("controls"))}),$(window).on("resize.videoPlayer",$.debounce(200,function(){if(a){var e,t=window.innerHeight===screen.height;if(_(),C()){for(e in s)s.hasOwnProperty(e)&&(s[e].$videoWrapper.hasClass(o.playing)&&(t||(d(e),f(s[e]))),s[e].$videoWrapper.height($(document).width()/n.ratio));h(!1)}else for(e in h(!0),s)s[e].$videoWrapper.find("."+o.videoWithImage).length||(r[e].playVideo(),m(s[e]))}})),$(window).on("scroll.videoPlayer",$.debounce(50,function(){if(a)for(var e in s)if(s.hasOwnProperty(e)){var t=s[e].$videoWrapper;t.hasClass(o.playing)&&(t.offset().top+.75*t.height()<$(window).scrollTop()||t.offset().top+.25*t.height()>$(window).scrollTop()+$(window).height())&&(v(e),y(e,!1))}}))}function k(e){var t=$.extend({},n,s[e]);t.playerVars.controls=t.controls,r[e]=new YT.Player(e,t)}return{init:function(e){if(e.length){if(s[e.attr("id")]={id:e.attr("id"),videoId:e.data("id"),type:e.data("type"),status:"image_with_play"===e.data("type")?"closed":"background",$video:e,$videoWrapper:e.closest(c.videoWrapper),$section:e.closest(c.section),controls:"background"===e.data("type")?0:1},!a){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i)}p()}},editorLoadVideo:function(e){a&&(k(e),S())},loadVideos:function(){for(var e in s)s.hasOwnProperty(e)&&k(e);S(),a=!0},playVideo:l,pauseVideo:d,removeEvents:function(){$(document).off(".videoPlayer"),$(window).off(".videoPlayer")}}}(),theme.ProductVideo=function(){var e={},t={html5:"html5",youtube:"youtube"},i={productMediaWrapper:"[data-product-single-media-wrapper]"},a={enableVideoLooping:"enable-video-looping",videoId:"video-id"};function s(i){i?function(){for(var i in e)if(e.hasOwnProperty(i)){var a=e[i];if(a.nativeVideo)continue;a.host===t.html5&&(a.element.setAttribute("controls","controls"),a.nativeVideo=!0)}}():o(t.html5)}function r(){window.YT.Player&&o(t.youtube)}function n(e){return"VIDEO"===e.tagName?t.html5:"IFRAME"===e.tagName&&/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e.src)?t.youtube:null}function o(t){for(var i in e)if(e.hasOwnProperty(i)){var a=e[i];a.host===t&&a.ready()}}return{init:function(o,c){if(o.length){var l=o.find("iframe, video")[0],d=o.data("mediaId");if(l)switch(e[d]={mediaId:d,sectionId:c,host:n(l),container:o,element:l,ready:function(){!function(e){if(!e.player){var s=e.container.closest(i.productMediaWrapper),r=s.data(a.enableVideoLooping);switch(e.host){case t.html5:e.player=new Shopify.Plyr(e.element,{loop:{active:r}});break;case t.youtube:var n=s.data(a.videoId);e.player=new YT.Player(e.element,{videoId:n,events:{onStateChange:function(e){0===e.data&&r&&e.target.seekTo(0)}}})}s.on("mediaHidden xrLaunch",function(){e.player&&(e.host===t.html5&&e.player.pause(),e.host===t.youtube&&e.player.pauseVideo&&e.player.pauseVideo())}),s.on("mediaVisible",function(){theme.Helpers.isTouch()||e.player&&(e.host===t.html5&&e.player.play(),e.host===t.youtube&&e.player.playVideo&&e.player.playVideo())})}}(this)}},e[d].host){case t.html5:window.Shopify.loadFeatures([{name:"video-ui",version:"1.0",onLoad:s}]),theme.LibraryLoader.load("plyrShopifyStyles");break;case t.youtube:theme.LibraryLoader.load("youtubeSdk",r)}}},hosts:t,loadVideos:o,removeSectionVideos:function(t){for(var i in e)if(e.hasOwnProperty(i)){var a=e[i];a.sectionId===t&&(a.player&&a.player.destroy(),delete e[i])}}}}(),theme.ProductModel=function(){var e={},t={},i={},a={mediaGroup:"[data-product-single-media-group]",xrButton:"[data-shopify-xr]"};function s(t){if(!t)if(window.ShopifyXR){for(var i in e)if(e.hasOwnProperty(i)){var a=e[i];if(a.loaded)continue;var r=$("#ModelJson-"+i);window.ShopifyXR.addModels(JSON.parse(r.html())),a.loaded=!0}window.ShopifyXR.setupXRElements()}else document.addEventListener("shopify_xr_initialized",function(){s()})}function r(e){if(!e)for(var i in t)if(t.hasOwnProperty(i)){var a=t[i];a.modelViewerUi||(a.modelViewerUi=new Shopify.ModelViewerUI(a.$element)),n(a)}}function n(e){var t=i[e.sectionId];e.$container.on("mediaVisible",function(){t.$element.attr("data-shopify-model3d-id",e.modelId),theme.Helpers.isTouch()||e.modelViewerUi.play()}),e.$container.on("mediaHidden",function(){t.$element.attr("data-shopify-model3d-id",t.defaultId),e.modelViewerUi.pause()}).on("xrLaunch",function(){e.modelViewerUi.pause()})}return{init:function(n,o){e[o]={loaded:!1},n.each(function(e){var s=$(this),r=s.data("media-id"),n=$(s.find("model-viewer")[0]),c=n.data("model-id");if(0===e){var l=s.closest(a.mediaGroup).find(a.xrButton);i[o]={$element:l,defaultId:c}}t[r]={modelId:c,sectionId:o,$container:s,$element:n}}),window.Shopify.loadFeatures([{name:"shopify-xr",version:"1.0",onLoad:s},{name:"model-viewer-ui",version:"1.0",onLoad:r}]),theme.LibraryLoader.load("modelViewerUiStyles")},removeSectionModels:function(i){for(var a in t)t.hasOwnProperty(a)&&t[a].sectionId===i&&(t[a].modelViewerUi.destroy(),delete t[a]);delete e[i]}}}(),window.theme=window.theme||{},theme.FormStatus=function(){var e={statusMessage:"[data-form-status]"};return{init:function(){this.$statusMessage=$(e.statusMessage),this.$statusMessage&&(this.$statusMessage.attr("tabindex",-1).focus(),this.$statusMessage.on("blur",function(){this.$statusMessage.removeAttr("tabindex")}.bind(this)))}}}(),theme.Hero=function(){var e={indexSectionFlush:"index-section--flush"},t={heroFixedWidthContent:".hero-fixed-width__content",heroFixedWidthImage:".hero-fixed-width__image"};return function(i,a){this.$hero=$(i),this.layout=this.$hero.data("layout");var s=$("#shopify-section-"+a),r=s.find(t.heroFixedWidthContent),n=s.find(t.heroFixedWidthImage);function o(){var e=r.height()+50;e>n.height()&&n.css("min-height",e)}"fixed_width"===this.layout&&(s.removeClass(e.indexSectionFlush),o(),$(window).resize($.debounce(50,function(){o()})))}}(),window.theme=window.theme||{},theme.SearchResultsTemplate=function(){function e(e,t){return 0===e.length?"":['<div class="predictive-search-title">','<h3 id="predictive-search" class="predictive-search-title__content">'+theme.strings.products+"</h3>",'<span class="predictive-search-title__loading-spinner">'+(t?'<span class= "icon-predictive-search-spinner" ></span >':"")+"</span>","</div>"].join("")}function t(e){return['<button type="submit" class="predictive-search-view-all__button" tabindex="-1">',theme.strings.searchFor+'<span class="predictive-search-view-all__query"> &ldquo;'+(t=e,t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"))+"&rdquo;</span>","</button>"].join("");var t}function i(e,i){var r=e.length;return['<ul id="predictive-search-results" class="predictive-search__list" role="listbox" aria-labelledby="predictive-search">',e.map(function(e,t){return function(e,t,i){return['<li id="search-result-'+t+'" class="predictive-search-item" role="option" data-search-result>','<a class="predictive-search-item__link" href="'+e.url+'" tabindex="-1">','<div class="predictive-search__column predictive-search__column--image" data-image-with-placeholder-wrapper>',a(e),"</div>",'<div class="predictive-search__column predictive-search__column--content '+(h()?"":"predictive-search__column--center")+'">','<span class="predictive-search-item__title">','<span class="predictive-search-item__title-text">'+e.title+"</span>","</span>"+(h()?s(e):""),'<span class="visually-hidden">, </span>','<span class="visually-hidden">'+p(t+1,i)+"</span>","</div>","</a>","</li>"].join("")}(function(e){return{url:(e.variants.length>0?e.variants[0]:e).url,image:c(e),title:e.title,vendor:e.vendor||"",price:theme.Currency.formatMoney(e.price_min,theme.moneyFormat),compareAtPrice:theme.Currency.formatMoney(e.compare_at_price_min,theme.moneyFormat),available:e.available,isOnSale:l(e),isPriceVaries:d(e),isCompareVaries:u(e)}}(e),t,r)}).join(""),'<li id="search-all" class="predictive-search-view-all" role="option" data-search-result>'+t(i)+"</li>","</ul>"].join("")}function a(e){return null===e.image?"":['<div class="placeholder-background placeholder-background--animation" data-image-placeholder aria-hidden="true"></div>','<img class="predictive-search-item__image lazyload" src="'+e.image.url+'" data-src="'+e.image.url+'" data-image alt="'+e.image.alt+'" />'].join("")}function s(e){return['<dl class="predictive-search-item__details price'+(e.isOnSale?" price--on-sale":"")+(e.available?"":" price--sold-out")+(!e.isPriceVaries&&e.isCompareVaries?" price--compare-price-hidden":"")+'">','<div class="predictive-search-item__detail">',o(e),"</div>",'<div class="predictive-search-item__detail predictive-search-item__detail--inline">'+r(e),"</div>","</dl>"].join("")}function r(e){if(!theme.settings.predictiveSearchShowPrice)return"";var t='<div class="price__regular">'+function(e){return["<dt>",'<span class="visually-hidden">'+theme.strings.regularPrice+"</span>","</dt>","<dd>",'<span class="predictive-search-item__price">'+(e.isPriceVaries?theme.strings.fromLowestPrice.replace("[price]",e.price):e.price)+"</span>","</dd>"].join("")}(e)+"</div>",i='<div class="price__sale">'+function(e){return["<dt>",'<span class="visually-hidden">'+theme.strings.salePrice+"</span>","</dt>","<dd>",'<span class="predictive-search-item__price predictive-search-item__price--sale">'+(e.isPriceVaries?theme.strings.fromLowestPrice.replace("[price]",e.price):e.price)+"</span>","</dd>",'<div class="price__compare">'+n(e)+"</div>"].join("")}(e)+"</div>";return'<span class="visually-hidden">, </span><div class="price__pricing-group">'+(e.isOnSale?i:t)+"</div>"}function n(e){return["<dt>",'<span class="visually-hidden">'+theme.strings.regularPrice+"</span> ","</dt>","<dd>",'<span class="predictive-search-item__price predictive-search-item__price--compare">'+e.compareAtPrice+"</span>","</dd>"].join("")}function o(e){return theme.settings.predictiveSearchShowVendor&&""!==e.vendor?["<dt>",'<span class="visually-hidden">'+theme.strings.vendor+"</span>","</dt>",'<dd class="predictive-search-item__vendor">'+e.vendor+"</dd>"].join(""):""}function c(e){var t,i;return e.variants.length>0&&null!==e.variants[0].image?i=e.variants[0].featured_image:e.image?i=e.featured_image:t=null,null!==t&&(t={url:theme.Images.getSizedImageUrl(i.url,"100x"),alt:i.alt}),t}function l(e){return null!==e.compare_at_price_min&&parseInt(e.compare_at_price_min,10)>parseInt(e.price_min,10)}function d(e){return e.price_max!==e.price_min}function u(e){return e.compare_at_price_max!==e.compare_at_price_min}function h(){return[theme.settings.predictiveSearchShowPrice,theme.settings.predictiveSearchShowVendor].reduce(function(e,t){return e+(t?1:0)},0)}function p(e,t){return theme.strings.number_of_results.replace("[result_number]",e).replace("[results_count]",t)}return function(t){var a=t.products||[],s=t.isLoading,r=t.searchQuery||"";return s&&0===a.length?['<div class="predictive-search">','<div class="predictive-search-loading">','<span class="visually-hidden">'+theme.strings.loading+"</span>",'<span class="predictive-search-loading__icon">','<span class="icon-predictive-search-spinner"></span>',"</span>","</div>","</div>"].join(""):function(t,a,s){return['<div class="predictive-search">',e(t,a),i(t,s),"</div>"].join("")}(a,s,r)}}(),window.theme=window.theme||{},function(){function e(e){return 1===e.products.length?theme.strings.one_result_found:theme.strings.number_of_results_found.replace("[results_count]",e.products.length)}function t(){return theme.strings.loading}function i(){return JSON.parse($("#shopify-features").text()).predictiveSearch&&window.theme.settings.predictiveSearchEnabled}function a(e,t){t.addEventListener("click",function(e,t){if(0!==e.value.trim().length)return;void 0!==t&&t.preventDefault();e.focus()}.bind(this,e))}window.theme.SearchPage=function(){var i,s={searchReset:"[data-search-page-predictive-search-clear]",searchInput:"[data-search-page-predictive-search-input]",searchSubmit:"[data-search-page-predictive-search-submit]",searchResults:'[data-predictive-search-mount="default"]'},r=document.querySelector(s.searchInput),n=document.querySelector(s.searchSubmit);return{init:function(o){i=new window.Shopify.theme.PredictiveSearchComponent({selectors:{input:s.searchInput,reset:s.searchReset,result:s.searchResults},resultTemplateFct:window.theme.SearchResultsTemplate,numberOfResultsTemplateFct:e,loadingResultsMessageTemplateFct:t,onOpen:function(e){if(!o.isTabletAndUp){var t=$(s.searchInput)[0].getBoundingClientRect(),i=$("body").height()-t.bottom-50;$(e.result).css({maxHeight:i})}},onBeforeDestroy:function(e){$(e.result).css({maxHeight:""})}}),a(r,n)},unload:function(){i&&(i.destroy(),i=null)}}}(),window.theme.SearchHeader=function(){var i,s={searchInput:"[data-predictive-search-drawer-input]",searchResults:'[data-predictive-search-mount="drawer"]',searchFormContainer:"[data-search-form-container]",searchSubmit:"[data-search-form-submit]"},r=document.querySelector(s.searchInput),n=document.querySelector(s.searchSubmit);return{init:function(o){i=new window.Shopify.theme.PredictiveSearchComponent({selectors:{input:s.searchInput,result:s.searchResults},resultTemplateFct:window.theme.SearchResultsTemplate,numberOfResultsTemplateFct:e,numberOfResults:o.numberOfResults,loadingResultsMessageTemplateFct:t,onInputBlur:function(){return!1},onOpen:function(e){var t=$(r)[0].getBoundingClientRect(),i=window.innerHeight-t.bottom-(o.isTabletAndUp?20:0);$(e.result).css({top:o.isTabletAndUp?"":t.bottom,maxHeight:i})},onClose:function(e){$(e.result).css({maxHeight:""})},onBeforeDestroy:function(e){$(e.result).css({top:""})}}),a(r,n)},unload:function(){i&&(i.destroy(),i=null)},clearAndClose:function(){i&&i.clearAndClose()}}}(),window.theme.Search=function(){var e={searchTemplate:"template-search"},t={siteHeader:".site-header"},a={mobile:window.matchMedia("(max-width: 749px)"),tabletAndUp:window.matchMedia("(min-width: 750px)")};function s(){theme.SearchDrawer.close(),theme.SearchHeader.unload(),theme.SearchPage.unload(),a.mobile.matches?(theme.SearchHeader.init({numberOfResults:4,isTabletAndUp:!1}),r()&&theme.SearchPage.init({isTabletAndUp:!1})):(theme.SearchHeader.init({numberOfResults:4,isTabletAndUp:!0}),r()&&theme.SearchPage.init({isTabletAndUp:!0}))}function r(){return $("body").hasClass(e.searchTemplate)}return{init:function(){$(t.siteHeader).length&&i()&&(Object.keys(a).forEach(function(e){a[e].addListener(s)}),s())},unload:function(){theme.SearchHeader.unload(),theme.SearchPage.unload()}}}()}(),window.theme=window.theme||{},theme.SearchDrawer=function(){var e,t={headerSection:"[data-header-section]",drawer:"[data-predictive-search-drawer]",drawerOpenButton:"[data-predictive-search-open-drawer]",headerSearchInput:"[data-predictive-search-drawer-input]",predictiveSearchWrapper:'[data-predictive-search-mount="drawer"]'};return{init:function(){$(t.drawerOpenButton).attr("aria-controls","SearchDrawer").attr("aria-expanded","false").attr("aria-haspopup","dialog"),e=new theme.Drawers("SearchDrawer","top",{onDrawerOpen:function(){$(t.drawer).css({height:$(t.headerSection).outerHeight()}),theme.MobileNav.closeMobileNav(),window.bodyScrollLock.disableBodyScroll(document.querySelector(t.predictiveSearchWrapper),{allowTouchMove:function(e){return 1===$(e).parents(t.predictiveSearchWrapper).length}})},onDrawerClose:function(){theme.SearchHeader.clearAndClose(),$(t.drawerOpenButton).focus(),window.bodyScrollLock.clearAllBodyScrollLocks()},withPredictiveSearch:!0,$elementToFocusOnOpen:$(t.headerSearchInput)})},close:function(){e.close()}}}(),theme.Disclosure=function(){var e="[data-disclosure-list]",t="[data-disclosure-toggle]",i="[data-disclosure-input]",a="[data-disclosure-option]",s="disclosure-list--visible";function r(e){this.$container=e,this.cache={},this._cacheSelectors(),this._connectOptions(),this._connectToggle(),this._onFocusOut()}return r.prototype=_.assignIn({},r.prototype,{_cacheSelectors:function(){this.cache={$disclosureList:this.$container.find(e),$disclosureToggle:this.$container.find(t),$disclosureInput:this.$container.find(i),$disclosureOptions:this.$container.find(a)}},_connectToggle:function(){this.cache.$disclosureToggle.on("click",function(e){var t="true"===$(e.currentTarget).attr("aria-expanded");$(e.currentTarget).attr("aria-expanded",!t),this.cache.$disclosureList.toggleClass(s)}.bind(this))},_connectOptions:function(){this.cache.$disclosureOptions.on("click",function(e){this._submitForm($(e.currentTarget).data("value"))}.bind(this))},_onFocusOut:function(){this.cache.$disclosureToggle.on("focusout",function(e){0===this.$container.has(e.relatedTarget).length&&this._hideList()}.bind(this)),this.cache.$disclosureList.on("focusout",function(e){var t=$(e.currentTarget).has(e.relatedTarget).length>0;this.cache.$disclosureList.hasClass(s)&&!t&&this._hideList()}.bind(this)),this.$container.on("keyup",function(e){e.which===slate.utils.keyboardKeys.ESCAPE&&(this._hideList(),this.cache.$disclosureToggle.focus())}.bind(this)),$("body").on("click",function(e){var t=this.$container.has(e.target).length>0;this.cache.$disclosureList.hasClass(s)&&!t&&this._hideList()}.bind(this))},_submitForm:function(e){this.cache.$disclosureInput.val(e),this.$container.parents("form").submit()},_hideList:function(){this.cache.$disclosureList.removeClass(s),this.cache.$disclosureToggle.attr("aria-expanded",!1)},unload:function(){this.cache.$disclosureOptions.off(),this.cache.$disclosureToggle.off(),this.cache.$disclosureList.off(),this.$container.off()}}),r}(),function(){var e=$("#BlogTagFilter");e.length&&(slate.utils.resizeSelects(e),e.on("change",function(){location.href=$(this).val()}))}(),window.theme=theme||{},theme.customerTemplates=function(){var e={RecoverHeading:"#RecoverHeading",RecoverEmail:"#RecoverEmail",LoginHeading:"#LoginHeading"};function t(){this.$RecoverHeading=$(e.RecoverHeading),this.$RecoverEmail=$(e.RecoverEmail),this.$LoginHeading=$(e.LoginHeading),$("#RecoverPassword").on("click",function(e){e.preventDefault(),i(),this.$RecoverHeading.attr("tabindex","-1").focus()}.bind(this)),$("#HideRecoverPasswordLink").on("click",function(e){e.preventDefault(),$("#RecoverPasswordForm").addClass("hide"),$("#CustomerLoginForm").removeClass("hide"),this.$LoginHeading.attr("tabindex","-1").focus()}.bind(this)),this.$RecoverHeading.on("blur",function(){$(this).removeAttr("tabindex")}),this.$LoginHeading.on("blur",function(){$(this).removeAttr("tabindex")})}function i(){$("#RecoverPasswordForm").removeClass("hide"),$("#CustomerLoginForm").addClass("hide"),"true"===this.$RecoverEmail.attr("aria-invalid")&&this.$RecoverEmail.focus()}return{init:function(){var e,a;t(),function(){"#recover"===window.location.hash&&i.bind(this)()}(),$(".reset-password-success").length&&$("#ResetSuccess").removeClass("hide").focus(),e=$("#AddressNewForm"),a=$("#AddressNewButton"),e.length&&(Shopify&&new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{hideElement:"AddressProvinceContainerNew"}),$(".address-country-option").each(function(){var e=$(this).data("form-id"),t="AddressCountry_"+e,i="AddressProvince_"+e,a="AddressProvinceContainer_"+e;new Shopify.CountryProvinceSelector(t,i,{hideElement:a})}),$(".address-new-toggle").on("click",function(){var t="true"===a.attr("aria-expanded");e.toggleClass("hide"),a.attr("aria-expanded",!t).focus()}),$(".address-edit-toggle").on("click",function(){var e=$(this).data("form-id"),t=$("#EditFormButton_"+e),i=$("#EditAddress_"+e),a="true"===t.attr("aria-expanded");i.toggleClass("hide"),t.attr("aria-expanded",!a).focus()}),$(".address-delete").on("click",function(){var e=$(this),t=e.data("target"),i=e.data("confirm-message");confirm(i||"Are you sure you wish to delete this address?")&&Shopify.postLink(t,{parameters:{_method:"delete"}})}))}}}(),window.theme=window.theme||{},theme.Cart=function(){var e={cartCount:"[data-cart-count]",cartCountBubble:"[data-cart-count-bubble]",cartDiscount:"[data-cart-discount]",cartDiscountTitle:"[data-cart-discount-title]",cartDiscountAmount:"[data-cart-discount-amount]",cartDiscountWrapper:"[data-cart-discount-wrapper]",cartErrorMessage:"[data-cart-error-message]",cartErrorMessageWrapper:"[data-cart-error-message-wrapper]",cartItem:"[data-cart-item]",cartItemDetails:"[data-cart-item-details]",cartItemDiscount:"[data-cart-item-discount]",cartItemDiscountedPriceGroup:"[data-cart-item-discounted-price-group]",cartItemDiscountTitle:"[data-cart-item-discount-title]",cartItemDiscountAmount:"[data-cart-item-discount-amount]",cartItemDiscountList:"[data-cart-item-discount-list]",cartItemFinalPrice:"[data-cart-item-final-price]",cartItemImage:"[data-cart-item-image]",cartItemLinePrice:"[data-cart-item-line-price]",cartItemOriginalPrice:"[data-cart-item-original-price]",cartItemPrice:"[data-cart-item-price]",cartItemPriceList:"[data-cart-item-price-list]",cartItemProperty:"[data-cart-item-property]",cartItemPropertyName:"[data-cart-item-property-name]",cartItemPropertyValue:"[data-cart-item-property-value]",cartItemRegularPriceGroup:"[data-cart-item-regular-price-group]",cartItemRegularPrice:"[data-cart-item-regular-price]",cartItemTitle:"[data-cart-item-title]",cartItemOption:"[data-cart-item-option]",cartLineItems:"[data-cart-line-items]",cartNote:"[data-cart-notes]",cartQuantityErrorMessage:"[data-cart-quantity-error-message]",cartQuantityErrorMessageWrapper:"[data-cart-quantity-error-message-wrapper]",cartRemove:"[data-cart-remove]",cartStatus:"[data-cart-status]",cartSubtotal:"[data-cart-subtotal]",cartTableCell:"[data-cart-table-cell]",cartWrapper:"[data-cart-wrapper]",emptyPageContent:"[data-empty-page-content]",quantityInput:"[data-quantity-input]",quantityInputMobile:"[data-quantity-input-mobile]",quantityInputDesktop:"[data-quantity-input-desktop]",quantityLabelMobile:"[data-quantity-label-mobile]",quantityLabelDesktop:"[data-quantity-label-desktop]",inputQty:"[data-quantity-input]",thumbnails:".cart__image",unitPrice:"[data-unit-price]",unitPriceBaseUnit:"[data-unit-price-base-unit]",unitPriceGroup:"[data-unit-price-group]"},t={cartNoCookies:"cart--no-cookies",cartRemovedProduct:"cart__removed-product",hide:"hide",inputError:"input--error"},i="data-cart-item-index",a="data-cart-item-key",s="data-cart-item-quantity",r="data-cart-item-title",n="data-cart-item-url",o="data-quantity-item";theme.breakpoints=theme.breakpoints||{},(isNaN(theme.breakpoints.medium)||void 0===theme.breakpoints.medium)&&(theme.breakpoints.medium=750);var c="(min-width: "+theme.breakpoints.medium+"px)";function l(i){this.$container=$(i),this.$thumbnails=$(e.thumbnails,this.$container),this.ajaxEnabled=this.$container.data("ajax-enabled"),this.cookiesEnabled()||this.$container.addClass(t.cartNoCookies),this.$thumbnails.css("cursor","pointer"),this.$container.on("click",e.thumbnails,this._handleThumbnailClick),this.$container.on("change",e.inputQty,$.debounce(500,this._handleInputQty.bind(this))),this.mql=window.matchMedia(c),this.mql.addListener(this.setQuantityFormControllers.bind(this)),this.setQuantityFormControllers(),this.ajaxEnabled&&(this.$container.on("change",e.cartNote,this._onNoteChange.bind(this)),this.$container.on("click",e.cartRemove,this._onRemoveItem.bind(this)),this._setupCartTemplates())}return l.prototype=_.assignIn({},l.prototype,{_setupCartTemplates:function(){this.$itemTemplate=$(e.cartItem,this.$container).first().clone(),this.$itemDiscountTemplate=$(e.cartItemDiscount,this.$itemTemplate).clone(),this.$itemOptionTemplate=$(e.cartItemOption,this.$itemTemplate).clone(),this.$itemPropertyTemplate=$(e.cartItemProperty,this.$itemTemplate).clone(),this.$itemPriceListTemplate=$(e.cartItemPriceList,this.$itemTemplate).clone(),this.$itemLinePriceTemplate=$(e.cartItemLinePrice,this.$itemTemplate).clone(),this.$cartDiscountTemplate=$(e.cartDiscount,this.$container).clone()},_handleInputQty:function(t){var i=$(t.target),a=i.data("quantity-item"),s=i.closest(e.cartItem),r=$("[data-quantity-item="+a+"]"),n=parseInt(i.val()),o=!(n<0||isNaN(n));r.val(n),this._hideCartError(),this._hideQuantityErrorMessage(),o?o&&this.ajaxEnabled&&this._updateItemQuantity(a,s,r,n):this._showQuantityErrorMessages(s)},_updateItemQuantity:function(t,s,r,n){var o=s.attr(a),c=s.attr(i),l={url:"/cart/change.js",data:{quantity:n,line:c},dataType:"json"};$.post(l).done(function(t){if(0===t.item_count)this._emptyCart();else if(this._createCart(t),0===n)this._showRemoveMessage(s.clone());else{var i=$('[data-cart-item-key="'+o+'"]'),a=this.getItem(o,t);$(e.quantityInput,i).focus(),this._updateLiveRegion(a)}this._setCartCountBubble(t.item_count)}.bind(this)).fail(function(){this._showCartError(r)}.bind(this))},getItem:function(e,t){return t.items.find(function(t){return t.key===e})},_liveRegionText:function(e){var t=theme.strings.update+": [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]";t=t.replace("[QuantityLabel]",theme.strings.quantity).replace("[Quantity]",e.quantity);var i="",a=theme.Currency.formatMoney(e.original_line_price,theme.moneyFormat),s="",r="",n="";return e.original_line_price>e.final_line_price&&(i=theme.strings.regularTotal,s=theme.strings.discountedTotal,r=theme.Currency.formatMoney(e.final_line_price,theme.moneyFormat),n=theme.strings.priceColumn),t=t.replace("[Regular]",i).replace("[$$]",a).replace("[DiscountedPrice]",s).replace("[$]",r).replace("[PriceInformation]",n).trim()},_updateLiveRegion:function(t){var i=$(e.cartStatus);i.html(this._liveRegionText(t)).attr("aria-hidden",!1),setTimeout(function(){i.attr("aria-hidden",!0)},1e3)},_createCart:function(i){var a=this._createCartDiscountList(i);$(e.cartLineItems,this.$container).html(this._createLineItemList(i)),this.setQuantityFormControllers(),$(e.cartNote,this.$container).val(i.note),0===a.length?$(e.cartDiscountWrapper,this.$container).html("").addClass(t.hide):$(e.cartDiscountWrapper,this.$container).html(a).removeClass(t.hide),$(e.cartSubtotal,this.$container).html(theme.Currency.formatMoney(i.total_price,theme.moneyFormatWithCurrency))},_createCartDiscountList:function(t){return $.map(t.cart_level_discount_applications,function(t){var i=this.$cartDiscountTemplate.clone();return i.find(e.cartDiscountTitle).text(t.title),i.find(e.cartDiscountAmount).html(theme.Currency.formatMoney(t.total_allocated_amount,theme.moneyFormat)),i[0]}.bind(this))},_createLineItemList:function(t){return $.map(t.items,function(t,i){var a=this.$itemTemplate.clone(),s=this.$itemPriceListTemplate.clone();this._setLineItemAttributes(a,t,i),this._setLineItemImage(a,t.featured_image),$(e.cartItemTitle,a).text(t.product_title).attr("href",t.url);var r=this._createProductDetailsList(t.product_has_only_default_variant,t.options_with_values,t.properties);this._setProductDetailsList(a,r),this._setItemRemove(a,t.title),s.html(this._createItemPrice(t.original_price,t.final_price,this.$itemPriceListTemplate)),t.unit_price_measurement&&s.append(this._createUnitPrice(t.unit_price,t.unit_price_measurement,this.$itemPriceListTemplate)),this._setItemPrice(a,s);var n=this._createItemDiscountList(t);this._setItemDiscountList(a,n),this._setQuantityInputs(a,t,i);var o=this._createItemPrice(t.original_line_price,t.final_line_price,this.$itemLinePriceTemplate);return this._setItemLinePrice(a,o),a[0]}.bind(this))},_setLineItemAttributes:function(e,t,o){e.attr(a,t.key).attr(n,t.url).attr(r,t.title).attr(i,o+1).attr(s,t.quantity)},_setLineItemImage:function(i,a){var s=$(e.cartItemImage,i),r=null!==a.url?theme.Images.getSizedImageUrl(a.url,"x190"):null;r?s.attr("alt",a.alt).attr("src",r).removeClass(t.hide):s.remove()},_setProductDetailsList:function(i,a){var s=$(e.cartItemDetails,i);0===a.length?s.addClass(t.hide).text(""):s.removeClass(t.hide).html(a)},_setItemPrice:function(t,i){$(e.cartItemPrice,t).html(i)},_setItemDiscountList:function(i,a){var s=$(e.cartItemDiscountList,i);0===a.length?s.html("").addClass(t.hide):s.html(a).removeClass(t.hide)},_setItemRemove:function(t,i){$(e.cartRemove,t).attr("aria-label",theme.strings.removeLabel.replace("[product]",i))},_setQuantityInputs:function(t,i,a){$(e.quantityInputMobile,t).attr("id","updates_"+i.key).attr(o,a+1).val(i.quantity),$(e.quantityInputDesktop,t).attr("id","updates_large_"+i.key).attr(o,a+1).val(i.quantity),$(e.quantityLabelMobile,t).attr("for","updates_"+i.key),$(e.quantityLabelDesktop,t).attr("for","updates_large_"+i.key)},setQuantityFormControllers:function(){this.mql.matches?($(e.quantityInputDesktop).attr("name","updates[]"),$(e.quantityInputMobile).removeAttr("name")):($(e.quantityInputMobile).attr("name","updates[]"),$(e.quantityInputDesktop).removeAttr("name"))},_setItemLinePrice:function(t,i){$(e.cartItemLinePrice,t).html(i)},_createProductDetailsList:function(e,t,i){var a=[];return e||(a=a.concat(this._getOptionList(t))),null!==i&&0!==Object.keys(i).length&&(a=a.concat(this._getPropertyList(i))),a},_getOptionList:function(e){return $.map(e,function(e){var i=this.$itemOptionTemplate.clone();return i.text(e.name+": "+e.value).removeClass(t.hide),i[0]}.bind(this))},_getPropertyList:function(i){var a=null!==i?Object.entries(i):[];return $.map(a,function(i){var a=this.$itemPropertyTemplate.clone();if("_"!==i[0].charAt(0)&&0!==i[1].length)return a.find(e.cartItemPropertyName).text(i[0]),-1===i[0].indexOf("/uploads/")?a.find(e.cartItemPropertyValue).text(": "+i[1]):a.find(e.cartItemPropertyValue).html(': <a href="'+i[1]+'"> '+i[1].split("/").pop()+"</a>"),a.removeClass(t.hide),a[0]}.bind(this))},_createItemPrice:function(i,a,s){if(i!==a){var r=$(e.cartItemDiscountedPriceGroup,s).clone();return $(e.cartItemOriginalPrice,r).html(theme.Currency.formatMoney(i,theme.moneyFormat)),$(e.cartItemFinalPrice,r).html(theme.Currency.formatMoney(a,theme.moneyFormat)),r.removeClass(t.hide),r[0]}var n=$(e.cartItemRegularPriceGroup,s).clone();return $(e.cartItemRegularPrice,n).html(theme.Currency.formatMoney(i,theme.moneyFormat)),n.removeClass(t.hide),n[0]},_createUnitPrice:function(i,a,s){var r=$(e.unitPriceGroup,s).clone(),n=(1!==a.reference_value?a.reference_value:"")+a.reference_unit;return $(e.unitPriceBaseUnit,r).text(n),$(e.unitPrice,r).html(theme.Currency.formatMoney(i,theme.moneyFormat)),r.removeClass(t.hide),r[0]},_createItemDiscountList:function(t){return $.map(t.line_level_discount_allocations,function(t){var i=this.$itemDiscountTemplate.clone();return i.find(e.cartItemDiscountTitle).text(t.discount_application.title),i.find(e.cartItemDiscountAmount).html(theme.Currency.formatMoney(t.amount,theme.moneyFormat)),i[0]}.bind(this))},_showQuantityErrorMessages:function(i){$(e.cartQuantityErrorMessage,i).text(theme.strings.quantityMinimumMessage),$(e.cartQuantityErrorMessageWrapper,i).removeClass(t.hide),$(e.inputQty,i).addClass(t.inputError).focus()},_hideQuantityErrorMessage:function(){var i=$(e.cartQuantityErrorMessageWrapper).addClass(t.hide);$(e.cartQuantityErrorMessage,i).text(""),$(e.inputQty,this.$container).removeClass(t.inputError)},_handleThumbnailClick:function(t){var i=$(t.target).closest(e.cartItem).data("cart-item-url");window.location.href=i},_onNoteChange:function(e){var t=e.currentTarget.value;this._hideCartError(),this._hideQuantityErrorMessage();var i={url:"/cart/update.js",data:{note:t},dataType:"json"};$.post(i).fail(function(){this._showCartError(e.currentTarget)}.bind(this))},_showCartError:function(i){$(e.cartErrorMessage).text(theme.strings.cartError),$(e.cartErrorMessageWrapper).removeClass(t.hide),i.focus()},_hideCartError:function(){$(e.cartErrorMessageWrapper).addClass(t.hide),$(e.cartErrorMessage).text("")},_onRemoveItem:function(t){t.preventDefault();var a=$(t.target).closest(e.cartItem),s=a.attr(i);this._hideCartError();var r={url:"/cart/change.js",data:{quantity:0,line:s},dataType:"json"};$.post(r).done(function(e){0===e.item_count?this._emptyCart():(this._createCart(e),this._showRemoveMessage(a.clone())),this._setCartCountBubble(e.item_count)}.bind(this)).fail(function(){this._showCartError(null)}.bind(this))},_showRemoveMessage:function(e){var t,i=e.data("cart-item-index"),a=this._getRemoveMessage(e);i-1==0?(t=$('[data-cart-item-index="1"]',this.$container),$(a).insertBefore(t)):(t=$('[data-cart-item-index="'+(i-1)+'"]',this.$container),a.insertAfter(t)),a.focus()},_getRemoveMessage:function(i){var a=this._formatRemoveMessage(i),s=$(e.cartTableCell,i).clone();return s.removeClass().addClass(t.cartRemovedProduct).attr("colspan","4").html(a),i.attr("role","alert").html(s).attr("tabindex","-1"),i},_formatRemoveMessage:function(e){var t=e.data("cart-item-quantity"),i=e.attr(n),a=e.attr(r);return theme.strings.removedItemMessage.replace("[quantity]",t).replace("[link]",'<a href="'+i+'" class="text-link text-link--accent">'+a+"</a>")},_setCartCountBubble:function(i){this.$cartCountBubble=this.$cartCountBubble||$(e.cartCountBubble),this.$cartCount=this.$cartCount||$(e.cartCount),i>0?(this.$cartCountBubble.removeClass(t.hide),this.$cartCount.html(i)):(this.$cartCountBubble.addClass(t.hide),this.$cartCount.html(""))},_emptyCart:function(){this.$emptyPageContent=this.$emptyPageContent||$(e.emptyPageContent,this.$container),this.$cartWrapper=this.$cartWrapper||$(e.cartWrapper,this.$container),this.$emptyPageContent.removeClass(t.hide),this.$cartWrapper.addClass(t.hide)},cookiesEnabled:function(){var e=navigator.cookieEnabled;return e||(document.cookie="testcookie",e=-1!==document.cookie.indexOf("testcookie")),e}}),l}(),window.theme=window.theme||{},theme.Filters=function(){var e="screen and (min-width: 750px)",t={mainContent:"#MainContent",filterSelection:"#FilterTags",sortSelection:"#SortBy"},i="data-default-sortby";function a(e){var i=this.$container=$(e);this.$filterSelect=$(t.filterSelection,i),this.$sortSelect=$(t.sortSelection,i),this.$selects=$(t.filterSelection,i).add($(t.sortSelection,i)),this.defaultSort=this._getDefaultSortValue(),this.$selects.removeClass("hidden"),this.$filterSelect.on("change",this._onFilterChange.bind(this)),this.$sortSelect.on("change",this._onSortChange.bind(this)),this._initBreakpoints(),this._initParams()}return a.prototype=_.assignIn({},a.prototype,{_initBreakpoints:function(){var t=this;enquire.register(e,{match:function(){slate.utils.resizeSelects(t.$selects)}})},_initParams:function(){if(self.queryParams={},location.search.length)for(var e,t=location.search.substr(1).split("&"),i=0;i<t.length;i++)(e=t[i].split("=")).length>1&&(self.queryParams[decodeURIComponent(e[0])]=decodeURIComponent(e[1]))},_onSortChange:function(){self.queryParams.sort_by=this._getSortValue();var e="/collections/all?"+$.param(self.queryParams),t=$(".cus-filter-y").find("a").attr("href");$.ajax({type:"GET",url:e,dataType:"html",success:function(i){$(i).find(".grid--uniform").html(),$(".grid--uniform").html($(i).find(".grid--uniform").html()),window.history.pushState(location.href,"",e+t)}}),self.queryParams.page&&delete self.queryParams.page},_onFilterChange:function(){document.location.href=this._getFilterValue()},_getFilterValue:function(){return this.$filterSelect.val()},_getSortValue:function(){return this.$sortSelect.val()||this.defaultSort},_getDefaultSortValue:function(){return this.$sortSelect.attr(i)},onUnload:function(){this.$filterSelect.off("change",this._onFilterChange),this.$sortSelect.off("change",this._onSortChange)}}),a}(),window.theme=window.theme||{},theme.HeaderSection=function(){function e(){theme.Header.init(),theme.MobileNav.init(),theme.SearchDrawer.init(),theme.Search.init()}return e.prototype=_.assignIn({},e.prototype,{onUnload:function(){theme.Header.unload(),theme.Search.unload()}}),e}(),theme.Maps=function(){var e=14,t=null,i=[],a={addressNoResults:theme.strings.addressNoResults,addressQueryLimit:theme.strings.addressQueryLimit,addressError:theme.strings.addressError,authError:theme.strings.authError},s={section:'[data-section-type="map"]',map:"[data-map]",mapOverlay:"[data-map-overlay]"},r="map-section--load-error",n="map-section__error errors text-center";function o(e){this.$container=$(e),this.$map=this.$container.find(s.map),this.key=this.$map.data("api-key"),void 0!==this.key&&("loaded"===t?this.createMap():(i.push(this),"loading"!==t&&(t="loading",void 0===window.google&&$.getScript("https://maps.googleapis.com/maps/api/js?key="+this.key).then(function(){t="loaded",$.each(i,function(e,t){t.createMap()})}))))}return window.gm_authFailure=function(){Shopify.designMode&&($(s.section).addClass(r),$(s.map).remove(),$(s.mapOverlay).after('<div class="'+n+'">'+theme.strings.authError+"</div>"))},o.prototype=_.assignIn({},o.prototype,{createMap:function(){var t=this.$map;return function(e){var t=$.Deferred(),i=new google.maps.Geocoder,a=e.data("address-setting");return i.geocode({address:a},function(e,i){i!==google.maps.GeocoderStatus.OK&&t.reject(i),t.resolve(e)}),t}(t).then(function(i){var a={zoom:e,center:i[0].geometry.location,draggable:!1,clickableIcons:!1,scrollwheel:!1,disableDoubleClickZoom:!0,disableDefaultUI:!0},s=this.map=new google.maps.Map(t[0],a),r=this.center=s.getCenter();new google.maps.Marker({map:s,position:s.getCenter()});google.maps.event.addDomListener(window,"resize",$.debounce(250,function(){google.maps.event.trigger(s,"resize"),s.setCenter(r),t.removeAttr("style")}))}.bind(this)).fail(function(){var e;switch(status){case"ZERO_RESULTS":e=a.addressNoResults;break;case"OVER_QUERY_LIMIT":e=a.addressQueryLimit;break;case"REQUEST_DENIED":e=a.authError;break;default:e=a.addressError}Shopify.designMode&&t.parent().addClass(r).html('<div class="'+n+'">'+e+"</div>")})},onUnload:function(){0!==this.$map.length&&google.maps.event.clearListeners(this.map,"resize")}}),o}(),theme.Product=function(){function e(e){var t=this.$container=$(e),i=t.attr("data-section-id");this.ajaxEnabled=t.data("ajax-enabled"),this.settings={mediaQueryMediumUp:"screen and (min-width: 750px)",mediaQuerySmall:"screen and (max-width: 749px)",bpSmall:!1,enableHistoryState:t.data("enable-history-state")||!1,namespace:".slideshow-"+i,sectionId:i,sliderActive:!1,zoomEnabled:!1},this.selectors={addToCart:"[data-add-to-cart]",addToCartText:"[data-add-to-cart-text]",cartCount:"[data-cart-count]",cartCountBubble:"[data-cart-count-bubble]",cartPopup:"[data-cart-popup]",cartPopupCartQuantity:"[data-cart-popup-cart-quantity]",cartPopupClose:"[data-cart-popup-close]",cartPopupDismiss:"[data-cart-popup-dismiss]",cartPopupImage:"[data-cart-popup-image]",cartPopupImageWrapper:"[data-cart-popup-image-wrapper]",cartPopupImagePlaceholder:"[data-cart-popup-image-placeholder]",cartPopupPlaceholderSize:"[data-placeholder-size]",cartPopupProductDetails:"[data-cart-popup-product-details]",cartPopupQuantity:"[data-cart-popup-quantity]",cartPopupQuantityLabel:"[data-cart-popup-quantity-label]",cartPopupTitle:"[data-cart-popup-title]",cartPopupWrapper:"[data-cart-popup-wrapper]",loader:"[data-loader]",loaderStatus:"[data-loader-status]",quantity:"[data-quantity-input]",SKU:".variant-sku",productStatus:"[data-product-status]",originalSelectorId:"#ProductSelect-"+i,productForm:"[data-product-form]",errorMessage:"[data-error-message]",errorMessageWrapper:"[data-error-message-wrapper]",imageZoomWrapper:"[data-image-zoom-wrapper]",productMediaWrapper:"[data-product-single-media-wrapper]",productThumbImages:".product-single__thumbnail--"+i,productThumbs:".product-single__thumbnails-"+i,productThumbListItem:".product-single__thumbnails-item",productThumbsWrapper:".thumbnails-wrapper",saleLabel:".product-price__sale-label-"+i,singleOptionSelector:".single-option-selector-"+i,shopifyPaymentButton:".shopify-payment-button",productMediaTypeVideo:"[data-product-media-type-video]",productMediaTypeModel:"[data-product-media-type-model]",priceContainer:"[data-price]",regularPrice:"[data-regular-price]",salePrice:"[data-sale-price]",unitPrice:"[data-unit-price]",unitPriceBaseUnit:"[data-unit-price-base-unit]",productPolicies:"[data-product-policies]"},this.classes={cartPopupWrapperHidden:"cart-popup-wrapper--hidden",hidden:"hide",visibilityHidden:"visibility-hidden",inputError:"input--error",jsZoomEnabled:"js-zoom-enabled",productOnSale:"price--on-sale",productUnitAvailable:"price--unit-available",productUnavailable:"price--unavailable",productSoldOut:"price--sold-out",cartImage:"cart-popup-item__image",productFormErrorMessageWrapperHidden:"product-form__error-message-wrapper--hidden",activeClass:"active-thumb",variantSoldOut:"product-form--variant-sold-out"},this.$quantityInput=$(this.selectors.quantity,t),this.$errorMessageWrapper=$(this.selectors.errorMessageWrapper,t),this.$addToCart=$(this.selectors.addToCart,t),this.$addToCartText=$(this.selectors.addToCartText,this.$addToCart),this.$shopifyPaymentButton=$(this.selectors.shopifyPaymentButton,t),this.$productPolicies=$(this.selectors.productPolicies,t),this.$loader=$(this.selectors.loader,this.$addToCart),this.$loaderStatus=$(this.selectors.loaderStatus,t),$("#ProductJson-"+i).html()&&(this.productSingleObject=JSON.parse(document.getElementById("ProductJson-"+i).innerHTML),this.settings.zoomEnabled=$(this.selectors.imageZoomWrapper).hasClass(this.classes.jsZoomEnabled),this._initBreakpoints(),this._stringOverrides(),this._initVariants(),this._initMediaSwitch(),this._initAddToCart(),this._setActiveThumbnail(),this._initProductVideo(),this._initModelViewerLibraries(),this._initShopifyXrLaunch())}return e.prototype=_.assignIn({},e.prototype,{_stringOverrides:function(){theme.productStrings=theme.productStrings||{},$.extend(theme.strings,theme.productStrings)},_initBreakpoints:function(){var e=this;enquire.register(this.settings.mediaQuerySmall,{match:function(){$(e.selectors.productThumbImages).length>4&&e._initThumbnailSlider(),e.settings.zoomEnabled&&$(e.selectors.imageZoomWrapper).each(function(){$(this).trigger("zoom.destroy")}),e.settings.bpSmall=!0},unmatch:function(){e.settings.sliderActive&&e._destroyThumbnailSlider(),e.settings.bpSmall=!1}}),enquire.register(this.settings.mediaQueryMediumUp,{match:function(){e.settings.zoomEnabled&&$(e.selectors.imageZoomWrapper).each(function(){var e,t;e=this,t=$(e).data("zoom"),$(e).zoom({url:t})})}})},_initVariants:function(){var e={$container:this.$container,enableHistoryState:this.$container.data("enable-history-state")||!1,singleOptionSelector:this.selectors.singleOptionSelector,originalSelectorId:this.selectors.originalSelectorId,product:this.productSingleObject};this.variants=new slate.Variants(e),this.$container.on("variantChange"+this.settings.namespace,this._updateAvailability.bind(this)),this.$container.on("variantImageChange"+this.settings.namespace,this._updateMedia.bind(this)),this.$container.on("variantPriceChange"+this.settings.namespace,this._updatePrice.bind(this)),this.$container.on("variantSKUChange"+this.settings.namespace,this._updateSKU.bind(this))},_initMediaSwitch:function(){if($(this.selectors.productThumbImages).length){var e=this;$(this.selectors.productThumbImages).on("click",function(t){t.preventDefault();var i=$(this).data("thumbnail-id");e._switchMedia(i),e._setActiveThumbnail(i)}).on("keyup",e._handleMediaFocus.bind(e))}},_initAddToCart:function(){$(this.selectors.productForm,this.$container).on("submit",function(e){if(this.$addToCart.is("[aria-disabled]"))e.preventDefault();else if(this.ajaxEnabled){e.preventDefault(),this.$previouslyFocusedElement=$(":focus");var t=this.$quantityInput.val()<=0;if(t)this._showErrorMessage(theme.strings.quantityMinimumMessage);else if(t||!this.ajaxEnabled);else{this._handleButtonLoadingState(!0);var i=$(this.selectors.productForm,this.$container);this._addItemToCart(i)}}}.bind(this))},_initProductVideo:function(){var e=this.settings.sectionId;$(this.selectors.productMediaTypeVideo,this.$container).each(function(){var t=$(this);theme.ProductVideo.init(t,e)})},_initModelViewerLibraries:function(){var e=$(this.selectors.productMediaTypeModel,this.$container);e.length<1||theme.ProductModel.init(e,this.settings.sectionId)},_initShopifyXrLaunch:function(){var e=this;$(document).on("shopify_xr_launch",function(){$(e.selectors.productMediaWrapper+":not(."+e.classes.hidden+")",e.$container).trigger("xrLaunch")})},_addItemToCart:function(e){var t={url:"/cart/add.js",data:$(e).serialize(),dataType:"json"};$.post(t).done(function(e){this._hideErrorMessage(),this._setupCartPopup(e)}.bind(this)).fail(function(e){this.$previouslyFocusedElement.focus();var t=e.responseJSON?e.responseJSON.description:theme.strings.cartError;this._showErrorMessage(t),this._handleButtonLoadingState(!1)}.bind(this))},_handleButtonLoadingState:function(e){e?(this.$addToCart.attr("aria-disabled",!0),this.$addToCartText.addClass(this.classes.hidden),this.$loader.removeClass(this.classes.hidden),this.$shopifyPaymentButton.attr("disabled",!0),this.$loaderStatus.attr("aria-hidden",!1)):(this.$addToCart.removeAttr("aria-disabled"),this.$addToCartText.removeClass(this.classes.hidden),this.$loader.addClass(this.classes.hidden),this.$shopifyPaymentButton.removeAttr("disabled"),this.$loaderStatus.attr("aria-hidden",!0))},_showErrorMessage:function(e){$(this.selectors.errorMessage,this.$container).html(e),0!==this.$quantityInput.length&&this.$quantityInput.addClass(this.classes.inputError),this.$errorMessageWrapper.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden",!0).removeAttr("aria-hidden")},_hideErrorMessage:function(){this.$errorMessageWrapper.addClass(this.classes.productFormErrorMessageWrapperHidden),0!==this.$quantityInput.length&&this.$quantityInput.removeClass(this.classes.inputError)},_setupCartPopup:function(e){this.$cartPopup=this.$cartPopup||$(this.selectors.cartPopup),this.$cartPopupWrapper=this.$cartPopupWrapper||$(this.selectors.cartPopupWrapper),this.$cartPopupTitle=this.$cartPopupTitle||$(this.selectors.cartPopupTitle),this.$cartPopupQuantity=this.$cartPopupQuantity||$(this.selectors.cartPopupQuantity),this.$cartPopupQuantityLabel=this.$cartPopupQuantityLabel||$(this.selectors.cartPopupQuantityLabel),this.$cartPopupClose=this.$cartPopupClose||$(this.selectors.cartPopupClose),this.$cartPopupDismiss=this.$cartPopupDismiss||$(this.selectors.cartPopupDismiss),this.$cartPopupImagePlaceholder=this.$cartPopupImagePlaceholder||$(this.selectors.cartPopupImagePlaceholder),this._setupCartPopupEventListeners(),this._updateCartPopupContent(e)},_updateCartPopupContent:function(e){var t=this.$quantityInput.length?this.$quantityInput.val():1;this.$cartPopupTitle.text(e.product_title),this.$cartPopupQuantity.text(t),this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]",t)),this._setCartPopupPlaceholder(e.featured_image.url,e.featured_image.aspect_ratio),this._setCartPopupImage(e.featured_image.url,e.featured_image.alt),this._setCartPopupProductDetails(e.product_has_only_default_variant,e.options_with_values,e.properties),$.getJSON("/cart.js").then(function(e){this._setCartQuantity(e.item_count),this._setCartCountBubble(e.item_count),this._showCartPopup()}.bind(this))},_setupCartPopupEventListeners:function(){this.$cartPopupWrapper.on("keyup",function(e){e.keyCode===slate.utils.keyboardKeys.ESCAPE&&this._hideCartPopup(e)}.bind(this)),this.$cartPopupClose.on("click",this._hideCartPopup.bind(this)),this.$cartPopupDismiss.on("click",this._hideCartPopup.bind(this)),$("body").on("click",this._onBodyClick.bind(this))},_setCartPopupPlaceholder:function(e,t){if(this.$cartPopupImageWrapper=this.$cartPopupImageWrapper||$(this.selectors.cartPopupImageWrapper),null!==e){var i=$(this.selectors.cartPopupPlaceholderSize),a=95*t,s=100/t;this.$cartPopupImagePlaceholder.css("max-width",a),i.css("padding-top",s+"%")}else this.$cartPopupImageWrapper.addClass(this.classes.hidden)},_setCartPopupImage:function(e,t){if(null!==e){this.$cartPopupImageWrapper.removeClass(this.classes.hidden);var i=theme.Images.getSizedImageUrl(e,"200x"),a=document.createElement("img");a.src=i,a.alt=t,a.classList.add(this.classes.cartImage),a.dataset.cartPopupImage="",a.onload=function(){this.$cartPopupImagePlaceholder.addClass(this.classes.hidden),this.$cartPopupImageWrapper.append(a)}.bind(this)}},_setCartPopupProductDetails:function(e,t,i){this.$cartPopupProductDetails=this.$cartPopupProductDetails||$(this.selectors.cartPopupProductDetails);var a="";e||(a+=this._getVariantOptionList(t)),null!==i&&0!==Object.keys(i).length&&(a+=this._getPropertyList(i)),0===a.length?(this.$cartPopupProductDetails.html(""),this.$cartPopupProductDetails.attr("hidden","")):(this.$cartPopupProductDetails.html(a),this.$cartPopupProductDetails.removeAttr("hidden"))},_getVariantOptionList:function(e){var t="";return e.forEach(function(e){t=t+'<li class="product-details__item product-details__item--variant-option">'+e.name+": "+e.value+"</li>"}),t},_getPropertyList:function(e){var t="";return Object.entries(e).forEach(function(e){"_"!==e[0].charAt(0)&&0!==e[1].length&&(t=t+'<li class="product-details__item product-details__item--property"><span class="product-details__property-label">'+e[0]+": </span>"+e[1])}),t},_setCartQuantity:function(e){var t;this.$cartPopupCartQuantity=this.$cartPopupCartQuantity||$(this.selectors.cartPopupCartQuantity),1===e?t=theme.strings.oneCartCount:e>1&&(t=theme.strings.otherCartCount.replace("[count]",e)),this.$cartPopupCartQuantity.text(e).attr("aria-label",t)},_setCartCountBubble:function(e){this.$cartCountBubble=this.$cartCountBubble||$(this.selectors.cartCountBubble),this.$cartCount=this.$cartCount||$(this.selectors.cartCount),this.$cartCountBubble.removeClass(this.classes.hidden),this.$cartCount.text(e)},_showCartPopup:function(){this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden),this._handleButtonLoadingState(!1),slate.a11y.trapFocus({$container:this.$cartPopupWrapper,$elementToFocus:this.$cartPopup,namespace:"cartPopupFocus"})},_hideCartPopup:function(e){var t=0===e.detail;this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden),$(this.selectors.cartPopupImage).remove(),this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden),slate.a11y.removeTrapFocus({$container:this.$cartPopupWrapper,namespace:"cartPopupFocus"}),t&&this.$previouslyFocusedElement[0].focus(),this.$cartPopupWrapper.off("keyup"),this.$cartPopupClose.off("click"),this.$cartPopupDismiss.off("click"),$("body").off("click")},_onBodyClick:function(e){var t=$(e.target);t[0]===this.$cartPopupWrapper[0]||t.parents(this.selectors.cartPopup).length||this._hideCartPopup(e)},_setActiveThumbnail:function(e){void 0===e&&(e=$(this.selectors.productMediaWrapper+":not(.hide)",this.$container).data("media-id"));var t=$(this.selectors.productThumbListItem+":not(.slick-cloned)",this.$container),i=t.find(this.selectors.productThumbImages+"[data-thumbnail-id='"+e+"']");if($(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"),i.addClass(this.classes.activeClass),i.attr("aria-current",!0),t.hasClass("slick-slide")){var a=i.parent().data("slick-index");$(this.selectors.productThumbs).slick("slickGoTo",a,!0)}},_switchMedia:function(e){var t=$(this.selectors.productMediaWrapper+":not(."+this.classes.hidden+")",this.$container),i=$(this.selectors.productMediaWrapper+"[data-media-id='"+e+"']",this.$container);$(this.selectors.productMediaWrapper+":not([data-media-id='"+e+"'])",this.$container);t.trigger("mediaHidden"),i.removeClass(this.classes.hidden).trigger("mediaVisible")},_handleMediaFocus:function(e){if(e.keyCode===slate.utils.keyboardKeys.ENTER){var t=$(e.currentTarget).data("thumbnail-id");$(this.selectors.productMediaWrapper+"[data-media-id='"+t+"']",this.$container).focus()}},_initThumbnailSlider:function(){var e={slidesToShow:3,slidesToScroll:2,infinite:!1,prevArrow:".thumbnails-slider__prev--"+this.settings.sectionId,nextArrow:".thumbnails-slider__next--"+this.settings.sectionId};$(this.selectors.productThumbs).slick(e),$(this.selectors.productThumbsWrapper,this.$container).find(".slick-list").removeAttr("aria-live"),$(this.selectors.productThumbsWrapper,this.$container).find(".slick-disabled").removeAttr("aria-disabled"),this.settings.sliderActive=!0},_destroyThumbnailSlider:function(){$(this.selectors.productThumbs).slick("unslick"),this.settings.sliderActive=!1,$(this.selectors.productThumbsWrapper,this.$container).find('[tabindex="-1"]').removeAttr("tabindex")},_liveRegionText:function(e){var t="[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]";if(!e)return t=theme.strings.unavailable;var i=e.available?"":theme.strings.soldOut+",";t=t.replace("[Availability]",i);var a="",s=theme.Currency.formatMoney(e.price,theme.moneyFormat),r="",n="",o="",c="";return e.compare_at_price>e.price&&(a=theme.strings.regularPrice,s=theme.Currency.formatMoney(e.compare_at_price,theme.moneyFormat)+",",r=theme.strings.sale,n=theme.Currency.formatMoney(e.price,theme.moneyFormat)),e.unit_price&&(o=theme.strings.unitPrice,c=theme.Currency.formatMoney(e.unit_price,theme.moneyFormat)+" "+theme.strings.unitPriceSeparator+" "+this._getBaseUnit(e)),t=t.replace("[Regular]",a).replace("[$$]",s).replace("[Sale]",r).replace("[$]",n).replace("[UnitPrice]",o).replace("[$$$]",c).trim()},_updateLiveRegion:function(e){var t=e.variant,i=this.container.querySelector(this.selectors.productStatus);i.innerHTML=this._liveRegionText(t),i.setAttribute("aria-hidden",!1),setTimeout(function(){i.setAttribute("aria-hidden",!0)},1e3)},_updateAddToCart:function(e){var t=e.variant;t?t.available?(this.$addToCart.removeAttr("aria-disabled").attr("aria-label",theme.strings.addToCart),$(this.selectors.addToCartText,this.$container).text(theme.strings.addToCart),$(this.selectors.productForm,this.container).removeClass(this.classes.variantSoldOut)):(this.$addToCart.attr("aria-disabled",!0).attr("aria-label",theme.strings.soldOut),$(this.selectors.addToCartText,this.$container).text(theme.strings.soldOut),$(this.selectors.productForm,this.container).addClass(this.classes.variantSoldOut)):(this.$addToCart.attr("aria-disabled",!0).attr("aria-label",theme.strings.unavailable),$(this.selectors.addToCartText,this.$container).text(theme.strings.unavailable),$(this.selectors.productForm,this.container).addClass(this.classes.variantSoldOut))},_updateAvailability:function(e){this._hideErrorMessage(),this._updateAddToCart(e),this._updateLiveRegion(e),this._updatePrice(e)},_updateMedia:function(e){var t=e.variant.featured_media.id,i=this.settings.sectionId+"-"+t;this._switchMedia(i),this._setActiveThumbnail(i)},_updatePrice:function(e){var t=e.variant,i=$(this.selectors.priceContainer,this.$container),a=$(this.selectors.regularPrice,i),s=$(this.selectors.salePrice,i),r=$(this.selectors.unitPrice,i),n=$(this.selectors.unitPriceBaseUnit,i);if(i.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeClass(this.classes.productSoldOut).removeAttr("aria-hidden"),this.$productPolicies.removeClass(this.classes.visibilityHidden),!t)return i.addClass(this.classes.productUnavailable).attr("aria-hidden",!0),void this.$productPolicies.addClass(this.classes.visibilityHidden);t.available||i.addClass(this.classes.productSoldOut),t.compare_at_price>t.price?(a.html(theme.Currency.formatMoney(t.compare_at_price,theme.moneyFormat)),s.html(theme.Currency.formatMoney(t.price,theme.moneyFormat)),i.addClass(this.classes.productOnSale)):a.html(theme.Currency.formatMoney(t.price,theme.moneyFormat)),t.unit_price&&(r.html(theme.Currency.formatMoney(t.unit_price,theme.moneyFormat)),n.html(this._getBaseUnit(t)),i.addClass(this.classes.productUnitAvailable))},_getBaseUnit:function(e){return 1===e.unit_price_measurement.reference_value?e.unit_price_measurement.reference_unit:e.unit_price_measurement.reference_value+e.unit_price_measurement.reference_unit},_updateSKU:function(e){var t=e.variant;$(this.selectors.SKU).html(t.sku)},onUnload:function(){this.$container.off(this.settings.namespace),theme.ProductVideo.removeSectionVideos(this.settings.sectionId),theme.ProductModel.removeSectionModels(this.settings.sectionId)}}),e}(),theme.ProductRecommendations=function(){return function(e){this.$container=$(e);var t=this.$container.data("baseUrl")+"?section_id=product-recommendations&product_id="+this.$container.data("productId")+"&limit=4";$.get(t).then(function(e){var t=$(e).html();""!==t.trim()&&this.$container.html(t)}.bind(this))}}(),theme.Quotes=function(){var e={mediaQuerySmall:"screen and (max-width: 749px)",mediaQueryMediumUp:"screen and (min-width: 750px)",slideCount:0},t={accessibility:!0,arrows:!0,dots:!1,autoplay:!1,touchThreshold:20,slidesToShow:1,slidesToScroll:1};function i(i){var a=(this.$container=$(i)).attr("data-section-id"),s=this.wrapper=".quotes-wrapper",r=this.slider="#Quotes-"+a,n=$(r,s),o=!1,c=$.extend({},t,{slidesToShow:1,slidesToScroll:1,arrows:!0,adaptiveHeight:!0});function l(e,t){o&&(e.slick("unslick"),o=!1),e.slick(t),o=!0}e.slideCount=n.data("count"),e.slideCount<t.slidesToShow&&(t.slidesToShow=e.slideCount,t.slidesToScroll=e.slideCount),n.on("init",this.a11y.bind(this)),enquire.register(e.mediaQuerySmall,{match:function(){l(n,c)}}),enquire.register(e.mediaQueryMediumUp,{match:function(){l(n,t)}})}return i.prototype=_.assignIn({},i.prototype,{onUnload:function(){enquire.unregister(e.mediaQuerySmall),enquire.unregister(e.mediaQueryMediumUp),$(this.slider,this.wrapper).slick("unslick")},onBlockSelect:function(e){var t=$(".quotes-slide--"+e.detail.blockId+":not(.slick-cloned)").data("slick-index");$(this.slider,this.wrapper).slick("slickGoTo",t)},a11y:function(e,t){var i=t.$list,a=$(this.wrapper,this.$container);i.removeAttr("aria-live"),a.on("focusin",function(e){a.has(e.target).length&&i.attr("aria-live","polite")}),a.on("focusout",function(e){a.has(e.target).length&&i.removeAttr("aria-live")})}}),i}(),theme.slideshows={},theme.SlideshowSection=function(){return function(e){var t=(this.$container=$(e)).attr("data-section-id"),i=this.slideshow="#Slideshow-"+t;theme.slideshows[i]=new theme.Slideshow(i,t)}}(),theme.SlideshowSection.prototype=_.assignIn({},theme.SlideshowSection.prototype,{onUnload:function(){delete theme.slideshows[this.slideshow]},onBlockSelect:function(e){var t=$(this.slideshow);t.data("adapt-height")&&theme.slideshows[this.slideshow].setSlideshowHeight();var i=$(".slideshow__slide--"+e.detail.blockId+":not(.slick-cloned)").data("slick-index");t.slick("slickGoTo",i).slick("slickPause")},onBlockDeselect:function(){$(this.slideshow).slick("slickPlay")}}),theme.slideshows={},theme.VideoSection=function(){return function(e){var t=this.$container=$(e);$(".video",t).each(function(){var e=$(this);theme.Video.init(e),theme.Video.editorLoadVideo(e.attr("id"))})}}(),theme.VideoSection.prototype=_.assignIn({},theme.VideoSection.prototype,{onUnload:function(){theme.Video.removeEvents()}}),theme.heros={},theme.HeroSection=function(){return function(e){var t=(this.$container=$(e)).attr("data-section-id"),i="#Hero-"+t;theme.heros[i]=new theme.Hero(i,t)}}(),window.theme=window.theme||{};var selectors={disclosureLocale:"[data-disclosure-locale]",disclosureCurrency:"[data-disclosure-currency]"};function onYouTubeIframeAPIReady(){theme.Video.loadVideos(),theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube)}function min_cart(){$.ajax({url:"/",type:"GET",success:function(e){$(".cus-cart-popup").html($(e).find(".cus-cart-popup").html()),$(".site-header__cart-count").html($(e).find(".site-header__cart-count").html()),$(".cus-cart-popup, .cus-popup-overlay").delay(1e3).addClass("open-modal")}})}theme.FooterSection=function(){function e(e){this.$container=$(e),this.cache={},this.cacheSelectors(),this.cache.$localeDisclosure.length&&(this.localeDisclosure=new theme.Disclosure(this.cache.$localeDisclosure)),this.cache.$currencyDisclosure.length&&(this.currencyDisclosure=new theme.Disclosure(this.cache.$currencyDisclosure))}return e.prototype=_.assignIn({},e.prototype,{cacheSelectors:function(){this.cache={$localeDisclosure:this.$container.find(selectors.disclosureLocale),$currencyDisclosure:this.$container.find(selectors.disclosureCurrency)}},onUnload:function(){this.cache.$localeDisclosure.length&&this.localeDisclosure.unload(),this.cache.$currencyDisclosure.length&&this.currencyDisclosure.unload()}}),e}(),$(document).ready(function(){var e=new theme.Sections;e.register("cart-template",theme.Cart),e.register("product",theme.Product),e.register("collection-template",theme.Filters),e.register("product-template",theme.Product),e.register("header-section",theme.HeaderSection),e.register("map",theme.Maps),e.register("slideshow-section",theme.SlideshowSection),e.register("video-section",theme.VideoSection),e.register("quotes",theme.Quotes),e.register("hero-section",theme.HeroSection),e.register("product-recommendations",theme.ProductRecommendations),e.register("footer-section",theme.FooterSection)}),theme.init=function(){theme.customerTemplates.init();slate.rte.wrapTable({$tables:$(".rte table,.custom__item-inner--html table"),tableWrapperClass:"scrollable-wrapper"});slate.rte.wrapIframe({$iframes:$('.rte iframe[src*="youtube.com/embed"],.rte iframe[src*="player.vimeo"],.custom__item-inner--html iframe[src*="youtube.com/embed"],.custom__item-inner--html iframe[src*="player.vimeo"]'),iframeWrapperClass:"video-wrapper"}),slate.a11y.pageLinkFocus($(window.location.hash)),$(".in-page-link").on("click",function(e){slate.a11y.pageLinkFocus($(e.currentTarget.hash))}),$('a[href="#"]').on("click",function(e){e.preventDefault()}),slate.a11y.accessibleLinks({messages:{newWindow:theme.strings.newWindow,external:theme.strings.external,newWindowExternal:theme.strings.newWindowExternal},$links:$("a[href]:not([aria-describedby], .product-single__thumbnail)")}),theme.FormStatus.init();var e={image:"[data-image]",imagePlaceholder:"[data-image-placeholder]",imageWithPlaceholderWrapper:"[data-image-with-placeholder-wrapper]",lazyloaded:".lazyloaded"},t={hidden:"hide"};$(document).on("lazyloaded",function(i){var a=$(i.target);if(a.data("bgset")){var s=a.find(e.lazyloaded);if(s.length){var r=a.data("alt"),n=s.data("src")?s.data("src"):a.data("bg");s.attr("alt",r||""),s.attr("src",n||"")}}a.is(e.image)&&a.closest(e.imageWithPlaceholderWrapper).find(e.imagePlaceholder).addClass(t.hidden)}),$(e.image+".lazyloaded").closest(e.imageWithPlaceholderWrapper).find(e.imagePlaceholder).addClass(t.hidden),$(document).one("touchstart",function(){theme.Helpers.setTouch()})},$(theme.init),$(".collection-slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!1,autoplaySpeed:2e3,arrows:!0,prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"}),$(".bg-img-slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!1,autoplaySpeed:2e3,arrows:!0,prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"}),$(".ad-to-cart-home-page").click(function(e){e.preventDefault();var t=$(this);$.ajax({type:"POST",url:"/cart/add.js",data:$(this).closest("form").serialize(),dataType:"json",success:function(e){min_cart(),$.getJSON("/cart.js",function(e){$("#cus-cart-atc").html(e.item_count),$("#cus-cart-atc-price").html(theme.Currency.formatMoney(e.items_subtotal_price,theme.moneyFormat))}),t.closest(".grid__item").find(".cus-cart-info").html("ADDED TO CART")},error:function(){t.closest(".grid__item").find(".cus-cart-info").html("NOT TO CART")}})}),$(document).on("click",".cart__remove",function(e){e.preventDefault();var t={id:$(this).attr("data-vid"),quantity:0};$.ajax({type:"POST",context:this,url:"/cart/change.js",data:t,dataType:"json",success:function(e){min_cart()}})}),$(window).scroll(function(){var e=$(".site-header");$(window).scrollTop()>=100?e.addClass("fixed"):e.removeClass("fixed")}),$(document).on("change",".product-select",function(){$(this).closest(".slick-slide").find("[data-cus-price]").html($(this).find(":selected").attr("data-price")),$(this).closest(".cus-product-detail").find("[data-cus-price]").html($(this).find(":selected").attr("data-price"));var e=$(this).find(":selected").attr("data-inventory");e>0?$(this).closest(".grid__item").find(".variant-quantity p").html(+e+"&nbsp;products available"):$(this).closest(".grid__item").find(".variant-quantity p").html(" This product not available")}),$(".tabbing-index a").click(function(e){e.preventDefault();var t=$(this).attr("href");$(".tabbing-index a.nav-active").removeClass("nav-active"),$(this).addClass("nav-active"),$(".index-product.active").removeClass("active"),$(t).addClass("active")}),$(".slider-image").slick({slidesToShow:1,slidesToScroll:1,autoplay:!1,autoplaySpeed:2e3,arrows:!0,prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"}),$(window).load(function(){$(".trigger_popup_fricc").click(function(){$(".hover_bkgr_fricc").show()}),$(".hover_bkgr_fricc").click(function(){$(".hover_bkgr_fricc").hide()}),$(".popupCloseButton").click(function(){$(".hover_bkgr_fricc").hide()})}),$(document).on("click",".cus-filter-y",function(e){e.preventDefault();var t=$(this).find("a").attr("href");$.ajax({type:"GET",url:t,dataType:"html",success:function(e){$(e).find(".grid--uniform").html(),$(".grid--uniform").html($(e).find(".grid--uniform").html()),$(e).find(".cus-filter-t").html(),$(".cus-filter-t").html($(e).find(".cus-filter-t").html()),window.history.pushState(location.href,"",t)}})}),$(document).on("click",".loadmore-pagination",function(e){e.preventDefault();var t=$(this).attr("href");$.ajax({type:"GET",url:t,dataType:"html",success:function(e){$(e).find(".grid--uniform").html(),$(".grid--uniform").append($(e).find(".grid--uniform").html()),$(e).find(".show-more-cus").html(),$(".show-more-cus").html($(e).find(".show-more-cus").html()),void 0!==t&&$(this).prop("disabled",!0)}})}),$(document).ready(function(){thumbnails=$('#ProductThumbs-product img[src*="/products/"]'),thumbnails.length&&thumbnails.on("click",function(){var e=$(this).attr("src").split("?")[0].split("."),t=e.pop(),i=e.pop().replace(/_(pico|icon|thumb|small|compact|medium|large|grande)/gi,"").replace(/_[a-zA-Z0-9@]+$/,""),a=e.join(".")+"."+i+"."+t;void 0!==variantImages[a]&&productOptions.forEach(function(e,t){optionValue=variantImages[a]["option-"+t],null!==optionValue&&"undefined"!==optionValue&&$(".single-option-selector:eq("+t+") option").filter(function(){var e=$(this).text();return null!==theme&&"undefined"!==theme.strings&&(e=e.replace(" - "+theme.strings.Unavailable,"").replace(" - "+theme.strings.soldOut,"")),e===optionValue}).length&&$(".single-option-selector:eq("+t+")").val(optionValue).trigger("change")})})}),$(document).on("click",".product-single__thumbnails-item",function(){var e=$(this).find("a").attr("data-thumbnail-id"),t=$('[data-thumbnail-id="'+e+'"]').attr("data-slick-index");$(".slider-image").slick("slickGoTo",t)}),$(".title-tabbing li a").click(function(e){e.preventDefault();var t=$(this).attr("href");$(".title-tabbing li a.nav-active").removeClass("nav-active"),$(this).addClass("nav-active"),$(".cus-block-img-filter.active").removeClass("active"),$(t).addClass("active")}),$(document).on("click",".cus-showmore-btn",function(e){for(var t=(t=parseInt($(this).attr("data-counter")))+4,i=parseInt($(this).attr("data-count-total")),a=$(this).attr("data-href"),s=1;s<=t;s++)$(a+' div[data-counter="'+s+'"]').show();$(this).attr("data-counter",t),t>=i&&$(this).attr("disabled","disabled")}),$(document).on("click",".cus-overlay",function(e){e.preventDefault(),$(".cus-cart-popup, .cus-popup-overlay").removeClass("open-modal")}),$(document).on("click",".site-header__cart",function(e){e.preventDefault(),$(".cus-cart-popup, .cus-popup-overlay").addClass("open-modal")});
setInterval(function(){ 
  var myDate = new Date();
  var pstTime = myDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles",hour: 'numeric',minute: 'numeric',second: 'numeric', hour12: false });
  if( pstTime >= '08:00:00' && pstTime <= '17:00:00' ) {
    
  }
}, 1000);
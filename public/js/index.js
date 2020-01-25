/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/index.js":
/*!*******************************!*\
  !*** ./resources/js/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mainJs_swapMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainJs/swapMenu */ "./resources/js/mainJs/swapMenu.js");
/* harmony import */ var _mainJs_controlRegisterAndLoginMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainJs/controlRegisterAndLoginMenu */ "./resources/js/mainJs/controlRegisterAndLoginMenu.js");
/* harmony import */ var _mainJs_addSingleBookItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainJs/addSingleBookItem */ "./resources/js/mainJs/addSingleBookItem.js");
/* harmony import */ var _mainJs_removeItemFromCart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mainJs/removeItemFromCart */ "./resources/js/mainJs/removeItemFromCart.js");
/* harmony import */ var _mainJs_getRegions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mainJs/getRegions */ "./resources/js/mainJs/getRegions.js");
/* harmony import */ var _mainJs_getAllBooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mainJs/getAllBooks */ "./resources/js/mainJs/getAllBooks.js");
/* harmony import */ var _mainJs_slowHover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mainJs/slowHover */ "./resources/js/mainJs/slowHover.js");
/* harmony import */ var _mainJs_sendReview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mainJs/sendReview */ "./resources/js/mainJs/sendReview.js");
/* harmony import */ var _mainJs_loadMoreItemsLoad__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mainJs/loadMoreItemsLoad */ "./resources/js/mainJs/loadMoreItemsLoad.js");









$(document).ready(function () {
  /** 
   * Loads more items when a different category
   * is clicked on the front page 
   */
  Object(_mainJs_loadMoreItemsLoad__WEBPACK_IMPORTED_MODULE_8__["default"])();
  /* 
   * Adds a book on the cart , updates the 
   * number displayed on the cart and returns 
   * warning depending on the state of the transaction.
   */

  Object(_mainJs_addSingleBookItem__WEBPACK_IMPORTED_MODULE_2__["default"])();
  /* 
   * Removes the item from the cart and
   * handles the change on the number that 
   * is displayed on the cart.
   */

  Object(_mainJs_removeItemFromCart__WEBPACK_IMPORTED_MODULE_3__["default"])();
  /* 
   * Generate the cities and regions connected to
   * the cities.update the regions depending on what
   * city has been selected.
   */

  Object(_mainJs_getRegions__WEBPACK_IMPORTED_MODULE_4__["default"])();
  /*
   * Gets with an ajax request all items needed to swap 
   * the menu.
   *
   * WARNING: NEEDED ONLY ON ROUTE::('/')
   */

  Object(_mainJs_swapMenu__WEBPACK_IMPORTED_MODULE_0__["default"])();
  /*
   * Responsible for the functionality and animations
   * of the registering and login menu.
   */

  Object(_mainJs_controlRegisterAndLoginMenu__WEBPACK_IMPORTED_MODULE_1__["default"])();
  /*
   * Gets all books from the database and is responsible
   * for filtering them while the user searches for them
   * in the search form.
   * 
   * WARNING: NEEDED ONLY ON ROUTE::('/')
   */

  Object(_mainJs_getAllBooks__WEBPACK_IMPORTED_MODULE_5__["default"])();
  /**
   * Is responsible to send reviews and return
   * the appropriate status response plus
   * Star functionality when reviewing. 
   * 
   * WARNING: NEEDED ONLY ON ROUTE::('/item/{id}')
   */

  Object(_mainJs_sendReview__WEBPACK_IMPORTED_MODULE_7__["default"])();
  /**
   * Smooth inner link hovering when clicked.
   */

  Object(_mainJs_slowHover__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ }),

/***/ "./resources/js/mainJs/addSingleBookItem.js":
/*!**************************************************!*\
  !*** ./resources/js/mainJs/addSingleBookItem.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addSingleBookItem; });
function addSingleBookItem() {
  var ajaxCSRFsetup = function ajaxCSRFsetup() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }; // Init variables


  var $addSingleBookItemBtn = $('#add-single-book-item');
  var $confPurchase = $('#confirm-purchase');
  var $amountOfItemsOnCart = $('#amount-of-items');
  var $redCircle = $('#red-circle');
  var $warning = $('#warning-container');
  var $book_id = $('#book_id').val();
  var warningSigns = {
    loggedOut: '<div class="warning"><p>You need to be logged in to finish this action</p></div>',
    noBooksLeft: '<div class="warning"><p>There are no books left in the store, try again later</p></div>'
  }; // Init event listeners

  $addSingleBookItemBtn.on('click', addItemToList); // add functions

  function addItemToList() {
    //e.preventDefault();
    ajaxCSRFsetup();
    $.ajax({
      type: 'POST',
      url: '/ajaxRequestItem',
      data: {
        id: $book_id
      },
      success: function success(response) {
        // response == 0 means the cart number will be raised
        // response == 2 means that the user isnt signed in
        // response == 3 means that the maximum amount of books has been reached
        if (response == 2) {
          $warning.append(warningSigns.loggedOut);
        } else if (response == 3) {
          $warning.append(warningSigns.noBooksLeft);
        } else {
          raiseCartNumber();
          showPurchasedItemCart();
        }
      }
    });
  }
  /* 
      * Return type : Void
      * Parameters : { int : response }
      */


  function raiseCartNumber() {
    $redCircle.css({
      'opacity': '0',
      'display': 'block'
    });
    $amountOfItemsOnCart.css({
      'opacity': '0',
      'display': 'block'
    });
    $redCircle.animate({
      opacity: '1'
    }, 600);
    $amountOfItemsOnCart.animate({
      opacity: '1'
    }, 600);
    var $amount = 0;

    if ($amountOfItemsOnCart.html() != '') {
      $amount = parseInt($amountOfItemsOnCart.html());
    }

    $amountOfItemsOnCart.html($amount + 1);
  }
  /* 
  * Return type : Void
  */


  function showPurchasedItemCart() {
    $confPurchase.animate({
      opacity: '1',
      marginTop: '0%'
    }, 500);
    setTimeout(function () {
      $confPurchase.animate({
        opacity: '0',
        marginTop: '-20%'
      }, 500);
    }, 2500);
  }
}

/***/ }),

/***/ "./resources/js/mainJs/controlRegisterAndLoginMenu.js":
/*!************************************************************!*\
  !*** ./resources/js/mainJs/controlRegisterAndLoginMenu.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return controlRegisterAndLoginMenu; });
function controlRegisterAndLoginMenu() {
  // Load icons
  var $userIcon = $('#user-icon');
  var $exitIcon = $('#exit-icon');
  var $blackContainer = $('#login-black-container');
  var $logoutUser = $('.logout-user');
  var $loginCard = $('.login-card');
  var visible = false;

  var init = function init() {
    if ($blackContainer.length) {
      if ($('#warning-exists').val()) {
        appearLoginAndRegisterMenu();
      }

      $userIcon.on('click', appearLoginAndRegisterMenu);
      $exitIcon.on('click', disspearLoginAndRegisterMenu);
    } else {
      $userIcon.on('click', switchVisibilityOfLogoutPanel);
    }
  }; // Appear logout panel


  function switchVisibilityOfLogoutPanel() {
    if (visible) {
      $logoutUser.animate({
        opacity: '0',
        marginTop: '0'
      }, 500);
      setTimeout(function () {
        $logoutUser.css('display', 'none');
      }, 500);
    } else {
      $logoutUser.css('display', 'flex');
      $logoutUser.animate({
        opacity: '1',
        marginTop: '45px'
      }, 500);
    }

    visible = !visible;
  } // Appear login menu


  function appearLoginAndRegisterMenu() {
    $blackContainer.css('display', 'flex');
    $loginCard.css('display', 'flex');
    $blackContainer.animate({
      height: '100vh',
      width: '100vw',
      opacity: '1'
    }, 500);
  } // Dissapear login menu


  function disspearLoginAndRegisterMenu() {
    $blackContainer.animate({
      height: '0',
      width: '0',
      opacity: '0'
    }, 500);
    setTimeout(function () {
      $blackContainer.css('display', 'none');
      $loginCard.css('display', 'none');
    }, 500);
  } // Main part


  init();
}

/***/ }),

/***/ "./resources/js/mainJs/getAllBooks.js":
/*!********************************************!*\
  !*** ./resources/js/mainJs/getAllBooks.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAllBooks; });
function getAllBooks() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    type: 'GET',
    url: '/api/books',
    dataType: 'json',
    success: function success(response) {
      var $books = response[0];
      var authors = response[1];
      var $searchResults = $('#search-results');
      var $searchResultsClass = $('.search-results');
      $(document).on('click', '.book-details', function (event) {
        var elclass = event.currentTarget;
        console.log('clicked');
        window.location.replace('/item/' + $(elclass).data('id'));
      });

      function addSpanOnInnerText(title, index, searchLength) {
        var titleStart = title.slice(0, index);
        var titleMid = title.slice(index, index + parseInt(searchLength));
        var titleEnd = title.slice(index + parseInt(searchLength));
        return titleStart + '<span class="result-text-highlighted">' + titleMid + '</span>' + titleEnd;
      }

      $('.main-search').on('change keyup paste', function () {
        $searchResults.html('');
        var $currentSearchVal = $(this).val().toLowerCase();

        if ($currentSearchVal != '') {
          $searchResults.css('opacity', '1');
          var filtered_books = [];
          var filtered_books_index_found = [];
          var searchValLength = $currentSearchVal.length;

          for (var i = 0; i < $books.length; i++) {
            var $booksToLowercase = $books[i]['title'].toLowerCase();
            var searchForCurrentSearchVal = $booksToLowercase.search($currentSearchVal);

            if (searchForCurrentSearchVal != -1) {
              filtered_books.push($books[i]);
              filtered_books_index_found.push(searchForCurrentSearchVal);
            }
          }

          for (var _i = 0; _i < filtered_books.length; _i++) {
            var id = filtered_books[_i]['id'];
            var image_path = filtered_books[_i]['book_image'];
            var title = addSpanOnInnerText(filtered_books[_i]['title'], filtered_books_index_found[_i], searchValLength); // Put a span where the search result has been found on the title

            var _result = '<div class="search-results-container">\
                                            <div class="book-image image" style="background-image:url(/storage/' + image_path + ')">\
                                            </div>\
                                            <div class="book-details" data-id="' + id + '">\
                                                <p>' + title + '<br><span>The author goes here</span></p>\
                                            </div>\
                                        </div>';

            $searchResults.append(_result);
          }

          if ($searchResults.height() < 600) {
            console.log($searchResults.height());
            $searchResults.css('overflow-y', 'hidden');
            $searchResultsClass.css('overflow-y', 'hidden');
          } else {
            $searchResults.css('overflow-y', 'scroll');
            $searchResultsClass.css('overflow-y', 'scroll');
          }

          if (filtered_books.length < 1) {
            result = '<div class="search-results-container">\
                                    <div class="book-details">\
                                        <p style="opacity:0.6;">Sorry the results have not beed found :(</p>\
                                    </div>\
                                </div>';
            $searchResults.append(result);
          }
        } else {
          $searchResults.css('opacity', '0');
        }
      });
    }
  });
}

/***/ }),

/***/ "./resources/js/mainJs/getRegions.js":
/*!*******************************************!*\
  !*** ./resources/js/mainJs/getRegions.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getRegions; });
function getRegions() {
  var ajaxCSRFsetup = function ajaxCSRFsetup() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }; // Init variables.


  var $cityOptions = $('#city option');
  var $regionTag = $('#region');
  var $cityTag = $('#city'); // Init ajax
  // Get all the city ids.

  function populateCityIds() {
    var city_ids = [];
    $cityOptions.each(function (i, obj) {
      city_ids.push($(obj).val());
    });
    return city_ids;
  } // create a new relative array which 
  // has as the key the city id and the value 
  // the regions for that city.
  //
  // Example => [ 
  //              '2' => ['3','4','9'],
  //              '3' => ['5','6','8'] 
  //            ]


  function populateRegions(city_ids, regions_obj) {
    var regions = [];
    city_ids.map(function (city_id) {
      regions[city_id] = regions_obj.filter(function (item) {
        return item['city_id'] == city_id;
      });
    });
    return regions;
  }

  function createRegionTags(regions) {
    // gets the currently selected city id
    var $city_id = $cityTag.children('option:selected').val(); // restart the html

    $regionTag.html(''); // Append the new elements on the region tag
    // based on the city id.

    regions[$city_id].map(function (region) {
      $regionTag.append('<option value="' + region['id'] + '">' + region['name'] + '</option>');
    });
  }

  function init() {
    ajaxCSRFsetup();
    $.ajax({
      type: 'GET',
      url: '/allRegions',
      dataType: 'html',
      success: function success(response) {
        var regions_obj = JSON.parse(response);
        var city_ids = populateCityIds();
        var regions = populateRegions(city_ids, regions_obj);
        createRegionTags(regions);
        $cityTag.on('change', function () {
          createRegionTags(regions);
        });
      }
    });
  } // Init


  init();
}

/***/ }),

/***/ "./resources/js/mainJs/loadMoreItemsLoad.js":
/*!**************************************************!*\
  !*** ./resources/js/mainJs/loadMoreItemsLoad.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadMoreItemsLoad; });
function loadMoreItemsLoad() {
  // Load more images
  $('#load-more-items').on('click', function () {
    $('#category-items-container').append('<div class="category-lazy-load-container"><div class="lazy-load"><div class="lazy-ball"></div><div class="lazy-ball"></div><div class="lazy-ball"></div></div></div>');
    $.ajax({
      type: 'POST',
      url: '/ajaxRequest',
      dataType: 'html',
      data: {
        id: currentSelectedMenu
      },
      success: function success(response) {
        setTimeout(function () {
          $('#category-items-container').append(response);
        }, 100);
      }
    });
  });
}

/***/ }),

/***/ "./resources/js/mainJs/removeItemFromCart.js":
/*!***************************************************!*\
  !*** ./resources/js/mainJs/removeItemFromCart.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return removeItemFromCart; });
function removeItemFromCart() {
  var ajaxCSRFsetup = function ajaxCSRFsetup() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }; // Cache all elements 


  var $removeItemBtn = $('.remove-item');
  var $totalAmountOfItemCost = $('#total-amount-of-money');
  var $redCircle = $('#red-circle');
  var $amountOfItemsOnCart = $('#amount-of-items');
  var $deletedItemTotalCost = 0; // Remove item from cart

  $removeItemBtn.on('click', removeItem); // Init functions

  function removeItem() {
    var id = $(this).data('id');
    ajaxCSRFsetup();
    $.ajax({
      type: 'POST',
      url: '/ajaxRequestRemoveItem',
      dataType: 'html',
      data: {
        id: id
      },
      success: function success(response) {
        // response == 0 means the cart number will be lowered
        if (response != -1) {
          hideDeletedItem(response);
          lowerCartNumber();
          lowerCurrentPrice(response);
        }
      }
    });
  } // Changes rendered to the HTML


  function render() {
    $totalAmountOfItemCost.html((parseFloat($totalAmountOfItemCost.html()).toFixed(2) - $deletedItemTotalCost).toFixed(2));
    $amountOfItemsOnCart.html($amount - 1);
  } // Takes the response and calculates the total cost value
  // of the deleted item.


  function lowerCurrentPrice(response) {
    $deletedItemTotalCost = parseInt($('#times' + response).html()) * parseFloat($('#price' + response).html());
    render();
  } // Hide selected item


  function hideDeletedItem(response) {
    $('#b' + response).animate({
      opacity: '0'
    }, 600);
    setTimeout(function () {
      $('#b' + response).css('display', 'none');
    }, 600);
  }
  /* 
      * Return type : Void
      * Parameters : { int : response }
      */


  function lowerCartNumber() {
    $redCircle.css({
      'opacity': '0',
      'display': 'block'
    });
    $amountOfItemsOnCart.css({
      'opacity': '0',
      'display': 'block'
    });
    $redCircle.animate({
      opacity: '1'
    }, 600);
    $amountOfItemsOnCart.animate({
      opacity: '1'
    }, 600);
    var $amount = 0;

    if ($amountOfItemsOnCart.html() != '') {
      $amount = parseInt($amountOfItemsOnCart.html());
    }

    render(); // If there are no items left leave page

    leavePageIfNoItemsLeft($amount);
  }

  function leavePageIfNoItemsLeft(itemCount) {
    if (itemCount - 1 == 0) {
      window.location.replace('/?warning=2');
    }
  }
}

/***/ }),

/***/ "./resources/js/mainJs/sendReview.js":
/*!*******************************************!*\
  !*** ./resources/js/mainJs/sendReview.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sendReview; });
function sendReview() {
  var ajaxCSRFsetup = function ajaxCSRFsetup() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  };

  var currentStarCount = -1;
  var yellowColor = '';

  if ($('#previous-star-count').length > 0) {
    currentStarCount = $('#previous-star-count').data('num');
    yellowColor = document.getElementsByClassName('yellow-color-override');
    yellowColor[0].style.width = 30 * parseInt(currentStarCount) + 'px';
  }

  if ($('.single-star')) {
    var yellowColorWidth = 30 * parseInt(currentStarCount) + 'px';
    $('.single-star').hover(function () {
      var singleStarWidth = 30;
      var starNum = parseInt($(this).data('num') + 1);
      yellowColor[0].style.width = singleStarWidth * starNum + 'px';
    }, function () {
      yellowColor[0].style.width = yellowColorWidth;
    });
    $('.single-star').click(function () {
      var singleStarWidth = 30;
      yellowColor[0].style.width = singleStarWidth * parseInt($(this).data('num') + 1) + 'px';
      yellowColorWidth = singleStarWidth * parseInt($(this).data('num') + 1) + 'px';
      currentStarCount = parseInt($(this).data('num'));
    });
  }

  if ($('#send-review')) {
    var reviewResposeMarkup = {
      created: '<div class="review-response">Review has been created successfully!</div>',
      updated: '<div class="review-response">Review has been updated successfully!</div>'
    };
    $('#send-review').click(function () {
      if (currentStarCount != -1 && $('#review-comment').val() != '') {
        ajaxCSRFsetup();
        $.ajax({
          type: 'POST',
          url: '/insertReview',
          data: {
            comment: $('#review-comment').val(),
            rating: currentStarCount + 1,
            book_id: $('#book_id').val()
          },
          success: function success(response) {
            var $reviewResultContainer = $('#review-response');
            $reviewResultContainer.html('');

            if (response == 1) {
              $reviewResultContainer.html(reviewResposeMarkup.created);
            } else {
              $reviewResultContainer.html(reviewResposeMarkup.updated);
            }
          }
        });
      }
    });
  }
}

/***/ }),

/***/ "./resources/js/mainJs/slowHover.js":
/*!******************************************!*\
  !*** ./resources/js/mainJs/slowHover.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return slowHover; });
function slowHover() {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
}

/***/ }),

/***/ "./resources/js/mainJs/swapMenu.js":
/*!*****************************************!*\
  !*** ./resources/js/mainJs/swapMenu.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return swapMenu; });
function swapMenu() {
  var ajaxCSRFsetup = function ajaxCSRFsetup() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }; // Initialize variables


  var menu = [];
  $('#menu-items li').each(function (index) {
    menu.push($(this).attr('id'));
  });
  var currentSelectedMenu = 'Crime'; // Initialize event listeners

  for (var i = 0; i < menu.length; i++) {
    $('#' + menu[i]).on('click', changeMenu);
  } // Change menu functionality


  function changeMenu() {
    changeSlider($(this)[0].id);
    ajaxCSRFsetup();
    $('#category-items').html('<div class="category-lazy-load-container"><div class="lazy-load"><div class="lazy-ball"></div><div class="lazy-ball"></div><div class="lazy-ball"></div></div></div>');
    prepareTheAjaxCall();
  } // Change slide


  function changeSlider(id) {
    if (id != currentSelectedMenu) {
      $('#' + currentSelectedMenu + ' p').removeClass('active');
    }

    currentSelectedMenu = id;
    $('#' + currentSelectedMenu + ' p').addClass('active');
  }

  function prepareTheAjaxCall() {
    $.ajax({
      type: 'POST',
      url: '/ajaxRequest',
      dataType: 'html',
      data: {
        id: currentSelectedMenu
      },
      success: function success(response) {
        setTimeout(function () {
          $('#category-items').css('opacity', 0);
          $('#category-items').html(response);
          $('#category-items').animate({
            opacity: '1'
          }, 500);
        }, 100);
      }
    });
  }
}

/***/ }),

/***/ "./resources/sass/admin.scss":
/*!***********************************!*\
  !*** ./resources/sass/admin.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/index.scss":
/*!***********************************!*\
  !*** ./resources/sass/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************************************************************************************!*\
  !*** multi ./resources/js/index.js ./resources/sass/admin.scss ./resources/sass/app.scss ./resources/sass/index.scss ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\SimpleBookStore\resources\js\index.js */"./resources/js/index.js");
__webpack_require__(/*! C:\xampp\htdocs\SimpleBookStore\resources\sass\admin.scss */"./resources/sass/admin.scss");
__webpack_require__(/*! C:\xampp\htdocs\SimpleBookStore\resources\sass\app.scss */"./resources/sass/app.scss");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\SimpleBookStore\resources\sass\index.scss */"./resources/sass/index.scss");


/***/ })

/******/ });
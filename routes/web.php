<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/logoutUser', 'Auth\LoginController@logout');
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

// Book controller routes
Route::get('/getAllBooks/{category}', 'BookController@getAllBooks');
Route::post('/getBooksByCategory', 'BookController@reactPagination');

// AjaxRequestController routes
Route::post(
    '/ajaxRequestItem',
    'AjaxRequestController@insertItem'
);
Route::post(
    '/ajaxRequestRemoveItem',
    'AjaxRequestController@removeItem'
)->middleware('auth');
Route::post('/ajaxRequest', 'AjaxRequestController@post');
Route::post('/ajaxRequestGetFilteredItems', 'AjaxRequestController@filteredItems');

// ViewController
Route::get('/reviews/{book}', 'ViewController@reviewPage');
Route::get('/purchase', 'ViewController@purchasePage')->middleware('auth');
Route::get('/books/{category}', 'ViewController@bookPage');
Route::get('/', 'ViewController@getHome')->name('index');
Route::get('/item/{book}', 'ViewController@singleItem');

Route::get('/admin', 'ViewController@adminPage');

// ReviewController
Route::post('/insertReview', 'ReviewController@insert')->middleware('auth');
Route::post('/reviews', 'ReviewController@reviewsByBook');

// PaypalController
Route::get('paypal-transaction-complete', 'PaypalController@payment');

// RegionController
Route::get('/allRegions', 'RegionController@index');

// React views
Route::get( '/admin/{path?}', function(){
    return view( 'admin.index' );
} )->where('path', '.*');

// Paginate
Route::post('/paginate','PaginateController@paginate');

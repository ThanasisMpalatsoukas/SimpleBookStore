<?php


use Illuminate\Http\Request;
use App\Book;
use App\Review;
use App\Author;
use App\Category;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Book Routes

Route::get('/books',function(){
    $books = App\Book::all();
    $authors = [];
    foreach( $books as $book ) {
        $authors[] = $book->author;
        $book->author_name = $book->author->name;
        $book->category_name = $book->category->name;
    }
    return [$books , $authors];
});
Route::middleware('cors')->post('/bookCreate', 'BookController@create');
Route::middleware('cors')->post('/book/update/{book}', 'BookController@update');
Route::get('/book/{book}','BookController@single');
Route::get('/book/delete/{book}','BookController@delete');

// Category routes
Route::get('/category/{category}', 'CategoryController@single');
Route::get('/category/delete/{category}','CategoriesController@delete');
Route::get('/categories','CategoryController@index');
Route::middleware('cors')->post('/category/create','CategoryController@create');
Route::post('/category/update/{category}','CategoriesController@update');

// Author routes
Route::get('/author/{author}', 'AuthorController@single');
Route::get('/author/delete/{author}','AuthorController@delete');
Route::middleware('cors')->get('/authors','AuthorController@index');
Route::post('/author/update/{author}','AuthorController@update');
Route::post('/author/create','AuthorController@create');

// City routes
Route::get('/city/{city}','CityController@single');
Route::post('/city/create','CityController@create');
Route::post('/city/update/{city}','CityController@update');
Route::get('cities','CityController@index');

// Region routes
Route::get('/region/{region}','RegionController@single');
Route::post('/region/create','RegionController@create');
Route::post('/region/update/{region}','RegionController@update');
Route::get('/regions','RegionController@index');

// Misc
Route::post('/getItemCount',function(){
    $author_count = sizeof(App\Author::all());
    $category_count = sizeof(App\Category::all());
    $book_count = sizeof(App\Book::all());
    $cities = sizeof(App\City::all());
    $regions = sizeof(App\Region::all());

    return [
        'authors' => $author_count,
        'categories' => $category_count,
        'books' => $book_count,
        'cities' => $cities,
        'regions' => $regions
    ];
});


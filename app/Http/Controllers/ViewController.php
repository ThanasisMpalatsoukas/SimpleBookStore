<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Book;
use App\Author;
use App\Category;
use App\Review;

class ViewController extends Controller
{
    /**
     * Returns the Home view with books
     * 
     * @return View view with $books parameter
     */
    function getHome()
    {

        $books = Book::all();
        return view('home/welcome')->with('books', $books);

    }

    function adminPage()
    {
        return view('admin/index');
    }

    /**
     * Returns a single book view with the parameters of
     * $book (single book), $author (author name), $category ( its category )
     * 
     * @param Book $book a single book based on id input
     * 
     * @return View view with $books parameter
     */
    function singleItem(Book $book)
    {
        $category = Category::find( $book['category_id'] );
        $author_name = $book->author->name;

        $review_mean = Review::getMeanReviewOfBook($book['id']);
        $comment = '';
        $stars = 0;
        $review_enabled = false;
        $users_review = null;

        if ( Auth::check() ) {
            $users_review = Review::where(['user_id' => auth()->user()->id , 'book_id' => $book['id']])->first();
            $review_enabled = true;
        }
        if ( $review_enabled && $users_review ) {
            $comment = $users_review->comment;
            $stars = $users_review->rating;
        }

        return view('singleItem/singleItem')->with(
            [
                'book'=>$book ,
                'author' => $author_name ,
                'category' => $category,
                'review_mean' => number_format( $review_mean , 2 , '.' , '' ),
                'stars' => $stars,
                'comment' => $comment,
                'review_enabled' => $review_enabled
            ]
        );

    }
    /**
     * Returns the review view with the reviews for the book
     * 
     * @param Book $book a single book based on id input
     * 
     * @return View view with $books parameter
     */
    function reviewPage(Book $book)
    {
        /*
        $reviews = Review::where('book_id',$book['id'])->get();
        return view('home/reviews')->with(['book'=>$book,'reviews'=>$reviews]);
        */

        return view('home/reviews')->with(['book'=>$book]);
    }

    /**
     * Returns the page with all books or filtered books
     * 
     * @param Int $cat the category id to be show in the start
     * 
     * @return View view The $filteredBooks( books filtered by category )
     *              $category ( the category the have been filtered with )  
     */    
    function bookPage(Int $cat)
    {
        $category_id = -1;
        
        if ( $cat > 0 ) {
            $category = Category::find($cat);
            $category_id = $category->id;
            $filteredBooks = $category->books;
        } else {
            $filteredBooks = Book::all();
        }

        return view('home/productsByFilter')->with(['filteredBooks' => $filteredBooks , 'category' => $category_id ]);
    }

    /**
     * Returns the page with the purchases
     * 
     * @return View view with the $unique_items ( which are the unique )
     *              items that exist in the shop list, $same_item_count 
     *              which is an array with the amount of items that are 
     *              repeated and $authors which is an array of authors.
     */
    function purchasePage()
    {

        // Redirect in case the cart is empty
        if (empty(session('items'))) {
            return redirect()->route('index', ['warning' => '2']);
        }

        // Fill items with the coresponding book data.
        foreach ( session('items') as $index => $book_id ) {
            $items[$index] = Book::where('id', $book_id)->get()[0];
        }
        // Get unique book items
        $unique_items = array_unique($items);

        // Get the unique books.
        $unique_items_id = [];
        foreach ( $items as $index => $item ) {
            $unique_items_id[$index] = $item['id'];
        }
        $unique_items_id = array_unique($unique_items_id);

        // Fill $same_item_count with 0s
        $same_item_count = [];
        $keys = array_keys( $unique_items_id );

        foreach ( $keys as $key ) {
            $same_item_count[$key] = 0; 
        }

        // Foreach book that is there more than once 
        // add 1 on the count for the coresponding id
        foreach ( $items as $item ) {
            foreach ($unique_items_id as $unique_item) {
                if ($unique_item == $item['id']) {
                    $same_item_count[  array_keys( $unique_items_id, $item['id'] )[0] ]++;
                }
            }
        }
    
        return view('purchase/index')->with(['books'=>$unique_items , 'amount_of_books' => $same_item_count , 'authors' => Book::getUniqueAuthors($unique_items) ]);
    }
}

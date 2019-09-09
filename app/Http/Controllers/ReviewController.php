<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Review;
use App\User;
use App\Book;

class ReviewController extends Controller
{
    /**
     * Returns the reviews of a single book and the book
     * 
     * @param Request $request the book_id
     * 
     * @return Response [ Review $reviews , Book $books ]
     */
    public function reviewsByBook( Request $request )
    {
        $book_id = $request->all()['book_id'];
        $reviews = Review::where('book_id',$book_id)->get();

        foreach ( $reviews as $index => $review ) {
            $reviews[$index]->user = User::find( $review->user_id );
        }

        $book = Book::find( $book_id );

        return response()->json(['reviews'=>$reviews,'book'=>$book]);
    }

    /**
     * Inserts and updates a review.
     * 
     * @param Request $request => [
     *                         String comment,
     *                         Int rating,
     *                         Int book_id
     *                         ]
     * 
     * @return Int 1 means created, 2 means updated
     */
    public function insert( Request $request )
    {
        $comment = $request->all()['comment'];
        $rating = (int) $request->all()['rating'];
        $book_id = (int) $request->all()['book_id'];

        $users_review = Review::where(
            ['user_id' => auth()->user()->id , 'book_id' => $book_id]
        )->first();

        if ( $users_review ) {
            $users_review->update([
                'user_id' => auth()->user()->id,
                'book_id' => $book_id,
                'comment' => strip_tags($comment),
                'rating' => $rating
            ]);
            return 2;
        }
        else {
            Review::create([
                'user_id' => auth()->user()->id,
                'book_id' => $book_id,
                'comment' => strip_tags($comment),
                'rating' => $rating
            ]);
            return 1;
        }
    }
}

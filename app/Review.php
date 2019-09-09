<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['user_id','book_id','comment','rating'];

    /**
     * Connects Reviews with User model
     * 
     * @return Review
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Connects Reviews with Book model
     * 
     * @return Review
     */
    public function book()
    {
        return $this->belongsTo('App\Book');
    }

     /**
      * Gets average rating of book
      * 
      * @param Int $book the book id
      * 
      * @return Float average rating
      */
    static function getMeanReviewOfBook(Int $book)
    {
        $book_reviews = Review::where('book_id',$book)->get();
        return (float) $book_reviews->avg('rating');
    }
}

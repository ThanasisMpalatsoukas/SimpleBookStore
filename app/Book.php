<?php
/**
 * This file is responsible for the books
 * 
 * @package App
 * 
 * @author Thanasis mpalatsoukas <Thanasismpalatsoukas@gmail.com>
 */
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Book
 * 
 * @package App
 * 
 * @author Thanasis mpalatsoukas <Thanasismpalatsoukas@gmail.com>
 * 
 * Is responsible for Everything related the books
 */
class Book extends Model
{  
    protected $primaryKey = 'id';
    protected $fillable = [
            'title',
            'description',
            'details',
            'pages',
            'price',
            'author_id',
            'category_id',
            'yearOfPublication',
            'book_image',
            'discount',
            'ISBN',
            'amount_available'
        ];

    /** 
     * Connects books with authors. 
     * 
     * @return Book
     */
    public function author() {
        return $this->belongsTo('App\Author');
    }

    /** 
     * Connects books with categories
     * 
     * @return String
     */
    public function category() {
        return $this->belongsTo('App\Category');
    }

    /** 
     * Generates the isbn for the books
     * 
     * @return String
     */
    public static function generateIsbn() 
    {
        $ISBN = '';
        for ($i=0;$i<4;$i++) {
            $ISBN.=mt_rand(100, 1000);
            $ISBN.='-';
        }
        $ISBN.=mt_rand(1, 10);
        return $ISBN;
    }

    /** 
     * Returns the full price of the book after the reduction
     * of the discount. User needs to be logged in to perform this action
     * 
     * @param Book $book 
     * 
     * @return Float
     */
    public static function getTotalPrice( $book ) 
    {
        return (float) $book['price'] + Region::getCostByRegion() - ($book['price'] + Region::getCostByRegion() )*($book['discount']/100);
    }

    /** 
     * Generates the book cover jpg
     * 
     * @param Int $num The max number of images available  
     * 
     * @return Array
     */
    public static function generateBookCovers( int $num = 28 ) 
    {
        $book_covers = [];
        for ($i = 1;$i<$num;$i++) {
            $book_covers[] = 'b'.$i.'.jpg';
        }
        return $book_covers;
    }

    /** 
     * Returns the names of the authors by book
     * 
     * @param Array $books the id of the books that we want to 
     *                     convert into author names
     * 
     * @return Array
     */
    public static function getUniqueAuthors(Array $books)
    {
        return array_map(
            function ($book) {
                return $book->author->name;
            }, $books
        );
    }

    public static function setAuthorsNameAndCategoryName(Array $books) {
        
    }
}

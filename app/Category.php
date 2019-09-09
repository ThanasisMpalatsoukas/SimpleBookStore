<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name','category_cover'];

    /**
     * Connect books with categories
     * 
     * @return Array
     */
    public function books() {
        return $this->hasMany('App\Book');
    }

    /**
     * Return categories jakes
     * 
     * @return Array
     */
    public static function getBookCategoryNames() {
        return array_map(
            function ($category) {
                return $category['name'];
            }
            , Category::all()->toArray()
        );
    }

    /**
     * Return categories ids
     * 
     * @return Array
     */
    public static function getBookIds() {
        return array_map(
            function ($category) {
                return $category['id'];
            }
            , Category::all()->toArray()
        );
    }

}

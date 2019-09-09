<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $primaryKey = 'id';

    protected $fillable = ['name','surname','description','image_path'];

    /** 
     * Connects authors with books
     * 
     * @return Author
     */
    function books() {
        return $this->hasMany('App\Book');
    }
}

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

class Purchase extends Model
{
    protected $fillable = ['book_id','cost','invoice_id'];

    function invoice() {
        return $this->belongsTo('App\Invoice');
    }
}

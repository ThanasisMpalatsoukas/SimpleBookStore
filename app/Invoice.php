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

class Invoice extends Model
{
    protected $fillable = ['user_id','comments'];
    
    function purchases() {
        return $this->hasMany('App\Purchases');
    }
}

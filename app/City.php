<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $filtered = ['name','extra_cost'];
    protected $fillable = ['name','extra_cost'];

    public static $cities = ['Τρίκαλα','Αγρίνιο','Θεσσαλονίκη'];

    function regions()
    {
        return $this->hasMany('App\Region');
    }

    static function getCitiesNames() {
        return array_map(function ($city){
            return $city['name'];
        },City::all()->toArray());
    }
}

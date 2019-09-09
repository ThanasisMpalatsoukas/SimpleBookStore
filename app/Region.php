<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Region extends Model
{
    protected $fillable = ['name','city_id','extra_cost'];

    public static $regions_city_1 = [
        'Αγία Ειρήνη',
        'Αγία Κυριακή',
        'Αγία Μαρίνα',
        'Αμυγδαλιές',
        'Βαλτινό',
        'Βασιλική',
        'Γαριδάκι',
        'Γελάνθη',
        'Δενδροχώρι',
        'Διπόταμος',
        'Ελευθεροχώρι',
        'Ζυλευτή',
        'Κηπάκι',
        'Κρανιά',
        'Λεπτοκαρυά',
        'Λογγάκι',
        'Μαυρομάτι',
        'Μεγάλα Καλύβια'
    ];

    public static $regions_city_2 = [
        'Αγία Ειρήνη',
        'Αγία Κυριακή',
        'Αγία Μαρίνα',
        'Αμυγδαλιές',
        'Βαλτινό',
        'Βασιλική',
        'Γαριδάκι'
    ];

    public static $regions_city_3 = [
        'Αμυγδαλιές',
        'Βαλτινό',
        'Βασιλική',
        'Γαριδάκι',
        'Γελάνθη',
        'Δενδροχώρι',
        'Διπόταμος',
        'Ελευθεροχώρι',
        'Ζυλευτή',
        'Κηπάκι',
        'Κρανιά',
        'Λεπτοκαρυά',
        'Λογγάκι',
        'Μαυρομάτι',
        'Μεγάλα Καλύβια'
    ];

    public function city() 
    {
        return $this->belongsTo('App\City');
    }


    /** 
     * Gets the regions names based on the city they are in
     * 
     * @param Int $city_id the city id we want the regions of
     * 
     * @return Array $regions the regions names 
     */
    static function getRegionsBasedOnCity(Int $city_id) {

        // Filter regions based on $city_id
        $regions = array_filter(Region::all()->toArray(),function($region) use ($city_id) {
            return $region['city_id'] == $city_id;
        });

        // Return just the $region's names
        return array_map( function($region){
            return $region['name'];
        },$regions);
    }

    static function getCostByRegion() {
        if( Auth::check() ){
            return Region::find( Auth::user()->region )->extra_cost;
        }
        else {
            return 0;
        }
    }
}

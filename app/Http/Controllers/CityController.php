<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\City;

class CityController extends Controller
{
    /**
     * Updates a city entry
     * 
     * @param Request $request collects the instance
     *                         of items to be updated
     * 
     * @return Void
     */
    public function update(Request $request,City $city)
    {
        $input = $request->all();
        $city->name = $input['name'];
        $city->extra_cost = $input['extra_cost'];
        $city->save();
    }

    /**
     * Creates a new city
     * 
     * @param Request $request the fields to be created
     * 
     * @return Void
     */
    public function create(Request $request)
    {
        $input = $request->all();
        City::create([
            'name' => $input['name'],
            'extra_cost' => $input['extra_cost']
        ]);
    }

    /**
     * Return a single city based on id
     * 
     * @param City $city the city to be returned
     * 
     * @return City $city
     */
    public function single(City $city)
    {
        return $city;
    }

    /**
     * Return all cities
     * 
     * @return Collection <City> all cities
     */
    public function index()
    {
        return City::all();
    }
}

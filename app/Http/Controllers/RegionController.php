<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Region;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::all();
        foreach ( $regions as $region ) {
            $region->city_name = (string)$region->city->name;
        }
        return $regions;
    }

    public function update(Request $request,Region $region)
    {
        $input = $request->all();
        $region->name = $input['name'];
        $region->extra_cost = $input['extra_cost'];
        $region->city_id = $input['city_id'];
        $region->save();
    }

    public function single(Region $region)
    {
        return $region;
    }

    public function create(Request $request)
    {
        $input= $request->all();
        Region::create([
            'name' => $input['name'],
            'extra_cost' => $input['extra_cost'],
            'city_id' => $input['city_id']
        ]);
    }
}

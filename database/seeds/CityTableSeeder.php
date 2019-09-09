<?php

use Illuminate\Database\Seeder;
use App\City;

class CityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        array_map(function ($city_name) {
            City::create([
                'name' => $city_name,
                'extra_cost' => 6
            ]);
        }, City::$cities);
    }
}

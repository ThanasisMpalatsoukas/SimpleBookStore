<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        array_map(function ($region_name) {
            Region::create([
                'name' => $region_name,
                'city_id' => 1,
                'extra_cost' => (int) mt_rand(3, 10)
            ]);
        }, Region::$regions_city_1);

        array_map(function ($region_name) {
            Region::create([
                'name' => $region_name,
                'city_id' => 2,
                'extra_cost' => (int) mt_rand(3, 10)
            ]);
        }, Region::$regions_city_2);

        array_map(function ($region_name) {
            Region::create([
                'name' => $region_name,
                'city_id' => 3,
                'extra_cost' => (int) mt_rand(3, 10)
            ]);
        }, Region::$regions_city_3);
    }
}

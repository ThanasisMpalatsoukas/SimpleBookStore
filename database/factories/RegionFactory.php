<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Region;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\City;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Region::class, function (Faker $faker) {
        return [
            'name' => $faker->name,
            'extra_cost' => mt_rand(5,15),
            'city_id' => City::where('id', mt_rand(1,sizeof(City::all())) )->first()->id
        ];
    }
);
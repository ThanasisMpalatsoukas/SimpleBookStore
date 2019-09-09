<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

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

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'city' => mt_rand(1, sizeof(App\City::all())),
        'region' => mt_rand(1, sizeof(App\Region::all())),
        'address' => $faker->address,
        'phone' => '6988711872',
        'password' => '101195179131', // password
        'remember_token' => Str::random(10),
    ];
});

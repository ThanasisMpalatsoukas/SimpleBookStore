<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Category;
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

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'category_cover' => $faker->randomElement(
            array( 
                'handcuffs.png' , 'book-bold.png' , 'rose-bold.png' , 'politician.png' , 'spaceship-bold.png' 
            )
        )
        
    ];
}
);
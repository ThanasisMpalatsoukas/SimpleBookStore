<?php
/**
 * This file is responsible for the books
 * 
 * @package App
 * 
 * @author Thanasis mpalatsoukas <Thanasismpalatsoukas@gmail.com>
 */
/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Book;
use App\Category;
use App\Author;
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

$factory->define(Book::class, function (Faker $faker) {

    $book_covers = Book::generateBookCovers();

    return [
        'title' => $faker->text(30),
        'description' => $faker->text(300),
        'details' => $faker->text(500),
        'author_id' => mt_rand(1, sizeof(Author::all())),
        'category_id' => mt_rand(1, sizeof(Category::all())),
        'price' => $faker->numberBetween(6, 30),
        'book_image' => $faker->randomElement($book_covers),
        'ISBN' => Book::generateIsbn($book_covers),
        'pages' => mt_rand(50, 300),
        'yearOfPublication' => mt_rand(1900, 2020),
        'discount' => $faker->randomElement(array( 0 ,10 )),
        'amount_available' => $faker->randomElement(array(0,5)),
        'created_at' => now(),
        'updated_at' => now(),
    ];
}
);

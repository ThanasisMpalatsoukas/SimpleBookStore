<?php

use Illuminate\Database\Seeder;
use App\Review;
use App\User;
use App\Book;

class ReviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i=1;$i<sizeof(Book::all());$i++) {
            for ($j=1;$j<sizeof(User::all());$j++) {
                Review::create([
                    'user_id' => $j,
                    'book_id' => $i,
                    'comment' => $faker->text(300),
                    'rating' => mt_rand(1,5)
                ]);
            }
        }
    }
}


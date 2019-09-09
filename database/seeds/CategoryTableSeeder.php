<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = array( 'Crime' , 'Philosophy' , 'Romance' , 'Political', 'Sci-fi' );
        $genres_covers = array( 'handcuffs.png' , 'book-bold.png' , 'rose-bold.png' , 'politician.png' , 'spaceship-bold.png' ); 

        Category::create([
            'name' => $genres[0],
            'category_cover' => $genres_covers[0]
        ]);

        Category::create([
            'name' => $genres[1],
            'category_cover' => $genres_covers[1]
        ]);

        Category::create([
            'name' => $genres[2],
            'category_cover' => $genres_covers[2]
        ]);

        Category::create([
            'name' => $genres[3],
            'category_cover' => $genres_covers[3]
        ]);

        Category::create([
            'name' => $genres[4],
            'category_cover' => $genres_covers[4]
        ]);
    }
}



<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategoryTableSeeder::class);
        $this->call(AuthorTableSeeder::class);
        $this->call(BookTableSeeder::class);
        $this->call(CityTableSeeder::class);
        $this->call(RegionTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(ReviewTableSeeder::class);
    }
}

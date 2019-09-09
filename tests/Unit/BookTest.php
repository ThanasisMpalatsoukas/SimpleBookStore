<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Book;
use App\Author;
use App\Category;
use App\City;

class BookTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Check if the isbn generator is right
     *
     * @return void
     */
    public function testIsbnGenerator()
    {
        $isbn = Book::generateIsbn();
        $pregmatch = '/[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{1}/';
        $this->assertTrue(preg_match($pregmatch, $isbn) === 1);
    }

    public function testUniqueAuthorsByBookIds()
    {
        $db = BookTest::createDatabaseInstances();
        $author = $db['author'];
        $category = $db['category'];
        $book = $db['book'];
        $book = Book::find($book->id);

        $this->assertEquals( Book::getUniqueAuthors([$book]) , [$author->name] );
    }

    public function testGettingTotalBookPrice()
    {
        // Create needed instances
        $db = BookTest::createDatabaseInstances();

        $city = $db['city'];
        $region = $db['region'];
        $user = $db['user'];
        $author = $db['author'];
        $category = $db['category'];
        $book = $db['book'];
        $book = Book::find($book->id);


        $this->be($user);

        $this->assertEquals( 2, 2 );
    }

    public static function createDatabaseInstances()
    {
        $city = factory(City::class)->create();
        $region = factory(Region::class)->create();
        $user = factory(App\User::class)->create();
        $author = factory(Author::class)->create();
        $category = factory(Category::class)->create();
        $book = factory(Book::class)->create();

        return [
            'city' => $city , 'region' => $region , 'user' => $user,
            'author' => $author, 'category' => $category, 'book' => $category
        ];
    }

}

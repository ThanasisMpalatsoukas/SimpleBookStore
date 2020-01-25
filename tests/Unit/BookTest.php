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
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Category;

class CategoryTest extends TestCase
{
    /**
     * Check if the isbn generator is right
     *
     * @return void
     */
    public function testGetAllCategoryIds()
    {
        $categories = Category::getBookIds();
        $ids = [];
        for ($i=0;$i<sizeof(Category::all());$i++) {
            $ids[] = $i+1;
        }
        $this->assertTrue( $categories === $ids);
    }

    

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class CategoryController extends Controller
{
    /**
     * Update a single category
     * 
     * @param Request $request items to be updated
     * @param Category $category the category to be updated
     * 
     * @return Void
     */
    public function update(Request $request , Category $category) {
        //return 0;
        
        $category->name = $request->all()['name'];
        $category->save();
    }

    /**
     * Create a new category
     * 
     * @param Request $request the category fields
     * 
     * @return Void
     */
    public function create(Request $request) {
        $image = $request->file('imageUpload');
        $name = 'categoryCover_'.time();
        $folder = '';
        $filePath = $name. '.' . $image->getClientOriginalExtension();
    
        Storage::disk('local')->putFileAs('public',$image,$name);
    
        Category::create([
            'name' => $request->all()['name'],
            'category_cover' => $name
        ]);
    }

    /**
     * Return a single cateogry an change its category_cover name 
     * frm category_cover to book_image for reactJs StripedTable object
     * 
     * @param Category $category a single category to be returned
     * 
     * @return Category $category
     */
    public function single(Category $category)
    {
        $category->book_image = $category->category_cover;
        return $category;
    }

    /**
     * Delete a single category
     * 
     * @param Category $category a single category to be deleted
     * 
     * @return Void
     */
    public function delete(Category $category) {
        $category->delete();
    }

    /**
     * Return all categories back
     * 
     * @return Void
     */
    public function index() {
        return Category::all();
    }
}

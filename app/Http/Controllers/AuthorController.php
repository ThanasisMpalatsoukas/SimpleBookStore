<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Author;

class AuthorController extends Controller
{
    /**
     * Create a new author
     * 
     * @param Request $request the author fields
     * 
     * @return Void
     */
    public function create(Request $request)
    {
        Author::create([
            'name' => $request->all()['name'],
            'surname' => $request->all()['surname'],
            'description' => $request->all()['description'],
            'image_path' => ''
        ]);
    }

    /**
     * Update an author
     * 
     * @param Request $request the fields to be updated
     * @param Author $author the author to be updated
     * 
     * @return Void
     */
    public function update(Request $request,Author $author)
    {
        $author->name = $request->all()['name'];
        $author->surname = $request->all()['surname'];
        $author->save();
    }

    /**
     * Return a single author
     * 
     * @param Author $author the author to be returned
     * 
     * @return Author $author
     */
    public function single(Author $author)
    {
        return $author;
    }

    /**
     * Delete an author
     * 
     * @param Author $author the author to be deleted
     * 
     * @return Void
     */
    public function delete(Author $author)
    {
        $author->delete();
    }

    /**
     * Return all authors
     * 
     * @return Collection <author> 
     */
    public function index()
    {
        return Author::all();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Book;
use App\Category;
use App\Author;
use App\Review;

class BookController extends Controller
{

    /**
     * Returns filtered books based on categories
     * if categories is -1 the result is all the books
     * while if it is anything else it returns books based
     * on the categories ids
     * 
     * @param $request => [
     *                    Array<int> 'categories',
     *                    Int pagination
     *                    ]
     *                    
     * @return Array $filtered_categories
     */
    public function reactPagination(Request $request)
    {
        $input = $request->all();
        
        $categories_ids = $input['categories'];
        $pagination = $input['pagination'];
        if( isset( $input['paginateBy'] ) ) {
            $paginateBy = $input['paginateBy'];
        }
        else {
            $paginateBy = 20;
        }

        $filtered_books_by_category_ids = [];
        $books = Book::all();

        if( sizeof($categories_ids) == 1 && $categories_ids[0] == -1 ) {
            $categories_ids = Category::getBookIds();
        }

        $i = 0;
        $j = 0;
        
        while ($i <= ($pagination+1)*$paginateBy && $j < sizeof($books)) {
            if (in_array( $books[$j]['category_id'], $categories_ids ) ) {

                $categoryName = Category::find( $books[$j]['category_id'] )->name;
                $authorName = Author::find( $books[$j]['author_id'] )->name;

                if( $i > $pagination*$paginateBy ) {
                    $books[$j]['category'] = $categoryName;
                    $books[$j]['author'] = $authorName;
                    $books[$j]['review'] = round(Review::getMeanReviewOfBook( $books[$j]['id'] ),2);
                    $filtered_books_by_category_ids[] = $books[$j];
                }
                $i++;
            }
            $j++;
        }
        //return $categories;
        $filtered_books_by_category_ids[] = sizeof(Book::all());
        return response()->json( $filtered_books_by_category_ids );
    }


    public function uploadOne(UploadedFile $uploadedFile, $folder = null, $disk = 'public', $filename = null)
    {
        $name = !is_null($filename) ? $filename : str_random(25);

        $file = $uploadedFile
            ->storeAs($folder, $name.'.'.$uploadedFile->getClientOriginalExtension(), $disk);

        return $file;
    }

    public function update(Request $request,Book $book) {

        if ($request->has('imageUpload')) {
            // Get image file
            
            
            $image = $request->file('imageUpload');
            
            // Make a image name based on user name and current timestamp
            $name = 'bookImage_'.time();
            // Define folder path
            $folder = '';
            
            // Make a file path where image will be stored [ folder path + file name + file extension]
            $filePath = $name. '.' . $image->getClientOriginalExtension();
            // Upload image

            // Set user profile image path in database to filePath
            $book->book_image = $name;
            foreach ($request->except(['_token','imageUpload']) as $key => $part){
                $book->$key = $part;
            }

            Storage::disk('local')->putFileAs('public',$image,$name);
            $book->save();
            
            return $name;
        }
        else {
            foreach ($request->except('_token') as $key => $part) {
                $book->$key = $part;
            }
            $book->save();
        }
        

    }

    public function create(Request $request) 
    {

        if ($request->has('imageUpload')) {
            // Get image file
            $image = $request->file('imageUpload');
            // Make a image name based on user name and current timestamp
            $name = 'bookImage_'.time();
            // Define folder path
            $folder = '';

            $filePath = $name. '.' . $image->getClientOriginalExtension();
            // Upload image
            $this->uploadOne($image, $folder, 'public', $name);
            // Set user profile image path in database to filePath

            Storage::disk('local')->putFileAs('public',$image,$name);

            Book::create([
                'title' => $request->all()['title'],
                'description' => $request->all()['description'],
                'book_image' => $name,
                'author_id' => $request->all()['author_id'],
                'category_id' => $request->all()['category_id'],
                'price' => $request->all()['price'],
                'pages' => $request->all()['pages'],
                'amount_available' => $request->all()['amount_available'],
                'yearOfPublication' => $request->all()['yearOfPublication'],
                'ISBN' => $request->all()['ISBN'],
                'details' => $request->all()['details'],
                'discount' => $request->all()['discount']
            ]);
        }
        
    }

    public function getAllBooks($category) {
        if( !Auth::check() ) {
            return App\Book::where('category_id' ,$category)->take( 20 )->get();
        }
        else {
            $books = App\Book::where('category_id' , $category)->take( 20 );
            $books = array_map(function ($book){
                $book['price'] = App\Book::getTotalPrice( $book );
                //return $book;
            },$books->toArray());
            return json_encode( $books );
        }
    }
    public function single(Book $book)
    {
        $book['author'] = App\Author::find($book->author_id)->name;
        $book['category'] = App\Category::find($book->category_id)->name;
        return $book;
    }

    public function delete(Book $book) {
        $book->delete();
    }
}

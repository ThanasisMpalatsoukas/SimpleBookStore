<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Book;
use App\Category;

class AjaxRequestController extends Controller
{
    /**
     * Return the new category clicked
     * 
     * @param Request $request 
     * 
     * @return View view
     */
    function post(Request $request)
    {
        $input = $request->all();

        return view(
            'home.layout.categoryItems',
            ['books' => Category::find( $input['id'] )->books->take(8)
            , 'category' => Category::find( $input['id'] )->name ]
        );
    }

    /**
     * Returns the items with the specified filter on.
     * 
     * @param Request $request 
     * 
     * @return View view
     */
    public function filteredItems(Request $request)
    {

    }

    /**
     * Insert a new item on the cart
     * 
     * @param Request $request 
     * 
     * @return Boolean $flag || -1
     */
    function insertItem(Request $request)
    {
    

        if (!Auth::check()) {

            // Means the user is not signed in
            return 2;
        }
        
        $input = $request->all();

        // flag = 0 means that the item has been initialized
        $flag = 0;
 
        // If the session alread has an item just push the item
        // Otherwise create a new session
        if ($request->session()->has('items')) {
            $items = $request->session()->get('items');

            // Flag = 1 means that the item has been pushed
            if (in_array($input['id'], $items)) {
                $flag = 1;
            }

            // Count how many times the item is in the session array
            $repeated_items = 0;
            foreach ( $items as $item ) {
                if ($item == $input['id']) {
                    $repeated_items++;
                }
            }

            // Flag = 3 means that the item can't be added 
            if ( $repeated_items < Book::find( $input['id'] )->amount_available  ) {
                $request->session()->push('items', $input['id']);
            }
            else {
                $flag = 3;
            }

        } else {
            // If there are no items available.
            if( Book::find( $input['id'] )->amount_available == 0 ) {
                $flag = 3;
            }else {
                $request->session()->put('items', [ $input['id'] ]);
            }
        }

        return $flag;

    }

    /**
     * Remove a new item on the cart
     * 
     * @param Request $request 
     * 
     * @return Integer -1||$input['id']
     */
    function removeItem(Request $request)
    {
        $input = $request->all();
        $products = array_unique(session('items'));
        $deleted = 1;

        if (($key = array_search($input['id'], $products)) !== false) {
            unset($products[$key]);
            $deleted = 0;
        }

        $request->session()->put('items', $products);
        
        if ($deleted == 0) {
            return $input['id'];
        } else {
            return -1;
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaginateController extends Controller
{
    public function paginate(Request $request) 
    {        
        $input = $request->all();

        $pagination = $input['pagination'];
        if( isset( $input['paginateBy'] ) ) {
            $paginateBy = $input['paginateBy'];
        } else {
            $paginateBy = 20;
        }

        $filtered_books_by_category_ids = [];
        $categories = $request->all()['model'];

        $i = 0;
        
        while ($i < ($pagination+1)*$paginateBy && $i <= (sizeof( $categories ) - 1) ) {
            if ( $i >= $pagination*$paginateBy ) {
                $filtered_books_by_category_ids[] = $categories[$i];
            }
            $i++;
        }
        //return $categories;
        $filtered_books_by_category_ids[] = sizeof($categories);
        return response()->json( $filtered_books_by_category_ids );
        
    }
}

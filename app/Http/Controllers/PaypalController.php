<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

use App\Book;

use App\Invoice;
use App\Purchase;

class PaypalController extends Controller {

    /**
     * Creates the entries when a new item has been bought
     * 
     * @return Int 1 When the item has been purchased succesfully
     */
    public function payment(Request $request) {

        $book_ids = session('items');
        $unique_book_ids = array_unique($book_ids);
        $user = Auth::user();
        $input = $request->all();

        $invoice = Invoice::create([
            'user_id' => $user->id,
            'comments' => $input['comments']
        ]);

        foreach( $book_ids as $book_id ) {
            $book = Book::find($book_id);

            Purchase::create([
                'invoice_id' => $invoice->id,
                'book_id' => $book_id,
                'cost' => $book->price - ( $book->price * ($book->dicount/100) )
            ]);
        }

        $i = 0;
        foreach ($unique_book_ids as $book_id) {
            $book = Book::find( $book_id );
            $book->amount_available = $book->amount_available - $input['amount_of_books'][$i];
            $book->save();
            $i++;
        }

        Session::forget('items');
        return 1;
    }


}
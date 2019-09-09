@foreach( $books as $book )
<div class="single-book">
    <a href="/item/{{ $book['id'] }}">
        <div class="book image" style="background-image:url( {{ asset( 'storage/'.$book['book_image'] )}} )">
            <div class="buy-option">
                <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                    <div class="red-circle">
                        <p>+</p>
                    </div>
                </div>
            </div>
            <div class="details">
                <table>
                    <tr>
                        <td>Title</td>
                        <td>{{ $book['title'] }}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{{ App\Category::find( $book['category_id'] )->name }}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{{ $book['price'] }}$</td>
                    </tr>
                </table>
                <div class="add-cart-container">
                    <button class="add-item" data-id="{{ $book['id'] }}">Add to cart</button>
                </div>
            </div>
        </div>
    </a>
</div>
@endforeach


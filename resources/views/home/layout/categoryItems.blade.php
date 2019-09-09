<div class="category-items" id="category-items">
    <div class="container" id="category-items-container">

        @if( $category == '' ||  !in_array( $category , App\Category::getBookCategoryNames() ) )
            @foreach( $books as $book )
                @if(  $book['category_id'] ==  App\Category::getBookIds()[0]  )
                    <div class="book-container">
                        <a href="/item/{{$book['id']}}">
                            <div class="book image" style="background-image:url( {{ asset( 'storage/'.$book['book_image'] )}} )">
                                <div class="buy-option">
                                    <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                                        <div class="red-circle">
                                            <p>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @endif
            @endforeach
        @else
            @foreach( $books as $book )
                @if(  $book->category->name == $category )
                    <div class="book-container">
                        <a href="/item/{{$book['id']}}">
                            <div class="book image" style="background-image:url( {{ asset( 'storage/'.$book['book_image'] )}} )">
                                <div class="buy-option">
                                    <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                                        <div class="red-circle">
                                            <p>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @endif
            @endforeach
        @endif

        <div class="button-container">
            <button id="load-more-items">See more</button>
        </div>

    </div>
</div>
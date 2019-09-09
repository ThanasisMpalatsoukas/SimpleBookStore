<div class="best-seller">
    <h2>BEST SELLER</h2>
    <div class="book-showcase">
        <div class="book-container">
            <div class="small-book image" style="background-image:url( {{ asset('storage/'.$books[0]['book_image'])}} );background-position: top;">
                <div class="buy-option">
                    <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                        <a href="/item/{{ $books[0]['id'] }}">
                            <div class="red-circle">
                                <p>+</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="book-container">
            <div class="big-book image" style="background-image:url( {{ asset('storage/'.$books[1]['book_image'])}} );background-position: top;">
                <div class="buy-option">
                    <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                        <a href="/item/{{ $books[1]['id'] }}">
                            <div class="red-circle">
                                <p>+</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="book-container">
            <div class="small-book image" style="background-image:url( {{ asset('storage/'.$books[2]['book_image'])}} );background-position: top;">
                <div class="buy-option">
                    <div class="cart-icon image" style="background-image:url( {{ asset('storage/cart.png') }} )">
                        <a href="/item/{{ $books[2]['id'] }}">
                            <div class="red-circle">
                                <p>+</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
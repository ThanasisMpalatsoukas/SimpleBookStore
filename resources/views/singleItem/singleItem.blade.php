        @include('home.layout.header',['headerClass' => 'single-item-header'])
        @if( !Auth::check() )
            @include ('home.layout.nonAuthorizedUsers')
        @endif
        <div class="breadcrumps">
            <p><a href="../../">home</a> > <a href="../../books/-1">books</a> > {{ $book['title'] }}</p>
        </div>
        <div class="confirm-purchase" id="confirm-purchase">
            <p>Your item has been added to the cart</p>
        </div>
        <div id="warning-container">

        </div>
        <main class="single-item">
            <div class="navbar-container">
                <nav>
                    <ul>
                        @foreach( App\Category::all()->toArray() as $item )
                            <li><a href="../../books/{{ $item['id'] }}">{{ $item['name'] }}</a></li>
                        @endforeach
                    </ul>
                </nav>
            </div>
            <div class="content-container">
                <div class="book-info">
                    <div class="change-book" style="float:left;">
                        @if( $book['id'] - 1 > 0 )
                        <a href="{{ $book['id'] - 1 }}">
                            <div class="image" style="background-image:url({{ asset('storage/triangle-left.png') }})"></div>  
                        </a>
                        @endif
                    </div>
                    <table>
                        <tr>
                            <th colspan='2'>{{ $book['title'] }}</th>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>{{$book['ISBN']}}</td>
                        </tr>
                        <tr>
                            <td>Year of publication</td>
                            <td>{{$book['yearOfPublication']}}</td>
                        </tr>
                        <tr>
                            <td>Pages</td>
                            <td>{{$book['pages']}}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td><a href="../../books/{{ $category['id'] }}">{{ $category['name'] }}</a></td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>{{$author}}</td>
                        </tr>
                        <tr>
                            <td>Books available</td>
                            <td>{{$book['amount_available']}}</td>
                        </tr>
                        <tr>
                            <td colspan='2' class="description" style="font-weight:400;">{{$book['description']}}</td>
                        </tr>
                        <tr>
                            @if( $book['discount'] == 0 )
                            <td colspan='2' class="price">
                                {{$book['price'] + App\Region::getCostByRegion()}}$
                                @if( Auth::check() )
                                    <span class="transportation-cost">( Transportation cost is included ( {{App\Region::getCostByRegion()}}$ ) )</span>
                                @else
                                    <span class="transportation-cost">( Transportation cost is not included )</span>
                                @endif
                            </td>
                            @else
                            <td colspan='2' class="price">
                                <span class="endprice">{{ App\Book::getTotalPrice( $book ) }}$</span>
                                <span class="strikethrough">{{ $book['price'] + App\Region::getCostByRegion() }}$ ( save {{ $book['discount'] }}% )</span>
                                @if( Auth::check() )
                                    <span class="transportation-cost">( Transportation cost is included ( {{App\Region::getCostByRegion()}}$ ) )</span>
                                @else
                                    <span class="transportation-cost">( Transportation cost is not included )</span>
                                @endif
                            </td>
                            @endif
                        </tr>
                        <tr>
                            <td colspan='2' style="opacity:1;">
                                <button id="add-single-book-item">Add item</button>
                                <input type="hidden" id="book_id" name="book_id" value="{{ $book['id'] }}">
                            </td>
                        </tr>
                    </table>
                    <div class="book-cover-container image" style="background-image:url( {{ asset('storage/'.$book['book_image'] ) }} );background-size:contain;background-repeat:no-repeat;">

                    </div>
                    <div class="book-review">
                        <a class="review-item" href="#write-review">Review this product</a>
                        <div class="stars image" id="start" data-amount="{{ $review_mean }}" style="background-image:url( {{ asset('storage/stars.png' ) }} );">
                            <p>( {{$review_mean}} )</p>
                            <p><a href="../../reviews/{{$book['id']}}">( read reviews )</a></p>
                        </div>
                        <div class="stars-overlay" style="width:{{ $review_mean*30 }}px;">
                        </div>
                        
                    </div>
                    <div class="change-book" style="float:right">
                    @if ( $book['id'] + 1 < count(App\Book::all()) )
                    <a href="{{$book['id']+1}}">
                      <div class="image" style="background-image:url({{ asset('storage/triangle-right.png') }})"></div>  
                    </a>
                    @endif
                </div>
                </div>
                <div class="details">
                    <h3>Details</h3>
                    <p>{{ $book['details'] }}</p>
                </div>
                @if( $review_enabled )
                <div class="write-review-container" id="write-review">
                    <div class="write-review">
                        <div id="review-response">

                        </div>
                        <p>Your rating <sup>(*)</sup></p>
                        <div class="star-container">
                            <div class="single-star image" data-num="0" style="background-image:url({{ asset('storage/single-transparent-star.png') }});">
                            </div>
                            <div class="single-star image" data-num="1" style="background-image:url({{ asset('storage/single-transparent-star.png') }});">
                            </div>
                            <div class="single-star image" data-num="2" style="background-image:url({{ asset('storage/single-transparent-star.png') }});">
                            </div>
                            <div class="single-star image" data-num="3" style="background-image:url({{ asset('storage/single-transparent-star.png') }});">
                            </div>
                            <div class="single-star image" data-num="4" style="background-image:url({{ asset('storage/single-transparent-star.png') }});">
                            </div>
                            <div class="color-override">
                            </div>
                            <div class="yellow-color-override" id="yellow-color-override">
                            </div>
                            <input type="hidden" name="stars" id="previous-star-count" data-num="{{ $stars }}">
                        </div>
                        <p style="margin-top:30px;">Write your comment</p>
                        <textarea cols="60" rows="30" name="review-comment" id="review-comment" value="{{ $comment }}">{{$comment}}</textarea>
                        <br>
                        <button id="send-review">Send review</button>
                    </div>
                </div>
                @else
                <div class="container">
                    <div class="warning-review">
                        <p>To write a review you need to be logged in</p>
                    </div>
                </div>
                @endif
            </div>            
        </main>
        <script src="{{ asset('js/jQuery.js') }}"></script>
        <script src="{{ asset('js/index.js') }}"></script>
    </body>
</html>

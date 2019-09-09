@include('home.layout.header',['headerClass' => 'single-item-header'])
@if( !Auth::check() )
    @include ('home.layout.nonAuthorizedUsers')
@endif
    <div class="breadcrumps">
        <p><a href="../../">home</a> > <a href="../../books/-1">books</a> > <a href="../../item/{{$book['id']}}">{{ $book['title'] }} </a>> review</p>
    </div>

    <input type="hidden" id="book_id" name="book_id" value="{{ $book['id'] }}">
    <main class="reviews" id="reviews">

    </main>


    <!-- Include footer -->
    <footer>
            <div class="container">
                <div class="footer-space">
                    <p>Phone : +30 6988711872</p>
                    <p>Email : Thanasismpalatsoukas@gmail.com</p>
                    <p>Adress : Kotroni trikalwn , trikala</p>
                </div>
                <div class="footer-space">
                    <p>Phone : +30 6988711872</p>
                    <p>Email : Thanasismpalatsoukas@gmail.com</p>
                    <p>Adress : Kotroni trikalwn , trikala</p>
                </div>
                <div class="footer-space">
                    <p>Phone : +30 6988711872</p>
                    <p>Email : Thanasismpalatsoukas@gmail.com</p>
                    <p>Adress : Kotroni trikalwn , trikala</p>
                </div>
            </div>
        </footer>

        <div class="credentials">
            <p>Website designed and developed by Thanasis Mpalatsoukas</p>
        </div>
        <script src="{{ asset('js/review.js') }}"></script>
    </body>
</html>
<!-- include header -->
@include ('home.layout.header',['headerClass' => 'index-header'])

<!-- include warning layout -->
@include ('home.layout.warning')

<!-- invisible log-in table -->
@if( !Auth::check() )
    @include ('home.layout.nonAuthorizedUsers')
@endif

<main>

    <!-- main background image -->
    <div class="search-container image" style="background-image: none">
        <div class="items-container">
            <h1>Find one of the <i><span class="emphasize">thousand books</span></i> we have in store for you 
            <i><span class="emphasize">quick</span></i> and <i><span class="emphasize">fast</span></i>
            by just typing in the title of your favourite book or his author.</h1>
            <input class="main-search" type="text" name="search_book" placeholder="Search by author or book title">
            <div class="search-icon" style="background-image:url( {{ asset('storage/search.png')}} )" ></div>
            <div class="search-results" id="search-results">

            </div>
        </div>
    </div>

    <!-- Include the Best seller book view -->
    @include ('home.layout.bookPresentation' , ['books' => $books])

    <!-- Discount banner -->
    <div class="discount">
        <div class="left-side">
            <p>SUPER <span class="bigger"><b><i>DEAL</i></b></span><br>now with just 1 book you get another<br> one with</p>
        </div>
        <div class="right-side">
            <p><span class="much-bigger"><strong>20%</strong></span><br>discount until 02.06.2021</p>
        </div>
    </div>

    <!-- Include the menu of the items -->
    @include ('home.layout.menu')

    <!-- Include the view for the items filtered by category -->
    @if( isset( $_GET['category'] ) )
        @include ('home.layout.categoryItems',[ 'books' => $books , 'category' => $_GET['category'] ])
    @else
        @include ('home.layout.categoryItems',[ 'books' => $books , 'category' => ''  ])
    @endif
    
    <!-- Include footer -->
    @include ('home.layout.footer')
                

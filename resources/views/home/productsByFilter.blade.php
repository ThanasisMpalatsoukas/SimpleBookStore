@include('home.layout.header',['headerClass' => 'index-header'])
        @if( !Auth::check() )
            @include ('home.layout.nonAuthorizedUsers')
        @endif
        <div class="breadcrumps">
            <p><a href="../../">home</a> > books</p>
        </div>
        <input type="hidden" id="category_id" name="category_id" value="{{ $category }}">

        <!-- React js app here -->
        <main class="items-by-category" id="products-by-filter">
  
        </main>

        <!-- Footer area -->
        <script src="{{ asset('js/jQuery.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/index.js') }}"></script>
    </body>
</html>

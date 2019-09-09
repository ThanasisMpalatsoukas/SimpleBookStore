<nav class="book-categories">
    <div class="container">
        <ul id="menu-items">
            @foreach( App\Category::all()->toArray() as $category )
                <li id="{{ $category['id'] }}"><p>{{$category['name']}}</p><div class="image menu-icon" style="background-image:url( {{ asset('storage/'.$category['category_cover'])}} );"></div></li>
            @endforeach
        </ul>
    </div>
</nav>
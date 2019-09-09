<?php $i = 0; ?>
@foreach( $books as $book )
    <div class="search-results-container">
        <div class="book-image image" data-id="{{ $book['id'] }}" style="background-image:url( {{ asset('storage/'.$book['book_image'])}} )">
        </div>
        <div class="book-details">
            <p>{{$book['title']}}<br><span>The author goes here</span></p>
        </div>
    </div>
    <?php $i++; ?>
@endforeach
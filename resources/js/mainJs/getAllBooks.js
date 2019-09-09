export default function getAllBooks() {

    $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
        
    $.ajax({

        type:'GET',
        url:'/api/books',
        dataType:'json',

        success: function(response) {

            const $books = response[0];
            const authors = response[1];
            const $searchResults = $('#search-results');
            const $searchResultsClass = $('.search-results');

            $(document).on('click','.book-details',function(event){
                let elclass = event.currentTarget;
                console.log('clicked');
                window.location.replace('/item/'+$(elclass).data('id'));
            });

            function addSpanOnInnerText( title , index , searchLength) {
                let titleStart = title.slice( 0 , index );
                let titleMid = title.slice( index, index+parseInt(searchLength) );
                let titleEnd = title.slice( index+parseInt(searchLength) );
                return titleStart+'<span class="result-text-highlighted">'+titleMid+'</span>'+titleEnd;
            }

            $('.main-search').on('change keyup paste',function(){

                $searchResults.html('');

                let $currentSearchVal = $(this).val().toLowerCase();

                if( $currentSearchVal != '' ) {
                    $searchResults.css('opacity','1');
                    let filtered_books = [];
                    let filtered_books_index_found = [];
                    let searchValLength = $currentSearchVal.length;
                    for( let i = 0;i<$books.length;i++ ) {
                        let $booksToLowercase = $books[i]['title'].toLowerCase();

                        let searchForCurrentSearchVal = $booksToLowercase.search($currentSearchVal);
                        if( searchForCurrentSearchVal != -1 ) {
                            filtered_books.push( $books[i] );
                            filtered_books_index_found.push( searchForCurrentSearchVal );
                        }
                    }

                    for( let i = 0; i < filtered_books.length;i++ ) {
                        let id = filtered_books[i]['id'];
                        let image_path = filtered_books[i]['book_image'];
                        let title = addSpanOnInnerText(filtered_books[i]['title'] , filtered_books_index_found[i],searchValLength);

                        // Put a span where the search result has been found on the title
                        


                        let result =   '<div class="search-results-container">\
                                            <div class="book-image image" style="background-image:url(/storage/'+image_path+')">\
                                            </div>\
                                            <div class="book-details" data-id="'+id+'">\
                                                <p>'+title+'<br><span>The author goes here</span></p>\
                                            </div>\
                                        </div>';
                        $searchResults.append( result );
                    }
                    if( $searchResults.height() < 600 ) {
                        console.log( $searchResults.height() );
                        $searchResults.css('overflow-y','hidden');
                        $searchResultsClass.css('overflow-y','hidden');
                    }
                    else {
                        $searchResults.css('overflow-y','scroll');
                        $searchResultsClass.css('overflow-y','scroll');
                    }
                    if( filtered_books.length < 1 ) {
                        result = '<div class="search-results-container">\
                                    <div class="book-details">\
                                        <p style="opacity:0.6;">Sorry the results have not beed found :(</p>\
                                    </div>\
                                </div>';
                        $searchResults.append( result );
                    }
                }
                else {
                    $searchResults.css('opacity','0');
                }


            });
        }

    });
}
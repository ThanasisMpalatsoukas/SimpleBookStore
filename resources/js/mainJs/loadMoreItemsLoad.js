export default function loadMoreItemsLoad() {
    // Load more images
    $('#load-more-items').on('click',function(){


        $('#category-items-container').append('<div class="category-lazy-load-container"><div class="lazy-load"><div class="lazy-ball"></div><div class="lazy-ball"></div><div class="lazy-ball"></div></div></div>');

        $.ajax({

        type:'POST',
        url:'/ajaxRequest',
        dataType:'html',
        data:{ id : currentSelectedMenu },

        success: function(response){
            setTimeout( () => {
                $('#category-items-container').append(response);
            },100);
        }

        });
    }); 
}
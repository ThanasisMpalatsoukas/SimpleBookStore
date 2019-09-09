export default function sendReview() {

    var ajaxCSRFsetup = function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    let currentStarCount = -1;
    let yellowColor = '';
    if( $('#previous-star-count').length > 0 ) {
        currentStarCount = $('#previous-star-count').data('num');
        yellowColor = document.getElementsByClassName('yellow-color-override');
        yellowColor[0].style.width = 30*parseInt( currentStarCount  )+'px';
    }

    if( $('.single-star') ) {
        let yellowColorWidth = 30*parseInt( currentStarCount )+'px';

        $('.single-star').hover(
            function(){
                const singleStarWidth = 30;
                let starNum = parseInt($(this).data('num') + 1 );
                yellowColor[0].style.width = singleStarWidth*starNum+'px';},
            function() {
                yellowColor[0].style.width = yellowColorWidth;
            }
        );
    
        $('.single-star').click(function(){
            const singleStarWidth = 30;
            yellowColor[0].style.width = singleStarWidth*parseInt($(this).data('num') + 1 )+'px';
            yellowColorWidth = singleStarWidth*parseInt($(this).data('num') + 1 )+'px';
            currentStarCount = parseInt($(this).data('num'));
        });
    }
    if( $('#send-review') ) {

        var reviewResposeMarkup = {
            created : '<div class="review-response">Review has been created successfully!</div>',
            updated : '<div class="review-response">Review has been updated successfully!</div>',
        }

        $('#send-review').click(()=>{

            if( currentStarCount != -1 && $('#review-comment').val() != '' ) {
                ajaxCSRFsetup();

                $.ajax({

                    type:'POST',
                    url:'/insertReview',
                    data:{ comment : $('#review-comment').val() , rating : (currentStarCount+1) , book_id : $('#book_id').val() },

                    success: function(response){
                        let $reviewResultContainer = $('#review-response');
                        $reviewResultContainer.html('')
                        if ( response == 1 ) {
                            $reviewResultContainer.html(reviewResposeMarkup.created);
                        }
                        else {
                            $reviewResultContainer.html(reviewResposeMarkup.updated);
                        }
                    }

                });
            }

        });
    }

}
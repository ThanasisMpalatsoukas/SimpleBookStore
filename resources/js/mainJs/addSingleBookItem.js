export default function addSingleBookItem() {

    var ajaxCSRFsetup = function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    // Init variables
    let $addSingleBookItemBtn = $('#add-single-book-item');
    let $confPurchase = $('#confirm-purchase');
    let $amountOfItemsOnCart = $('#amount-of-items');
    let $redCircle = $('#red-circle');
    let $warning = $('#warning-container');
    let $book_id = $('#book_id').val();
    let warningSigns = {
        loggedOut : '<div class="warning"><p>You need to be logged in to finish this action</p></div>',
        noBooksLeft: '<div class="warning"><p>There are no books left in the store, try again later</p></div>'
    };

    // Init event listeners
    $addSingleBookItemBtn.on('click',addItemToList);
    
    // add functions


    function addItemToList(){

        //e.preventDefault();

        ajaxCSRFsetup();

        $.ajax({

            type:'POST',
            url:'/ajaxRequestItem',
            data:{ id : $book_id },

            success: function(response){

                // response == 0 means the cart number will be raised
                // response == 2 means that the user isnt signed in
                // response == 3 means that the maximum amount of books has been reached
                if( response == 2 ){
                    $warning.append(warningSigns.loggedOut);    
                }
                else if( response == 3 ) {
                    $warning.append(warningSigns.noBooksLeft);  
                }
                else{
                    raiseCartNumber();
                    showPurchasedItemCart();
                }
            }

        });
    }

    /* 
        * Return type : Void
        * Parameters : { int : response }
        */
    function raiseCartNumber(){
        $redCircle.css({'opacity':'0','display':'block'});
        $amountOfItemsOnCart.css({'opacity':'0','display':'block'});

        $redCircle.animate({ opacity: '1' },600);
        $amountOfItemsOnCart.animate({ opacity: '1' },600);

        let $amount = 0;

        if( $amountOfItemsOnCart.html() != '' ){
            $amount = parseInt($amountOfItemsOnCart.html());
        }

        $amountOfItemsOnCart.html($amount+1);
    }

    /* 
    * Return type : Void
    */
    function showPurchasedItemCart(){
        $confPurchase.animate({ opacity : '1',marginTop : '0%' },500);
        
        setTimeout(function(){
            $confPurchase.animate({ opacity : '0' , marginTop : '-20%' },500);
        },2500);
    }
}
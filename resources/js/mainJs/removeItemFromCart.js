export default function removeItemFromCart() {

    var ajaxCSRFsetup = function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    // Cache all elements 
    let $removeItemBtn = $('.remove-item');
    let $totalAmountOfItemCost = $('#total-amount-of-money');
    let $redCircle = $('#red-circle');
    let $amountOfItemsOnCart = $('#amount-of-items');
    let $deletedItemTotalCost = 0;

    // Remove item from cart
    $removeItemBtn.on('click',removeItem);

    // Init functions
    function removeItem() {
        let id = $(this).data('id');

        ajaxCSRFsetup();

        $.ajax({

            type:'POST',
            url:'/ajaxRequestRemoveItem',
            dataType:'html',
            data:{ id : id },

            success: function(response){
                // response == 0 means the cart number will be lowered
                if( response!= -1 ) {
                    hideDeletedItem(response);
                    lowerCartNumber();
                    lowerCurrentPrice(response);
                }
            }
        });
    }

    // Changes rendered to the HTML
    function render() {
        $totalAmountOfItemCost.html( ( parseFloat( $totalAmountOfItemCost.html() ).toFixed(2) - $deletedItemTotalCost ).toFixed(2) );
        $amountOfItemsOnCart.html($amount-1);
    }

    // Takes the response and calculates the total cost value
    // of the deleted item.
    function lowerCurrentPrice( response ){
        $deletedItemTotalCost =  parseInt( $('#times'+response).html() ) * parseFloat( $('#price'+response).html() );
        render();
    }

    // Hide selected item
    function hideDeletedItem(response) {
        $('#b'+response).animate({
            opacity: '0'
        },600);
        setTimeout(function(){
            $('#b'+response).css('display','none');
        },600);
    }

    /* 
        * Return type : Void
        * Parameters : { int : response }
        */
    function lowerCartNumber(){
        $redCircle.css({'opacity':'0','display':'block'});
        $amountOfItemsOnCart.css({'opacity':'0','display':'block'});
        $redCircle.animate({ opacity: '1' },600);
        $amountOfItemsOnCart.animate({ opacity: '1' },600);

        let $amount = 0;
        if( $amountOfItemsOnCart.html() != '' ){
            $amount = parseInt($amountOfItemsOnCart.html());
        }

        render();

        // If there are no items left leave page
        leavePageIfNoItemsLeft( $amount );
    }

    function leavePageIfNoItemsLeft( itemCount ) {
        if( itemCount - 1 == 0 ) {
            window.location.replace('/?warning=2');
        }
    }
}
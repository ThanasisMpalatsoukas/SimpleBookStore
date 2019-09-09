export default function swapMenu() {

    var ajaxCSRFsetup = function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    // Initialize variables
    var menu = [];
    $('#menu-items li').each(function(index){
        menu.push($(this).attr('id'));
    });
    var currentSelectedMenu = 'Crime';

    // Initialize event listeners
    for( var i = 0; i < menu.length; i++ ){
        $('#'+menu[i]).on('click', changeMenu);
    }

    // Change menu functionality
    function changeMenu(){

        changeSlider( $(this)[0].id );
        ajaxCSRFsetup();
        $('#category-items').html('<div class="category-lazy-load-container"><div class="lazy-load"><div class="lazy-ball"></div><div class="lazy-ball"></div><div class="lazy-ball"></div></div></div>');
        prepareTheAjaxCall();
    }

    // Change slide
    function changeSlider( id ){
        if( id != currentSelectedMenu ){
            $('#' + currentSelectedMenu + ' p').removeClass('active');
        }
        currentSelectedMenu = id;
        $('#' + currentSelectedMenu + ' p').addClass('active');
    }

    function prepareTheAjaxCall()
    {
        $.ajax({

            type:'POST',
            url:'/ajaxRequest',
            dataType:'html',
            data:{ id : currentSelectedMenu },

            success: function(response){
                setTimeout( () => {
                    $('#category-items').css('opacity',0);
                    $('#category-items').html(response);
                    $('#category-items').animate({
                        opacity : '1'
                    },500);
                },100);
            }

        });
    }
}
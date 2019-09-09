export default function controlRegisterAndLoginMenu() {
    // Load icons
    let $userIcon = $('#user-icon');
    let $exitIcon = $('#exit-icon');
    let $blackContainer = $('#login-black-container');
    let $logoutUser = $('.logout-user');
    let $loginCard = $('.login-card');
    let visible = false;

    let init = function() {
        if( $blackContainer.length ){
            if( $('#warning-exists').val() ) {
                    appearLoginAndRegisterMenu();
            }
            $userIcon.on('click',appearLoginAndRegisterMenu);
            $exitIcon.on('click',disspearLoginAndRegisterMenu);
        }
        else{
            $userIcon.on('click',switchVisibilityOfLogoutPanel);
        }
    }

    // Appear logout panel
    function switchVisibilityOfLogoutPanel() {
        if( visible ){
            $logoutUser.animate({
                opacity: '0',
                marginTop: '0'
            }, 500);
            setTimeout(function(){
                $logoutUser.css('display','none');
            }, 500);
        }
        else {
            $logoutUser.css('display','flex');
            $logoutUser.animate({
                opacity: '1',
                marginTop: '45px'
            }, 500);
        }
        visible = !visible;
    }

    // Appear login menu
    function appearLoginAndRegisterMenu() {
        $blackContainer.css('display','flex');
        $loginCard.css('display','flex');

        $blackContainer.animate({
            height:'100vh',
            width:'100vw',
            opacity:'1'
        },500);
    }

    // Dissapear login menu
    function disspearLoginAndRegisterMenu() {
        $blackContainer.animate({
            height:'0',
            width:'0',
            opacity:'0'
        },500);

        setTimeout(function(){
            $blackContainer.css('display','none');
            $loginCard.css('display','none');
        },500);
    }

    // Main part
    init();
}
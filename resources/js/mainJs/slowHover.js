export default function slowHover() {
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        let target = this.hash;
        let $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
}
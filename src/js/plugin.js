$(document).ready(function(){
    // Slick slider init
    $('#carousel').slick({
        arrows: false
    });

    // Slick slider - arrows
    $('.carousel-arrow.left').on('click', function () {
        $('#carousel').slick('slickPrev');
    });
    $('.carousel-arrow.right').on('click', function () {
        $('#carousel').slick('slickNext');
    });

    // Slick nav init
    $('#header-nav').slicknav({
        prependTo:'header nav'
    });

    // Anchor appearance & hide
    $(window).scroll(function(){
        if($(window).scrollTop() > 900){
            $('.anchor').addClass('show');
        } else if($(window).scrollTop() < 900) $('.anchor').removeClass('show');
    });

    // Anchor slow slide
    $(".anchor").on("click", function (event) {
        event.preventDefault();
        $('body,html').animate({scrollTop: 0}, 1500);
    });
});
/**
 * Created by VuZ on 19.10.16.
 */
$(document).ready(function () {

    $(document).on('focus click', '.setTimeInput, input[name="time"]', function (e) {
        $('body').addClass('showPopup');
        $('.setKey').addClass('show');
    });
    	

    $(document).on('click', '.popup', function (e) {
        if ($(e.target).hasClass('outer')) {
            $('body').removeClass('showPopup');
            $('.popup').removeClass('show');
        }
    });

    $(document).on('click', '.popup .closeBtn, .changenumber', function (e) {
        e.preventDefault();
        $('body').removeClass('showPopup');
        $('.popup').removeClass('show');
        return false;
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 27 && $('body').hasClass('showPopup')) {
            $('body').removeClass('showPopup');
            $('.popup').removeClass('show');
        }
    });


});



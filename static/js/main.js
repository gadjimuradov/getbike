var popup=true;
var timeoutID=null;
$(".phone").mask("+7 (999) 999-99-99");
var agent = false;

function nonPhone() {
    window.location.href = "booking.php?stepid=1";
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
//Плавный скролл
$(".scroll").click(function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top - 40;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
});

// Отключаем все формы
$('form').submit(function () {
    return false;
});


$.validator.addMethod("anyDate",
    function (value, element) {
        return value.match(/^(0?[1-9]|[12][0-9]|3[0-1])[/., -](0?[1-9]|1[0-2])[/., -](19|20)?\d{2}$/);
    },
    $.validator.format("Ведите правильную дату!")
);

$.validator.addMethod("digits",
    function (value, element, arg) {
        var digits = value.replace(/D/g, '');
        return digits.match(/[0-9]/g).length == arg;
    },
    $.validator.format("Цифр должно быть {0}")
);

$("#mainForm").validate({
    lang: 'ru',
    rules: {
        phone: {
            required: true,
            digits: 11
        },
        berut: {
            required: true,
            anyDate: true
        },
        vozvrat: {
            required: true,
            anyDate: true,
            //dateGreater: 'berut'

        }
    },
    submitHandler: function (form) {
        $(".validation").hide();
        sendKey(form, true);
    },
    invalidHandler: function (event, validator) {

        var errors = validator.numberOfInvalids();
        cal1Init();
        cal2Init();
        $(".validation").html(validator.errorList[0].message);
        //$(".validation").show();
    }
});


function sendKey(form, popup) {
    //console.log($(form).attr("action"));
    var a=getCookie('kaycom_phone');
    $('#RealButton').text('Запросить код повторно через 30');
    if (timeoutID==null){
        timer();
    }else{
        clearTimeout(timeoutID);
        timer();
    }
    var phone_1=$('input[name=phone]').val();
    var flaag=true//телефон переехал на шаг 3, поэтому при заполнении дат всегда перекидываем на заказ, но если человек заполнил телефон то производим подтверждение телефона
    // if (phone_1==""){
    //     //nonPhone();
    //     guesjsontparser();
    //     $('.load_im').show();
    //     return false;
    //  }
    if (a!=null){
        guesjsontparser();
        return false;
    }else{
        popupForm();
        $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: new FormData(form),
            processData: false,
            contentType: false,
            success: function (data, status) {

                $('.sendPhone').text($("input.phone").val());

            },
            error: function (xhr, desc, err) {
                alert('Что-то пошло не так...');
            }
        });
    }
}
$(".newKey").on("submit", function (event) {
    event.preventDefault();
    obj2=$('.newKey').text();
    if(obj2.length>22){
        return false;
    }else{
        sendKey(this, true);
    }
});


$("#smsverification").on("submit", function (event) {

    event.preventDefault();

    var key = $("input.secretKey").val();
    if (key != 0) {
        var numskey = key.match(/[0-9]/g).length;
        //console.log(numskey);
        if (numskey != 4) {
            $(".errorKey").text("Неверный код, попробуйте еще раз!").css("color", "red");
            // console.log('туточки ошибка');
        } else {
            $('button[name=submit]').attr('id', 'ga_kit_selection');
            $('.errorKey').html('<img src="/img/load.gif"/>');
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.status === 'success') {
                        //$(".errorKey").text("Код верен!").css("color", "green");
                        setCookie("kaycom_phone", $("input.phone").val(), {'expires':3600*24*14} );

                        $('.errorKey').show();
                        guesjsontparser();
                    }
                    else {
                        $(".errorKey").show();
                        //console.log(data);
                        $(".errorKey").text("Неверный код, попробуйте еще раз!").css("color", "red");
                    }
                },
                error: function (xhr, desc, err) {
                    alert('Ошибка');

                }
            });
        }
    } else {
        $(".errorKey").text("Введите код!").css("color", "red");
    }

});
function guesjsontparser() {
    var name = $("input.phone").val();
    var email = $("#mainForm input[name=email]").val();
    var berut = $("#mainForm input[name=berut]").val();
    var vozvrat = $("#mainForm input[name=vozvrat]").val();
    var phone = $("#mainForm input[name=phone]").val();

    $.post("prokladka/universal.php",
        {id:0, name: name, email: email, phone: phone, pickupDate: berut, returnDate: vozvrat},
        function (response) {
            //console.log(response);
            $.post("main-form2.php",
                {id:0, name: name, email: email, phone: phone, pickupDate: berut, returnDate: vozvrat},
                function (response) {
                    window.location.href = "booking.php?stepid=1";
                }
            );
        }
    );
}

function explode( delimiter, string ) {

    var emptyArray = { 0: '' };

    if ( arguments.length != 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }

    if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
    {
        return false;
    }

    if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
    {
        return emptyArray;
    }

    if ( delimiter === true ) {
        delimiter = '1';
    }

    return string.toString().split ( delimiter.toString() );
}


$(document).ready(function () {




    $('.changenumber').click(function(){
        $('input[name=phone]').val('');
    })
    $('#RealButton').click(function(){
        sendKey($('#mainForm'), true);
        sendKey($('#mainForm'), true);
    });
    $(window).resize(function () {
        $('.fullHeight').css('height', $(window).height());
    });
    $(window).resize();

    $(document).on('click', '.scrollDownBtn,.howItWorksBtn', function (e) {
        e.preventDefault();
        $('body,html').animate({scrollTop: $('section.steps').offset().top});
        return false;
    })

    $(document).on('click', 'section.reviews .moreBtn', function (e) {
        e.preventDefault();
        $('section.reviews .wrapper .reviewsWrapper .review').removeClass('hidden');
        $(e.currentTarget).remove();
        return false;
    })

    //запрет скрола карт на мобилках
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [43.68334114408006,40.21405544313047],
            zoom: 17,
            controls: []
        });
        myMap.behaviors.disable('scrollZoom');
        if(isMobile.any()){
            //console.log('работает');
            myMap.behaviors.disable('drag');
        }
        myMap.controls.add(
            new ymaps.control.ZoomControl()
        );

        // Создание метки
        var myPlacemark = new ymaps.Placemark(
            [43.68334114408006,40.21405544313047], {
                hintContent: 'Красная Поляна<br>ул. Защитников Кавказа 65<br>8 800 333 25 33'
            });


        myMap.geoObjects.add(myPlacemark);
    };

});


$('button#submit').click(function () {
    if ($('input[type="text"][value=""]').length) {
        alert("есть input-ы с пустым value!");
        //    $(this).css("border", "1px solid red");
    } else {
        //  $.ajax(...);
    }
});



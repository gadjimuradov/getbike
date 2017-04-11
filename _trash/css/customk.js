
jQuery(function($){
    var ffffllllaaaaggg=true;
    //все зависит от того есть ли кука с телефоном
        a = getCookie('kaycom_phone');
        if (a != null) {
            $('input[name=phone]').hide();
            $('.vozvrat').css({'border-radius': '0 5px 5px 0'});
            $('.out_coo').show();
            $('input[name=phone]').val(a);
            $('.cbform-item').find('input[name=phone]').css({'display': 'block'});
        } else {
            $('.out_coo').hide();
            $('#gfysdjd121').show();
        }
    if ($('.out_coo').is(':visible')){
        $('#gfysdjd121').hide();
    }else{
        $('#gfysdjd121').show();
    }
    $('.callback-form').find('input[name=phone]').focus(function () {
        $('.callback-form').find('input[name=phone]').css({'border':'1px solid #DFDFDF'});
        ffffllllaaaaggg=true;
    });
    $('.callback-form').find('input[name=name]').focus(function () {
        $('.callback-form').find('input[name=name]').css({'border':'1px solid #DFDFDF'});
        ffffllllaaaaggg=true;
    });
    $('#cbsubmit').click(function () {

        var namecb = $('.callback-form').find('input[name=name]').val();
        var phonecb = $('.callback-form').find('input[name=phone]').val();
        if (namecb.length<1){
            //alert('Заполните имя');
            $('.callback-form').find('input[name=name]').css({'border':'1px solid red'})
            ffffllllaaaaggg=false;
        }
        if (phonecb.length<11){
            //alert('Заполните телефон');
            $('.callback-form').find('input[name=phone]').css({'border':'1px solid red'})
            ffffllllaaaaggg = false;
        }
        if(ffffllllaaaaggg) {
            callbackajax();
        }
    });
    $('.out_coo').click(function(){
        $('input[name=phone]').show();
        $('#gfysdjd121').show();
        deleteCookie('kaycom_phone');
        deleteCookie('cart');
        $('.vozvrat').css({'border-radius':'0'});
        $('.phone').css({'border-radius':'0 5px 5px 0'});
        $('.out_coo').hide();
        location.href = '/';
        return false;
    })
    $(".changenumber").click(function(){
        $('.close').click();
    })
    //$("#sms_code").mask("9999");
    var i=1;

    //обработчик формы
    $('input.form-control').keyup(function(e){
        var col="";
        var znch=$("input:focus").val();
        i=$("input:focus").attr('data-step-id');
        console.log(znch);
        if (znch.length>1){
            $("input:focus").val(znch.substring(0, 1));
        }
        //console.log($(e).val());
        var kk=e.keyCode;
        if (kk=='8'){
            if (i>1){
                i--;
                $('input#test' + i + '').focus();
            }
        }else {
            if (znch.length != 0){
                i++;
            }
        }

        $('input#test' + i + '').focus();



        $('input.form-control').each(function(){

            col=String(col + $(this).val());
        });
        if (col.length==4){
            $('input.secretKey').val(col);
            $('form#smsverification').submit();
        }
    });
});



function popupForm(){

    //$('body').addClass('showPopup');
    //$('.setKey').addClass('show');
    $('a#sk').click();
    //$('.setKey').addClass('show');
    //timer();
    setTimeout(function () {
        $('.sendPhone').text($("input.phone").val());
        $('#test1').tap().click().focus();
    },200)

    //$('input[name=secretKey]').focus();
    return false;
}

function timer(){

    var obj=document.getElementById('RealButton');
    //obj=$('.newKey').text();
    var regexp = /(\d+)/i;
    var RealTimer = regexp.exec(obj.innerHTML)[0];

    RealTimer=RealTimer - 1;
    if (RealTimer<0) RealTimer=0;

    obj.innerHTML = 'Запросить код повторно через  '+RealTimer+' ';

    if (RealTimer==0) {
        //location.replace("http://realadmin.ru/coding/button-timer-js.html");
        //$('.newKey').css({'border-color':'#4db375'});
        //$('.newKey').css({'background-color':'#4db375'});
        obj.innerHTML = 'Запросить код повторно';
        return true;
    }
    else { timeoutID = setTimeout(timer,1000); }
}  


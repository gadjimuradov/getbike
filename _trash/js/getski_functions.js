var check_item = false;
var timeoutID=null;
function minp (e) {
    if ($(window).width() > 719) {
        check_item = e.find('.sizeSelect').is(':checked');
        if (check_item) {
            e.find('.block_size_shlem').show();
        } else {
            e.find('.block_size_shlem').hide();
        }
    }
}
function mout(e) {
    if ($(window).width() > 719) {
        check_item = e.find('.sizeSelect').is(':checked');
        if (check_item) {
            e.find('.block_size_shlem').hide();
        }
    }
}

function setShow(e) {
    //console.log(e);
    check_item=e.find('.sizeSelect').is(':checked');
    if (check_item){
        e.find('.block_size_shlem').show();
    }else{
        e.find('.block_size_shlem').hide();
    }
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
function datacalc() {
    var berut = moment($("input[name=berut]").val(), 'DD.MM.YYYY');
    var vozvrat = moment($("input[name=vozvrat]").val(), 'DD.MM.YYYY');
    // Сколько целых дней между датами
    if (!vozvrat.isValid()) {
        return;
    }
    var Days = vozvrat.diff(berut, 'days');
    Days = Days ? Days : 1;
    $(".xday").text(Days);
    $(".kovodney").text(Days);
    if (berut == "" || vozvrat == "") {
        $(".kovodney").parent().css("display", "none");
    } else {
        $(".kovodney").parent().css("display", "block");
    }
    var kolvodney = $(".kovodney").text();
    if (kolvodney === '1'){
        $('input#delivery1').click();
        $('input#delivery1').prop('checked', true);
        $('.addressDelivery').removeClass('validate');
        $('.deliveryTypeItem').removeClass('hidden');
        $('.addressDelivery').addClass('hidden');
        $('#delivery0').prop('disabled', true);
        $('#delivery0').parent('div').find('label').addClass('lock_deliv');
        $('#delivery0').parent('div').find('label').find('img:first').attr('src', 'img/deliverynn.png');
        $(".mesto").text("Получение инвентаря в пункте проката");
    }else{
        $('#delivery0').prop('disabled', false);
        $('#delivery0').parent('div').find('label').removeClass('lock_deliv');
        $('#delivery0').parent('div').find('label').find('img:first').attr('src', 'img/delivery0.png');
    }
    if (kolvodney >= 4) {
        if (!$(".sale-box .text").hasClass("sale-2")) {
            var hint0 = "<div class='text sale-2'>\
                  <span class='value'>5 %</span>\
                  Скидка за оформление более чем на 4 дня \
                  </div>";

            $('.sale-box').append(hint0);
        }
    } else {
        $(".sale-box").find('.sale-2').remove();
    }

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

function showDopText(){
    a=$('.itemType:checked').val();
    b=$('.quality:checked').val();
    $('.dop_tex_cat').hide();
    if (a=='Горные лыжи'){
        if (b=='Стандарт'){
            $('.l_st_text').show();
        }else if(b=='PRO'){
            $('.l_pro_text').show();
        }else{
            $('.l_ex_text').show();
        }
    }else{
        if (b=='Стандарт'){
            $('.s_st_text').show();
        }else if(b=='PRO'){
            $('.s_pro_text').show();
        }else{
            $('.s_ex_text').show();
        }
    }
}



function itogo(text) {
    //cartInCoockie();
    var stepIdStep = $_GET('stepid');
    if (stepIdStep === '3'){
        return false;
    }
    countOrder(text);
    //setTimeout(  , 2000);
    priseInRigthInfoBlock();
    return false;
    //расчет цены уехал в бек
    // var price_1 = 0;
    // $('.price-value').each(function (i, elem) {
    //     var prom_val=Number($(this).text());
    //     //price_1 += +$(this).text();
    //     price_1=price_1+prom_val;
    // });
    //
    // var kolvodney = Number($(".kovodney").text());
    // var delivery0 = $("input[name=delivery]:checked").val();
    // var kolvokomplektov = $('.complect').length - 1;
    // var promo=$('.sale-4');
    //
    // var sale = $('.s-dopsale').is(':visible') ? 5 : 0;
    //
    // if (kolvodney >= 4) {
    //     sale += 5;
    // }
    // if (delivery0 == "Заберет сам") {
    //     sale += 5;
    // }
    // if (kolvokomplektov > 2) {
    //     sale += 5;
    // }
    //
    // total = price_1 * kolvodney;
    // var flag_skidka=false;
    // if($('.sale-4').length>0) {
    //     var skidon = Number($('.sale-4').find('.value').attr('data-val'));
    //     if ($('.nonpersent').length>0) {
    //         flag_skidka=true;
    //     }
    // }
    // totalDiscount = total * ((100 - sale) / 100);
    // if($('.sale-4').length>0) {
    //     if (flag_skidka) {//Если скидка в рублях а не в процентах то ее вычитаем в самом конце
    //         totalDiscount = totalDiscount - skidon;
    //         $('.sale-box').find('.sale-4').find('.value').attr('data-it', skidon);
    //     } else {
    //         var yuqwqw2 = totalDiscount;
    //         totalDiscount = totalDiscount * ((100 - skidon) / 100);
    //         $('.sale-box').find('.sale-4').find('.value').attr('data-it', yuqwqw2 - totalDiscount);
    //     }
    // }
    // totalDiscount = Math.round(totalDiscount);
    // if (kolvodney > 1) {
    //     totalDiscount = (totalDiscount.toString()).slice(0, -1) + '0';
    //     total = (total.toString()).slice(0, -1) + '0';
    // }
    // var discount = total - totalDiscount;
    // var discountContainer = $('.sidebar .discount');
    // discountContainer.find('.value').text(discount + ' р.');
    // if(discount){
    //     discountContainer.css('display','block');
    // }
    // else{
    //     discountContainer.hide();
    // }
    // $("input[name=itogo],input[name=sum]").val(totalDiscount);
    // $("input[name=itogo]").val(total);
    // $(".summa").text(total);
    //
    // $(".summa.dopsale").text(totalDiscount);
    // $(".itogo-show").text(totalDiscount);
    //

}

function razmerSelect(e) {
    var tezxt =e.attr("for");
    var dop_text="";
    var instr = e.parents('.inputWrapper').find('input').attr('data-class');
    var data_id = e.parents('.complect').attr('data-workclass');
    var text_change = e.parents('.inputWrapper').find('.sizeSelect').val();

    if (instr === 'coach'){
        e.parents('block_size_shlem').find('input').each(function(){
            $(this).prop('checked', false);
        });
        var kolvo = $('input[id='+tezxt+']').val();
        $('input[id='+tezxt+']').prop('checked', true);
        //console.log(kolvo);
        if (kolvo === '1') {
            dop_text = 'час';
        }else{
            dop_text = 'часа';
        }
        var prise = $('input[data-class=coach]').attr('data-price');
        prise = Number(prise);
        kolvo = Number(kolvo);
        $('.komplekt-box[data-workclass='+data_id+']').find('.coach').find('.price-value').text(prise * kolvo);
        //console.log('дополнительный подсчет цены');
        //console.log('дпц ' + $('input[id='+tezxt+']').val());
        itogo('rs');
    }
    tezxt = $("#"+tezxt).val();
    e.parent('.block_size_shlem').css({'border':'1px solid #EBEBEB;'});
    $('.komplekt-box[data-workclass='+data_id+']').find('.serviceText:contains("'+text_change+'")').text(text_change+' '+tezxt+' '+dop_text);


    //console.log(instr);
    //console.log(e);
    return false;
}

function parseQueryString (strQuery) {
    var strSearch   = strQuery.substr(1),
        strPattern  = /([^=]+)=([^&]+)&?/ig,
        arrMatch    = strPattern.exec(strSearch),
        objRes      = {};
    while (arrMatch != null) {
        objRes[arrMatch[1]] = arrMatch[2];
        arrMatch = strPattern.exec(strSearch);
    }
    return objRes;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function priseChange() {
    //получаем цены из сервиса и расставляем на сайте
    $.post("/prokladka/universal.php",
        {
            id: 5
        },
        function (data, status) {
            //console.log(data);
            data = JSON.parse(data);
            //ну мужики, ну ёптыть, ну что константы в коде делают?
            //добавьте стоимость соответствующих ботинок из справочника
            //Щербина
            $('input[value="Стандарт"]').attr('data-price', data['items']['ski-standart']['price'] + data['items']['boots-ski']['price']);
            $('input[value="PRO"]').attr('data-price', data['items']['ski-pro']['price'] + data['items']['boots-ski']['price']);
            $('input[value="Экстрим"]').attr('data-price', data['items']['ski-extreme']['price'] + data['items']['boots-ski']['price']);
            $('.mainInfo').find('.price0').text(data['items']['ski-standart']['price'] + data['items']['boots-ski']['price']);
            kidsComplects = data['items']['ski-kids']['price'];
            stdCompleplect =  data['items']['ski-standart']['price'];
            $('input[data-class="shlem"]').attr('data-price', data['items']['helmet']['price']);
            $('input[data-class="maska"]').attr('data-price', data['items']['mask']['price']);
            $('input[data-class="zashita-verh"]').attr('data-price', data['items']['protectionChest']['price']);
            $('input[data-class="zashita-niz"]').attr('data-price', data['items']['protectionBack']['price']);
            $('input[data-class="racii"]').attr('data-price', data['items']['radio']['price']);
            $('input[data-class="gopro"]').attr('data-price', data['items']['gopro']['price']);
            $('input[data-class="rukzak"]').attr('data-price', data['items']['backpack']['price']);
            $('input[data-class="datchik"]').attr('data-price', data['items']['avalancheSensor']['price']);
            $('input[data-class="shup"]').attr('data-price', data['items']['avalancheStick']['price']);
            $('input[data-class="vip"]').attr('data-price', data['items']['vip']['price']);
            $('input[data-class="jacket"]').attr('data-price', data['items']['jacket']['price']);
            $('input[data-class="pants"]').attr('data-price', data['items']['pants']['price']);
            $('input[data-class="gloves"]').attr('data-price', data['items']['gloves']['price']);
            $('input[data-class="coach"]').attr('data-price', data['items']['coach']['price']);
            $('input[data-class="strahovka"]').attr('data-price', data['items']['insurance']['price']);
        });
}



var CHARS = '0123456789abcdef'.split('');
var FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
function uuid(argument) {
    var c = CHARS, id = FORMAT, r;

    id[0] = c[(r = Math.random() * 0x100000000) & 0xf];
    id[1] = c[(r >>>= 4) & 0xf];
    id[2] = c[(r >>>= 4) & 0xf];
    id[3] = c[(r >>>= 4) & 0xf];
    id[4] = c[(r >>>= 4) & 0xf];
    id[5] = c[(r >>>= 4) & 0xf];
    id[6] = c[(r >>>= 4) & 0xf];
    id[7] = c[(r >>>= 4) & 0xf];

    id[9] = c[(r = Math.random() * 0x100000000) & 0xf];
    id[10] = c[(r >>>= 4) & 0xf];
    id[11] = c[(r >>>= 4) & 0xf];
    id[12] = c[(r >>>= 4) & 0xf];
    id[15] = c[(r >>>= 4) & 0xf];
    id[16] = c[(r >>>= 4) & 0xf];
    id[17] = c[(r >>>= 4) & 0xf];

    id[19] = c[(r = Math.random() * 0x100000000) & 0x3 | 0x8];
    id[20] = c[(r >>>= 4) & 0xf];
    id[21] = c[(r >>>= 4) & 0xf];
    id[22] = c[(r >>>= 4) & 0xf];
    id[24] = c[(r >>>= 4) & 0xf];
    id[25] = c[(r >>>= 4) & 0xf];
    id[26] = c[(r >>>= 4) & 0xf];
    id[27] = c[(r >>>= 4) & 0xf];

    id[28] = c[(r = Math.random() * 0x100000000) & 0xf];
    id[29] = c[(r >>>= 4) & 0xf];
    id[30] = c[(r >>>= 4) & 0xf];
    id[31] = c[(r >>>= 4) & 0xf];
    id[32] = c[(r >>>= 4) & 0xf];
    id[33] = c[(r >>>= 4) & 0xf];
    id[34] = c[(r >>>= 4) & 0xf];
    id[35] = c[(r >>>= 4) & 0xf];

    return id.join('');
}


function complectSet(price) {
    if (price === undefined) {
        price = false;
    }
    var new_complects={}
    $('.complect').each(function (index) {
        new_complects[index] = {};
        var new_items_glob = {};
        var services = {};
        var new_items = {};
        var i = 0;
        var sur = $(this).serialize();
        new_complects[index]["setID"] = uuid();
        if (price){
            new_complects[index]["name"] = 1;
            new_complects[index]["gender"] = 'man';
            new_complects[index]["height"] = 1;
            new_complects[index]["weight"] = 1;
            new_complects[index]["size"] = 1;
        }else{
            new_complects[index]["name"] = $(this).find("input[name^='userName[']").val();
            new_complects[index]["gender"] = $(this).find("select[name^='pol[']").val();
            new_complects[index]["height"] = $(this).find("input[name^='rost[']").val();
            new_complects[index]["weight"] = $(this).find("input[name^='ves[']").val();
            new_complects[index]["size"] = $(this).find("select[name^='razmer[']").val();
        }

        new_complects[index]["items"]={};
        this_complect = $(this);
        new_complects[index]["items"][i] = {};
        if ($(this).find("select[name^='pol[']").val()==="boy"||$(this).find("select[name^='pol[']").val()==="girl"){
            new_complects[index]["items"][i]["itemName"] = $(this).find("input[name^='itemType']:checked").attr("data-type")+'-kids';
        }else if ($(this).find("input[name^='itemType']:checked").attr("data-type") === 'ski'){
            new_complects[index]["items"][i]["itemName"] = $(this).find("input[name^='quality[']:checked").attr("data-itemski");
        }else{
            new_complects[index]["items"][i]["itemName"] = $(this).find("input[name^='quality[']:checked").attr("data-itemboard");
        }
        new_complects[index]["items"][i]["itemCount"] = '1';
        i=i+1;
        $(this).find("input.service:checked").each(function () {
            new_complects[index]["items"][i]={};
            if ($(this).attr("data-class") == "boti") {
                if (this_complect.find("input.itemType:checked").attr("data-type") == "ski" && this_complect.find("select[name^='pol[']").val() != "boy" && this_complect.find("select[name^='pol[']").val() != "girl") {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-itemSki");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    i=i+1;
                } else if (this_complect.find("input.itemType:checked").attr("data-type") == "board" && this_complect.find("select[name^='pol[']").val() != "boy" && this_complect.find("select[name^='pol[']").val() != "girl") {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-itemBoard");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    i=i+1;
                } else if (this_complect.find("input.itemType:checked").attr("data-type") == "ski" && this_complect.find("select[name^='pol[']").val() != "men" && this_complect.find("select[name^='pol[']").val() != "female") {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-itemSkiChild");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    i=i+1;
                } else if (this_complect.find("input.itemType:checked").attr("data-type") == "board" && this_complect.find("select[name^='pol[']").val() != "men" && this_complect.find("select[name^='pol[']").val() != "female") {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-itemBoardChild");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    i=i+1;
                }else{

                }
            } else if ($(this).attr("data-item") == "helmet") { //шлем
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            } else if ($(this).attr("data-item") == "protectionChest") { //защита верх
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            } else if ($(this).attr("data-item") == "jacket") { //куртка
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            }else if ($(this).attr("data-item") == "gloves") { //штаны
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            }else if ($(this).attr("data-item") == "pants") { //перчатки
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            } else if ($(this).attr("data-item") == "coach") { //инсруктор
                //console.log($(this).parent().find('.block_size_shlem').children('input:checked').val());
                var coach_time = $(this).parents('.inputWrapper ').find('.block_size_shlem').find('input:checked').val();
                console.log(coach_time);
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    if(coach_time=== undefined){
                        new_complects[index]["items"][i]["itemCount"] = '1';
                        new_complects[index]["items"][i]["itemSize"] = '1';
                    }else {
                        new_complects[index]["items"][i]["itemSize"] = coach_time;
                        new_complects[index]["items"][i]["itemCount"] = coach_time;
                    }
                    //new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    if(coach_time=== undefined){
                        new_complects[index]["items"][i]["itemCount"] = '1';
                        new_complects[index]["items"][i]["itemSize"] = '1';
                    }else {
                        new_complects[index]["items"][i]["itemSize"] = coach_time;
                        new_complects[index]["items"][i]["itemCount"] = coach_time;
                    }
                    new_complects[index]["items"][i]["noSkid"]='1';
                    new_complects[index]["items"][i]["noDay"]='1';
                    //new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            } else if ($(this).attr("data-item") == "protectionBack") { //защита низ
                if (price) {
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = 'L';
                    i = i + 1;
                }else{
                    new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                    new_complects[index]["items"][i]["itemCount"] = '1';
                    new_complects[index]["items"][i]["itemSize"] = $(this).parent().find('.block_size_shlem').children('input:checked').val();
                    i = i + 1;
                }
            }else{
                new_complects[index]["items"][i]["itemName"] = $(this).attr("data-item");
                new_complects[index]["items"][i]["itemCount"] = '1';
                i=i+1;
            }
        });
    });
    return new_complects;
}

function promoSet() {
    var promoc=$('input[name=promoCod]').val();
    var promoppr=$('.sale-box').find('.sale-4').find('.value').attr('data-per');
    if (promoppr==0){
        promoppr="absolute";
    }else{
        promoppr="percent";
    }
    var promoit=$('.sale-box').find('.sale-4').find('.value').attr('data-it');
    var promo = {};
    promo['code'] = promoc;
    promo['type'] = promoppr;
    promo['amount'] = promoit;
    //start: added by Scherbina 31.12.2017
//   console.log('promo inside');
//    console.log(promo);
    return promo;
    //end: added by Scherbina 31.12.2017
}

function checkPhone() {
    var phoneNum = $('input[name=phone_num]').val();
    if (phoneNum.length>0){
        checkPhoneNumber(phoneNum);
        return false;
    }else{
        $('.inpWrap').append('<span>Введите номер телефона</span>');
        return false;
    }
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
        obj.innerHTML = 'Запросить код повторно';
        return true;
    }
    else { timeoutID = setTimeout(timer,1000); }
}

function checkPhoneNumber(phoneNum) {
    $('#RealButton').text('Запросить код повторно через 30');
    if (timeoutID==null){
        timer();
    }else{
        clearTimeout(timeoutID);
        timer();
    }
    $.post("verification/smsverification.php",
        {
            phone: phoneNum,
        },
        function (data, status) {
            popupForm();
        });
}

// function popupForm(){
//
//     $('a[data-toggle=modal]').click();
//     setTimeout(function () {
//         $('.sendPhone').text($("input.phone").val());
//         $('#test1').tap().click().focus();
//     },200)
//
//     //$('input[name=secretKey]').focus();
//     return false;
// }
//проверка телефона и майла на последнем шаге
function checkAll(e) {
    if (e.hasClass('s-dopsale')){
        var itogo_price = Number($('.summa').text());
        $("input[name=itogo],input[name=sum]").val(itogo_price);
        $("input[name=itogo]").val(itogo_price);
    }else{
        $("input[name=itogo],input[name=sum]").val(500);
        $("input[name=itogo]").val(500);
    }
    var phoneInCockie = getCookie('kaycom_phone');
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if(pattern.test($('input[name=email]').val())){
        $('input[name=email]').css({'border' : '1px solid #569b44'});
        //$('#valid').text('Верно');
    } else {
        $('input[name=email]').css({'border' : '1px solid #ff0000'});
        $('#valid').text('e-mail не корректен');
        return false;
    }
    if($('#agent').val() === '1') {
        allGood(false, e);
        return false;
    }
    if (!phoneInCockie){
        var phoneNumber = $('input[name=phone_num]').val();
        if (phoneNumber.length < 1) {
            $('#valid').text('Введите номер телефона');
            $('input[name=phone_num]').css({'border' : '1px solid #ff0000'});
        }else{
            $('input[name=phone_num]').css({'border' : '1px solid #569b44'});
            if (agent){
                allGood(false, e);
            }else {
                checkPhoneNumber(phoneNumber);
                return false;
            }

        }
    }else{
        allGood(true, e);
    }
}

function allGood(way, e) {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if(pattern.test($('input[name=email]').val())){
        //$('input[name=email]').css({'border' : '1px solid #569b44'});
        //$('#valid').text('Верно');
    } else {
        $('input[name=email]').css({'border' : '1px solid #ff0000'});
        $('#valid').text('e-mail не корректен');
        return false;
    }

    if($('#agent').val() === '1'){
        var promo=promoSet();
        var new_complects = complectSet();
        $.ajax({
            url: '/prokladka/universal.php',
            type: 'post',
            data: {
                id: 4,
                async: false,
                pickupDate: $("input[name=berut]").val(),
                returnDate: $("input[name=vozvrat]").val(),
                deliveryWindowTime: $("input[name=time]").val(),
                selfDelivery: $("input[name=delivery]:checked").attr('data-boolean'),
                address: $.trim($("input[name=hotel]").val()),
                name:$('[data-workclass=1]').find('.userName').text(),
                phone:$('input[name=phone_num]').val(),
                email:$('input[name=email]').val(),
                sets: new_complects,
                promocode: promo
            },
            dataType: "json",
            success: function (data) {
                parent.postMessage(data.leadId,'*');
                console.log(data);
                console.log(data.leadId);
                //$('input[name=customerNumber]').val(data['leadId']);
                $('.close').click();
                return false;

            },
            error: function (data) {
                errorAjax();
            }
        });
    }

    if (way) {
        $.ajax({
            url: '/prokladka/universal.php',
            type: 'post',
            data: {
                id: 3,
                async: false,
                phone: getCookie('kaycom_phone'),
                email: $('input[name=email]').val(),
                name: $('.complect[data-workclass="1"]').find('.name').val()
            },
            dataType: "json",
            success: function (data) {
                if (data['result']!='success'){
                    errorAjax();
                }else {
                    $('form#kassa').submit();
                }
            },
            error: function (data) {
                // console.log(data);
            }
        });
    }else{
        //popupForm();
        var promo=promoSet();
        var new_complects = complectSet();
        $.ajax({
            url: '/prokladka/universal.php',
            type: 'post',
            data: {
                id: 4,
                async: false,
                pickupDate: $("input[name=berut]").val(),
                returnDate: $("input[name=vozvrat]").val(),
                deliveryWindowTime: $("input[name=time]").val(),
                selfDelivery: $("input[name=delivery]:checked").attr('data-boolean'),
                address: $.trim($("input[name=hotel]").val()),
                name:$('[data-workclass=1]').find('.userName').text(),
                phone:$('input[name=phone_num]').val(),
                email:$('input[name=email]').val(),
                sets: new_complects,
                promocode: promo
            },
            dataType: "json",
            success: function (data) {
                //console.log(agent);
                if (agent){
                    parent.postMessage(data.leadId,'*');
                    console.log(data);
                    console.log(data.leadId);
                    //$('input[name=customerNumber]').val(data['leadId']);
                    $('.close').click();
                }else {
                    if (data['result'] != 'success') {
                        errorAjax();
                    } else {
                        $('input[name=customerNumber]').val(data.leadId);
                        $('form#kassa').submit();
                    }
                }
            },
            error: function (data) {
                errorAjax();
            }
        });
    }
    $('.close').click();
}


function leadUpdate() {
    $.ajax({
        url: '/prokladka/universal.php',
        type: 'post',
        data: {
            id: 1,
            leadId: $("#leadID").val(),
            pickupDate: $("input[name=berut]").val(),
            returnDate: $("input[name=vozvrat]").val(),
            deliveryWindowTime: $("input[name=time]").val(),
            selfDelivery: $("input[name=delivery]:checked").attr('data-boolean'),
            address: $.trim($("input[name=hotel]").val()),
            //sets: complects
        },
        dataType: "json",
        success: function (data) {
            if (data['result']!='success'){
                errorAjax();
            }
        },
        error: function (data) {
            errorAjax();
        }
    });
}

function callbackajax() {
    $('.cbform-item').find('img').show();
    $('.cbform-item').find('input[type=submit]').hide();

    $.ajax({
        url: '/prokladka/universal.php',
        type: 'post',
        data: {
            id: 10,
            name:$('.callback-form').find('input[name=name]').val(),
            phone:$('.callback-form').find('input[name=phone]').val()
            //sets: complects
        },
        dataType: "json",
        success: function (data) {
            if (data['result']!='success'){
                errorAjax();
            }else{

                $('#modal-callback').modal('hide');
                $('.cbform-item').find('img').hide();
                $('.cbform-item').find('input[type=submit]').show();
                $('#modal-thanks').modal('show');
            }
        },
        error: function (data) {
            errorAjax();
        }
    });
}
//сообщение об ошибке если веб сервис вернул error или не вернул ничего
function errorAjax() {
    showModalError();
    //alert('Технический сбой. Попробуйте еще раз или звоните по тел 8 800 333 25 33');
}
//замена функции itogo, теперь все расчеты цены ведутся на стороне веб сервиса
function countOrder(text) {
    // if(text === undefined){
    //     console.log('стандарт');
    // }else{
    //     console.log(text);
    // }
    var new_complects = complectSet(true);
    var promo=promoSet();
    //console.log('вызов фунции count');
    //console.log(promo);
    //cartInCoockie();
    $.ajax({
        url: '/prokladka/universal.php',
        type: 'post',
        //async: false,//отключено. ибо тормоза не нравились клиенту
        data: {
            id: 6,
            pickupDate: $("input[name=berut]").val(),
            returnDate: $("input[name=vozvrat]").val(),
            selfDelivery: $("input[name=delivery]:checked").attr('data-boolean'),
            sets: new_complects,
            promocode: promo
        },
        dataType: "json",
        success: function (data) {
            if (data){
                setPrise(data);
                //countOrder();
                if (data['result']){
                    if (data['result']!='success'){
                        errorAjax();
                        //console.log(data);
                    }
                }
            }
        },
        error: function (data) {
            errorAjax();
        }
    });
}

function showModalError() {
    $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
        function(){ // пoсле выпoлнения предъидущей aнимaции
            $('#modal_form')
                .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
        });
}

function hideModalError() {
    $('#modal_form')
        .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
            function(){ // пoсле aнимaции
                $(this).css('display', 'none'); // делaем ему display: none;
                $('#overlay').fadeOut(400); // скрывaем пoдлoжку
            }
        );
}
function showModalError2() {
    $('#overlay').show();
    $('#modal_form2').css('display', 'block');
    // $('#overlay').fadeIn(0, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
    //     function(){ // пoсле выпoлнения предъидущей aнимaции
    //         $('#modal_form2')
    //             .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
    //             .animate({opacity: 1, top: '50%'}, 0); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
    //     });
}

function hideModalError2() {
    $('#modal_form2')
        .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
            function(){ // пoсле aнимaции
                $(this).css('display', 'none'); // делaем ему display: none;
                $('#overlay').fadeOut(400); // скрывaем пoдлoжку
            }
        );
}

function showModalError3() {
    $('#overlay').show();
    //$('#modal_form3').css('display', 'block');
    $('#overlay').fadeIn(0, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
        function(){ // пoсле выпoлнения предъидущей aнимaции
            $('#modal_form3')
                .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                .animate({opacity: 1, top: '50%'}, 0); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
        });
}

function hideModalError3() {
    $('#modal_form3')
        .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
            function(){ // пoсле aнимaции
                $(this).css('display', 'none'); // делaем ему display: none;
                $('#overlay').fadeOut(400); // скрывaем пoдлoжку
            }
        );
}

function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}

function setPrise(data) {
    //console.log(data);
    $(".sale-box").find('.sale-4').remove(); //added by Scherbina
    $(".sale-box").find('.sale-2').remove();
    $(".sale-box").find('.sale-1').remove();
    $(".sale-box").find('.sale-3').remove();
    $.each(data.discountPositions, function (i,j) {
        if (j=='longTerm'){
            var hint0 = "<div class='text sale-2'>\
                  <span class='value'>5 %</span>\
                  Скидка за оформление более чем на 4 дня \
                  </div>";

            $('.sale-box').append(hint0);
        }
        if (j=='selfDelivery'){
            var hint = "<div class='text sale-1'>\
              <span class='value'>5 %</span>\
              Скидка за получение и сдачу инвентаря в пункте проката\
              </div>";

            $('.sale-box').append(hint);
        }
        if(j=='doubleSets'){
            var hint0 = "<div class='text sale-3'>\
        <span class='value'>5 %</span>\
        Скидка за аренду более двух комплектов \
        </div>";

            $('.sale-box').append(hint0);
        }
//start: added by Scherbina
        if(j=='promocode'){
            $(".sale-4").remove()
            var hint0 = "<div class='text sale-4'>\
        <span class='value' data-val='" + data.discountPromocodeValue + "'>" + data.discountPromocodeValue + " р.</span>\
        Скидка за промокод \
        </div>";

            $('.sale-box').append(hint0);
        }
//end: added by Scherbina
    });
    totalDiscount = data.price;
    //total =
    $('.discount').find('.value').text(data.discountValue)
    $('.itogo-show').text(data.price);
    $('.dopsale').text(data.price);

}

function setTimeDelivery() {
    var otvet = false;
    $.ajax({
        url: '/prokladka/universal.php',
        type: 'post',
        async: false,
        data: {
            id: 7,
            pickupDate: $("input[name=berut]").val()
        },
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if (data) {
                if (data.length > 0) {
                    var count = 0;
                    var timess = '';
                    while (count < data.length) {
                        if (data.length - count > 1) {
                            timess = timess + '<div class="row">\
                                        <a href="#">' + data[count] + '</a>\
                                        <a href="#">' + data[count + 1] + '</a>\
                                    </div>';
                            count = count + 2;
                        } else {
                            timess = timess + '<div class="row">\
                                                <a href="#">' + data[count] + '</a>\
                                                <a href="#" style="visibility: collapse;">00:00-00:00</a>\
                                             </div>';
                            count = count + 1;
                        }
                    }
                    otvet = '<div class="outer">\
                                <div class="inner">\
                                    <div class="title">\
                                        Доступное время доставки заказа\
                                    </div>\
                                    <div class="rows">' + timess + '</div>\
                                    <a href="#" class="closeBtn">×</a>\
                                </div>\
                            </div>';
                } else {
                    otvet = '<div class="outer">\
                                <div class="inner">\
                                    <div class="title">\
                                        К сожалению в этот день все курьеры заняты. Вы можете приехать к нам сами. За это мы дадим вам дополнительную скидку 5% на весь заказ. Ваш GetSki.me\
                                    </div>\
                                    <a href="#" class="closeBtn">×</a>\
                                </div>\
                            </div>';
                }
            }

        },
        error: function (data) {
            errorAjax();
        }
    });
    return otvet;
}

//хранение заказа в куках
//при зоходе на сайт кука должна браться и забиваться в заказ.
function cartInCoockie() {
    if (agent){
        // console.log('Агент. Записывать корзину ненадо');
        return false;
    }
    //console.log('записываю карзину в куки...');
    var datad = $("#form-steps").serialize();
    setCookie('cart', datad, {'expires':3600*24*14});
}

function count( mixed_var, mode ) {	// Count elements in an array, or properties in an object
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	  input by: _argos

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += count(mixed_var[key], 1);
        }
    }

    return cnt;
}


function lastPrice() {
    // когда человек переходит на последний шаг нужно отнимать 5% от цены(скидка за оплату на сайте)
    var prise = $('.itogo-show').text();
    //костль, за инструктора не должно быть скидок
    var coachsum = 0;
    $('.komplekt-box').each(function(){
        coachsum  = coachsum + Number($(this).find('coach').find('price-value').text());
    })
    prise = Number(prise);
    prise = prise - coachsum;
    prise = Math.round(prise * 0.95);
    prise = prise + coachsum;
    $('.itogo-show').text(prise);
    $('.dopsale').text(prise);
}

function checkNameCockie(str) {
    var tmp = str.indexOf('[') + 1;
    if (tmp){
        var i = tmp;
        i=i+1;
        while(str[i] != ']'){
            i=i+1;
        }
        return Number(str.substring(tmp, i));
    }else{
        return 1;
    }
}

function dopMove(str, val) {
    switch (str) {
        case 'time':
            //val=val.replace(/"/g,"");
            val = '"'+val+'"';
            $('a.setTimeInput').text(val);
            break;
        case 'delivery':
            $('.deliveryType ').click();
            if (val == 'Заберет сам'){
                $('.addressDelivery').removeClass('validate');
                $('.deliveryTypeItem').removeClass('hidden');
                $('.addressDelivery').addClass('hidden');
            }else{
                $('.addressDelivery').removeClass('hidden');
                $('.addressDelivery').addClass('validate');
            }
            if ($('#delivery1').is(':checked')){
                $(".mesto").text("Получение инвентаря в пункте проката");
            }
            break;
        default:
        //$('input[name="' + tmp[0] + '"]').val(tmp[1]);
    }
}

function razmerSelectAfterCart() {
    $('.block_size_shlem').each(function(){
        var check = $(this).find('.razmer:checked');
        if (check[0]){
            var tezxt = check.val();
            var data_id = $(this).parents('.complect').attr('data-workclass');
            var text_change = $(this).parents('.inputWrapper').find('input').val();
            $('.komplekt-box[data-workclass='+data_id+']').find('.serviceText:contains("'+text_change+'")').text(text_change+' '+tezxt );
        }
    });
}

function cartFromCoclie2(first) {
    if (first === undefined) {
        first = false;
    }
    if (agent){
        //console.log('Агент, восстанавливать ненадо');
        return false;
    }
    //console.log('восстанавливаю корзину из кук');
    var pechenka = decodeURIComponent(getCookie('cart'));
   // console.log(pechenka);
    if(pechenka) {

        var arCockie = explode("&", pechenka);
        //console.log(arCockie);
        var needDopConpl = true;
        var numDopComp = 1;
        var tmp;
        var chkClick = 1;

        for (var key in arCockie) {
            tmp = explode("=", arCockie[key]);
            if (tmp[1]) {
                numDopComp = checkNameCockie(tmp[0]);
                //console.log(numDopComp);
                if (numDopComp > chkClick) {
                    //console.log('новый комплект');
                    $('.addComplect').click();
                    chkClick = numDopComp;
                }
                tmp[1] = tmp[1].replace(/\+/g, " ");
                //console.log(tmp);
                if ($('input[name="' + tmp[0] + '"]').attr('type')) {
                    switch ($('input[name="' + tmp[0] + '"]').attr('type')) {
                        case 'hidden':
                            tmp[1]=tmp[1].replace(/"/g,"");
                            $('input[name="' + tmp[0] + '"]').attr('value', '"' + tmp[1] + '"');
                            dopMove(tmp[0], tmp[1]);
                            break;
                        case 'text':
                            if (tmp[0] === 'phone' && first){
                                // а ничо делать не надо. телефон на главной должен подставлыться только из куки kaycom_phone
                            }else {
                                if (tmp[0] == 'berut' || tmp[0] == 'vozvrat') {
                                    var date = new Date();
                                    //console.log(date);
                                    var mn2 = explode('.', tmp[1]);
                                    var year2 = mn2[2];
                                    var mount2 = mn2[1] - 1;
                                    var date2 = mn2[0];
                                    var minDate2 = new Date(year2, mount2, date2);
                                    //console.log(minDate2);
                                    var dhwsqbhdkcew = $('input[name="' + tmp[1] + '"]').val();
                                    if (dhwsqbhdkcew) {
                                        var mn3 = explode('.', dhwsqbhdkcew);
                                        var year3 = mn3[2];
                                        var mount3 = mn3[1] - 1;
                                        var date3 = mn3[0];
                                        var minDate3 = new Date(year3, mount3, date3);
                                        if (minDate2 != minDate3 || minDate2 < date) {
                                            //
                                        } else {
                                            $('input[name="' + tmp[0] + '"]').val(tmp[1]);
                                            if (first) {
                                                if (tmp[0] == 'berut') {
                                                    cal1Init();
                                                    cal1.selectDate(minDate2);
                                                } else {
                                                    cal2Init();
                                                    cal2.selectDate(minDate2);
                                                }
                                            }
                                        }
                                    } else {
                                        // $('input[name="' + tmp[0] + '"]').val(tmp[1]);
                                        if (date <= minDate2) {
                                            $('input[name="' + tmp[0] + '"]').val(tmp[1]);
                                            if (first) {
                                                if (tmp[0] == 'berut') {
                                                    cal1Init();
                                                    cal1.selectDate(minDate2);
                                                } else {
                                                    cal2Init();
                                                    cal2.selectDate(minDate2);
                                                }
                                            }
                                        }
                                    }

                                } else {
                                    $('input[name="' + tmp[0] + '"]').val(tmp[1]);
                                }
                            }

                            $('input[name="' + tmp[0] + '"]').click();
                            dopMove(tmp[0], tmp[1]);
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (tmp[1] != 'Ботинки горнолыжные') {
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').click();
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').prop('checked', true);
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').attr('checked', true);
                                if(tmp[0].indexOf('instruktor_tim') + 1){
                                    var id = $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').attr('id');
                                    var e = $('label[for="' + id + '"]');
                                    razmerSelect(e);
                                }
                                dopMove(tmp[0], tmp[1]);
                            }else{
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').click();
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').click();
                                $('input[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').prop('checked', true);
                            }
                            break;
                        default:
                            $('input[name="' + tmp[0] + '"]').val(tmp[1]);
                            dopMove(tmp[0], tmp[1]);
                            //$('input[name="' + tmp[0] + '"]').click();
                            break;
                    }
                } else {
                    //значит у нас селектед
                    //$('select[name="' + tmp[0] + '"][value = "' + tmp[1] + '"]').attr('selected', 'true');
                    $('[name="' + tmp[0] + '"]').find('[value = "' + tmp[1] + '"]').attr('selected', 'true');
                    var cls = false;
                    cls = $('[name="' + tmp[0] + '"]').attr('class');
                    $('[name="' + tmp[0] + '"]').parent('div').find('.' + cls).find('li').removeClass('selected');
                    $('[name="' + tmp[0] + '"]').parent('div').find('.' + cls).find('[data-value="' + tmp[1] + '"]').addClass('selected');
                    $('[name="' + tmp[0] + '"]').parent('div').find('.' + cls).find('.current').text($('[name="' + tmp[0] + '"]').parent('div').find('.' + cls).find('li.selected').text());
                }
            }
        }
        $(".berut").text($('input[name=berut]').val());
        $(".vozvrat").text($('input[name=vozvrat]').val());
        $('input[type=text]').each(function(){
            if ($(this).val()){
                $(this).parent('div').find('label').addClass('active');
            }
        })
        $('input[type=email]').parent('div').find('label').addClass('active');
        //   cal2.hide();
    }
    //itogo();
    //showDopText();
    var hotelName = $.trim($("#hotelName").val());
    if (hotelName == "") {
        hotelName = "Адрес не выбран";
    }


    $(".mesto").text(hotelName);
    if ($('#delivery1').is(':checked')){
        $(".mesto").text("Получение инвентаря в пункте проката");
    }
    $('.datepicker').removeClass('active');//костыль. открывается календарь после подстановки из кук. скрываем.
    razmerSelectAfterCart();//второй костыль. после подстаноки всех значений из корзины нужно чтобы в правом блоке тоже все подставилось верно
    countOrder();
}

function extrime(e) {
    var extr = e.find('.quality:checked').val();
    var bots = e.parents('.formRow').find('[data-class=boti]');
    if (extr == 'Экстрим'){
        if (bots.is(':checked')){
            bots.parent('.inputWrapper').find('label').click();
        }
    }
}

function priseInRigthInfoBlock() {
    $('.complect').each(function(){

        var kids = false;
        var sel = $(this).find('.pol option:selected').val();
        //console.log(sel);
        if (sel == 'boy' || sel == 'girl'){
            var prise = 599;//треш конечно, но цена на детский комплект не хранится нигде
        }else{
            var prise = $(this).find('.quality:checked').attr('data-price');
        }
        //console.log(prise);
        var cmplNum = $(this).attr('data-workclass');
        if($(this).find('[data-class=boti]').is(':checked')){
            $('.info[data-workclass=' + cmplNum + ']').find('.price0').text(prise);
        }else{
            var botPr = $(this).find('[data-class=boti]').attr('data-price');
            $('.info[data-workclass=' + cmplNum + ']').find('.price0').text(prise - botPr);
        }

    });
}

function closeCompl(e) {
    var work = e.parents('.complect').attr('data-workclass');
    $('[data-workclass='+work+']').remove();
    itogo();
    return false;
}

function ifLock() {
    if ($('#delivery0').prop('disabled')){
        showModalError3();
    }
}

function sbross() {
    $('.setTimeInput').text('Выбрать время');
    $('input[name="time"]').val('');
}
/*##
##  присваиваем на событие клик по id элемента из массива AnalyticsArr[] 
##  отправку в яндекс.метрику события с именем AnalyticsEvents[] соответствующего индекса
##  coded by vk.com/dmitry4m
##
##*/


$(document).ready(function () {


//    console.log(Date().toString())

  

var AnalyticsArr = [

"ga_phone"    ,
"k50-track-code"    ,
"ga_kit_selection"      ,
"ga_how_it_works"       ,
"ga_inventory"          ,
"ga_reviews"            ,
"ga_reservation"        ,
"ga_get_a_card"         ,
"ga_personal_account"   ,
"ga_partners"           ,
"ga_facebook"           ,
"ga_instagram"          ,
"ga_vkontakte"          ,
"ga_payment_upon_receiving",
"ga_payment_card"       ,
];


var AnalyticsEvents = [
"phone"                 ,
"phone"                 ,
"kit_selection"         ,
"how_it_works"          ,
"inventory"             ,
"reviews"               ,
"reservation"           ,
"get_a_card"            ,
"personal_account"      ,
"partners"              ,
"facebook"              ,
"instagram"             ,
"vkontakte"             ,
"payment_upon_receiving",
"payment_card"          ,
];


function AnalyticsFireEvent(obj) {
    console.log("Func Fire on " + obj );
    var AnalyticsEventsId = -1;
    AnalyticsEventsId = AnalyticsArr.indexOf(obj);

    if (AnalyticsEventsId != -1) {
//  console.log('yaCounter fired with event: '+AnalyticsEvents[AnalyticsEventsId]);
        yaCounter40361410.reachGoal(AnalyticsEvents[AnalyticsEventsId]);
    } else {
//  console.log('Event not found to fire: '+obj);
    }  
}



// 
for (var iAnalyticsCounter = 0; iAnalyticsCounter < AnalyticsArr.length; iAnalyticsCounter++) {
    $('#' + AnalyticsArr[iAnalyticsCounter]).on('click', '', function (e) {
//            console.log("Event on " + e.target.id +" fired ");
            AnalyticsFireEvent(e.target.id);
//            return false;
            
    });
}

      



});


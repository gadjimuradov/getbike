/**
 * Created by Dmitriy on 20.12.2016.
 */
var cal1=false;
var cal2=false;
var today = new Date();
//Инициализация календарей
function cal1Init(){
    var maxDateDP = $('input[name=vozvrat]').val();
    var minDateDP2 = $('input[name=berut]').val();
    var date1 = false;
    var year1 = false;
    var mount1 = false;
    var mn1 = false;
    if (maxDateDP.length > 0) {
        mn1 = explode('.', maxDateDP);
        year1 = mn1[2];
        mount1 = mn1[1] - 1;
        date1 = mn1[0];
        maxDate2 = new Date(year1, mount1, date1);
        maxDateUnix2 = Math.round(new Date(year1, mount1, date1).getTime() / 1000);
        console.log(maxDateUnix2);
        year1 = Number(year1);
        year1 = year1 + 100 - 2000
    } else {
        maxDate2 = false;
        date1 = false;
        maxDateUnix2 = false;
    }
    if (minDateDP2.length > 0) {
        mn4 = explode('.', minDateDP2);
        year4 = mn4[2];
        mount4 = mn4[1] - 1;
        date4 = mn4[0];
        minDate4 = new Date(year4, mount4, date4);
        minDate4Unix = Math.round(new Date(year4, mount4, date4).getTime() / 1000);
        year4 = Number(year4);
        year4 = year4 + 100 - 2000
    } else {
        minDate4 = today;
        date4 = false;
        year4 = false;
        mount4 = false;
        minDate4Unix = false;
    }

    minDate = new Date();
    cal1 = $('.berut').datepicker({
        onRenderCell: function (date, cellType) {
            var currentDate = Math.round(new Date(date.getYear() - 100 + 2000, date.getMonth(), date.getDate()).getTime() / 1000);

            if (cellType == 'day' &&
                date.getDate() == date1 &&
                date.getMonth() == mount1 &&
                date.getYear() == year1) {
                return {
                    classes: 'last_date_select_tru',
                    disabled: false
                }
            } else if (cellType == 'day' &&
                currentDate < maxDateUnix2 &&
                currentDate > minDate4Unix &&
                minDate4Unix &&
                maxDateUnix2
            ) {

                return {
                    classes: 'diapazon_date_select_tru',
                    disabled: false
                }
            } else {
                return;
            }
        },
        onHide: function(inst, animationCompleted){
            if (animationCompleted) {
                if ($('input[name=vozvrat]').val().length<10) {
                    if ($('input[name=berut]').val().length>=10) {
                        cal2Init();
                        cal2.show();
                        //cal1.hide();
                    }
                }
            }
        },
        minDate: today,
        maxDate: maxDate2,
        autoClose: true

    }).data('datepicker');
}
function cal2Init() {
    var minDateDP = $('input[name=berut]').val();
    var maxDateDP2 = $('input[name=vozvrat]').val();
    var date2 = false;
    var year2 = false;
    var mount2 = false;
    var mn2 = false;
    var mn3 = false;
    if (minDateDP.length > 0) {
        mn2 = explode('.', minDateDP);
        year2 = mn2[2];
        mount2 = mn2[1] - 1;
        date2 = mn2[0];
        minDate2 = new Date(year2, mount2, date2);
        minDate2Unix = Math.round(new Date(year2, mount2, date2).getTime() / 1000);
        year2 = Number(year2);
        year2 = year2 + 100 - 2000
    } else {
        minDate2 = today;
        date2 = false;
        year2 = false;
        mount2 = false;
        minDate2Unix = false;
    }
    if (maxDateDP2.length > 0) {
        mn3 = explode('.', maxDateDP2);
        year3 = mn3[2];
        mount3 = mn3[1] - 1;
        date3 = mn3[0];
        minDate3 = new Date(year3, mount3, date3);
        maxDate3Unix = Math.round(new Date(year3, mount3, date3).getTime() / 1000);
        year3 = Number(year3);
        year3 = year3 + 100 - 2000
    } else {
        minDate3 = new Date();
        date3 = false;
        year3 = false;
        mount3 = false;
        maxDate3Unix = false;
    }
    cal2 = $('.vozvrat').datepicker({
        onRenderCell: function (date, cellType) {
            var currentDate = Math.round(new Date(date.getYear() - 100 + 2000, date.getMonth(), date.getDate()).getTime() / 1000);
            if (cellType == 'day' &&
                date.getDate() == date2 &&
                date.getMonth() == mount2 &&
                date.getYear() == year2) {
                return {
                    classes: 'first_date_select_tru',
                    disabled: false
                }

            } else if (cellType == 'day' &&
                currentDate < maxDate3Unix &&
                currentDate > minDate2Unix &&
                minDate2Unix &&
                maxDate3Unix
            ) {
                return {
                    classes: 'diapazon_date_select_tru',
                    disabled: false
                }
            } else {
                return;
            }
        },
        onHide: function(inst, animationCompleted){
            if (animationCompleted) {
                if ($('input[name=berut]').val().length<10) {
                    if ($('input[name=vozvrat]').val().length>=10) {
                        cal1Init();
                        cal1.show();
                        //cal2.hide();
                    }
                }
            }
        },
        minDate: minDate2,
        autoClose: true,
        classes: 'calendar_two',

    }).data('datepicker');
}
$(document).ready(function () {
    cartFromCoclie2(true);
    cal1Init();
    cal2Init();
    $('input').change(function(){
        cal1Init();
        cal2Init();
    });
    // $('input[name=berut]').on('click', function () {
    //     cal1Init();
    //     cal2Init();
    //     //cal1.show();
    // });
    // $('input[name=vozvrat]').on('click', function () {
    //     cal1Init();
    //     cal2Init();
    //     //cal2.show();
    // });
});

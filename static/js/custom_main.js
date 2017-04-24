/**
 * Created by mukhtar on 23.04.17.
 */
 $(function () {

        $('#datetimepicker1').datetimepicker({
            locale: 'ru',
            format: 'DD.MM.YYYY',
        });

        $('#datetimepicker2').datetimepicker({
            locale: 'ru',
            format: 'DD.MM.YYYY',
            useCurrent: false,
        });

        $("#datetimepicker1").on("dp.change", function (e) {
            $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        });

        $("#datetimepicker2").on("dp.change", function (e) {
            $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
        });

    });

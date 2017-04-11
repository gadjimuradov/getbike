var complectsVisible = false;
var cpmlChangeOn = false;
var interval = null;

$(document).ready(function(){

	if($('.retinax3-test').is(':visible')) {
		$('.retinax2').each(function(){
			var thisStyle = $(this).attr('href').replace('photos/g', 'photos/gx3');
			$(this).attr('href', thisStyle);
		});
	}

	$("#lightgallery").lightGallery({
		selector: '.lg-link'
	});

	$('.photo-slider').slick({
		slidesToShow: 4,
  	slidesToScroll: 4,
		responsive: [
    {
      breakpoint: 767,
      settings: {
				arrows: false,
				slidesToShow: 1,
		  	slidesToScroll: 1,
				dots: true
      }
    },
		{
			breakpoint: 1375,
      settings: {
				arrows: false,
				slidesToShow: 3,
		  	slidesToScroll: 3
      }
		},
		{
			breakpoint: 769,
      settings: {
				slidesToShow: 2,
		  	slidesToScroll: 2,
				arrows: false
      }
		}
  ]
	});

	$('.complects-list-slider').each(function(){
		$(this).on('init reInit', function(event, slick, currentSlide, nextSlide){
			var i = (currentSlide ? currentSlide : 0);
			if(i === 0) {
				$(this).find('.slick-slide .complects-item').removeClass('big').addClass('reg');
				$(this).find('.slick-active').eq(1).find('.complects-item').removeClass('reg').addClass('big');
				$(this).find('.slick-slide .cls-item').removeClass('active');
				$(this).find('.slick-active').eq(1).find('.cls-item').addClass('active');
			}
		});

		$(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
			$(this).find('.slick-slide .complects-item').removeClass('big').addClass('reg');
			$(this).find('.slick-slide .cls-item').removeClass('active');
			$(this).find('.slick-active').eq(1).find('.complects-item').removeClass('reg').addClass('big');
			$(this).find('.slick-active').eq(1).find('.cls-item').addClass('active');
			clearInterval(interval);
			cpmlChangeOn = false;
			setTimeout(function(){
				cpmlChange();
			}, 100);
		});

		$(this).slick({
			slidesToShow: 3,
	  	slidesToScroll: 1,
			arrows: false,
			infinite: false
		});
	});

	$('.partners-class').slick({
		arrows: false,
		slidesToShow: 3,
  	slidesToScroll: 3,
		infinite: true,
		responsive: [
    {
      breakpoint: 767,
      settings: {
				slidesToShow: 2,
		  	slidesToScroll: 2,
				dots: true
      }
    }
  ]
	});

	$('.my-tabs-btn').on('click', function(e){
		e.preventDefault();
		$(this).closest('.my-tabs').find('.my-tabs-content').not($('#'+$(this).attr('tab-id'))).removeClass('visible');
		$('#'+$(this).attr('tab-id')).addClass('visible');
		$(this).closest('.my-tabs').find('.my-tabs-btn').not($(this)).removeClass('active');
		$(this).addClass('active');
		if($('#'+$(this).attr('tab-id')).find('.complects-list-slider').length){
			$('#'+$(this).attr('tab-id')).find('.complects-list-slider').slick('setPosition');
		}
	});

	/*$('#cbsubmit').on('click', function(){
		$('#modal-callback').modal('hide');
	});
	$('#modal-callback').on('hidden.bs.modal', function () {
		$('#modal-thanks').modal('show');
	});*/

	$('.complects-list .complects-item').each(function(){
		$(this).on('mouseenter', function(){
			$(this).find('.complects-item-content-1').removeClass('opacity-1');
			$(this).find('.complects-item-content-2').addClass('opacity-1');
		}).on('mouseleave', function(){
			$(this).find('.complects-item-content-1').addClass('opacity-1');
			$(this).find('.complects-item-content-2').removeClass('opacity-1');
		});
	});

});



var cpmlChange = function(){
	if(!cpmlChangeOn) {
		interval = setInterval(function () {
			$('.cls-item.active .complects-item-content-1').toggleClass('opacity-1');
			$('.cls-item.active .complects-item-content-2').toggleClass('opacity-1');
		}, 2000);
		cpmlChangeOn = true;
	}
};



$(window).load(function(){
	if ($('section.complects').visible(true)) {
		complectsVisible = true;
	}
	if(complectsVisible) {
		cpmlChange();
	}
});

$(window).scroll(function(){
	if ($('section.complects').visible(true)) {
		complectsVisible = true;
	}
	if(complectsVisible) {
			cpmlChange();
	}
});

$(window).resize(function(){
	if ($('section.complects').visible(true)) {
		complectsVisible = true;
	}
	if(complectsVisible) {
			cpmlChange();
	}
});

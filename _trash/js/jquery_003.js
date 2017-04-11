$(document).ready(function(){
	initScroll();
	initFocusInput();
	initSelect();
	initOpenNav();
	initTooltip();

	/***********/
	function initTooltip(){
		$('[data-toggle="tooltip"]').tooltip();
	}
	function initOpenNav(){
		$('.opener-nav').click(function(){
			$(this).parent().toggleClass('openNav');
			return false;
		});
		$('.drop-arrow').click(function(){
			$(this).next().slideToggle(200).toggleClass('open');;
			return false;
		});
	}
	function initScroll(){
		$('.scroll-box').enscroll({
			scrollIncrement:40
		});
	}
	function initSelect(){
		$('.selectpicker').selectpicker();
	}
	function initFocusInput(){
		var _elWrap = '.form-control-label';
		var _el = 'input.form-control';
		var _elClass = 'focus-label';
		var isVal = '';
		$(_elWrap).each(function(){
			isVal = $(this).find(_el).val();
			if(isVal !== ''){
				$(this).addClass(_elClass);
			}
		});
		$(_elWrap).find(_el).change(function(){
			isVal = $(this).val();
			if(isVal !== ''){
				$(this).closest(_elWrap).addClass(_elClass);
			}else{
				$(this).closest(_elWrap).removeClass(_elClass);
			}
		});
	}
});	
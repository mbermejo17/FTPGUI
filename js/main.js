$(document).ready(function(){
	var altura = $('.menu-unify').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura ){
			$('.menu-unify').addClass('menu-fixed');
		} else {
			$('.menu-unify').removeClass('menu-fixed');
			
		}
	});
 
});
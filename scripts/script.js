/*yellow:
#FAD60E
rgb(250, 214, 14)

Orange:
#EF8043
rgb(239, 128, 67)

Blue:
#8FCDB8
rgb(143, 205, 184)
*/

var width = '72.5%';
if ($(window).width() < 1450) {
	width = '70%';
}

if ($(window).width() < 1290) {
	width = '65%';
}

if ($(window).width() < 1070) {
	width = '60%';
}

$(document).ready(function() {
	$("#bigblock").click(function() {
		$("#bigblock").css('cursor', 'auto');
		$("#innerblock").stop().animate({
			'left': width
		}, {
			duration: 1000,
			easing: 'easeInOutQuad'
		});
		$("#links").stop().animate({
			'opacity': '1'
		}, {
			duration: 600
		});
		$("#title").stop().animate({
			'opacity': '0'
		}, {
			duration: 300
		});
		$("#title2").stop().animate({
			'opacity': '1'
		}, {
			duration: 700
		});
	});

	$(".sp").hover(function() {
		$(this).find('.span').stop().animate({'opacity':'1'});
	}, function() {
		$(this).find('.span').stop().animate({'opacity':'0.5'});
	});

	$("#menu_dropdown").hover(function() {
		$("#dropdown").show();
	}, function() {
		$("#dropdown").css('display', 'none');
	});
});

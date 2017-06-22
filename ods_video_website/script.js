$('document').ready(function() {


  dynamic_height();
  //sidebar_width();
  //main_top_width();
  set_fixed();
//  main_margin_top();

  heading_width();

  $("#sidebar_toggle").click(function() {

    var toggleminwidth = $("#main").css('min-width');
    toggleminwidth = (toggleminwidth == '80%')  ? '100%' : '80%';
    console.log("main width", toggleminwidth);

    $("#sidebar").stop().animate({'width': 'toggle'}, {duration:400, queue:false});
    $("#main").stop().animate({'min-width': toggleminwidth, 'max-width': toggleminwidth}, {duration:400, queue:false, step: function() {
      dynamic_height();
    }});
    //dynamic_height();
  });

  $("#sidebar_nav").click(function() {
    $("#sidebar_display").toggle();
    $("#sidebar_display2").toggle();
  });

});

var heading_width = function() {
  var width = $("#sidebar").innerWidth() + $("#main").innerWidth();
  $("#heading").css("max-width", width);
}

var set_fixed = function () {
  var $window = $(window);
  var $stickyEl = $("#sidebar");
  var $sticky = $("#main_top");
  var elTop = $stickyEl.offset().top;
  var Top = $sticky.offset().top;

  $window.scroll(function() {
    $stickyEl.toggleClass('fixed', $window.scrollTop() > elTop);
    $sticky.toggleClass('fixed', $window.scrollTop() > Top);
    sidebar_width();
    main_top_width();
  });

  $window.resize(function() {
    sidebar_width();
    heading_width();
    //  dynamic_height();
  });
}

var main_top_width = function() {
  var mainwidth = $('#main').width();
  $('#main_top').css('min-width', mainwidth);
}

var sidebar_width = function() {
  var width = 0;
  if(($("#sidebar").hasClass('fixed')) && ($("#sidebar").is(":visible"))) {
    width = $("#sidebar").innerWidth();
  }
  $("#main").css('margin-left', width);
}

var dynamic_height = function() {
  var height = $("#actual_video").width() * 540/960;
  $("#actual_video").css('height', height);
}

/*var main_margin_top = function() {
  if($("#main_top").hasClass('fixed')) {
    var margin = $("#main_top").height();
    $("#video_frame").css('margin-top', margin);
  }
  window.setTimeout(main_margin_top, 1);
}*/

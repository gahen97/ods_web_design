var ev;
function updateSidebarHeadings ()
{
  $ (".drop").off ("hover");

  $(".drop").hover(function(){
    $(this).children(".sub").stop().slideDown('slow');
  }, function(){
    $(this).children(".sub").stop().slideUp('slow');
  });
}

$('document').ready(function() {

  $("#sidebar_nav span").html("Modules");
  $("#modules_tab").addClass('modules_click');

  new ChapterTabbify();

  model_height();
  dynamic_height();
  tab_hover();
  set_fixed();
  sidebar_height();

  $(".drop").click(function(){
    $(this).children(".sub").stop().slideToggle('slow');
  });

  $("#sidebar_toggle").click(function() {
    model_store_height ();

    var toggleminwidth = $("#main").css('min-width');
    toggleminwidth = (toggleminwidth == '80%')  ? '95%' : '80%';

    $("#modules_tab").stop().animate({'width': 'toggle'}, {duration:400, queue:false});
    $("#questions_tab").stop().animate({'width': 'toggle'}, {duration:400, queue:false});
    $("#sidebar").stop().animate({'width': 'toggle'}, {duration:400, queue:false});
    $("#main").stop().animate({'min-width': toggleminwidth, 'max-width': toggleminwidth}, {duration:400, queue:false, step: function() {
      dynamic_height();
      sidebar_width();
      main_margin_top();
      main_top_width();
    }});
  });

  $("#modules_tab").click(function() {
    $("#modules_display").show();
    $("#questions_display").hide();
    $("#sidebar_nav span").html("Modules");
    $("#modules_tab").addClass('modules_click');
    $("#questions_tab").removeClass('questions_click');
  });

  $("#questions_tab").click(function() {
    $("#questions_display").show();
    $("#modules_display").hide();
    $("#sidebar_nav span").html("Questions");
    $("#questions_tab").addClass('questions_click');
    $("#modules_tab").removeClass('modules_click');
  });

});

var sidebar_height = function() {
  var h = $(window).height() - $('#sidebar').offset().top;
  $('#sidebar').height(h);
}


var model_store_height = function() {
  $(".modelBody").trigger ('model-resize-start');
}

var model_height = function() {
  $(".modelBody").css('width', $(".modelBody").height()*1.5)
                 .trigger ('model-resize');
        // Fires a custom event which Events.js can listen for
}

var tab_hover = function() {
  $("#modules_tab").hover(
    function() {
        $("#modules_tab").addClass('modules_hover');
    }, function() {
        $("#modules_tab").removeClass('modules_hover');
    }
  );
  $("#questions_tab").hover(
    function() {
        $("#questions_tab").addClass('questions_hover');
    }, function() {
        $("#questions_tab").removeClass('questions_hover');
    }
  );
}

var heading_width = function() {
  var width = $("#sidebar").innerWidth() + $("#main").innerWidth();
  $("#heading").css("max-width", width);
}

var set_fixed = function () {
  var sidebar = $("#sidebar");
  var maintop = $("#main_top");
  var sbTop = sidebar.offset().top;
  var mtTop = maintop.offset().top;

  $(window).scroll(function() {
    sidebar.toggleClass('fixed', $(window).scrollTop() >= sbTop);
    maintop.toggleClass('fixed', $(window).scrollTop() >= mtTop);
    sidebar_width();
    if($(window).scrollTop() > mtTop) {
      main_top_width();
    }
    main_margin_top();
  });

  $(window).resize(function() {
    sidebar_width();
    heading_width();
    //  dynamic_height();
  });
}

var main_top_width = function() {
  var mainwidth = $('#main').width();
  $('#main_top').css('min-width', mainwidth);
  $('#main_top').css('max-width', mainwidth);
}

var sidebar_width = function() {
  var width = 0;
  if(($("#sidebar").hasClass('fixed')) && ($("#sidebar").is(":visible"))) {
    width = $("#sidebar").innerWidth();
  }
  $("#main").css('margin-left', width);
}

var dynamic_height = function() {
  var height = $("#actual_video").width() * 0.644193894 // seems to be better for H5P
  $("#actual_video").css('height', height);
}

var main_margin_top = function() {
  var margin = 0;
  if($("#main_top").hasClass('fixed')) {
    margin = $("#main_top").outerHeight();
  }
  $("#video_frame").css('margin-top', margin);
}

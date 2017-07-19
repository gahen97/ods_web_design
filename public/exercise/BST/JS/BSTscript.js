$('document').ready(function() {
  $(".element").hover(function(){
    console.log("hover");
    //$('.jsplumb-endpoint').css('fill', 'white');
  }, function (){
    console.log("hover-end");
    //$('.jsplumb-endpoint').css('fill', '#565656');
  });

});

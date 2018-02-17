$(document).ready(function(){
    //popover initialization of adding a product to cart +1
    $('[data-toggle="popover"]').popover(); 
    $('.imgBtn').click(function () {
        $( "#shopCartIcon" ).attr( "data-toggle", "popover" );
        $( "#shopCartIcon" ).attr( "data-placement", "bottom" );
        $( "#shopCartIcon" ).attr( "data-content", "+1" );
        $('[data-toggle="popover"]').popover('show');
        setTimeout(function(){
            $('[data-toggle="popover"]').popover( 'hide' );
            $('#shopCartIcon').popover('dispose')
        }, 2000);
    }); 

    //hover over the shopping cart icon
    $(".shopCartIconLink").hover(
        function(){$('.shopBadge').css("color", "#ff4d4d");},
        function(){$('.shopBadge').css("color", "white");}
    );
    
    //first page panel hover over blocks
    $("#picOne").hover(
        function(){$('#picOne .transition').css({"margin-top": "0px", "height": "100%",'padding-top':'10%'});},
        function(){$('#picOne .transition').css({"margin-top": "50%", "height": "30%",'padding-top':'0px'});}
    );
    $("#picTwo").hover(
        function(){$('#picTwo .transition').css({"margin-top": "0px", "height": "100%",'padding-top':'10%'});},
        function(){$('#picTwo .transition').css({"margin-top": "50%", "height": "30%",'padding-top':'0px'});}
    );
    $("#picThree").hover(
        function(){$('#picThree .transition').css({"margin-top": "0px", "height": "100%",'padding-top':'10%'});},
        function(){$('#picThree .transition').css({"margin-top": "50%", "height": "30%",'padding-top':'0px'});}
    );
    $("#picFour").hover(
        function(){$('#picFour .transition').css({"margin-top": "0px", "height": "100%",'padding-top':'10%'});},
        function(){$('#picFour .transition').css({"margin-top": "50%", "height": "30%",'padding-top':'0px'});}
    );
    $("#picFive").hover(
        function(){$('#picFive .transition').css({"margin-top": "0px", "height": "100%",'padding-top':'10%'});},
        function(){$('#picFive .transition').css({"margin-top": "50%", "height": "30%",'padding-top':'0px'});}
    );

    //code for carousel images in product details page
    var slideIndex = 1;
    showDivs(slideIndex);
    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
           dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
        }
        x[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " w3-opacity-off";
      }
});

//code for carousel images in product details page
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function currentDiv(n) {
  showDivs(slideIndex = n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}

//separate tab sections in profile page
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//accordion for profile page sections
$(document).ready(function($) {
    $('#accordion').find('.accordion-toggle').click(function(){
        //Expand or collapse this panel
        $(this).next().slideToggle('fast');
        //Hide the other panels
        $(".accordion-content").not($(this).next()).slideUp('fast');
    });

     //button +/- in profile page
    $(".accordion-toggle").click(function(){
        var str = $( "#detailSignPlusMinus" ).text();
        //$( "p:last" ).html( str );
        console.log(str)
        console.log(str === '+ ')
        if(str == '+ '){
            $( "#detailSignPlusMinus" ).text( '- ' );
        }
        else{
            $( "#detailSignPlusMinus" ).text( '+ ' );
        }
    });

    $(".autoClick").click();

});
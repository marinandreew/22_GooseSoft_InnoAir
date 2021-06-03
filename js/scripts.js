(function($) {
    "use strict";
      
    /*--------
    Preloader
    ---------*/ 
    setTimeout(function() { 
        $(".preloader").delay(500).fadeOut(1000);
    }, 1000 );   
    /*----------
    !Modernizr
    -----------*/
    if(!Modernizr.touch){ 
        /*----------
        Parallax
        -----------*/
        $.stellar();
        /*----------------------------
        Youtube Fullscreen Background
        -----------------------------*/
        $(".player").mb_YTPlayer();
    } 
    /*---------------
    Home Text Slider
    ----------------*/ 
    $('#slider-home').liquidSlider({
        autoSlide: true,
        autoSlideInterval: 4500,
        autoSlideControls: true,
        forceAutoSlide: true,
        dynamicArrows: false,
        slideEaseFunction:'animate.css',
        slideEaseDuration:900,
        heightEaseDuration:900,
        animateIn:"bounceIn",
        animateOut:"bounceOut" 
    }); 
    /*---------------
    Quotes Slider
    ----------------*/
    $('#quotes-slider').liquidSlider({
        autoSlide: true,
        autoSlideDirection: 'right',
        autoSlideInterval: 4500,
        autoSlideControls: true,
        forceAutoSlide: true,
        autoHeight: false,
        dynamicArrows: true,
        slideEaseFunction:'animate.css',
        slideEaseDuration:500,
        heightEaseDuration:500,
        animateIn:"fadeIn",
        animateOut:"fadeOut"
    });
    /*----------------
    Testimonial Slider
    -----------------*/
    $('#testimonials-slider').liquidSlider({
        autoSlide: true,
        autoSlideDirection: 'right',
        autoSlideInterval:  5000,
        autoSlideControls:  true,
        forceAutoSlide: true,
        autoHeight: false,
        dynamicArrows: true,
        slideEaseFunction:'animate.css',
        slideEaseDuration:500,
        heightEaseDuration:500,
        animateIn:"flipInX",
        animateOut:"fadeOut"
    });
    /*----------------
    Sticky Navbar
    -----------------*/ 
    $(".navbar-sticky").sticky({topSpacing:0});
    /*----------------
    Auto Close Navbar
    -----------------*/ 
    function close_toggle() {
        if ($(window).width() <= 992) {
          $('.navbar-collapse a').on('click', function(){
              $('.navbar-collapse').collapse('hide');
          });
        }
        else { $('.navbar .navbar-default a').off('click'); }
    }
    close_toggle();
    $(window).resize(close_toggle); 
    $(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
    $(function () {
        $('.navbar-toggle').bind('click', function (event) {
            var $anchor = $('.navbar-header');
            $('html, body').stop().animate({
                scrollTop: $($anchor).offset().top - 0
            }, 800, 'swing');
            event.preventDefault();
        });
    });
    /*----------------
    WOW Animation.css
    -----------------*/ 
    var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow) 
        offset:       150,          // distance to the element when triggering the animation (default is 0)
        mobile:       false        // trigger animations on mobile devices (true is default)
    });
    wow.init();
    /*-----------------------------
    Bootstrap Tooltip, Alerts, Tabs
    ------------------------------*/
    $(function () { $("[data-toggle='tooltip']").tooltip();  
        $(".alert").alert()
    });
    $(function () {
        var active = true;
        $('#collapse-init').click(function () {
            if (active) {
                active = false;
                $('.panel-collapse').collapse('show');
                $('.panel-title').attr('data-toggle', '');
                $(this).text('Close All');
            } else {
                active = true;
                $('.panel-collapse').collapse('hide');
                $('.panel-title').attr('data-toggle', 'collapse');
                $(this).text('Open All');
            }
        });
        $('#accordion').on('show.bs.collapse', function () {
            if (active) $('#accordion .in').collapse('hide');
        });
    });
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
    /*----------
    Skill Bars
    -----------*/
    $('.skills-col').waypoint(function() {
       $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
                width:$(this).attr('data-percent')
            },2500);
        });
        }, { offset: '100%' 
    }); 
    /*----------
    Counter Up
    -----------*/   
    $('.counter').counterUp({
        delay: 30,
        time: 1800
    });  
    /*----------
    FlexSlider
    -----------*/  
    $('.flexslider').flexslider({
        animation: "slide",
    });   
    /*-----------
    Contact Form
    ------------*/ 
    $('#contactform').submit(function(){
        var action = $(this).attr('action');
        $("#message").slideUp(750,function() {
        $('#message').hide();
        $('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled','disabled');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                comments: $('#comments').val(),
            },
            function(data){
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
                $('#submit').removeAttr('disabled');
                if(data.match('success') != null) $('#contactform').slideUp('slow');

            });
        });
        return false;
    }); 
    /*-----------
    Google Maps
    ------------*/ 
    var autoDriveSteps = new Array();
var speedFactor = 10; // 10x faster animated drive



    function getDistance(source, destination) {
	  return google.maps.geometry.spherical.computeDistanceBetween(
		new google.maps.LatLng(source.lat, source.lng),
		new google.maps.LatLng(destination.lat, destination.lng)
	  );
	}

    var carLatLng = {"lat": 42.498655, "lng": 27.468535};
    
		
	var directionsDisplay; 
	var directionsService = new google.maps.DirectionsService(); 

	function InitializeMap() { 
	directionsDisplay = new google.maps.DirectionsRenderer(); 
	var latlng = new google.maps.LatLng(42.501, 27.468); 
	var myOptions = 
	{ 
	zoom: 18, 
	center: latlng, 
	mapTypeId: google.maps.MapTypeId.ROADMAP 
	}; 
	var map = new google.maps.Map(document.getElementById("map"), myOptions); 
	var myLatLng = new google.maps.LatLng(42.498655, 27.468535); 
	
	var image_icon = "";

	var coordinates = [
	  {id:1, latlng: new google.maps.LatLng(42.509406, 27.463705), state: 1, title: 'adres', time: 30, marker: null, connected: [1, 2]},
	  {id:2, latlng: new google.maps.LatLng(42.509651, 27.463447), state: 0, title: 'adres', time: 30, marker: null, connected: [1, 2]},
	  {id:3, latlng: new google.maps.LatLng(42.509722, 27.463791), state: 0, title: 'adres', time: 30, marker: null},
	  {id:4, latlng: new google.maps.LatLng(42.502550, 27.467199), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:6, latlng: new google.maps.LatLng(42.502407, 27.467153), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:7 , latlng: new google.maps.LatLng(42.502365, 27.467303), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:8 , latlng: new google.maps.LatLng(42.502443, 27.467440), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:10, latlng: new google.maps.LatLng(42.501164, 27.467654), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:11, latlng: new google.maps.LatLng(42.501085, 27.467756), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:12, latlng: new google.maps.LatLng(42.500994, 27.467694), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:14, latlng: new google.maps.LatLng(42.502407, 27.467153), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:15, latlng: new google.maps.LatLng(42.502365, 27.467303), state: 1, title: 'adres', time: 20, makrer: null},  
	  {id:18, latlng: new google.maps.LatLng(42.491257, 27.471723), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:19, latlng: new google.maps.LatLng(42.491392, 27.471867), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:20, latlng: new google.maps.LatLng(42.491273, 27.472018), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:22, latlng: new google.maps.LatLng(42.512272, 27.457706), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:23, latlng: new google.maps.LatLng(42.512493, 27.457558), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:24, latlng: new google.maps.LatLng(42.512430, 27.457389), state: 1, title: 'adres', time: 20, makrer: null},
	{id:25, latlng: new google.maps.LatLng(42.491421, 27.475382), state: 0, title: 'adres', time: 15, makrer: null},
	{id:26, latlng: new google.maps.LatLng(42.491376, 27.475595), state: 1, title: 'adres', time: 15, makrer: null},
	{id:27, latlng: new google.maps.LatLng(42.491332, 27.475170), state: 1, title: 'adres', time: 15, makrer: null},
	{id:28, latlng: new google.maps.LatLng (42.491196, 27.475363), state: 0, title: 'adres', time: 15, makrer: null},
	  {id:28, latlng: new google.maps.LatLng (42.498186, 27.480177), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:29, latlng: new google.maps.LatLng (42.498453, 27.479982), state: 1, title: 'adres', time: 20, makrer: null}, 
	{id:30, latlng: new google.maps.LatLng(42.498730, 27.480072), state: 1, title: 'adres', time: 20, makrer: null},
	{id:31, latlng: new google.maps.LatLng(42.499086, 27.479753), state: 0, title: 'adres', time: 20, makrer: null},
	{id:32, latlng: new google.maps.LatLng(42.498599, 27.479868), state: 0, title: 'adres', time: 20, makrer: null},
	{id:33, latlng: new google.maps.LatLng(42.499237, 27.479498), state: 0, title: 'adres', time: 20, makrer: null},
	{id:34, latlng: new google.maps.LatLng(42.499190, 27.479139), state: 1, title: 'adres', time: 20, makrer: null},
	{id:35, latlng: new google.maps.LatLng(42.499314, 27.479174), state: 0, title: 'adres', time: 20, makrer: null}, 
	  {id:37, latlng: new google.maps.LatLng(42.500644, 27.478040) , state: 1, title: 'adres', time: 40, makrer: null},
	  {id:38, latlng: new google.maps.LatLng(42.500729, 27.478131), state: 0, title: 'adres', time: 40, makrer: null},
	  {id:39, latlng: new google.maps.LatLng(42.500761, 27.477691) , state: 1, title: 'adres', time: 40, makrer: null},
	  {id:40, latlng: new google.maps.LatLng (42.500674, 27.477632), state: 0, title: 'adres', time: 40, makrer: null},
	{id:42, latlng: new google.maps.LatLng(42.503854, 27.474517), state: 1, title: 'adres', time: 30, makrer: null},
	{id:43, latlng: new google.maps.LatLng(42.503737, 27.474423), state: 0, title: 'adres', time: 30, makrer: null},
	{id:44, latlng: new google.maps.LatLng(42.503743, 27.474863), state: 1, title: 'adres', time: 30, makrer: null},
	{id:45, latlng: new google.maps.LatLng(42.503850, 27.474873), state: 0, title: 'adres', time: 30, makrer: null},   
	  {id:46, latlng:new google.maps.LatLng(42.507012, 27.471385) , state: 1, title: 'adres', time: 25, makrer: null},
	  {id:47, latlng: new google.maps.LatLng(42.507074, 27.471230), state: 0, title: 'adres', time: 10, makrer: null},
	  {id:48, latlng:new google.maps.LatLng(42.507067, 27.471133) , state: 1, title: 'adres', time: 25, makrer: null},
	  {id:49, latlng: new google.maps.LatLng(42.506974, 27.471182), state: 0, title: 'adres', time: 10, makrer: null},
	  {id:50, latlng: new google.maps.LatLng(42.506975, 27.471331), state: 1, title: 'adres', time: 10, makrer: null},
	{id:51, latlng: new google.maps.LatLng(42.507424, 27.470948), state: 0, title: 'adres', time: 28, makrer: null},
	{id:52, latlng: new google.maps.LatLng(42.507472, 27.470945), state: 1, title: 'adres', time: 28, makrer: null},
	{id:53, latlng: new google.maps.LatLng(42.507416, 27.470767), state: 0, title: 'adres', time: 28, makrer: null},
	   {id:54, latlng: new google.maps.LatLng(42.512825, 27.464460), state: 1, title: 'adres', time: 40, makrer: null},
	   {id:55, latlng: new google.maps.LatLng(42.512722, 27.464814), state: 0, title: 'adres', time: 40, makrer: null},
	   {id:56, latlng: new google.maps.LatLng(42.513240, 27.464165), state: 0, title: 'adres', time: 40, makrer: null},
	   {id:57, latlng: new google.maps.LatLng(42.513074, 27.464707), state: 1, title: 'adres', time: 40, makrer: null},
	{id:58, latlng: new google.maps.LatLng (42.497541, 27.468921), state: 1, title: 'adres', time: 35, makrer: null},
	{id:59, latlng: new google.maps.LatLng (42.497470, 27.469163), state: 0, title: 'adres', time: 35, makrer: null},
	{id:60, latlng: new google.maps.LatLng (42.497319, 27.469034), state: 1, title: 'adres', time: 35, makrer: null},
	{id:61, latlng: new google.maps.LatLng (42.497387, 27.468809), state: 0, title: 'adres', time: 35, makrer: null},
	   {id:62, latlng: new google.maps.LatLng(42.498606, 27.468551) , state: 1, title: 'adres', time: 20, makrer: null},
	   {id:63, latlng: new google.maps.LatLng(42.498559, 27.468701), state: 0, title: 'adres', time: 20, makrer: null},
	   {id:64, latlng: new google.maps.LatLng(42.498468, 27.468607) , state: 1, title: 'adres', time: 20, makrer: null},
	{id:65, latlng: new google.maps.LatLng (42.493519, 27.470593), state: 1, title: 'adres', time: 18, makrer: null},
	{id:66, latlng: new google.maps.LatLng (42.493416, 27.470802), state: 0, title: 'adres', time: 18, makrer: null},
	{id:67, latlng: new google.maps.LatLng (42.493345, 27.470716), state: 1, title: 'adres', time: 18, makrer: null},
	{id:68, latlng: new google.maps.LatLng (42.493377, 27.470528), state: 0, title: 'adres', time: 18, makrer: null},
	   {id:69, latlng: new google.maps.LatLng (42.502907, 27.470335), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:70, latlng: new google.maps.LatLng(42.502948, 27.470085) , state: 0, title: 'adres', time: 20, makrer: null},
	   {id:71, latlng: new google.maps.LatLng (42.503011, 27.470138), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:72, latlng: new google.maps.LatLng(42.503005, 27.470374), state: 0, title: 'adres', time: 20, makrer: null},
	{id:73, latlng: new google.maps.LatLng (42.493143, 27.450139), state: 1, title: 'adres', time: 22, makrer: null},
	{id:74, latlng: new google.maps.LatLng (42.493579, 27.450408), state: 1, title: 'adres', time: 22, makrer: null},
	{id:75, latlng: new google.maps.LatLng (42.493468, 27.450719), state: 0, title: 'adres', time: 22, makrer: null},
	{id:76, latlng: new google.maps.LatLng (42.493321, 27.450515), state: 0, title: 'adres', time: 22, makrer: null},
	{id:77, latlng: new google.maps.LatLng (42.493151, 27.450435), state: 1, title: 'adres', time: 22, makrer: null},
	   {id:78, latlng: new google.maps.LatLng (42.490452, 27.454743) , state: 1, title: 'adres', time: 20, makrer: null},
	   {id:79, latlng: new google.maps.LatLng (42.490179, 27.454737), state: 0, title: 'adres', time: 20, makrer: null},
	   {id:80, latlng: new google.maps.LatLng (42.490578, 27.455065), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:81, latlng: new google.maps.LatLng (42.490456, 27.455290), state: 0, title: 'adres', time: 20, makrer: null},
	{id:82, latlng: new google.maps.LatLng(42.513070, 27.455908), state: 1, title: 'adres', time: 20, makrer: null},
	{id:83, latlng: new google.maps.LatLng(42.512949, 27.455978), state: 0, title: 'adres', time: 20, makrer: null},
	{id:84, latlng: new google.maps.LatLng(42.513036, 27.456176), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:85, latlng: new google.maps.LatLng(42.514952, 27.451765), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:86, latlng: new google.maps.LatLng(42.514866, 27.451816), state: 0, title: 'adres', time: 20, makrer: null},
	   {id:87, latlng: new google.maps.LatLng (42.514986, 27.451983), state: 1, title: 'adres', time: 20, makrer: null},
	   {id:88, latlng: new google.maps.LatLng(42.514954, 27.451893) , state: 0, title: 'adres', time: 20, makrer: null},
	{id:89, latlng: new google.maps.LatLng (42.522111, 27.456474), state: 1, title: 'adres', time: 20, makrer: null},
	{id:90, latlng: new google.maps.LatLng (42.522038, 27.456656), state: 0, title: 'adres', time: 20, makrer: null},
	{id:91, latlng: new google.maps.LatLng (42.522018, 27.456828), state: 1, title: 'adres', time: 20, makrer: null},
	{id:92, latlng: new google.maps.LatLng (42.521990, 27.456471), state: 0, title: 'adres', time: 20, makrer: null},
	   {id:93, latlng: new google.maps.LatLng (42.516707, 27.447686), state: 1, title: 'adres', time: 35, makrer: null},
	   {id:94, latlng: new google.maps.LatLng (42.516674, 27.448168), state: 1, title: 'adres', time: 35, makrer: null},
	   {id:95, latlng: new google.maps.LatLng (42.516733, 27.448303), state: 1, title: 'adres', time: 35, makrer: null},
	   {id:96, latlng: new google.maps.LatLng(42.516674, 27.447970) , state: 0, title: 'adres', time: 35, makrer: null},
	   {id:97, latlng: new google.maps.LatLng(42.516824, 27.448066), state: 0, title: 'adres', time: 35, makrer: null},
	   {id:98, latlng: new google.maps.LatLng(42.516891, 27.447972) , state: 0, title: 'adres', time: 35, makrer: null},
	{id:99, latlng: new google.maps.LatLng (42.529406, 27.457349), state: 1, title: 'adres', time: 20, makrer: null},
	{id:100, latlng: new google.maps.LatLng(42.529331, 27.457628), state: 0, title: 'adres', time: 20, makrer: null},
	{id:101, latlng: new google.maps.LatLng(42.529068, 27.457641), state: 1, title: 'adres', time: 20, makrer: null},
	{id:102, latlng: new google.maps.LatLng(42.529108, 27.457397), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:103, latlng: new google.maps.LatLng(42.530823, 27.462176), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:104, latlng: new google.maps.LatLng (42.530826, 27.462675), state: 0, title: 'adres', time: 20, makrer: null},
	  {id:105, latlng: new google.maps.LatLng (42.531150, 27.462688), state: 1, title: 'adres', time: 20, makrer: null},
	  {id:106, latlng: new google.maps.LatLng (42.531164, 27.462262), state: 0, title: 'adres', time: 20, makrer: null},
	{id:107, latlng: new google.maps.LatLng(42.457732, 27.405460) , state: 1, title: 'adres', time: 20, makrer: null},
	{id:108, latlng: new google.maps.LatLng(42.457816, 27.405809) , state: 0, title: 'adres', time: 20, makrer: null},
	{id:109, latlng: new google.maps.LatLng(42.458004, 27.405675) , state: 1, title: 'adres', time: 20, makrer: null},
	{id:110, latlng: new google.maps.LatLng(42.457948, 27.405412) , state: 0, title: 'adres', time: 20, makrer: null},  
	  {id:111, latlng: new google.maps.LatLng(42.452880, 27.420515) , state: 1, title: 'adres', time: 20, makrer: null},
	  {id:112, latlng: new google.maps.LatLng(42.452852, 27.420064) , state: 0, title: 'adres', time: 20, makrer: null},
	  {id:113, latlng: new google.maps.LatLng(42.453171, 27.420096) , state: 1, title: 'adres', time: 20, makrer: null},
	  {id:114, latlng: new google.maps.LatLng(42.453143, 27.420547 ), state: 0, title: 'adres', time: 20, makrer: null},


	];

	function changeIcon(index) {
		
			if(coordinates[index].state==0){
			  coordinates[index].marker.setIcon("882.png");
			  coordinates[index].state=1;
			} else {
			  coordinates[index].marker.setIcon("228.png");
			  coordinates[index].state=0;  
			}
			setTimeout(changeIcon, coordinates[index].time*1000, index);


	  }

	function createLightChanger(index){


	  setTimeout(changeIcon, coordinates[index].time*1000, index);
	}

	coordinates.forEach(function(value, index){
	  console.log(value);
	  if(value.state==1){
		image_icon = "882.png";
	  } else {
		image_icon = "228.png";
	  }

		var marker = new google.maps.Marker({
			  position: value.latlng,
			  map: map,
			  title: value.title,
			  icon: image_icon,
		}); 
		coordinates[index].initialState = coordinates[index].state;
		coordinates[index].marker = marker;
		createLightChanger(index);
	});



	var move_x = 0.0001, move_y = 0.0001, pos_x = 42.498655, pos_y = 27.468535;
	
	var marker_car= new google.maps.Marker({
			  position: new google.maps.LatLng(pos_x, pos_y),
			  map: map,
			  title: "",
			  icon: "",
		}); ;
	
	/*function moveCar() {
		
		



		pos_x += move_x;
		pos_y += move_y;
		
		carLatLng = {"lat": pos_x , "lng": pos_y};
		
				marker_car.setMap(null);

		marker_car = new google.maps.Marker({
			  position: new google.maps.LatLng(pos_x, pos_y),
			  map: map,
			  title: "",
			  icon: "882.png",
		}); 
		console.log("car created: "+pos_x+"; "+pos_y);
		console.log(window);
				setTimeout(moveCar, 1000);

	}
	
	moveCar();*/
	
	function setAnimatedRoute(origin, destination, map) {
    // init routing services
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });

    //calculate route
    directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // display the route
                directionsRenderer.setDirections(response);

                // calculate positions for the animation steps
                // the result is an array of LatLng, stored in autoDriveSteps
                autoDriveSteps = new Array();
                var remainingSeconds = 0;
                var leg = response.routes[0].legs[0]; // supporting single route, single legs currently
                leg.steps.forEach(function(step) {
                    var stepSeconds = step.duration.value;
                    var nextStopSeconds = speedFactor - remainingSeconds;
                    while (nextStopSeconds <= stepSeconds) {
                        var nextStopLatLng = getPointBetween(step.start_location, step.end_location, nextStopSeconds / stepSeconds);
                        autoDriveSteps.push(nextStopLatLng);
                        nextStopSeconds += speedFactor;
                    }
                    remainingSeconds = stepSeconds + speedFactor - nextStopSeconds;
                });
                if (remainingSeconds > 0) {
                    autoDriveSteps.push(leg.end_location);
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

// helper method to calculate a point between A and B at some ratio
function getPointBetween(a, b, ratio) {
    return new google.maps.LatLng(a.lat() + (b.lat() - a.lat()) * ratio, a.lng() + (b.lng() - a.lng()) * ratio);
}

// start the route simulation   
function startRouteAnimation(marker) {
    var autoDriveTimer = setInterval(function () {
            // stop the timer if the route is finished
            if (autoDriveSteps.length === 0) {
                clearInterval(autoDriveTimer);
            } else {
				coordinates.forEach(function(value, index){
				var distance_between_car  = getDistance({lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }, {lat: coordinates[index].latlng.lat(), lng: coordinates[index].latlng.lng()} );
				console.log(distance_between_car);
				if(distance_between_car<100){
					coordinates[index].marker.setIcon("882.png");
					coordinates[index].state=1;
					setTimeout(function() {
						coordinates[index].state = coordinates[index].initialState;
						if(coordinates[index].state==1) {
							coordinates[index].marker.setIcon("882.png");
						} else {
							coordinates[index].marker.setIcon("228.png");
						}
						
					//	console.log(index+" restored");
					}, 5000);
						

				}
			});
                // move marker to the next position (always the first in the array)
                marker.setPosition(autoDriveSteps[0]);
                // remove the processed position
                autoDriveSteps.shift();
            }
        },
        1500);
}
	
// start simulation on button click...
//$("#simulateRouteButton").click(function() {
 //   
//});

$("#Button1").click(function() {
		marker_car = new google.maps.Marker({
			  position: new google.maps.LatLng(pos_x, pos_y),
			  map: map,
			  title: "",
			  icon: "201.png", //смени тази картинка с картинка на кола!!!
		}); 
	setAnimatedRoute($("#startvalue").val(), $("#endvalue").val(), map);
	startRouteAnimation(marker_car);

});
	
	directionsDisplay.setMap(map); 
	directionsDisplay.setPanel(document.getElementById('directionpanel')); 

	var control = document.getElementById('control'); 
	control.style.display = 'block'; 


	} 
	function calcRoute() { 

	var start = document.getElementById('startvalue').value; 
	var end = document.getElementById('endvalue').value; 
	var request = { 
	origin: start, 
	destination: end, 
	travelMode: google.maps.DirectionsTravelMode.DRIVING 
	}; 
	directionsService.route(request, function (response, status) { 
	if (status == google.maps.DirectionsStatus.OK) { 
	directionsDisplay.setDirections(response); 
	} 
	}); 

	} 

	function Button1_onclick() { 
	calcRoute(); 
	} 

	window.onload = InitializeMap; 



    /*-----------
    Back to Top
    ------------*/ 
    $(window).scroll(function(){
        if($(window).scrollTop() > 300){
            $("#back-to-top").fadeIn(600);
        } else {
            $("#back-to-top").fadeOut(600);
        }
        if ($(this).scrollTop() > 200){
            $('.navbar-right').addClass("rez") 
        } 
        else{ 
            $('.navbar-right').removeClass("rez") 
        }  
    });
    $('#back-to-top, .back-to-top').click(function() {
        $('html, body').animate({ scrollTop:0 }, '1000');
        return false;
    });
    /*-----------
    Backstretch
    ------------*/
    $(".home-fullscreen-slider").backstretch([
        "img/slide-1.jpg",
        "img/slide-2.jpg",
        "img/slide-3.jpg"
    ], {
        fade: 750,
        duration: 4000
    }); 
    /*---------------------
    Smooth Scroll To Anchor
    ----------------------*/
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('#main-nav a,.footer-menu a,.btn-home a,.move a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 68
            }, 1000);
            event.preventDefault();
        });
    });  
    /*------------------------------
    Active Menu Item on Page Scroll
    -------------------------------*/
    var sections = $('section')
      , nav = $('nav')
      , nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();

      sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('current');
          sections.removeClass('current');

          $(this).addClass('current');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
        }
      });
    });  
    
})(jQuery); 


/* --------
Portfolio
 ---------*/
(function($, window, document, undefined) {
    "use strict";
    
    var gridContainer = $('#grid-container-fullwidth'),
        filtersContainer = $('#filters-container-fullwidth'),
        wrap, filtersCallback;

    gridContainer.cubeportfolio({
        defaultFilter: '*',
        animationType: 'slideDelay',
        gapHorizontal: 15,
        gapVertical: 15,
        gridAdjustment: 'responsive',
        caption: 'zoom',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
                .done(function(result) {
                    t.updateSinglePage(result);
                })
                .fail(function() {
                    t.updateSinglePage("Error! Please refresh the page!");
                });
        },
        // single page inline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'above',
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }
    });
    /* add listener for filters */
    if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
        wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');
        wrap.on({
            'mouseover.cbp': function() {
                wrap.addClass('cbp-l-filters-dropdownWrap-open');
            },
            'mouseleave.cbp': function() {
                wrap.removeClass('cbp-l-filters-dropdownWrap-open');
            }
        });
        filtersCallback = function(me) {
            wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
            wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
            me.addClass('cbp-filter-item-active');
            wrap.trigger('mouseleave.cbp');
        };
    } else {
        filtersCallback = function(me) {
            me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
        };
    }
    filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
        var me = $(this);
        if (me.hasClass('cbp-filter-item-active')) {
            return;
        }
        // get cubeportfolio data and check if is still animating (reposition) the items.
        if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
            filtersCallback.call(null, me);
        }
        // filter the items
        gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
    });
    /* activate counter for filters */
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'), function() {
        // read from url and change filter active
        var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
            item;
        if (match !== null) {
            item = filtersContainer.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
            if (item.length) {
                filtersCallback.call(null, item);
            }
        }
    });
    /* add listener for load more */
    $('.cbp-l-loadMore-button-link').on('click.cbp', function(e) {
        e.preventDefault();
        var clicks, me = $(this),
            oMsg;
        if (me.hasClass('cbp-l-loadMore-button-stop')) {
            return;
        }
        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks) ? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);
        // set loading status
        oMsg = me.text();
        me.text('LOADING...');
        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        }).done(function(result) {
            var items, itemsNext;
            // find current container
            items = $(result).filter(function() {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });
            gridContainer.cubeportfolio('appendItems', items.html(),
                function() {
                    // put the original message back
                    me.text(oMsg);
                    // check if we have more works
                    itemsNext = $(result).filter(function() {
                        return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                    });

                    if (itemsNext.length === 0) {
                        me.text('NO MORE WORKS');
                        me.addClass('cbp-l-loadMore-button-stop');
                    }
                });
        }).fail(function() {
            // error
        });
    });
})(jQuery, window, document);




 

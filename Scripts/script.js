$(function(){

var $latitude;
var $longitude;

   var getWeather = function(){

      $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?') 
         .done (function(location) {
            $('.country').html(location.country_name);
            $latitude = location.latitude;
            $longitude = location.longitude; 
            console.log($latitude);
            console.log($longitude);
            
         $.ajax({

               url: "https://api.darksky.net/forecast/9fecbd590bc5d9a95878588534b3d565/"+$latitude+","+$longitude,
               dataType: 'jsonp',

               data: {
                  units: 'si'
               },
               
               success: function(data){

                  $(".temperature").html(data.currently.temperature);
                  $(".icon").html("<img src='Images/"+data.currently.icon+".png'>");
                  $(".description").html(data.currently.summary);
                  $("body").addClass(data.currently.icon);
                  $(".city").html(data.timezone);
                  $(".humidity").html(Math.round((data.currently.humidity*100)*100)/100);
                  $(".wind-speed").html(data.currently.windSpeed);
                  $(".fahrenheit").removeClass('active');
                  $(".celsius").addClass('active');
               }

            });

         });

   }
	

         $(".celsius").on('click', function(){

         	if (!$(this).hasClass('active')){
         		$('a').removeClass('active');
         		var temp = $('.temperature').html();

         	 $('.temperature').html(Math.round(((temp - 32) / 1.8) * 100) / 100); 


         	 $(this).addClass('active');
         	}

         })

         $(".fahrenheit").on('click', function(){
         	
         	if (!$(this).hasClass('active')){
         		$('a').removeClass('active');
         		var temp = $('.temperature').html();

         	 $('.temperature').html(Math.round(((1.8 * temp) + 32)*100)/100); 


         	 $(this).addClass('active');
         	}

         })

         $('.refresh').on('click', function(){
               getWeather();
         })

         getWeather();

})
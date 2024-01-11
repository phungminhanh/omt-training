
async function getWeatherByLocation() {
    try {
      
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
       
        const apiKey = '9ffbc24db6da404118e93cdc0a9db285'; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const data = await response.json();
  
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); 
  
        document.getElementById("city").innerHTML = ` ${cityName}`;
        document.getElementById("temperature").innerHTML = `${temperature}°C`;
        document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  
     
        updateDateTime();
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById("weather").innerHTML = "Unable to fetch weather data";
    }
  }
  

  function updateDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    document.getElementById("date").innerHTML = `${formattedDate}`;
  }
  
  
  getWeatherByLocation();


$(document).ready(function() {


  $('.menu-icon').click(function() {
      $(this).parent().toggleClass('is-tapped');
      $('#hamburger').toggleClass('open');
  });

 
  $('.touch .sitenavigation li.nav-dropdown > a').on('touchend',
      function(e) {
          if ($('.menu-icon').is(':hidden')) {
              var parent = $(this).parent();
              $(this).find('.clicked').removeClass('clicked');
              if (parent.hasClass('clicked')) {
                  window.location.href = $(this).attr('href');
              } else {
                  $(this).addClass('linkclicked');

                  // close other open menus at this level
                  $(this).parent().parent().find('.clicked').removeClass('clicked');

                  parent.addClass('clicked');
                  e.preventDefault();
              }
          }
      });

  
  $('.sitenavigation li.nav-dropdown').click(
      function(event) {
          if (event.stopPropagation) {
              event.stopPropagation();
          } else {
              event.cancelBubble = true;
          }

          if ($('.menu-icon').is(':visible')) {
              $(this).find('> ul').toggle();
              $(this).toggleClass('expanded');
          }
      }
  );

  
  $('.sitenavigation a.nav-dropdown, .sitenavigation li.nav-dropdown a').click(
      function(event) {
          if (event.stopPropagation) {
              event.stopPropagation();
          } else {
              event.cancelBubble = true;
          }
      }
  );

 
  $('.no-touch .sitenavigation li').hover(
      function() {
          if (!$('.menu-icon').is(':visible')) {
              $(this).find('> ul').fadeIn(100);
          }
      },
      function() {
          if (!$('.menu-icon').is(':visible')) {
              $(this).find('> ul').fadeOut(100);
          }
      }
  );
});
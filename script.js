// Function to get weather information based on user's location
async function getWeatherByLocation() {
    try {
      // Get the user's location using Geolocation API
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Use fetch to get weather data from OpenWeatherMap
        const apiKey = '9ffbc24db6da404118e93cdc0a9db285'; // Your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const data = await response.json();
  
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
  
        // Display weather information on the website
        document.getElementById("city").innerHTML = ` ${cityName}`;
        document.getElementById("temperature").innerHTML = `${temperature}°C`;
        document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  
        // Update date and time
        updateDateTime();
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById("weather").innerHTML = "Unable to fetch weather data";
    }
  }
  
  // Function to update date and time
  function updateDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    document.getElementById("date").innerHTML = `${formattedDate}`;
  }
  
  // Call the function to get weather by location when the website is loaded
  getWeatherByLocation();
  ///
 // on document ready
$(document).ready(function() {

  // show/hide the mobile menu based on class added to container
  $('.menu-icon').click(function() {
      $(this).parent().toggleClass('is-tapped');
      $('#hamburger').toggleClass('open');
  });

  // handle touch device events on drop down, first tap adds class, second navigates
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

  // handle the expansion of mobile menu drop down nesting
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

  // prevent links for propagating click/tap events that may trigger hiding/unhiding
  $('.sitenavigation a.nav-dropdown, .sitenavigation li.nav-dropdown a').click(
      function(event) {
          if (event.stopPropagation) {
              event.stopPropagation();
          } else {
              event.cancelBubble = true;
          }
      }
  );

  // javascript fade in and out of dropdown menu
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
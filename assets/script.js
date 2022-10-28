"use strict";
//$(document).ready(function () {
  var APIKey = "8c701451be51374cf3c8dd878d14cbf6";
  var cities = [];

  var inputCity = $("#search-input").val();

  var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}`;
  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${APIKey}`;

  var weatherRootUrl = "https://api.openweathermap.org";

  var inputForm = $("#input-form");
  var searchInput = $("#search-input");
  var searchedCities = $("#searched-cities");
  var todayForecast = $("#today-forecast");
  var fiveDayForecast = $("#5-day-forecast");
  dayjs.extend(window.dayjs_plugin_utc);
  dayjs.extend(window.dayjs_plugin_timezone);

  var days = dayjs().format("M/D/YYYY");

  var day1 = dayjs().add(1, "days");
  var day2 = dayjs().add(2, "days");
  var day3 = dayjs().add(3, "days");
  var day4 = dayjs().add(4, "days");
  var day5 = dayjs().add(5, "days");

  //function to retrieve most recently searched city form localStorage --may not need this anymore...
  function showLatestCity() {
    var latestCity = localStorage.getItem("latestCity");
    if (latestCity) {
      inputCity = latestCity;
    }
  }
  showLatestCity();

  //function to retrieve recently searched cities from local storage.
  function showSavedCities() {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities) {
      cities = savedCities;
    }
  }
  showSavedCities();
  //event handler search button
  $("#search-button").on("click", (e) => {
    e.preventDefault();
    getCity();
    searchCity();
    listCitiesOnPage();
  });
  //saving cities in localStorage and pushing them into an empty array called cities. 
  function saveCity() {
    var inputCity = $("#search-input").val();
    if (inputCity && cities.includes(inputCity) === false) {
      cities.push(inputCity);

      console.log(cities);
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }

  function getCity() {
    inputCity = $("#search-input").val();

    console.log(cities);
  }
  //function to list searched cities on page
  function listCitiesOnPage() {
    inputCity = $("#search-input").val();

    for (let i = cities.length - 1; i >= 0; i--) {
      var shortenedCities = cities.slice(0, 5);
   
    $("#searched-cities").text("");
    shortenedCities.forEach(function (inputCity) {
        $("#searched-cities").prepend(
            "<button><button>" + inputCity + "</button></button>"
        )});
    };
  }
  listCitiesOnPage();
//API call for the city to retrieve lat/long from its data in order to get the weather data in the next API call.
  function searchCity() {
    const inputCity = document.getElementById("search-input");
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity.value}&appid=${APIKey}`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (!data) {
          alert("Location not found");
        } else {
          saveCity();
          let lat = data[0].lat;
          let lon = data[0].lon;
          console.log(data[0]);
          console.log(data[0].lon);
          console.log(data[0].lat);
          console.log(inputCity.value);
          fetchWeather(lat, lon);
           
        return lat, lon;
        }

        //  .catch(function (err) {
        //      console.error(err);
      });
  }
//API call to get the weather data via lat/long.
  function fetchWeather (lat, lon) {
    var apiUrl = `${weatherRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}&cnt=6`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var coordinates = [];
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        console.log(data);
        
        coordinates.push(lat);
        coordinates.push(lon);
    
        var localName = inputCity;
        // for(let i =0; i < response.list.length; i++){}

        var localTemp = data.list[0].main.temp;
        var localHum = data.list[0].main.humidity;
        var localWind = data.list[0].wind.speed;
        var localIcon = data.list[0].weather[0].icon;
        $("#icon").html(
          `<img src="http://openweathermap.org/img/wn/${localIcon}@2x.png">` /* ----icon does not work --- */
        );
        //`<img src="https://openweathermap.org/img/w/${localIcon}.png">`);

        console.log(localIcon);
        $("#city-name").html(localName + " " + "(" + days + ")");
        $("#temperature").text(
          "Current temperature (F): " + localTemp.toFixed(1)
        );
        $("#humidity").text("Humidity: " + localHum + "%");
        $("#wind").text("Wind Speed: " + localWind + "mph");
        $("#date1").text(day1);
        $("#date2").text(day2);
        $("#date3").text(day3);
        $("#date4").text(day4);
        $("#date5").text(day5);
        var day1Temp = data.list[1].main.temp;
        var day1Hum = data.list[1].main.humidity;
        var day1Wind = data.list[1].wind.speed;
        var day1LocalIcon = data.list[1].weather[0].icon;

        var day2Temp = data.list[2].main.temp;
        var day2Hum = data.list[2].main.humidity;
        var day2Wind = data.list[2].wind.speed;
        var day2LocalIcon = data.list[2].weather[0].icon;

        var day3Temp = data.list[3].main.temp;
        var day3Hum = data.list[3].main.humidity;
        var day3Wind = data.list[3].wind.speed;
        var day3LocalIcon = data.list[3].weather[0].icon;

        var day4Temp = data.list[4].main.temp;
        var day4Hum = data.list[4].main.humidity;
        var day4Wind = data.list[4].wind.speed;
        var day4LocalIcon = data.list[4].weather[0].icon;

        var day5Temp = data.list[5].main.temp;
        var day5Hum = data.list[5].main.humidity;
        var day5Wind = data.list[5].wind.speed;
        var day5LocalIcon = data.list[5].weather[0].icon;

        $("#icon1").html(
          `<img src="https://openweathermap.org/img/wn/${day1LocalIcon}@2x.png">`
        );
        $("#temp1").text("Temp: " + day1Temp.toFixed(1));
        $("#hum1").text("Hum: " + day1Hum + "%");
        $("#wind1").text("Wind: " + day1Wind + "mph");

        $("#icon2").html(
          `<img src="https://openweathermap.org/img/wn/${day2LocalIcon}@2x.png">`
        );
        $("#temp2").text("Temp: " + day2Temp.toFixed(1));
        $("#hum2").text("Hum: " + day2Hum + "%");
        $("#wind2").text("Wind: " + day2Wind + "mph");

        $("#icon3").html(
          `<img src="https://openweathermap.org/img/wn/${day3LocalIcon}@2x.png">`
        );
        $("#temp3").text("Temp: " + day3Temp.toFixed(1));
        $("#hum3").text("Hum: " + day3Hum + "%");
        $("#wind3").text("Wind: " + day3Wind + "mph");

        $("#icon4").html(
          `<img src="https://openweathermap.org/img/wn/${day4LocalIcon}@2x.png">`
        );
        $("#temp4").text("Temp: " + day4Temp.toFixed(1));
        $("#hum4").text("Hum: " + day4Hum + "%");
        $("#wind4").text("Wind: " + day4Wind + "mph");

        $("#icon5").html(
          `<img src="https://openweathermap.org/img/wn/${day5LocalIcon}@2x.png">`
        );
        $("#temp5").text("Temp: " + day5Temp.toFixed(1));
        $("#hum5").text("Hum: " + day5Hum + "%");
        $("#wind5").text("Wind: " + day5Wind + "mph");

       

        
      });
  }
  //event handler to turn listed cities on page into buttons.
  $(document).on("click", "button", (e) => {
    e.preventDefault();
   // $(".btn btn-primary text-center text-light bg-dark invisible").style.visibility = "visible"; //--- *don'know to code hidden/visibility
   //inputCity = $("#search-input").val();
   //$("#searched-cities").text("");
    searchCity();
   /* var cityButton = $(e.target).text();
    $("#search-input").val(cityButton);
    console.log(cityButton);*/
     
  });
  //event handler for clear button  --- *it's not showing up
  $("#clear-btn").click(() => {
    localStorage.removeItem("cities");
  });
//});

/*GIVEN a weather dashboard with form inputs

WHEN I search for a city
 
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
--> HTML: I need a form, input, search button, div for searched cities on the left --> aside
I need two divs on the right for current day forecast and 5-day-forecast.
---> APIs: I need the weather API and a geo API for the coordinates of the cities
---> frameworks: I need a time framework for the days of the forecasts and I'm using jQuery
---> I need an event handler for the search
---> I need localStorage, setItems and getItems of the search cities (results)
---> I need to append them to the searched-cities div 
---> I need to fetch the weather API 
---> I need to integrate the coordinates somehow.
---> sort out search parameters: precipitation as icon, temp, wind, and humidity. 
---> create elements for weather forecast cards: weather of today and 5-day forecast 
--->
--->*/

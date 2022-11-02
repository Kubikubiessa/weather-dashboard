"use strict";
$(document).ready(function () {
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

  //function to retrieve recently searched cities from local storage.
  function showSavedCities() {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities) {
      cities = savedCities;
    }
  }
  showSavedCities();

  //saving cities in localStorage and pushing them into an empty array called cities.
  function saveCity() {
    var inputCity = $("#search-input").val();
    if (inputCity && cities.includes(inputCity) === false) {
      cities.push(inputCity);

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
    //reverse-looping the cities so that the latest shows up first on the page.
    for (let i = cities.length - 1; i >= 0; i--) {
      var shortenedCities = cities.slice(0, 5);
      //getting the respective element in html, as empty text and prepending classified buttons with respective inputCity on them.
      $("#searched-cities").text("");
      shortenedCities.forEach(function (inputCity) {
        $("#searched-cities").prepend(
          "<button class='history' id='history-button'>" +
            inputCity +
            "</button>"
        );
      });
    }
  }

  listCitiesOnPage();
  //API call for the city to retrieve lat/long from its data in order to get the weather data in the next API call.
  function searchCity(prevCity) {
    const inputCity = prevCity || document.getElementById("search-input").value;
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${APIKey}`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (!data) {
          alert("Location not found");
        } else {
          saveCity();
          let lat = data[0]["lat"];
          let lon = data[0].lon;
          console.log(lat);
          console.log(data[0].lon);
          console.log(data[0].lat);
          console.log(inputCity);
          fetchWeather(lat, lon);

          return lat, lon;
        }
      });
  }
  //API call to get the weather data via lat/long.
  function fetchWeather(lat, lon) {
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

        var localName = data.city.name;

        var localTemp = data.list[0].main.temp;
        var localHum = data.list[0].main.humidity;
        var localWind = data.list[0].wind.speed;
        var localIcon = data.list[0].weather[0].icon;
        $("#icon").attr(
          "src",
          `http://openweathermap.org/img/wn/${localIcon}@2x.png`
        );

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

        $("#icon1").attr(
          "src",
          `https://openweathermap.org/img/wn/${day1LocalIcon}@2x.png`
        );
        $("#temp1").text("Temp: " + day1Temp.toFixed(1));
        $("#hum1").text("Hum: " + day1Hum + "%");
        $("#wind1").text("Wind: " + day1Wind + "mph");

        $("#icon2").attr(
          "src",
          `https://openweathermap.org/img/wn/${day2LocalIcon}@2x.png`
        );
        $("#temp2").text("Temp: " + day2Temp.toFixed(1));
        $("#hum2").text("Hum: " + day2Hum + "%");
        $("#wind2").text("Wind: " + day2Wind + "mph");

        $("#icon3").attr(
          "src",
          `https://openweathermap.org/img/wn/${day3LocalIcon}@2x.png`
        );
        $("#temp3").text("Temp: " + day3Temp.toFixed(1));
        $("#hum3").text("Hum: " + day3Hum + "%");
        $("#wind3").text("Wind: " + day3Wind + "mph");

        $("#icon4").attr(
          "src",
          `https://openweathermap.org/img/wn/${day4LocalIcon}@2x.png`
        );
        $("#temp4").text("Temp: " + day4Temp.toFixed(1));
        $("#hum4").text("Hum: " + day4Hum + "%");
        $("#wind4").text("Wind: " + day4Wind + "mph");

        $("#icon5").attr(
          "src",
          `https://openweathermap.org/img/wn/${day5LocalIcon}@2x.png`
        );

        $("#temp5").text("Temp: " + day5Temp.toFixed(1));
        $("#hum5").text("Hum: " + day5Hum + "%");
        $("#wind5").text("Wind: " + day5Wind + "mph");
      });
  }

  //event handler to turn listed cities on page into buttons.
  $(document).on("click", "button", (e) => {
    e.preventDefault();
    if (e.target.attributes[0].nodeValue === "history") {
      searchCity(e.target.innerText);
    }
  });
  //event handler for clear button
  $("#clear-btn").click(() => {
    function removeElement(searchedCities) {
      $(searchedCities).parent("#history-button").remove();
    }

    $("#history-button").html = "";
    $("#searched-cities").empty();
    localStorage.clear();

    removeElement();
  });
  //event handler search button
  $("#search-button").on("click", (e) => {
    e.preventDefault();
    saveCity();
    getCity();
    searchCity();
    listCitiesOnPage();
    $("#search-input").val("");
  });
});

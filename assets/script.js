'use strict';
$(document).ready(function () {
var APIKey = '2efda6eaf654946c92be756fa3beded6';
var cities = [];
var inputCity = $("#search-input").val();
//var city;
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}`;

//"http://api.openweathermap.org/data/2.5/weather?appid=" + APIKey;
var weatherRootUrl = 'https://api.openweathermap.org';
//var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?=appid=${APIKey}`;
var inputForm = $("#input-form");
var searchInput = $("#search-input");
var searchedCities = $("#searched-cities");
var todayForecast = $("#today-forecast");
var fiveDayForecast = $("#5-day-forecast");
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone);
var now = dayjs()
var days = dayjs().format('M/D/YYYY');

var day1 = dayjs().add(1, "days");
var day2 = dayjs().add(2, "days");
var day3 = dayjs().add(3, "days");
var day4 = dayjs().add(4, "days");
var day5 = dayjs().add(5, "days");

//function to retrieve most recently searched city form localStorage
function showLatestCity () {
    var latestCity = localStorage.getItem("latestCity");
    if (latestCity) {
        inputCity = latestCity;
    }else{
        inputCity = "Salt Lake City"
        searchCity();

    }
}
showLatestCity();

//function to retrieve recently searched cities from local storage.
function showSavedCities () {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities) {
        cities =savedCities;
    } else {
        cities = []
    }

}

showSavedCities()
//event handler 
$("#search-button").on("click", (e) => {
    e.preventDefault();
    getCity();
    searchCity();
    $("#search-input").val("");
    //listCities();
})
function saveCity() {
    // $(this).siblings(".description").val();
    var inputCity = $("#search-input").val();
    localStorage.setItem("latestCity", inputCity);
    cities.push(inputCity);
    localStorage.setItem("cities", JSON.stringify(cities));
  

}


function getCity() {
    inputCity = $("#search-input").val();
    if (inputCity && cities.includes(inputCity) == false) {
        saveCity();
        return inputCity;
    }else if (!inputCity){
    alert("enter a valid city");
    }
}

//console.log(saveCity());
function searchCity() {
var coordinates = [];
 
    var lat = location.lat;
    var lon = location.lon;
    var city = location.name;
//var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}`;
var apiUrl =  `${weatherRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
fetch(apiUrl)
.then(function(response){
    coordinates.push(response.coord.lat);
    coordinates.push(response.coord.lon);
    var cityName = response.name;

    return response.json()

})
.then(function(data) {
    console.log(data)

    .catch(function (err) {
        console.error(err);
});
})


};

})


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


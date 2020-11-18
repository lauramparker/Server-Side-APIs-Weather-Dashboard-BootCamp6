//VARIABLES

    var currentCity = $("#currentCity"); 

    var currentDay;

    var searchCity; 

 

//API key
var APIKey = "1b758f2281f1833aa291dff536f4b566"; //Current forecast APIKEY

var fivedayAPIKey = "65af81772398c8021de436a5afa38da3"; //5 day forecast API Key
      
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=1b758f2281f1833aa291dff536f4b566";

var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchCity + "&cnt=5&appid=65af81772398c8021de436a5afa38da3";
    

//FUNCTIONS

//Part 1 - Create the search input field. Save and set text of previous cities searched

    //function to read value of searchCity and call data after clicking search button
$(document).ready(function ()  { 
    $(".searchbtn").on("click", function (){
           
            var searchCity= $("#searchCity").val().trim(); //reads the City Name that was entered to search
            console.log(searchCity);
            searchCity.attr(data-search); //add data-attribute to log all previous searches
        });

}); //end of document ready function



// //Part 2 - Create the dynamic elements for today's weather in the current search city

    $.ajax({ //Current Day & City
                url: "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=1b758f2281f1833aa291dff536f4b566",
                method: "GET"
            })
            .then(function(response) {
             //   console.log(response);
                $("#currentCityName").text(response.name); // displays the current searched city name
                $("#currentCityName").append(moment.unix((response.dt)).format("MM/DD/YYYY"));
                $("#currentCityName").append("<img src='" + response.weather.icon  + "'>" + "</br>"); // ???ICON IMAGE
                $("#currentCityData").append("Temperature: " + response.main.temp + "</br>"); //make list item?
                $("#currentCityData").append("Humidity: " + response.main.humidity + "</br>");
                $("#currentCityData").append("Wind Speed: " + response.wind.speed + "MPH" + "</br>");
                $("#currentCityData").append("UV Index: " + response.main.temp + "</br>"); // ??? UV?
        
        
                });

     
      
    $.ajax({ //5 Day Forecast
                url:"https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=65af81772398c8021de436a5afa38da3",
                method: "GET"
            })
            .then(function(response){
                console.log(response); //need to loop over the list
                $("#dayOneDate").append(moment.unix((response.list[6].dt)).format("MM/DD/YYYY") + "</br>");
              //  $("#dayOneIcon").html("<img src='" + response.weather.icon  + "'>" + "</br>"); //returns & displays the weather icon
                $("#dayOneDate").append("Temp: " + response.list[6].main.temp + "</br>");
                $("#dayOneDate").append("Humidity: " + response.list[6].main.humidity + "</br>");
        
        
                });

   

//     // append row & col for each: temperature, humidity, wind speed, UV index

//     //2. 5-Day Forecast header
//     // append current date + 1 day to #inoneday, etc

//     $(".list-group").each(function() {
       
//         for (var i = 0; i < 6; i++) {
//             var futureDate=(moment().format('MM/DD/YYYY') + i);
            
//             for (var i = 0; i < 6; i++) {
//                 $(".date").text(futureDate);

//             };
//         };
//     });



    //Part 3 -Run the Ajax calls to OPenWeatherMap API and store the data


    


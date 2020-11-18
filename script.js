//VARIABLES

    var currentCity = $("#currentCity"); 

    var currentDay;

    var searchCity; 

 

//API key
var APIKey = "1b758f2281f1833aa291dff536f4b566"; //Current forecast APIKEY
      
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=1b758f2281f1833aa291dff536f4b566";

var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchCity + "&cnt=5&appid=1b758f2281f1833aa291dff536f4b566";
    

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
                console.log(response);
                $("#currentCityName").text(response.name); // displays the current searched city name
                $("#currentCityName").append(moment().format('MM/DD/YYYY')); 
                $("#currentCityName").append("<img src='" + response.icon  + "'>"); // ???ICON IMAGE
                $("#currentCityData").append("Temperature: " + response.main.temp + "</br>"); //make list item?
                $("#currentCityData").append("Humidity: " + response.main.humidity + "</br>");
                $("#currentCityData").append("Wind Speed: " + response.wind.speed + "MPH" + "</br>");
                $("#currentCityData").append("UV Index: " + response.main.temp + "</br>"); // ??? UV?
        
        
                });

     
        
    $.ajax({ //5 Day Forecast TBD - include in above document.ready
                url:"https://api.openweathermap.org/data/2.5/forecast/daily?q=Boston&cnt=5&appid=1b758f2281f1833aa291dff536f4b566",
                method: "GET"
            })
            .then(function(response){
                console.log(response); //should we store EACH list [] set in a response 1, 2, 3, 4, 5?
                $().text((moment().format('MM/DD/YYYY')) + 1); //convert unix timestamp to day... var dateString = moment.unix(value).format("MM/DD/YYYY")
                $("#dayOneIcon").html(response.name); //returns & displays the weather icon
                $("#dayOneTemp").text("Temp: " + response.main.temp);
                $("#dayOneHUmid").text("Humidity: " + response.main.humidity);
        
        
        
//             });



       




        

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


    


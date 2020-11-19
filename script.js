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
            localStorage
        });

}); //end of document ready function



// //Part 2 - Create the dynamic elements for today's weather in the current search city

    $.ajax({ //Current Day & City
                url: "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=1b758f2281f1833aa291dff536f4b566",
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
             //  var iconCode =  response.weather.icon; 
              // var iconURL = `"https://openweathermap.org/img/wn/"+${iconCode}+"@2x.png"`;
               var iconURL = "https://openweathermap.org/img/wn/10d@2x.png";

                $("#currentCityName").append("<h4>" + response.name + "</h4>"); // displays the current searched city name
                $("#currentCityRow").append("<h4>" + "  (" + moment.unix((response.dt)).format("MM/DD/YYYY") + ")" + "</h4>");
                $("#currentCityRow").append("<img src=" + iconURL +">"+"</br>");
                $("#currentCityData").append("<div>" + "Temperature: " + response.main.temp + " F" + "</div>"); //make list item?
                $("#currentCityData").append("</br>" + "<div>" + "Humidity: " + response.main.humidity + "</div>");
                $("#currentCityData").append("</br>" + "<div>" + "Wind Speed: " + response.wind.speed + " MPH" + "</div>");
                $("#currentCityData").append("</br>" + "<div>" + "UV Index: " + response.main.temp + "</div>" + "</br>"); // ??? UV?
        
        
                });

     
      
    $.ajax({ //5 Day Forecast
                url:"https://api.openweathermap.org/data/2.5/forecast?q=Boston&units=imperial&appid=65af81772398c8021de436a5afa38da3",
                method: "GET"
            })
            .then(function(response){
                console.log(response); //need to loop over the list

                var fivedayiconURL = "https://openweathermap.org/img/wn/10d@2x.png";

                $("#dayOneDate").append(moment.unix((response.list[6].dt)).format("MM/DD/YYYY") + "</br>");
                $("#dayOneDate").append("<img src=" + fivedayiconURL +">"+"</br>"); //returns & displays the weather icon
                $("#dayOneDate").append("<small>" + "Temp: " + response.list[6].main.temp + "F" + "</small>" + "</br>");
                $("#dayOneDate").append("</br>" + "<small>" + "Humidity: " + response.list[6].main.humidity + "</small>" + "</br>");
        
        
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





    


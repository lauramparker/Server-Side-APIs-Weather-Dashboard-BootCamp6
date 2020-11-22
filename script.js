//VARIABLES

    var currentCity = $("#currentCity"); 

    var searchCity;

    var UVIndex;

    var searchList=[]; //empty array for rendering searched for cities in left sidebar. event handler pushes values into aray

 

//API key
var APIKey = "1b758f2281f1833aa291dff536f4b566"; //Current forecast APIKEY

var fivedayAPIKey = "65af81772398c8021de436a5afa38da3"; //5 day forecast API Key

var uvIndexAPIKey = "1f3df3f7624cfc5a7a0d585bce621279"
      
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=1b758f2281f1833aa291dff536f4b566";

var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchCity + "&cnt=5&appid=65af81772398c8021de436a5afa38da3";
    




//FUNCTIONS



//function to render button for serached city to search button list. researches city on button
function pastSearch() {

    var searchCity= $("#searchCity").val().trim();

  
    var oldSearch = $("#searchOne").prepend("<div>" + "<button class= btn btn-block, btn btn-outline-secondary >" + searchCity + "</button>" + "</div>");
    var recallSearch = oldSearch.val().trim();
        console.log(recallSearch);
     
};


//function to save past data to local storage
function saveSearch(searchCity) {
    
    var searchCity= $("#searchCity").val().trim();

    // format newSearch object
        var newSearch = {searchCity: searchCity};
        
            // save to localstorage
        window.localStorage.setItem("searchList", JSON.stringify(newSearch));
          
          var searchList =
          JSON.parse(window.localStorage.getItem("searchList"));
          console.log(searchList);
 
           
};


//Part 1 - Create the search input field. 


//function to read value of searchCity and call API data after clicking search button


$(document).ready(function ()  { 

$("#searchbtn").on("click", function (event){
        event.preventDefault();

        //deleting the previous elements
      //  $("#currentCityName").empty();
        $("#currentCityRow").empty();
        $("#currentCityData").empty();
        $("#fiveDayForecast").empty();

            var searchCity= $("#searchCity").val().trim(); //reads the City Name that was entered to search



// Part 2 - Create the dynamic elements for today's weather in the current search city

//API Call for Current Day Forecast
    $.ajax({ //Current Day & City
        
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=1b758f2281f1833aa291dff536f4b566",
                method: "GET"
            })
            .then(function(response) {
                console.log(response);

                var iconCode = response.weather[0].icon;
                console.log(iconCode);
           
                var iconURL = "https://openweathermap.org/img/wn/" + iconCode +"@2x.png";

                $("#currentCityRow").append("<h4 class=ml-2>" + response.name + "</h4>"); // displays the current searched city name
                $("#currentCityRow").append("<h4 class=ml-2>" + "(" + moment.unix((response.dt)).format("MM/DD/YYYY") + ")" + "</h4>");
                $("#currentCityRow").append("<img src=" + iconURL +">"+"</br>");
                $("#currentCityData").append("<div>" + "Temperature: " + response.main.temp + " °F" + "</div>"); //make list item?
                $("#currentCityData").append("</br>" + "<div>" + "Humidity: " + response.main.humidity + " %" + "</div>");
                $("#currentCityData").append("</br>" + "<div>" + "Wind Speed: " + response.wind.speed + " MPH" + "</div>");
               
                var cityLat = response.coord.lat;
                var cityLon = response.coord.lat;
            



                        //Nested API Call for UV Index - 
                        $.ajax({

                            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=1b758f2281f1833aa291dff536f4b566",
                            method: "GET"
                        })
                        .then(function(response) {
                            
                            
                            var UVIndex = response.value
                            
                            if ((UVIndex >= 3) && (UVIndex <= 5)) { //If/Else statements to change indicator color for UV Index Badge
                               
                                $("#currentCityData").append("</br>" + "<div>" + "UV Index: " + "<span class='badge badge-success'>" + UVIndex + "</span>" + "</div>" + "</br>"); 
                            } 

                                else if ((UVIndex >= 0) && (UVIndex <= 2)) {

                                    $("#currentCityData").append("</br>" + "<div>" + "UV Index: " + "<span class='badge badge-warning'>" + UVIndex + "</span>" + "</div>" + "</br>"); 
                                }       
                                    
                                    else {

                                        $("#currentCityData").append("</br>" + "<div>" + "UV Index: " + "<span class='badge badge-danger'>" + UVIndex + "</span>" + "</div>" + "</br>"); 
                                    }
                        });


                });// end first AJAX call and nested AJAX call




// Part 3 - Create the dynamic elements for 5 day weather forecast 
      
    $.ajax({ //5 Day Forecast
                url:"https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=65af81772398c8021de436a5afa38da3",
                method: "GET"
            })
            .then(function(response){
              console.log(response); //need to loop over the list

               
                
                for (var i = 0; i < 40; i+=8) { //Dated is stored in 3 hour increments. Need to increase every 24 hours, thus i+=8

                    var forecastCol = $("<col>");
                    var forecastList = $("<list-group>");
                    forecastCol.addClass("mr-4");
                    forecastList.addClass("list-group-item list-group-item-action flex-column align-items-start");
                    forecastList.addClass("text-light bg-primary");
                        //date
                        forecastList.append("<h5>" + moment.unix((response.list[i].dt)).format("MM/DD/YYYY")+ "</h5>" + "</br>");
                        
                        //weather icon
                        var fivedayicon= response.list[i].weather[0].icon;
                        console.log(fivedayicon);
                        var fivedayiconURL = "https://openweathermap.org/img/wn/" + fivedayicon + "@2x.png";

                        forecastList.append("<img src=" + fivedayiconURL +">"+"</br>"); //returns & displays the weather icon
                        
                        //Temp & Humidity
                        forecastList.append("<small>" + "Temp: " + response.list[i].main.temp + " °F" + "</small>" + "</br>");
                        forecastList.append("<small>" + "Humidity: " + response.list[i].main.humidity + " %" + "</small>" + "</br>");
        
                               
                    //appending elements to DOM
                    $("#fiveDayForecast").append(forecastCol);
                    forecastCol.append(forecastList);
                
                   
                    };


                });


    //call saveSearch to store in local storage
    saveSearch(searchCity);

    //call pastSearch functions to render city buttons 
    pastSearch(searchCity);
  
              
}); //end of click handler function containing 3 AJAX calls

}); //end of document ready function
    


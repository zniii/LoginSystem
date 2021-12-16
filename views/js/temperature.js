//this is an api for weather
$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Kathmandu,npl&APPID=dbefe369e72cf1ed393b9a856b450dc8", function(data){
    var temperature = data.main.temp;
    var climate = data.weather[0].main;
    $(".temperature").append(temperature);
    $(".climate").append(climate);
});
//this is api for world
$.getJSON("http://worldtimeapi.org/api/timezone/Asia/Kathmandu", function(data){
    console.log(data)
    var location = data.timezone;
    var time = data.utc_datetime;
    $(".location").append(location);
});
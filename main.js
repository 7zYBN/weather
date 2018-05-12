var lon, lat
var options = {
    enableHighAccuracy: true,
    //timeout: 5000,
    maximumAge: 0
}

function one_day_main() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3",
        function (jd) {
            $.each(jd.weather, function (key, value) {
                var image_icon = document.createElement("IMG")
                image_icon.src = "http://openweathermap.org/img/w/" + value.icon + ".png"
                document.getElementById("icon").appendChild(image_icon)
                document.getElementById("main_weather").appendChild(document.createTextNode(value.description))
            })
            document.getElementById("temp").appendChild(document.createTextNode("Temperature: " + jd.main.temp + " °C"));
            document.getElementById("pressure").appendChild(document.createTextNode("Pressure: " + jd.main.pressure + " hPa(hectopascal)"));
            document.getElementById("humidity").appendChild(document.createTextNode("Humidity: " + jd.main.humidity + " %"));
            document.getElementById("wind_speed").appendChild(document.createTextNode("Wind speed: " + jd.wind.speed + " Meters/sec"));
        })
}

$(document).ready(function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function search_position(real_position) {
            lon = real_position.coords.longitude;
            lat = real_position.coords.latitude;
            one_day_main();
        }, function error_search_position(err) {
            alert("Error code" + err.code + "; Error message" + err.message);
        }, options)
    } else {
        alert("geolocation не поддерживается");
    }
})

function clear_blocks(block){
    for (var i =0; i < document.getElementsByClassName(block).length; i++){
        document.getElementsByClassName(block)[i].innerHTML = "";
    }
}


function several_days_average(days_count) {
    var first_day_hours_count = 0;
    //http://api.openweathermap.org/data/2.5/forecast?lat=53.9265784&lon=27.4922899&units=metric&appid=3603fadaadd944e17ef375b784059be3    дом
    //http://api.openweathermap.org/data/2.5/forecast?lat=53.858757700000005&lon=27.581605399999997&units=metric&appid=3603fadaadd944e17ef375b784059be3    работа
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
        var new_span;
        var sum_temp;
        var day_number = 0;
        var options_for_date = {
            month: 'long',
            day: 'numeric'
        };
        $.each(jd.list, function (key, value) {
            $.each(value.weather, function (key_weather, value_weather) {
                if (key < (days_count - 1) * 8 + first_day_hours_count) {
                    var date_json = new Date(value.dt_txt);
                    date_json = date_json.toLocaleString("en-US", options_for_date);
                    if (key !== 0) {
                        if (value.dt_txt.substr(0, 10) !== jd.list[key - 1].dt_txt.substr(0, 10)) {
                            day_number++;
                            new_span = document.createElement("span");
                            if (day_number == 1){
                                new_span.appendChild(document.createTextNode(Math.round(sum_temp / first_day_hours_count / day_number)));
                            }
                            else{
                                new_span.appendChild(document.createTextNode(Math.round(sum_temp / ((key -  first_day_hours_count) / (day_number - 1)))));
                            }
                            document.getElementsByClassName("main")[day_number - 1].appendChild(new_span);
                            sum_temp = value.main.temp;
                            new_span = document.createElement("span");
                            new_span.appendChild(document.createTextNode(date_json));
                            document.getElementsByClassName("main")[day_number].appendChild(new_span);
                        } else {
                            if (value.dt_txt.substr(0, 10) == jd.list[0].dt_txt.substr(0, 10)) {
                                first_day_hours_count++;
                            }
                            sum_temp += value.main.temp;
                            if (key + 1 == (days_count - 1) * 8 + first_day_hours_count) {
                                day_number++;
                                new_span = document.createElement("span");
                                new_span.appendChild(document.createTextNode(Math.round(sum_temp / ((key -  first_day_hours_count + 1) / (day_number - 1)))));
                                document.getElementsByClassName("main")[day_number - 1].appendChild(new_span);
                            }
                        }
                    } else {
                        first_day_hours_count++;
                        sum_temp = value.main.temp;
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(date_json));
                        document.getElementsByClassName("main")[0].appendChild(new_span);
                    }

                }
            })
        })
        
    })
}


document.getElementById("three_days").onclick = function () {
    clear_blocks("main");
    clear_blocks("main_3hours");
    several_days_average(3);
}

document.getElementById("five_days").onclick = function () {
    clear_blocks("main");
    clear_blocks("main_3hours");
    several_days_average(5);
}



for (var i = 0; i < document.getElementsByClassName("main").length; i++){
    document.getElementsByClassName("main")[i].onclick = function (){
        if (this.innerHTML !== ""){
            clear_blocks("main_3hours");
            var date = new Date(this.childNodes[0].textContent);
            var now = new Date();
            date = now.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
            var days_count = 0;
            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
                $.each(jd.list, function(key, value){
                    if (value.dt_txt.substr(0,10) == date){
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(value.dt_txt));
                        document.getElementsByClassName("main_3hours")[days_count].appendChild(new_span);
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(Math.round(value.main.temp)));
                        document.getElementsByClassName("main_3hours")[days_count].appendChild(new_span);
                        days_count ++;
                    }
                })
            })
        }
        
    }
}

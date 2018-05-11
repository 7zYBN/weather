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
            console.log(lat + " " + lon)
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
        var color;
        var new_span;
        var sum_temp;
        var day_number = 0;
        


        $.each(jd.list, function (key, value) {
            $.each(value.weather, function (key_weather, value_weather) {
                color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
                if (key < (days_count - 1) * 8 + first_day_hours_count) {
                    var date_json = JSON.stringify(value.dt_txt);
                    switch (date_json.substr(6, 2)) {
                        case "01":
                            month = "January ";
                            break;
                        case "02":
                            month = "February ";
                            break;
                        case "03":
                            month = "March ";
                            break;
                        case "04":
                            month = "April ";
                            break;
                        case "05":
                            month = "May ";
                            break;
                        case "06":
                            month = "June ";
                            break;
                        case "07":
                            month = "July ";
                            break;
                        case "08":
                            month = "August ";
                            break;
                        case "09":
                            month = "September ";
                            break;
                        case "10":
                            month = "October ";
                            break;
                        case "11":
                            month = "November ";
                            break;
                        case "12":
                            month = "December ";
                            break;
                    }
                    if (key !== 0) {
                        if (value.dt_txt.substr(0, 10) !== jd.list[key - 1].dt_txt.substr(0, 10)) {

                            day_number++;
                            new_span = document.createElement("span");
                            new_span.appendChild(document.createTextNode(Math.round(sum_temp / Math.floor(key / day_number))));
                            console.log(sum_temp + " / " + key + " / " + day_number);
                            document.getElementsByClassName("main")[day_number - 1].appendChild(new_span);
                            

                            sum_temp = value.main.temp;
                            new_span = document.createElement("span");
                            new_span.appendChild(document.createTextNode(month + JSON.stringify(value.dt_txt).substr(9, 2)));
                            document.getElementsByClassName("main")[day_number].appendChild(new_span);

                        } else {
                            if (value.dt_txt.substr(0, 10) == jd.list[0].dt_txt.substr(0, 10)) {
                                first_day_hours_count++;
                            }

                            sum_temp += value.main.temp;
                            if (key + 1 == (days_count - 1) * 8 + first_day_hours_count) {
                                day_number++;
                                new_span = document.createElement("span");
                                new_span.appendChild(document.createTextNode(Math.round(sum_temp / Math.floor(key / day_number))));
                                console.log(sum_temp + " / " + key + " / " + day_number);
                                document.getElementsByClassName("main")[day_number - 1].appendChild(new_span);
                            }
                        }

                    } else {
                        first_day_hours_count++;
                        sum_temp = value.main.temp;
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(month + JSON.stringify(value.dt_txt).substr(9, 2)));
                        document.getElementsByClassName("main")[0].appendChild(new_span);
                    }

                }
            })
        })
        
    })
    return first_day_hours_count;
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
            switch (this.childNodes[0].textContent.split(' ')[0]) {
                case "January":
                    month_number = "01";
                    break;
                case "February":
                    month_number = "02";
                    break;
                case "March":
                    month_number = "03";
                    break;
                case "April":
                    month_number = "04";
                    break;
                case "May":
                    month_number = "05";
                    break;
                case "June":
                    month_number = "06";
                    break;
                case "July":
                    month_number = "07";
                    break;
                case "August":
                    month_number = "08";
                    break;
                case "September":
                    month_number = "09";
                    break;
                case "October":
                    month_number = "10";
                    break;
                case "November":
                    month_number = "11";
                    break;
                case "December":
                    month_number = "12";
                    break;
            }
            var date = month_number + "-" + this.childNodes[0].textContent.split(' ')[1];
            var days_count = 0;
            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
                $.each(jd.list, function(key, value){
                    if (value.dt_txt.substr(5,5) == date){
                        color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(value.dt_txt));
                        document.getElementsByClassName("main_3hours")[days_count].appendChild(new_span);
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(value.main.temp));
                        document.getElementsByClassName("main_3hours")[days_count].appendChild(new_span);
                        days_count ++;
                    }
                })
            })
        }
        
    }
}

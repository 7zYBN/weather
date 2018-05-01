var lon, lat
var options = {
    enableHighAccuracy: true,
    //timeout: 5000,
    maximumAge: 0
}


/*function several_days(days_count) {
    //http://api.openweathermap.org/data/2.5/forecast?lat=27.4921971&lon=53.9265877&units=metric&appid=3603fadaadd944e17ef375b784059be3
    //http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
        var color;
        var new_div;
        var month;
        $.each(jd.list, function (key, value) {
            color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
            if (key < days_count * 8) {
                var new_ul = document.createElement("ul");
                var date_json = JSON.stringify(jd.list[key].dt_txt);
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
                new_ul.appendChild(document.createTextNode(month + JSON.stringify(jd.list[key].dt_txt).substr(9,2)));
                var new_li = document.createElement("li");
                new_li.appendChild(document.createTextNode(jd.list[key].main.temp + " °C"));
                new_ul.appendChild(new_li);
                new_li = document.createElement("li");
                new_li.appendChild(document.createTextNode(jd.list[key].main.pressure + " hPa"));
                new_ul.appendChild(new_li);
                new_li = document.createElement("li");
                new_li.appendChild(document.createTextNode(jd.list[key].main.humidity + " %"));
                new_ul.appendChild(new_li);
                new_li = document.createElement("li");
                new_li.appendChild(document.createTextNode(jd.list[key].wind.speed + " Meters/sec"));
                new_ul.appendChild(new_li);
                if (key == 0) {
                    new_div = document.createElement("div");
                    new_div.style.backgroundColor = color;
                    //new_div.style.height = 125;
                    new_div.setAttribute("id", "the_first_block");
                    new_div.appendChild(new_ul);
                    document.getElementById("weather_time").appendChild(new_div);
                }
                else {
                    if (jd.list[key].dt_txt.substr(0, 10) !== jd.list[key - 1].dt_txt.substr(0, 10)) {
                        new_div2 = document.createElement("div");
                        new_div2.style.backgroundColor = color;
                        //new_div.style.height = 125;
                        new_div2.setAttribute("id", "not_the_first_block");
                        new_div2.appendChild(new_ul)
                        document.getElementById("weather_time").appendChild(new_div2);
                    }
                    else {
                        if (jd.list[key].dt_txt.substr(0, 10) == jd.list[0].dt_txt.substr(0, 10)) {
                            new_div.appendChild(new_ul);
                        }
                        else {
                            new_div2.appendChild(new_ul);
                        }
                    }
                }
            }
        })
    })
}
*/

function one_day_main() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3",
        function (jd) {
            $.each(jd.weather, function (key, value) {
                var image_icon = document.createElement("IMG")
                image_icon.src = "http://openweathermap.org/img/w/" + value.icon + ".png"
                document.getElementById("icon").appendChild(image_icon)
                document.getElementById("main").appendChild(document.createTextNode(value.description))
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

document.getElementById("geolocation").onclick = function () { }


function several_days(days_count) {

    //http://api.openweathermap.org/data/2.5/forecast?lat=27.4921971&lon=53.9265877&units=metric&appid=3603fadaadd944e17ef375b784059be3
    //http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
        var color;
        var new_div;
        var month;
        $.each(jd.list, function (key, value) {
            color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
            if (key < days_count * 8) {
                //var new_ul = document.createElement("ul");
                var date_json = JSON.stringify(jd.list[key].dt_txt);
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
                new_div = document.createElement("div");
                var new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(month + JSON.stringify(jd.list[key].dt_txt).substr(9, 2) + "\n" + jd.list[key].main.temp + " °C\n" + jd.list[key].main.pressure + " hPa\n" + jd.list[key].main.humidity + " %\n" + jd.list[key].wind.speed + " Meters/sec\n"));
                new_div.appendChild(new_span);
                /*new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(jd.list[key].main.temp + " °C\n"));
                new_div.appendChild(new_span);
                //new_ul.appendChild(new_li);
                new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(jd.list[key].main.pressure + " hPa\n"));
                new_div.appendChild(new_span);
                //new_ul.appendChild(new_li);
                new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(jd.list[key].main.humidity + " %\n"));
                new_div.appendChild(new_span);
                //new_ul.appendChild(new_li);
                new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(jd.list[key].wind.speed + " Meters/sec\n"));
                new_div.appendChild(new_span);*/
                //new_ul.appendChild(new_li);
                if (key == 0) {

                    new_div.style.backgroundColor = color;
                    //new_div.style.height = 125;
                    new_div.setAttribute("id", "the_first_block");

                    document.getElementById("weather_time").appendChild(new_div);
                } else {
                    if (jd.list[key].dt_txt.substr(0, 10) !== jd.list[key - 1].dt_txt.substr(0, 10)) {

                        new_div.style.backgroundColor = color;
                        //new_div.style.height = 125;
                        new_div.setAttribute("id", "not_the_first_block");
                        new_div.appendChild(new_span)
                        document.getElementById("weather_time").appendChild(new_div);
                    } else {
                        if (jd.list[key].dt_txt.substr(0, 10) == jd.list[0].dt_txt.substr(0, 10)) {
                            new_div.appendChild(new_span);
                        } else {
                            new_div.appendChild(new_span);
                        }
                    }
                }
            }
        })
    })
}

function several_days_average(days_count) {
    var first_day_hours_count = 0;
    //http://api.openweathermap.org/data/2.5/forecast?lat=27.4921971&lon=53.9265877&units=metric&appid=3603fadaadd944e17ef375b784059be3    дом
    //http://api.openweathermap.org/data/2.5/forecast?lat=53.858757700000005&lon=27.581605399999997&units=metric&appid=3603fadaadd944e17ef375b784059be3    работа
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {
        var color;
        var new_div;
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
                            new_div.appendChild(new_span);

                            alert(value_weather.description);





                            new_div.style['grid-column-end'] = 15 / days_count * day_number + 1;
                            sum_temp = value.main.temp;

                            new_div = document.createElement("div");
                            new_div.style.backgroundColor = color;
                            new_div.setAttribute("onclick", "div_click(this)");
                            new_div.setAttribute("id", "weather_time_grid_test_class");
                            new_span = document.createElement("span");
                            new_span.appendChild(document.createTextNode(month + JSON.stringify(value.dt_txt).substr(9, 2)));
                            new_div.appendChild(new_span);
                            new_div.style['grid-column-start'] = 15 / days_count * day_number + 1;
                            document.getElementById("weather_time_grid_test").appendChild(new_div);

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
                                new_div.appendChild(new_span);
                                new_div.style['grid-column-end'] = 15 / days_count * day_number + 1;
                                alert(value_weather.description);
                            }
                        }

                    } else {
                        first_day_hours_count++;
                        sum_temp = value.main.temp;
                        new_div = document.createElement("div");
                        new_div.style.backgroundColor = color;
                        new_div.setAttribute("onclick", "div_click(this)");
                        new_div.setAttribute("id", "weather_time_grid_test_class");
                        new_span = document.createElement("span");
                        new_span.appendChild(document.createTextNode(month + JSON.stringify(value.dt_txt).substr(9, 2)));
                        new_div.appendChild(new_span);
                        new_div.style['grid-column-start'] = 1;
                        document.getElementById("weather_time_grid_test").appendChild(new_div);
                    }

                }
            })
        })
        
    })
    return first_day_hours_count;
}


document.getElementById("three_days").onclick = function () {
    document.getElementById("weather_time").innerHTML = ""
    several_days(3);
}

document.getElementById("five_days").onclick = function () {
    document.getElementById("weather_time").innerHTML = ""
    several_days(5);
}

document.getElementById("grid_test").onclick = function () {
    document.getElementById("weather_time_grid_test").innerHTML = "";
    several_days_average(3);
}

document.getElementById("grid_test2").onclick = function () {
    document.getElementById("weather_time_grid_test").innerHTML = "";
    several_days_average(5);
}
//document.getElementById("weather_time_grid_test_class").style.cursor = 'pointer';

/*document.getElementById("weather_time_grid_test_class").onclick = function() {
    alert("kashdf");
}*/

function div_click(cliked_div) {
    var color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    switch (cliked_div.childNodes[0].textContent.split(' ')[0]) {
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
    var date = month_number + "-" + cliked_div.childNodes[0].textContent.split(' ')[1];
    var days_count = 0;
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3603fadaadd944e17ef375b784059be3", function (jd) {

        $.each(jd.list, function(key, value){
            if (value.dt_txt.substr(5,5) == date){
                days_count ++;
                new_div = document.createElement("div");
                new_div.style['grid-column-end'] = 24 / 8 * days_count + 1;
                new_div.style['grid-column-start'] = 24 / 8 * (days_count-1) + 1;
                new_div.style['grid-row'] = 2 / 3;
                new_div.style.backgroundColor = color;
                new_span = document.createElement("span");
                new_span.appendChild(document.createTextNode(JSON.stringify(value.dt_txt) + " " + value.main.temp));
                new_div.appendChild(new_span);
                document.getElementById("weather_time_grid_test").appendChild(new_div);
                
                
            }
        })
})
}
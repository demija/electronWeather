// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const axios = require('axios');
const search = document.getElementById('goBtn');

animateSun();

/*
const Store = require('electron-store');
const store = new Store();

store.set('unicorn', cityName);
console.log(store.get('unicorn'));

console.log("IZ BAZE: " + store.get('unicorn'));
*/

search.addEventListener('click', function() {
    const cityName = document.getElementById('cityName').value;
    
    if(cityName !== null && cityName !== '') {
        getWeather(cityName);
        getForecast(cityName);
        document.getElementById('cityName').value = '';
    }
});

function getWeather(cityName) {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: cityName,
            appid: 'cf06fb984f9d43a6b63abdfbbf30785d',
            units: 'metric'
        }
    }).then(res => {
        populateWeatherData(res);
    }).catch((error) => {
        //TODO
        console.error(error);
    });
}

function getForecast(cityName) {
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
        params: {
            q: cityName,
            cnt: 4,
            appid: 'cf06fb984f9d43a6b63abdfbbf30785d',
            units: 'metric'
        }
    }).then(res => {
        populateForecastData(res);
    }).catch((error) => {
        //TODO
        console.error(error);
    });
}

function populateWeatherData(res) {
    document.getElementById('currentWeatherIcon').className = getWeatherIconClass(res.data.weather[0].id, res.data.weather[0].icon);
    document.getElementById('temperature').innerHTML = Math.round(res.data.main.temp) + '<i class="wi wi-celsius"></i>';
    document.getElementById('feelsLike').innerHTML = 'Feels like ' + Math.round(res.data.main.feels_like) + '<i class="wi wi-celsius"></i>';
    document.getElementById('forecast').innerHTML = res.data.weather[0].main + ' - ' + res.data.weather[0].description;
    document.getElementById('location').innerHTML = res.data.name + ', ' + res.data.sys.country;
    document.getElementById('dt').innerHTML = getDtFromUnix(res.data.dt + res.data.timezone);
    document.getElementById('humidity').innerHTML = res.data.main.humidity + ' %';
    document.getElementById('pressure').innerHTML = res.data.main.pressure + ' hPa';
    document.getElementById('wind').innerHTML = res.data.wind.speed + ' m/s';
    document.getElementById('visibility').innerHTML = (res.data.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('clouds').innerHTML = res.data.clouds.all + ' %';
    setRainVolume(res.data.rain);
    setSnowVolume(res.data.snow);
    setSunPosition(res.data);
    setWind(res.data.wind.deg);
}

function populateForecastData(res) {
    let dailyForecastArray = res.data.list.slice(1, 4);
    let dailyForecast = document.getElementById('dailyForecast');
    dailyForecast.innerHTML = '';

    dailyForecastArray.forEach(element => {
        console.log(element);

        let cardHeader = document.createElement('div');
        cardHeader.className = 'card-header bg-transparent border-0 text-muted';
        cardHeader.innerText = getDayFromUnix(element.dt);

        let weatherIcon = document.createElement('i');
        weatherIcon.className = getWeatherIconClass(element.weather[0].id, element.weather[0].icon);

        let weatherIconHolder = document.createElement('p');
        weatherIconHolder.className = 'display-1 text-info py-3';
        weatherIconHolder.appendChild(weatherIcon);

        let forecastDescription = document.createElement('p');
        forecastDescription.className = 'text-muted';
        forecastDescription.innerText = element.weather[0].main;

        let temperatureMin = document.createElement('p');
        temperatureMin.className = 'text-muted';
        temperatureMin.innerHTML = '<i class="wi wi-direction-down"></i> ' + Math.round(element.temp.min) + '<i class="wi wi-celsius"></i>';

        let temperatureMax = document.createElement('p');
        temperatureMax.className = 'text-muted';
        temperatureMax.innerHTML = '<i class="wi wi-direction-up"></i> ' + Math.round(element.temp.max) + '<i class="wi wi-celsius"></i>';

        let temperatureDescription = document.createElement('div');
        temperatureDescription.className = 'd-flex justify-content-around text-muted px-2';
        temperatureDescription.appendChild(temperatureMin);
        temperatureDescription.appendChild(temperatureMax);

        let wind = document.createElement('p');
        wind.className = 'text-muted';
        wind.innerHTML = '<i class="wi wi-strong-wind"></i> ' + getWindDirectionIconClass(element.deg) + ' ' + element.speed + ' m/s';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center p-1';
        cardBody.appendChild(cardHeader);
        cardBody.appendChild(weatherIconHolder);
        cardBody.appendChild(forecastDescription);
        cardBody.appendChild(temperatureDescription);
        cardBody.appendChild(wind);

        let innerDivCard = document.createElement('div');
        innerDivCard.className = 'card m-2 border-0 rounded';
        innerDivCard.appendChild(cardHeader);
        innerDivCard.appendChild(cardBody);

        dailyForecast.appendChild(innerDivCard);
    });
}

function getHoursMinutesFromUnix(unix_timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    return date.getUTCHours() + ':' + date.getUTCMinutes();
}

function getDtFromUnix(unix_timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    return date.toLocaleString("en-US", {timeZoneName: "short"});
}

function getDayFromUnix(unix_timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let dateObject = new Date(unix_timestamp * 1000);
    return dateObject.toLocaleString("en-US", {weekday: "long"});
}

function getWeatherIconClass(weatherId, weatherIcon) {
    switch(weatherId) {
        case 200:
            if(weatherIcon == '11d') {
                return 'wi wi-day-storm-showers';
            }
            return 'wi wi-night-alt-storm-showers';

        case 201:
            if(weatherIcon == '11d') {
                return 'wi wi-day-thunderstorm';
            }
            return 'wi wi-night-alt-thunderstorm';

        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            return 'wi wi-thunderstorm';

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            if(weatherIcon == '09d') {
                return 'wi wi-day-rain-mix';
            }
            return 'wi wi-night-alt-rain-mix';

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            if(weatherIcon == '10d') {
                return 'wi wi-day-rain';
            }
            return 'wi wi-night-alt-rain';

        case 511:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            if(weatherIcon == '13d') {
                return 'wi wi-day-sleet';
            }
            return 'wi wi-night-alt-sleet';

        case 520:
        case 521:
        case 522:
        case 531:
            return 'wi wi-showers';

        case 600:
        case 601:
        case 602:
            if(weatherIcon == '13d') {
                return 'wi wi-day-snow';
            }
            return 'wi wi-night-alt-snow';

        case 701:
        case 721:
        case 741:
            if(weatherIcon == '50d') {
                return 'wi wi-day-fog';
            }
            return 'wi wi-night-fog';

        case 711:
            return 'wi wi-smoke';

        case 731:
        case 751:
        case 761:
            return 'wi wi-dust';

        case 762:
            return 'wi wi-volcano';

        case 771:
            return 'wi wi-strong-wind';
        
        case 781:
            return 'wi wi-tornado';

        case 800:
            if(weatherIcon == '01d') {
                return 'wi wi-day-sunny';
            }
            return 'wi wi-night-clear';

        case 801:
            if(weatherIcon == '02d') {
                return 'wi wi-day-cloudy';
            }
            return 'wi wi-night-alt-cloudy';

        case 802:
            if(weatherIcon == '03d') {
                return 'wi wi-day-cloudy';
            }
            return 'wi wi-night-alt-cloudy';

        case 803:
            return 'wi wi-cloud';

        case 804:
            return 'wi wi-cloudy';

        default:
            return 'wi wi-na';
    }
}

function getWindDirectionIconClass(windDirection) {
    switch(true) {
        case (windDirection >= 0 && windDirection < 23):
            return ' <i class="wi wi-wind towards-0-deg"></i>';

        case (windDirection >= 23 && windDirection < 45):
            return ' <i class="wi wi-wind towards-23-deg"></i>';

        case (windDirection >= 45 && windDirection < 68):
            return ' <i class="wi wi-wind towards-45-deg"></i>';

        case (windDirection >= 68 && windDirection < 90):
            return ' <i class="wi wi-wind towards-68-deg"></i>';

        case (windDirection >= 90 && windDirection < 113):
            return ' <i class="wi wi-wind towards-90-deg"></i>';

        case (windDirection >= 113 && windDirection < 135):
            return ' <i class="wi wi-wind towards-113-deg"></i>';

        case (windDirection >= 135 && windDirection < 158):
            return ' <i class="wi wi-wind towards-135-deg"></i>';

        case (windDirection >= 158 && windDirection < 180):
            return ' <i class="wi wi-wind towards-158-deg"></i>';

        case (windDirection >= 180 && windDirection < 203):
            return ' <i class="wi wi-wind towards-180-deg"></i>';

        case (windDirection >= 203 && windDirection < 225):
            return ' <i class="wi wi-wind towards-203-deg"></i>';

        case (windDirection >= 225 && windDirection < 248):
            return ' <i class="wi wi-wind towards-225-deg"></i>';

        case (windDirection >= 248 && windDirection < 270):
            return ' <i class="wi wi-wind towards-248-deg"></i>';

        case (windDirection >= 270 && windDirection < 293):
            return ' <i class="wi wi-wind towards-270-deg"></i>';

        case (windDirection >= 293 && windDirection < 313):
            return ' <i class="wi wi-wind towards-293-deg"></i>';

        case (windDirection >= 313 && windDirection < 336):
            return ' <i class="wi wi-wind towards-313-deg"></i>';
            
        default:
            return ' <i class="wi wi-wind towards-336-deg"></i>';
    }
}

function setSunPosition(data) {
    let sunPosition = document.getElementById('currentSunPosition');
    let currentTime = data.dt;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let currentPosition = (currentTime - sunrise) * 100 / (sunset - sunrise);

    if(currentPosition <= 0) {
        sunPosition.innerText = 0;
    } else if(currentPosition >=100) {
        sunPosition.innerText = 100;
    } else {
        sunPosition.innerText = currentPosition;
    }
    
    animateSun();
}

function animateSun() {
    $(".progress").each(function(){
        let $bar = $(this).find(".bar");
        let $val = $(this).find("span");
        let perc = parseInt( $val.text(), 10);
        
        $({p:0}).animate({p:perc}, {
            duration: 3500,
            easing: "swing",
            step: function(p) {
                $bar.css({
                    transform: "rotate("+ (45+(p*1.8)) +"deg)",
                });
                $val.text(p|0);
            }
        });
    });
}

function setRainVolume(rain) {
    if(rain !== null && rain !== undefined) {
        let rainVolume = document.getElementById('rainVolume');
        let lastThreeHours = rain["3h"];
        let lastHour = rain["1h"];

        if(lastThreeHours !== null && lastThreeHours !== undefined) {
            rainVolume.innerHTML = '<i class="wi wi-raindrop"></i> ' + lastThreeHours + ' mm';
            return;
        }

        if(lastHour !== null && lastHour !== undefined) {
            rainVolume.innerHTML = '<i class="wi wi-raindrop"></i> ' + lastHour + ' mm';
            return;
        }
    } else {
        rainVolume.innerHTML = '';
    }
}

function setSnowVolume(snow) {
    if(snow !== null && snow !== undefined) {
        let snowVolume = document.getElementById('snowVolume');
        let lastThreeHours = snow["3h"];
        let lastHour = snow["1h"];

        if(lastThreeHours !== null && lastThreeHours !== undefined) {
            snowVolume.innerHTML = '<i class="wi wi-snowflake-cold"></i> ' + lastThreeHours + ' mm';
            return;
        }

        if(lastHour !== null && lastHour !== undefined) {
            snowVolume.innerHTML = '<i class="wi wi-snowflake-cold"></i> ' + lastHour + ' mm';
            return;
        }
    } else {
        snowVolume.innerHTML = '';
    }
}

function setWind(windDirection) {
    let windDirectionIcon = document.getElementById('windDirection');
    windDirectionIcon.innerHTML = '<i class="wi wi-strong-wind"></i>';
    windDirectionIcon.innerHTML += getWindDirectionIconClass(windDirection);
}
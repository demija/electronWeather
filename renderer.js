// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const axios = require('axios');
const search = document.getElementById('goBtn');

var Card = require('./model/card.js');
var WindCard = require('./model/windCard.js');
var CardForecast = require('./model/cardForecast.js');
var CardSunPosition = require('./model/cardSunPosition.js');

var Util = require('./utils/util.js');
Util.animateSun();

//getCurrentLocation();

/*
const Store = require('electron-store');
const store = new Store();
store.set('test', cityName);
console.log(store.get('test'));
console.log(store.get('test'));
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
            cnt: 6,
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
    console.log("res");
    console.log(res);

    document.getElementById('currentWeatherIcon').className = Util.getWeatherIconClass(res.data.weather[0].id, res.data.weather[0].icon);
    document.getElementById('temperature').innerHTML = Math.round(res.data.main.temp) + '<i class="wi wi-celsius"></i>';
    document.getElementById('feelsLike').innerHTML = 'Feels like ' + Math.round(res.data.main.feels_like) + '<i class="wi wi-celsius"></i>';
    document.getElementById('forecast').innerHTML = res.data.weather[0].main + ' - ' + res.data.weather[0].description;
    document.getElementById('location').innerHTML = res.data.name + ', ' + res.data.sys.country;
    document.getElementById('dt').innerHTML = Util.getDtFromUnix(res.data.dt + res.data.timezone);
    setRainVolume(res.data.rain);
    setSnowVolume(res.data.snow);

    let humidityCard = new Card('Humidity', res.data.main.humidity + ' %', 'wi-humidity');
    let pressureCard = new Card('Pressure', res.data.main.pressure + ' hPa', 'wi-barometer');    
    let windCard = new WindCard('Wind', res.data.wind);

    //cardGroup
    let cardGroupFirstRow = document.createElement('div');
    cardGroupFirstRow.className = 'card-group';
    cardGroupFirstRow.appendChild(humidityCard.create());
    cardGroupFirstRow.appendChild(pressureCard.create());
    cardGroupFirstRow.appendChild(windCard.create());

    let sunPositionCard = new CardSunPosition('Sunrise/Sunset');
    let visibilityCard = new Card('Visibility', (res.data.visibility / 1000).toFixed(1) + ' km', 'wi-small-craft-advisory');
    let cloudinessCard = new Card('Cloudiness', res.data.clouds.all + ' %', 'wi-cloudy');

    //cardGroup
    let cardGroupSecondRow = document.createElement('div');
    cardGroupSecondRow.className = 'card-group';
    cardGroupSecondRow.appendChild(sunPositionCard.create());
    cardGroupSecondRow.appendChild(visibilityCard.create());
    cardGroupSecondRow.appendChild(cloudinessCard.create());

    //currentWeather
    let currentWeather = document.getElementById('currentWeather');
    currentWeather.innerHTML = '';
    currentWeather.appendChild(cardGroupFirstRow);
    currentWeather.appendChild(cardGroupSecondRow);

    Util.setSunPosition(res.data);
}

function populateForecastData(res) {
    let dailyForecastArray = res.data.list.slice(1, 6);
    let dailyForecast = document.getElementById('dailyForecast');
    dailyForecast.innerHTML = '';

    dailyForecastArray.forEach(element => {
        dailyForecast.appendChild(new CardForecast(element).create());
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

/*function getCurrentLocation() {
    if (window.navigator.geolocation) {
        // Geolocation available
        window.navigator.geolocation.getCurrentPosition(console.log, console.log);
    }
}*/
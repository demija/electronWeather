// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const axios = require('axios');

// Reference to button
const refresh = document.getElementById('refreshBtn');
let pokrenuto;

getWeather();
getForecast();

function getWeather() {
    pokrenuto = new Date();
    document.getElementById('currentDate').innerHTML = pokrenuto.getFullYear() + "/" + (pokrenuto.getMonth() + 1) + "/" + pokrenuto.getDate();;

    axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            id: '3191281',
            APPID: 'cf06fb984f9d43a6b63abdfbbf30785d',
            units: 'metric'
        }
    }).then(res => {
        populateWeatherData(res);
    });
}

function getForecast() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
            id: '3191281',
            APPID: 'cf06fb984f9d43a6b63abdfbbf30785d',
            units: 'metric'
        }
    }).then(res => {
        populateForecastData(res);
    });
}

function populateWeatherData(res) {
    const weatherId = res.data.weather[0].id;
    
    document.getElementById('location').innerHTML = res.data.name + ', ' + res.data.sys.country;
    document.getElementById('forecast').innerHTML = /*res.data.weather[0].main + ', ' +*/ res.data.weather[0].description;
    document.getElementById('currentWeatherIcon').src = './icons/' + res.data.weather[0].icon + '.png';
    document.getElementById('temperature').innerHTML = Math.round(res.data.main.temp) + '°C';
    document.getElementById('pressure').innerHTML = res.data.main.pressure + ' hPa';
    document.getElementById('humidity').innerHTML = res.data.main.humidity + ' %';
    //document.getElementById('vidljivost').innerHTML = (res.data.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('wind').innerHTML = res.data.wind.speed + ' m/s';
    //document.getElementById('vjetarPravac').innerHTML = res.data.wind.deg;
    document.getElementById('clouds').innerHTML = res.data.clouds.all + ' %';

    //const rain = res.data.rain.3h     // Rain volume for the last 3 hours
    //const snow = res.data.snow.3h     // Snow volume for the last 3 hours

    let date;
    let hours;
    let minutes;
    
    date = new Date(res.data.sys.sunrise * 1000);
    hours = date.getHours();
    minutes = date.getMinutes(); 
    document.getElementById('sunrise').innerHTML = hours + ':' + minutes;

    date = new Date(res.data.sys.sunset * 1000);
    hours = date.getHours();
    minutes = date.getMinutes();     
    document.getElementById('sunset').innerHTML = hours + ':' + minutes;

    /*date = new Date(res.data.dt * 1000);
    hours = date.getHours();
    minutes = date.getMinutes();
    document.getElementById('azurirano').innerHTML = 'Updated ' + hours + ':' + minutes;*/
}

function populateForecastData(res) {
    var forecastHoursArray = res.data.list.slice(1, 7);
    document.getElementById('forecastHoursElements').innerHTML = '';

    forecastHoursArray.forEach(element => {
        // krairanje span elementa vremena
        let innerSpanTime = document.createElement('span');
        innerSpanTime.className = 'font-weight-light';
        innerSpanTime.innerHTML = new Date(element.dt * 1000).getHours() + ' h';

        // krairanje span elementa prognoze
        let innerSpanDesc = document.createElement('span');
        innerSpanDesc.classList.add('float-right');
        innerSpanDesc.innerHTML = element.weather[0].description;

        // krairanje div col elementa
        let timeDescCol = document.createElement('div');
        timeDescCol.classList.add('col-sm-10');
        timeDescCol.appendChild(innerSpanTime);
        timeDescCol.appendChild(innerSpanDesc);

        // kreiranje temepreture
        let innerSpanTemp = document.createElement('span');
        innerSpanTemp.classList.add('font-weight-normal');
        innerSpanTemp.classList.add('float-right');
        innerSpanTemp.classList.add('tempFont');
        innerSpanTemp.innerHTML = Math.round(element.main.temp) + '°C';
        //kreiranje druge kolone
        let tempCol = document.createElement('div');
        tempCol.classList.add('col-sm-2');
        tempCol.appendChild(innerSpanTemp);

        // kreiranje reda i dodavanje col elementa
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.appendChild(timeDescCol);
        rowDiv.appendChild(tempCol);

        let liDiv = document.createElement('li');
        liDiv.classList.add('list-group-item');
        liDiv.appendChild(rowDiv);

        document.getElementById('forecastHoursElements').appendChild(liDiv);
    });

    /*
    // Days forecast
    let daysToShow = [];
    let daysMinTemp = [];
    let daysMaxTemp = [];
    let daysTempLabel = [];

    res.data.list.forEach(element => {
        var date = new Date(element.dt * 1000);

        if(daysToShow.indexOf(date.getDate()) === -1) {
            daysToShow.push(date.getDate());
        }
    });
    
    for(let i = 1; i < daysToShow.length; ++i) {
        let minTemp;

        res.data.list.forEach(element => {
            let date = new Date(element.dt*1000);
            let hours = date.getHours() - 2;
            
            if(date.getDate() == daysToShow[i] && hours == 6) {
                minTemp = Math.round(element.main.temp);
                daysMinTemp.push(minTemp);
            }

            if(date.getDate() == daysToShow[i] && hours == 12) {
                daysMaxTemp.push(Math.round(element.main.temp));
                daysTempLabel.push(date.getDate() + '.' + (date.getMonth() + 1));

                let iDiv = document.createElement('div');
                iDiv.classList.add('col-sm');
                iDiv.classList.add('text-center');
                document.getElementById('forecastDaysElements').appendChild(iDiv);

                let innerPTime = document.createElement('p');
                innerPTime.className = 'font-weight-normal';
                innerPTime.innerHTML = date.getDate() + '.' + (date.getMonth() + 1);

                let innerDiv = document.createElement('img');
                innerDiv.className = 'img-fluid';
                innerDiv.src = './icons/' + element.weather[0].icon + '.png';

                let innerPTemp = document.createElement('p');
                innerPTemp.classList.add('forecastDescription');
                innerPTemp.innerHTML = Math.round(element.main.temp) + '° / ' + minTemp + '°';

                let innerPDesc = document.createElement('p');
                innerPDesc.innerHTML = element.weather[0].description;

                iDiv.appendChild(innerPTime);
                iDiv.appendChild(innerDiv);
                iDiv.appendChild(innerPTemp);
                iDiv.appendChild(innerPDesc);
            }
        });
    }*/
}

// Listener to button click
/*refresh.addEventListener('click', function() {
    var datum = new Date();
    var diffMins = Math.round((((datum - pokrenuto) % 86400000) % 3600000) / 60000); // minutes

    if(diffMins >= 10) {
        getWeather();
        getForecast();
    }
})*/
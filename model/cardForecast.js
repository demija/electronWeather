var Util = require('../utils/util.js');

class CardForecast {
    constructor(element) {
        this.header = document.createElement('div');
        this.header.className = 'card-header bg-transparent border-0 text-muted';
        this.header.innerText = Util.getDayFromUnix(element.dt);

        this.body = document.createElement('div');
        this.body.className = 'card-body text-center p-1';

        let weatherIcon = document.createElement('i');
        weatherIcon.className = Util.getWeatherIconClass(element.weather[0].id, element.weather[0].icon);

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

        let windDescription = document.createElement('p');
        windDescription.className = 'text-muted';
        windDescription.innerHTML = '<i class="wi wi-strong-wind"></i> ' + Util.getWindDirectionIconClass(element.deg) + ' ' + element.speed + ' m/s';

        this.body.appendChild(weatherIconHolder);
        this.body.appendChild(forecastDescription);
        this.body.appendChild(temperatureDescription);
        this.body.appendChild(windDescription);
    }

    create() {
        let card = document.createElement('div');
        card.className = 'card m-2 border-0 rounded';
        card.appendChild(this.header);
        card.appendChild(this.body);

        return card;
    }
}

module.exports = CardForecast
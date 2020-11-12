//var Card = require('../model/card.js');
var Util = require('../utils/util.js');

class WindCard /*extends Card*/ {
    /*constructor(headerTitle, value, icon) {
        super(headerTitle, value, icon);
    }*/

    constructor(headerTitle, element) {
        this.header = document.createElement('div');
        this.header.className = 'card-header bg-transparent border-0 text-muted';
        this.header.innerText = headerTitle;

        this.body = document.createElement('div');
        this.body.className = 'card-body text-center p-1';

        let bodyValue = document.createElement('p');
        bodyValue.className = 'h3 text-info';
        bodyValue.innerText = element.speed + ' m/s';
        
        let iconValue = document.createElement('p');
        iconValue.className = 'h4 text-muted';
        iconValue.innerHTML = '<i class="wi wi-strong-wind"></i> ' + Util.getWindDirectionIconClass(element.deg);

        this.body.appendChild(bodyValue);
        this.body.appendChild(iconValue);
    }
    
    create() {
        let card = document.createElement('div');
        card.className = 'card m-2 border-0 rounded';
        card.appendChild(this.header);
        card.appendChild(this.body);

        return card;
    }
}

module.exports = WindCard
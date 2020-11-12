class CardSunPosition {
    constructor(headerTitle) {
        this.header = document.createElement('div');
        this.header.className = 'card-header bg-transparent border-0 text-muted';
        this.header.innerText = headerTitle;

        this.body = document.createElement('div');
        this.body.className = 'card-body p-1 mx-auto';

        let currentSunPosition = document.createElement('span');
        currentSunPosition.className = 'd-none';
        currentSunPosition.id = 'currentSunPosition';
        currentSunPosition.innerText = '0';

        let bar = document.createElement('div');
        bar.className = 'bar';

        let barOverflow = document.createElement('div');
        barOverflow.className = 'barOverflow';
        barOverflow.appendChild(bar);

        let progress = document.createElement('div');
        progress.className = 'progress';
        progress.appendChild(currentSunPosition);
        progress.appendChild(barOverflow);

        let sunriseIcon = document.createElement('i');
        sunriseIcon.className = 'wi wi-sunrise';

        let sunsetIcon = document.createElement('i');
        sunsetIcon.className = 'wi wi-sunset';

        let sunriseSunsetIcons = document.createElement('div');
        sunriseSunsetIcons.className = 'd-flex justify-content-between text-muted';
        sunriseSunsetIcons.appendChild(sunriseIcon);
        sunriseSunsetIcons.appendChild(sunsetIcon);
        
        let iconValue = document.createElement('p');
        iconValue.className = 'h4 text-muted';
        iconValue.appendChild(sunriseSunsetIcons);

        this.body.appendChild(progress);
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

module.exports = CardSunPosition
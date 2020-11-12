class Util {
    //static staticProperty = 'someValue';

    static getHoursMinutesFromUnix(unix_timestamp) {
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(unix_timestamp * 1000);
        return date.getUTCHours() + ':' + date.getUTCMinutes();
    }

    static getDtFromUnix(unix_timestamp) {
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(unix_timestamp * 1000);
        return date.toLocaleString("en-US", {timeZoneName: "short"});
    }

    static getDayFromUnix(unix_timestamp) {
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let dateObject = new Date(unix_timestamp * 1000);
        return dateObject.toLocaleString("en-US", {weekday: "long"});
    }

    static getWeatherIconClass(weatherId, weatherIcon) {
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

    static getWindDirectionIconClass(windDirection) {
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

    static setSunPosition(data) {
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
        
        this.animateSun();
    }

    static animateSun() {
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
}

module.exports = Util
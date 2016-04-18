var Weather = (function(){
    'use strict';

    function Weather(options){
        this._element = options.element;
        this._forecast = this._element.querySelector('[data-selector="forecast"]');
        this._nowWeather = this._element.querySelector('[data-selector="now-weather"]');

    }

    Weather.prototype.show = function(data){
        this._showWeatherOnTenDays(data.channel.item.forecast);
        this._showWeatherOnNow(data);
    };

    Weather.prototype._showWeatherOnNow = function(data){
        this._nowWeather.innerHTML = '';
        this._nowWeather.appendChild(this._createDescriptionWrp(data));
        this._nowWeather.appendChild(this._createConditionWrp(data));
    };

    Weather.prototype._createDescriptionWrp = function(data){
        var condition = data.channel.item.condition;

        var descriptionWrp = document.createElement('div');
        descriptionWrp.setAttribute('class', 'description-wrp');

        var description = document.createElement('div');
        var text = document.createElement('div');
        var date = document.createElement('div');

        description.innerText = data.channel.description;
        description.setAttribute('class', 'description');

        text.innerText = condition.text;
        text.setAttribute('class', 'text');

        date.innerText = data.channel.lastBuildDate;
        date.setAttribute('class', 'date');

        descriptionWrp.appendChild(description);
        descriptionWrp.appendChild(date);
        descriptionWrp.appendChild(text);

        return descriptionWrp;
    };

    Weather.prototype._createConditionWrp = function(data){
        var conditionWrp = document.createElement('div');
        var detailsWrp = document.createElement('div');

        conditionWrp.setAttribute('class', 'condition-wrp');
        detailsWrp.setAttribute('class', 'details-wrp');

        conditionWrp.appendChild(this._createNowConditionElement(data));
        detailsWrp.appendChild(this._createAstronomyElement(data.channel.astronomy));
        detailsWrp.appendChild(this._createAtmosphereElement(data.channel.atmosphere));
        detailsWrp.appendChild(this._createWindElement(data));
        conditionWrp.appendChild(detailsWrp);
        return conditionWrp
    };

    Weather.prototype._createNowConditionElement = function(data){
        var unitsData = data.channel.units;
        var conditionData = data.channel.item.condition;

        var nowCondition = document.createElement('div');
        var icon = document.createElement('img');
        var temp = document.createElement('span');
        var unit = document.createElement('span');//'°C'

        nowCondition.setAttribute('class', 'now-condition-wrp');

        temp.innerText = conditionData.temp;
        temp.setAttribute('class', 'temp');

        icon.setAttribute('src', this._getIconUrl(conditionData.code));
        icon.setAttribute('class', 'icon');

        unit.innerHTML = '&deg;' + unitsData.temperature;
        unit.setAttribute('class', 'unit');

        nowCondition.appendChild(icon);
        nowCondition.appendChild(temp);
        nowCondition.appendChild(unit);

        return nowCondition;
    };

    Weather.prototype._createAstronomyElement = function(astronomyData){
        var astronomyElement = document.createElement('div');
        var sunrise = document.createElement('div');
        var sunset = document.createElement('div');

        astronomyElement.setAttribute('class', 'astronomy-wrp');
        sunrise.setAttribute('class', 'sunrise');
        sunrise.innerText = 'Sunrise: ' + astronomyData.sunrise;
        sunset.setAttribute('class', 'sunset');
        sunset.innerText = 'Sunset: ' + astronomyData.sunset;

        astronomyElement.appendChild(sunrise);
        astronomyElement.appendChild(sunset);
        return astronomyElement;
    };

    Weather.prototype._createAtmosphereElement = function(atmosphereData){
        var atmosphereElement = document.createElement('div');
        var visibility = document.createElement('div');
        var humidity = document.createElement('div');
        var pressure = document.createElement('div');

        atmosphereElement.setAttribute('class', 'atmosphere-wrp');
        visibility.setAttribute('class', 'visibility');
        humidity.setAttribute('class', 'humidity');
        pressure.setAttribute('class', 'pressure');
        visibility.innerText = 'Visibility: ' + atmosphereData.visibility;
        humidity.innerText = 'Humidity: ' + atmosphereData.humidity + '%';
        pressure.innerText = 'Pressure: ' + atmosphereData.pressure;

        atmosphereElement.appendChild(visibility);
        atmosphereElement.appendChild(humidity);
        atmosphereElement.appendChild(pressure);

        return atmosphereElement;
    };

    Weather.prototype._createWindElement = function(data){
        var windData = data.channel.wind;
        var unitsData = data.channel.units;

        var windElement = document.createElement('div');
        var speed = document.createElement('span');

        windElement.setAttribute('class', 'wind-wrp');
        speed.setAttribute('class', 'wind-speed');
        speed.innerText = 'Wind: '+ windData.speed + ' ' + unitsData.speed;

        windElement.appendChild(speed);

        return windElement;
    };

    Weather.prototype._showWeatherOnTenDays = function(data){
        this._forecast.innerHTML = '';

        data.forEach(function(dayWeather){
            this._forecast.appendChild(this._createDayWeatherElement(dayWeather));
        }.bind(this));
    };

    Weather.prototype._createDayWeatherElement = function(dayWeather){
        var dayWeatherElement = document.createElement('div');
        var dayName = document.createElement('div');
        var weatherIcon = document.createElement('div');
        var temp = document.createElement('div');
        var high = document.createElement('span');
        var low = document.createElement('sapn');
        var icon = document.createElement('img');

        dayWeatherElement.setAttribute('class', 'day-forecast')
        dayName.innerText = dayWeather.day;
        high.innerText = dayWeather.high;
        high.classList.add('high');
        low.innerText = dayWeather.low;
        low.classList.add('low');
        icon.setAttribute('src', this._getIconUrl(dayWeather.code));
        weatherIcon.appendChild(icon);

        temp.appendChild(high);
        temp.appendChild(low);

        dayWeatherElement.appendChild(dayName);
        dayWeatherElement.appendChild(weatherIcon);
        dayWeatherElement.appendChild(temp);

        return dayWeatherElement;
    };

    Weather.prototype._getIconUrl = function(weatherCode){
        return  'http://l.yimg.com/a/i/us/we/52/' + weatherCode + '.gif';
    };

    return Weather;
})();
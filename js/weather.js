var Weather = (function(){
    'use strict';

    function Weather(options){
        this._element = options.element;
        this._forecast = this._element.querySelector('[data-selector="forecast"]');
        this._nowWeather = this._element.querySelector('[data-selector="now-weather"]');

    }

    Weather.prototype.show = function(data){
        console.log(data)

        this._showWeatherOnTenDays(data.channel.item.forecast);
        this._showWeatherOnNow(data);
    };

    Weather.prototype._showWeatherOnNow = function(data){
        var units = data.channel.units;
        var condition = data.channel.item.condition;

        this._nowWeather.innerHTML = '';
        this._nowWeather.appendChild(descriptionWrp);
    };

    Weather.prototype._createDescriptionWrp = function(units, condition){
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
        descriptionWrp.appendChild(this._createConditionWrp(units, condition));

        return descriptionWrp;
    };

    Weather.prototype._createConditionWrp = function(units, condition){
        var conditionWrp = document.createElement('div');
        var icon = document.createElement('img');
        var temp = document.createElement('span');
        var unit = document.createElement('span');//'°C'

        temp.innerText = condition.temp;
        temp.setAttribute('class', 'temp');

        icon.setAttribute('src', this._getIconUrl(condition.code));
        icon.setAttribute('class', 'icon');

        unit.innerHTML = '&deg;' + units.temperature;
        unit.setAttribute('class', 'unit');

        conditionWrp.appendChild(icon);
        conditionWrp.appendChild(temp);
        conditionWrp.appendChild(unit);

        return conditionWrp
    };

    Weather.prototype._createAstronomyElement = function(){};

    Weather.prototype._createAtmosphereElement = function(){};

    Weather.prototype._createWindElement = function(){};

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
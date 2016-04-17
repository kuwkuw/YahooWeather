var Page = (function(){
    'use strict';

    function Page(options){
        this._element = options.element;
        this._init(options);
        this._loadWeatherForCity(options.cities[0]);
    }

    Page.prototype._init = function(options){
        this._citySelector = new CitySelector({
            element: this._element.querySelector('[data-component="city-selector"]'),
            cities: options.cities
        });

        this._weather = new Weather({
            element: this._element.querySelector('[data-component="weather"]')
        });

        this._citySelector.onCityChanged(this._loadWeatherForCity.bind(this));
    };

    Page.prototype._loadWeatherForCity = function(cytiName){
        var xhr = new XMLHttpRequest();
        var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + cytiName + '") and u="c"';
        var url = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status != 200) {
                alert( 'Error: ' + (xhr.status ? xhr.statusText : 'request is fail') );
                return;
            }

            this._weather.show(JSON.parse(xhr.responseText).query.results);

        }.bind(this);

        xhr.send();

    };

    return Page;
})();

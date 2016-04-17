var CitySelector = (function(){
    'use strict';

    function CitySelector(options){
        this._element = options.element;
        this._init(options.cities);
    }

    CitySelector.prototype.onCityChanged = function(hendler){
        this._onCityChangedHendler = hendler;
    };

    CitySelector.prototype._init = function(cities){
        this._element.innerHTML = '';
        this._element.appendChild(this._createSelectorElement(cities));
        this._element.addEventListener('change' , this._cityChanged.bind(this));
    };

    CitySelector.prototype._createSelectorElement = function(cities){
        var selectorElement = document.createElement('select');
        selectorElement.classList.add('form-control');
        selectorElement.setAttribute('data-selector', 'city-selector');

        cities.forEach(function(cityName){
            var optionElement = document.createElement('option');
            optionElement.innerHTML = cityName;
            selectorElement.appendChild(optionElement);
        });

        return selectorElement;
    };

    CitySelector.prototype._cityChanged = function(e){
        if(typeof this._onCityChangedHendler === 'function'){
            this._onCityChangedHendler(e.target.value);
        }
    };

    return CitySelector;
})();

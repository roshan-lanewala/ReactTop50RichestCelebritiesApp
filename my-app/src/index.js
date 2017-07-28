import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import data from './__dummyData/celebrityRichList.json'

const findIndex = (arr, filterCallback) => {
     return arr.reduce(function(carry, item, idx) {
         if(filterCallback(item, idx)){
             return idx;
         }
         return carry;
     }, -1);
}

const getSelectCurrencyValue = (selectedCurrency = "US DOLLAR") => {
    if(selectedCurrency.toUpperCase() === "US DOLLAR") {
        return data.usDollarValue || 1;
    }
    if(selectedCurrency.toUpperCase() === "EURO") {
        return data.euroValue || 1;
    }
    if(selectedCurrency.toUpperCase() === "AUSTRALIAN DOLLAR") {
        return data.australianDollarValue || 1
    }
}

const getUnique = (prevValue, elem) => {
    if(findIndex(prevValue, function(f){ return f.label === elem}) === -1) {
        prevValue.push({value: elem, label:elem});
    }
    return prevValue;
}

const getBirthPlaces = () => {
    return [
            {value:"Show All", label: "Show All"},
            ...data.celebrityList.map(elem => elem.country)
            .reduce(getUnique, [])
            .sort((a, b) => {
                let nameA = a.label.toUpperCase();
                let nameB = b.label.toUpperCase();
                if(nameA < nameB) {
                    return -1;
                }
                if(nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            ];
}

const getCurrencyConverters = () => {
    
    return [ 
        {value:"US Dollar", label:"US Dollar", displaySymbol: "$USD"}, 
        {value:"Euro", label:"Euro", displaySymbol: "€"}, 
        {value:"Australian Dollar", label:"Australian Dollar", displaySymbol: "$AUD"} ]
}

const getSortByList = () => {
    return [ {value:"Rank", label:"Rank"}, {value:"Name", label:"Name"}, {value:"Age",label:"Age"} ]
}

const getCelebrities = () => {
    return data.celebrityList;
}

const props = {
    ...data,
    birthPlaces: getBirthPlaces(),
    selectedBirthPlace: "Show All",
    currencyConverters: getCurrencyConverters(),
    selectedCurrencyConverter: "US Dollar",
    sortByList: getSortByList(),
    selectedSortBy: "Rank",
    celebrities: getCelebrities(),
    searchText: "",
    defaultCurrencySymbol: "$USD",
    defaultCurrencyValue: data.usDollarValue,
    getSelectCurrencyValue: getSelectCurrencyValue
};

ReactDOM.render(<App {...props}/>, document.getElementById('root'));
registerServiceWorker();

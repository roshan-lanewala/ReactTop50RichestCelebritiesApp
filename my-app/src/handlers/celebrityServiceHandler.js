
const findIndex = (arr, filterCallback) => {
     return arr.reduce(function(carry, item, idx) {
         if(filterCallback(item, idx)){
             return idx;
         }
         return carry;
     }, -1);
}

const getUnique = (prevValue, elem) => {
    if(findIndex(prevValue, function(f){ return f.label === elem}) === -1) {
        prevValue.push({value: elem, label:elem});
    }
    return prevValue;
}

const sortByRank = (a, b) => {
  if(a.rank < b.rank) {
    return -1;
  }
  if(a.rank > b.rank) {
    return 1;
  }
}

const sortByName = (a, b) => {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();
  if(nameA < nameB) {
    return -1;
  }
  if(nameA > nameB) {
    return 1;
  }
  return 0;
}

const sortByAge = (a, b) => {
  if(a.age < b.age) {
    return -1;
  }
  if(a.age > b.age) {
    return 1;
  }
}

const getSelectCurrencyValue = (state, selectedCurrency = "US DOLLAR") => {
    if(selectedCurrency.toUpperCase() === "US DOLLAR") {
        return state.usDollarValue || 1;
    }
    if(selectedCurrency.toUpperCase() === "EURO") {
        return state.euroValue || 1;
    }
    if(selectedCurrency.toUpperCase() === "AUSTRALIAN DOLLAR") {
        return state.australianDollarValue || 1
    }
}

export function getCurrencyConverters() {
    
    return [ 
        {value:"US Dollar", label:"US Dollar", displaySymbol: "$USD"}, 
        {value:"Euro", label:"Euro", displaySymbol: "€"}, 
        {value:"Australian Dollar", label:"Australian Dollar", displaySymbol: "$AUD"} ]
}

export function getFilteredCelebrities(state) {
    
    var filteredResult = state.celebrityList;
    filteredResult = filteredResult.filter(celeb => state.selectedBirthPlace === 'Show All' 
                        || celeb.country === state.selectedBirthPlace);

    filteredResult = filteredResult.filter(celeb => 
                        state.searchText.trim() === "" 
                        || (celeb.name.toUpperCase().indexOf(state.searchText.toUpperCase()) !== -1
                        || celeb.age.indexOf(state.searchText.toUpperCase()) !== -1
                        || celeb.netWorth.toString().indexOf(state.searchText.toUpperCase()) !== -1))

    if(state.selectedSortBy.toUpperCase() === "RANK") {
      filteredResult = filteredResult.sort(sortByRank)
    } else if(state.selectedSortBy.toUpperCase() === "AGE") {
      filteredResult = filteredResult.sort(sortByAge)
    } else if(state.selectedSortBy.toUpperCase() === "NAME") {
      filteredResult = filteredResult.sort(sortByName)
    }
    return { ...state, filteredCelebrities: filteredResult };
}

export function getSortByList() {
    return [ {value:"Rank", label:"Rank"}, {value:"Name", label:"Name"}, {value:"Age",label:"Age"} ]
}

export function getBirthPlaces(celebrityList) {
    return [
        { value:"Show All", label: "Show All" },
        ...celebrityList.map(elem => elem.country)
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

export function onSelectBirthPlaceChange(state, selectedItem) {
   return { ...state, selectedBirthPlace: selectedItem.value };
}

export function onSelectCurrencyConverterChange(state, selectedItem) {
    const selectedCurrencyValue = getSelectCurrencyValue(state, selectedItem.value);

    return { ...state, 
                    selectedCurrencyConverter: selectedItem.value,
                    currencySymbol: selectedItem.displaySymbol,
                    currencyValue: selectedCurrencyValue
                  };
}

export function onSelectSortByChange(state, selectedItem) {
    return {...state, selectedSortBy: selectedItem.value};
}

export function onSearchTextChanged(state, newText) {
    return {...state, searchText: newText.target.value};
}

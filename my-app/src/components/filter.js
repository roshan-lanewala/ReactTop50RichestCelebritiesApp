import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export const Filter = ({birthPlaces,
                        selectedBirthPlace, 
                        onSelectBirthPlaceChange,
                        currencyConverters, 
                        selectedCurrencyConverter,
                        onSelectCurrencyConverterChange,
                        sortByList,
                        selectedSortBy,
                        onSelectSortByChange,
                        onSearchTextChanged}) => {
    return <div className="filters">
        <div className="row form-group">
            <div className="col-md-3 col-md-offset-3">
                <label htmlFor="selectBirthPlaces">Birthplace:</label>
                <Select name="selectBirthPlaces" 
                        options={birthPlaces} 
                        value={selectedBirthPlace} 
                        onChange={onSelectBirthPlaceChange} />
            </div>
            <div className="col-md-3">
                <label htmlFor="selectCurrencyConverters">Currency Converter:</label>
                <Select name="selectCurrencyConverters" 
                        options={currencyConverters} 
                        value={selectedCurrencyConverter} 
                        onChange={onSelectCurrencyConverterChange} />
            </div>
        </div>
        <div className="row form-group">
            <div className="col-md-3 col-md-offset-3">
                <label htmlFor="txtSearch">Search:</label>
                <input id="txtSearch" 
                       type="text" 
                       className="form-control" 
                       placeholder="Search"
                       onChange={onSearchTextChanged} />
            </div>
            <div className="col-md-3">
                <label htmlFor="selectSortBy">Order By:</label>
                <Select name="selectSortBy" 
                        options={sortByList} 
                        value={selectedSortBy} 
                        onChange={onSelectSortByChange} />
            </div>
        </div>
    </div>
}

export default Filter;

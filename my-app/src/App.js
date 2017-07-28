import React, { Component } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import * as handlers from './handlers/celebrityServiceHandler';
import CelebritiesList from './components/celebritiesList';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  update = (f, callback, ...args) => this.setState(f(this.state, ...args), callback);

  getFilteredCelebritiesFunc = () => this.update(handlers.getFilteredCelebrities);

  actions = {
    getFilteredCelebrities: this.getFilteredCelebritiesFunc,
    onSelectBirthPlaceChange: (selectedItem) => this.update(handlers.onSelectBirthPlaceChange, this.getFilteredCelebritiesFunc, selectedItem),
    onSelectCurrencyConverterChange: (selectedItem) => this.update(handlers.onSelectCurrencyConverterChange, this.getFilteredCelebritiesFunc, selectedItem),
    onSelectSortByChange: (selectedItem) => this.update(handlers.onSelectSortByChange, this.getFilteredCelebritiesFunc, selectedItem),
    onSearchTextChanged: (newSearchText) => this.update(handlers.onSearchTextChanged, this.getFilteredCelebritiesFunc, newSearchText)
  };

  constructor(props){
    super(props);
    this.state = {
      selectedBirthPlace: "Show All",
      selectedCurrencyConverter: "US Dollar",
      selectedSortBy: "Rank",
      searchText: "",
      currencySymbol: "$USD",
     };
    
  }

  componentDidMount = () => {
   axios.get('/celebrities')
    .then((res) => {
      
      this.setState({
        ...res.data[0],
        birthPlaces: handlers.getBirthPlaces(res.data[0].celebrityList),
        currencyConverters: handlers.getCurrencyConverters(),
        sortByList: handlers.getSortByList(),
        celebrities: res.data[0].celebrityList,
        currencyValue: res.data[0].usDollarValue
      }, this.getFilteredCelebritiesFunc);
      
    })
    .catch((err) => console.warn(err));
  }

  render() {
    return ( <div className="App">
        <div className="row form-group">
            <div className="col-xs-12 text-center">
              <h1>{this.state.pageTitleH1}</h1>
              <h2>{this.state.pageTitleH2}</h2>
              <div>{this.state.description}</div>
              <div style={{marginTop:"1.5em"}}>
                Reference: <a href={this.state.referenceLink}>{this.state.referenceLink}</a>
              </div>
            </div>
          </div>
        <div className="container grey-box">
          <div className="row form-group">
            <Filter 
              birthPlaces={this.state.birthPlaces}
              selectedBirthPlace={this.state.selectedBirthPlace}
              onSelectBirthPlaceChange={this.actions.onSelectBirthPlaceChange}
              currencyConverters={this.state.currencyConverters}
              selectedCurrencyConverter={this.state.selectedCurrencyConverter}
              onSelectCurrencyConverterChange={this.actions.onSelectCurrencyConverterChange}
              sortByList={this.state.sortByList}
              selectedSortBy={this.state.selectedSortBy} 
              onSelectSortByChange={this.actions.onSelectSortByChange}
              onSearchTextChanged={this.actions.onSearchTextChanged} />
          </div>
          <div className="row form-group">
            <CelebritiesList theCelebrities={this.state.filteredCelebrities} 
                             currencySymbol={this.state.currencySymbol}
                             currencyValue={this.state.currencyValue} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

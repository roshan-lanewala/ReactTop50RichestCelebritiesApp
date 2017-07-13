import React, { Component } from 'react';
import Filter from './components/filter'
import CelebritiesList from './components/celebritiesList'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';

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

class App extends Component {
  getFilteredCelebrities = (celebrities) => {
    var filteredResult = this.state.celebrities;
    filteredResult = filteredResult.filter(celeb => this.state.selectedBirthPlace === 'Show All' 
                        || celeb.country === this.state.selectedBirthPlace);

    filteredResult = filteredResult.filter(celeb => 
                        this.state.searchText.trim() === "" 
                        || (celeb.name.toUpperCase().indexOf(this.state.searchText.toUpperCase()) !== -1
                        || celeb.age.indexOf(this.state.searchText.toUpperCase()) !== -1
                        || celeb.netWorth.toString().indexOf(this.state.searchText.toUpperCase()) !== -1))

    if(this.state.selectedSortBy.toUpperCase() === "RANK") {
      filteredResult = filteredResult.sort(sortByRank)
    } else if(this.state.selectedSortBy.toUpperCase() === "AGE") {
      filteredResult = filteredResult.sort(sortByAge)
    } else if(this.state.selectedSortBy.toUpperCase() === "NAME") {
      filteredResult = filteredResult.sort(sortByName)
    }
    this.setState({...this.state, filteredCelebrities: filteredResult});
  }

  onSelectBirthPlaceChange = (selectedItem) => {
    this.setState({ ...this.state, selectedBirthPlace: selectedItem.value }, this.getFilteredCelebrities);
  }

  onSelectCurrencyConverterChange = (selectedItem) => {
    const selectedCurrencyValue = this.state.getSelectCurrencyValue();
    this.setState({ ...this.state, 
                    selectedCurrencyConverter: selectedItem.value,
                    currencySymbol: selectedItem.displaySymbol,
                    currencyValue: selectedCurrencyValue
                  }, this.getFilteredCelebrities);
  }

  onSelectSortByChange = (selectedItem) => {
    this.setState({...this.state, selectedSortBy: selectedItem.value}, this.getFilteredCelebrities);
  }

  onSearchTextChanged = (newText) => {
    this.setState({...this.state, searchText: newText.target.value}, this.getFilteredCelebrities);
  }

  constructor(props){
    super(props);
    this.state = {
      ...this.props,
      currencySymbol: this.props.defaultCurrencySymbol,
      currencyValue: this.props.defaultCurrencyValue
    };
    
  }

  componentDidMount = () => {
    this.getFilteredCelebrities();
  }

  render() {
    return (
      <div className="App">
        <div className="row form-group">
            <div className="col-xs-12 text-center">
              <h1>{this.props.pageTitleH1}</h1>
              <h2>{this.props.pageTitleH2}</h2>
              <div>{this.props.description}</div>
              <div style={{marginTop:"1.5em"}}>
                Reference: <a href={this.props.referenceLink}>{this.props.referenceLink}</a>
              </div>
            </div>
          </div>
        <div className="container grey-box">
          <div className="row form-group">
            <Filter 
              birthPlaces={this.state.birthPlaces}
              selectedBirthPlace={this.state.selectedBirthPlace}
              onSelectBirthPlaceChange={this.onSelectBirthPlaceChange}
              currencyConverters={this.state.currencyConverters}
              selectedCurrencyConverter={this.state.selectedCurrencyConverter}
              onSelectCurrencyConverterChange={this.onSelectCurrencyConverterChange}
              sortByList={this.state.sortByList}
              selectedSortBy={this.state.selectedSortBy} 
              onSelectSortByChange={this.onSelectSortByChange}
              onSearchTextChanged={this.onSearchTextChanged} />
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

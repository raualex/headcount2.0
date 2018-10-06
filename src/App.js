import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import Search from './Search.js';
import DistrictRepository from './helper.js';
import kinderData from './data/kindergartners_in_full_day_program.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      DistrictRepository: {},
      DistRepoObj: {}
    };
  }

  searchForDistrict = (word) => {
    let repo = this.state.DistRepoObj;
    let filteredResults = repo.findAllMatches(word)
    let finalObj = filteredResults.reduce((acc, districtObj) => {
      let objKey = Object.keys(districtObj)
      acc[objKey] = districtObj[objKey]
      return acc
    }, {})
    this.setState({
      DistrictRepository: finalObj
    })
  }

  componentDidMount() {
    let repo = new DistrictRepository(kinderData);
    this.setState({
      DistrictRepository: repo.stats,
      DistRepoObj: repo
    });
  }

  render() {
    const cardInfo = Object.keys(this.state.DistrictRepository);
    const cards = cardInfo.map((schoolDistrict) => {
      return <Card key={schoolDistrict} schoolName={schoolDistrict} schoolInfo={this.state.DistrictRepository[schoolDistrict]}/>;
    });

    return (
      <div>
        <h1 className="title">Welcome To Headcount 2.0</h1>
        <Search searchForDistrict={this.searchForDistrict} />
        <div className="card-container">
          { cards }
        </div>
      </div>
    );
  }
}

export default App;

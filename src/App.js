import React, { Component } from 'react';
import './App.css';
import Search from './Search.js';
import ComparisonCard from './ComparisonCard.js';
import Card from './Card.js';
import DistrictRepository from './helper.js';
import kinderData from './data/kindergartners_in_full_day_program.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      DistrictRepository: {},
      DistRepoObj: {},
      comparisonSchools: []
    };
  }

  searchForDistrict = (word) => {
    let repo = this.state.DistRepoObj;
    let filteredResults = repo.findAllMatches(word);
    let finalObj = filteredResults.reduce((acc, districtObj) => {
      let objKey = Object.keys(districtObj);
      acc[objKey] = districtObj[objKey];
      return acc;
    }, {});
    this.setState({
      DistrictRepository: finalObj
    });
  }

  handleSchoolArray = (arr, school) => {
    if (arr.length === 1) {
      // console.log('works 1')
      arr.pop(school)
      return arr
    } else if (arr.length === 2) {
      let solution = arr.find((schoolKey, index) => {
        if (schoolKey !== school) {
          return schoolKey
        }
      })
      return [solution]
    }
  }

  saveSchoolByClick = (schoolName) => {
    let schoolArray = this.state.comparisonSchools
    let schoolKey = schoolName

    if (schoolArray.length < 2 && !schoolArray.includes(schoolName)) {
      schoolArray.push(schoolKey)
    } else if (schoolArray.length <= 2 && schoolArray.includes(schoolName)) {
      schoolArray = this.handleSchoolArray(schoolArray, schoolKey)
      // console.log(schoolArray)
    } else if (schoolArray.length === 2) {
      schoolArray.shift()
      schoolArray.push(schoolKey)
    }
    this.setState({
      comparisonSchools: schoolArray
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
      return <Card key={schoolDistrict} 
        schoolName={schoolDistrict} 
        schoolInfo={this.state.DistrictRepository[schoolDistrict]}
        saveSchoolByClick={this.saveSchoolByClick}
      />;
    });

    return (
      <div>
        <h1 className="title">Welcome To Headcount 2.0</h1>
        <Search searchForDistrict={this.searchForDistrict} />
        <ComparisonCard 
          comparisonSchools={this.state.comparisonSchools}
        />
        <div className="card-container">
          { cards }
        </div>
      </div>
    );
  }
}

export default App;

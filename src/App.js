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
      comparisonSchools: [],
      oldSchool: ''
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

  handleSchoolArray = (distArr, school) => {
    if (distArr.length === 1) {
      distArr.pop(school);
      return distArr;
    } else if (distArr.length === 2) {
      let solution = distArr.find((schoolKey) => {
        if (schoolKey !== school) {
          return schoolKey;
        }
      });
      return [solution];
    }
  }

  saveSchoolByClick = (schoolName) => {
    let schoolArray = this.state.comparisonSchools;

    if (schoolArray.length < 2 && !schoolArray.includes(schoolName)) {
      schoolArray.push(schoolName);
    } else if (schoolArray.length <= 2 && schoolArray.includes(schoolName)) {
      schoolArray = this.handleSchoolArray(schoolArray, schoolName);
    } else if (schoolArray.length === 2) {
      let oldSchool = schoolArray.shift();
      this.setState({
        oldSchool: oldSchool
      });
      schoolArray.push(schoolName);
    }
    this.setState({
      comparisonSchools: schoolArray
    });
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
        comparisonSchools={this.state.comparisonSchools}
        oldSchool={this.state.oldSchool}
      />;
    });

    return (
      <div>
        <h1 className="title">Welcome To Headcount 2.0</h1>
        <ComparisonCard 
          comparisonSchools={this.state.comparisonSchools}
        />
        <Search searchForDistrict={this.searchForDistrict} />
        <div className="card-container">
          { cards }
        </div>
      </div>
    );
  }
}

export default App;

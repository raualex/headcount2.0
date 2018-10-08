import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

class Card extends Component{
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };

  }

  handleClick = () => {
    this.props.saveSchoolByClick(this.props.schoolName);

    this.setState({
      clicked: !this.state.clicked
    });
  }

  // checkName = (schoolName) => {
    
  //   if (!this.props.oldSchool) {
  //     return undefined
  //   } else if (this.props.oldSchool === schoolName) {
  //     return 'false'
  //   }
  // }
  
  render() {
    const dataKeys = Object.keys(this.props.schoolInfo);
    const schoolData = dataKeys.map((year, index) => {
      if (this.props.schoolInfo[year] > 0.5) {
        return <li key={Date.now() + index} 
          className="greater data-line">{year}: {this.props.schoolInfo[year]}
        </li>;
      } else if (this.props.schoolInfo[year] < 0.5) {
        return <li key={Date.now() + index} 
          className="lesser data-line">{year}: {this.props.schoolInfo[year]}
        </li>;
      } else if (this.props.schoolInfo[year] === 0.5) {
        return <li key={Date.now() + index} 
          className="equal data-line">{year}: {this.props.schoolInfo[year]}
        </li>;
      }
    });
    
    if (!this.props.saveSchoolByClick) {
      return (
        <div className="comparison-card">
          <h3 className="card-title">{this.props.schoolName}</h3>
          <ul className="data-list">
            { schoolData }
          </ul>
        </div>
      );
    } else {
      return (
        <div className={'card '+this.state.clicked.toString()}
          onClick={() => this.handleClick(this.props.schoolName)}>
          <h3 className="card-title">{this.props.schoolName}</h3>
          <ul className="data-list">
            { schoolData }
          </ul>
        </div>
      );
    }
  }
}

Card.propTypes = {
  schoolName: PropTypes.string.isRequired,
  schoolInfo: PropTypes.object.isRequired,
  saveSchoolByClick: PropTypes.func,
  comparisonSchools: PropTypes.array,
  oldSchool: PropTypes.string
};


export default Card;
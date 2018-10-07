import React, { Component } from 'react';
import './ComparisonCard.css';
import Card from './Card.js';
import PropTypes from 'prop-types';
import DistrictRepository from './helper.js';
import kinderData from './data/kindergartners_in_full_day_program.js';

class ComparisonCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comparisonSchools: [],
      schoolData: new DistrictRepository(kinderData),
    };
  }

  componentWillReceiveProps() {
    this.setState({
      comparisonSchools: this.props.comparisonSchools,
    })
  }

  mapForRender(cardArray) {
    if (cardArray.length === 1) {
      console.log(cardArray);
    } else if (cardArray.length === 2) {
      console.log(cardArray);
    }
  }

  render() {
    let cards;

    if (this.state.comparisonSchools.length) {
      cards = this.props.comparisonSchools.map((school) => {
        return <Card key={school + Date.now()} 
          schoolName={school} 
          schoolInfo={this.state.schoolData.stats[school]}
        />;
      })
    }
    if (cards) {
      return ( 
        <div>
          { cards }  
        </div>
      )
      } else {
        return (
          <div>
            <p>{this.state.comparisonSchools[0] || "BOOYAH!!"}</p>
            <p>{this.state.comparisonSchools[1] || "BOOYAH!!"}</p>
          </div>
        )
      }
  }
}

ComparisonCard.propTypes = {
  comparisonSchools: PropTypes.array
};

export default ComparisonCard;
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
      comparisonSchools: props.comparisonSchools,
      schoolData: new DistrictRepository(kinderData)
    };
  }

  mapForRender(cardArray) {
    if (cardArray.length === 1) {
      console.log(cardArray)
    } else if (cardArray.length === 2) {
      console.log(cardArray)
    }
  }

  render() {
    return (
      <div>
        <p>BOOOYAH</p>
      </div>
    );
  }
}

ComparisonCard.propTypes = {
  comparisonSchools: PropTypes.array
};

export default ComparisonCard;
import React, { Component } from 'react';
import './ComparisonCard.css';
import Card from './Card.js';
import PropTypes from 'prop-types';

class ComparisonCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comparisonSchools: props.comparisonSchools
    };
  }

  mapForRender(card) {

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
  districtComparison: PropTypes.func.isRequired,
  comparisonSchools: PropTypes.array
};

export default ComparisonCard;
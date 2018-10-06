import React, { Component } from 'react';
import './ComparisonCard.css';
import Card from './Card.js';
import PropTypes from 'prop-types';

class ComparisonCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card1: props.card1,
      card2: props.card2
    };
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
  card1: PropTypes.object,
  card2: PropTypes.object
};

export default ComparisonCard;
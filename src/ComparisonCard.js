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
      schoolData: new DistrictRepository(kinderData)
    };
  }

  componentWillReceiveProps() {
    this.setState({
      comparisonSchools: this.props.comparisonSchools
    });
  }

  render() {
    let cards;
    let distName1;
    let distName2;

    if (this.state.comparisonSchools.length) {
      cards = this.props.comparisonSchools.map((school) => {
        return <Card key={school + Date.now()} 
          schoolName={school} 
          schoolInfo={this.state.schoolData.stats[school]}
        />;
      });
    }
    if (cards && cards.length === 1) {
      distName1 = this.props.comparisonSchools[0];
      return ( 
        <div className="comparison-container">
          { cards[0] }
        </div>
      );
    } else if (cards && cards.length === 2) {
      distName1 = this.props.comparisonSchools[0];
      distName2 = this.props.comparisonSchools[1];
      let distRatio = this.state.schoolData.compareDistrictAverages(
        distName1,
        distName2
      );
      return ( 
        <div className="comparison-container">
          { cards[0] }
          <div className="compared">
            <h3>{distName1}{': '}</h3>
            <h3>
              {this.state.schoolData.findAverage(distName1)}
            </h3>
            <h3>{'<---- '}
              {distRatio.compared}
              {' ---->'}
            </h3>
            <h3>{distName2}{': '}</h3>
            <h3>
              {this.state.schoolData.findAverage(distName2)}
            </h3>
          </div>
          { cards[1] }  
        </div>
      );
    } else {
      return (
        <div>
          <p></p>
        </div>
      );
    }
  }
}

ComparisonCard.propTypes = {
  comparisonSchools: PropTypes.array
};

export default ComparisonCard;
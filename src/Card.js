import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({schoolName, schoolInfo, saveSchoolByClick}) => {

  const dataKeys = Object.keys(schoolInfo);
  const schoolData = dataKeys.map((year, index) => {
    if (schoolInfo[year] > 0.5) {
      return <li key={Date.now() + index} 
        className="greater data-line">{year}: {schoolInfo[year]}
      </li>;
    } else if (schoolInfo[year] < 0.5) {
      return <li key={Date.now() + index} 
        className="lesser data-line">{year}: {schoolInfo[year]}
      </li>;
    } else if (schoolInfo[year] === 0.5) {
      return <li key={Date.now() + index} 
        className="equal data-line">{year}: {schoolInfo[year]}
      </li>;
    }
  });

  return (
    <div className="card" onClick={() => saveSchoolByClick(schoolName)}>
      <h3 className="card-title">{schoolName}</h3>
      <ul className="data-list">
        { schoolData }
      </ul>
    </div>
  );
};

Card.propTypes = {
  schoolName: PropTypes.string.isRequired,
  schoolInfo: PropTypes.object.isRequired,
  saveSchoolByClick: PropTypes.func.isRequired
};


export default Card;
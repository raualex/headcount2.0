import React from 'react';
import { shallow } from 'enzyme';
import ComparisonCard from './ComparisonCard';

it('matches the snapshot', () => {
  const wrapper = shallow(<ComparisonCard 
    comparisonSchools={['COLORADO', 'ACADEMY 20']}
  />);

  expect(wrapper).toMatchSnapshot();
});

// it('prints cards dependent on props array', () => {
//   const wrapper = shallow(<ComparisonCard 
//     comparisonSchools={['COLORADO', 'ACADEMY 20']}
//   />);

//   expect(wrapper.find('.comparison-container').children()).toEqual(2)
// });
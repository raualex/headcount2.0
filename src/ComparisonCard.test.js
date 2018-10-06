import React from 'react';
import { shallow } from 'enzyme';
import ComparisonCard from './ComparisonCard';

it('matches the snapshot', () => {
  const mockFunction = jest.fn();
  const wrapper = shallow(<ComparisonCard 
    districtComparison={mockFunction}
  />);

  expect(wrapper).toMatchSnapshot();
});
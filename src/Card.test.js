import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('matches the snapshot', () => {
  const wrapper = shallow(<Card
    key={'COLORADO'}
    schoolName={'COLORADO'}
    schoolInfo={{'COLORADO': {2004: 0.5}}}
  />);

  expect(wrapper).toMatchSnapshot();
});

it('gives class of: greater if above 0.5', () => {
  const wrapper = shallow(<Card
    key={'COLORADO'}
    schoolName={'COLORADO'}
    schoolInfo={{2007: 0.7}}
  />);
  
  expect(
    wrapper.find('.data-list').children().first().hasClass('greater')
  ).toEqual(true);  
});


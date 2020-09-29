import React from 'react';
import { render } from '@testing-library/react';
import ObjectOfInterest from './objects_of_interest'


test('renders learn react link', () => {
  const { getByText } = render(<ObjectOfInterest object_of_interest='car' url={{url:'http://m',cam:0}}/>);
 // const linkElement = getByText(/learn react/i);
 // expect(linkElement).toBeInTheDocument();
});
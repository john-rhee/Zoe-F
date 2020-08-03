import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders home link', () => {
  const wrapper = render(<App />);
  wrapper.getByText(/home/i);
});
test('renders register link', () => {
  const wrapper = render(<App />);
  wrapper.getByText(/register/i);
});
test('renders login link', () => {
  const wrapper = render(<App />);
  wrapper.getByText(/login/i);
});

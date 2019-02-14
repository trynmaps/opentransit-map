import React from 'react';
import App from '../App';

describe('app testing', () => {
  it('can run tests', () => {
    expect(true).toBe(true);
  });
  it('can import our files', () => {
    expect(App).toBeTruthy();
  });
  it('can import our libraries', () => {
    expect(React).toBeTruthy();
  });
});


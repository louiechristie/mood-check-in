import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import App from '../App';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// eslint-disable-next-line
let checkinsTestData = [
  {
    mood: 1,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 2,
    feelings: ['depressed'],
    comment: 'Depressed day.',
    timestamp: 1546949986733,
  },
  {
    mood: 2,
    feelings: ['depressed'],
    comment: 'Depressed day.',
    timestamp: 1546949986733,
  },
  {
    mood: 3,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 3,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 3,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 4,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 5,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 6,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Happy day.',
    timestamp: 1546863586733,
  },
];

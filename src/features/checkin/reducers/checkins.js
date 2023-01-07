import {
  CHECKINS_HAS_ERRORED,
  CHECKINS_IS_LOADING,
  CHECKINS_DELETE_SUCCESS,
  CHECKINS_ADD_SUCCESS,
} from '../constants/ActionTypes';

const DEBUG = false;

const defaultState = [
  {
    mood: 7,
    feelings: ['optimistic', 'happy'],
    comment: 'Example happy mood',
    timestamp: 1673101033501,
  },
  {
    mood: 4,
    feelings: [],
    comment: 'Example neutral mood',
    timestamp: 1673101016650,
  },
  {
    mood: 1,
    feelings: ['depressed', 'sad'],
    comment: 'Example sad mood',
    timestamp: 1673101045185,
  },
];

export function checkinsHasErrored(state = false, action) {
  switch (action.type) {
    case CHECKINS_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}
export function checkinsIsLoading(state = false, action) {
  switch (action.type) {
    case CHECKINS_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
export function checkins(state = defaultState, action) {
  let newState;

  switch (action.type) {
    case CHECKINS_DELETE_SUCCESS:
      console.log('action: ', action);
      return state.filter(({ timestamp }) => timestamp !== action.timestamp);
    case CHECKINS_ADD_SUCCESS:
      newState = [...state, action.checkin];
      console.log(`newState: `, JSON.stringify(newState, null, 2));
      return newState;
    default:
      return state;
  }
}

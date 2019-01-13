import {
  CHECKINS_HAS_ERRORED,
  CHECKINS_IS_LOADING,
  CHECKINS_FETCH_DATA_SUCCESS,
  CHECKINS_DELETE_SUCCESS,
  CHECKINS_ADD_SUCCESS,
} from '../constants/ActionTypes';

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
export function checkins(state = [], action) {
  switch (action.type) {
    case CHECKINS_FETCH_DATA_SUCCESS:
      return action.checkins;
    case CHECKINS_DELETE_SUCCESS:
      return state.filter(({ id }) => id !== action.id);
    case CHECKINS_ADD_SUCCESS:
      return [...state, action.checkin];
    default:
      return state;
  }
}

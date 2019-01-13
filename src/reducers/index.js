import { combineReducers } from 'redux';
import {
  checkins,
  checkinsHasErrored,
  checkinsIsLoading,
} from '../features/checkin/reducers/checkins';

export default combineReducers({
  checkins,
  checkinsHasErrored,
  checkinsIsLoading,
});

import { combineReducers } from 'redux';
import {
  checkins,
  checkinsHasErrored,
  checkinsIsLoading,
} from '../features/insights/reducers/checkins.js';

export default combineReducers({
  checkins,
  checkinsHasErrored,
  checkinsIsLoading,
});

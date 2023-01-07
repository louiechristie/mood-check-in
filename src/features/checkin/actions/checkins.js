import { URL_BASE_API, URL_PATH_CHECKINS } from '../../../constants/API';
import {
  CHECKINS_HAS_ERRORED,
  CHECKINS_IS_LOADING,
  CHECKINS_DELETE_SUCCESS,
  CHECKINS_ADD_SUCCESS,
} from '../constants/ActionTypes';

export function checkinsHasErrored(bool) {
  return {
    type: CHECKINS_HAS_ERRORED,
    hasErrored: bool,
  };
}
export function checkinsIsLoading(bool) {
  return {
    type: CHECKINS_IS_LOADING,
    isLoading: bool,
  };
}

export function checkinsDeleteSuccess(timestamp) {
  return {
    type: CHECKINS_DELETE_SUCCESS,
    timestamp,
  };
}

export function checkinsDelete(timestamp) {
  console.log('checkinsDelete timestamp: ', timestamp);

  return (dispatch) => {
    dispatch(checkinsDeleteSuccess(timestamp));
  };
}

export function checkinsAddSuccess(checkin) {
  return {
    type: CHECKINS_ADD_SUCCESS,
    checkin,
  };
}

export function checkinsAdd(checkin) {
  console.log('checkinsAdd checkin: ', JSON.stringify(checkin));

  return (dispatch) => {
    dispatch(checkinsAddSuccess(checkin));
  };
}

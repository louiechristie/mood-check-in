import {
  CHECKINS_HAS_ERRORED,
  CHECKINS_IS_LOADING,
  CHECKINS_FETCH_DATA_SUCCESS,
  CHECKINS_DELETE_SUCCESS,
  CHECKINS_ADD_SUCCESS,
} from '../constants/ActionTypes';

import { URL_BASE_API, URL_PATH_CHECKINS } from '../../../constants/API';

const url = `${URL_BASE_API}${URL_PATH_CHECKINS}`;

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
export function checkinsFetchDataSuccess(checkins) {
  return {
    type: CHECKINS_FETCH_DATA_SUCCESS,
    checkins,
  };
}

export function checkinsFetchData() {
  return dispatch => {
    dispatch(checkinsIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }

        dispatch(checkinsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(checkins => {
        dispatch(checkinsFetchDataSuccess(checkins));
        dispatch(checkinsHasErrored(false));
      })
      .catch(error => {
        console.warn(JSON.stringify(error));
        dispatch(checkinsHasErrored(true));
      });
  };
}

export function checkinsDeleteSuccess(id) {
  return {
    type: CHECKINS_DELETE_SUCCESS,
    id,
  };
}

export function checkinsDelete(id) {
  console.log('checkinsDelete id: ', id);

  return dispatch => {
    dispatch(checkinsIsLoading(true));

    fetch(`${url}${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }

        dispatch(checkinsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(responseJSON => {
        dispatch(checkinsDeleteSuccess(id));
      })
      .catch(error => {
        console.warn(JSON.stringify(error));
        dispatch(checkinsHasErrored(true));
      });
  };
}

// export function checkinsDeleteMultiple(ids) {
//   console.log('checkinsDeleteMultiple ids: ', JSON.stringify(ids));

//   return dispatch => {
//     for (const id of ids) {
//       dispatch(checkinsDelete(id));
//     }
//   };
// }

export function checkinsAddSuccess(checkin) {
  return {
    type: CHECKINS_ADD_SUCCESS,
    checkin,
  };
}

export function checkinsAdd(checkin) {
  console.log('checkinsAdd checkin: ', JSON.stringify(checkin));

  return dispatch => {
    dispatch(checkinsIsLoading(true));

    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkin),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }

        dispatch(checkinsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(responseJSON => {
        dispatch(checkinsAddSuccess(responseJSON));
      })
      .catch(error => {
        console.warn(JSON.stringify(error));
        dispatch(checkinsHasErrored(true));
      });
  };
}

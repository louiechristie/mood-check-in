export function checkinsHasErrored(bool) {
  return {
    type: 'CHECKINS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function checkinsIsLoading(bool) {
  return {
    type: 'CHECKINS_IS_LOADING',
    isLoading: bool,
  };
}
export function checkinsFetchDataSuccess(checkins) {
  return {
    type: 'CHECKINS_FETCH_DATA_SUCCESS',
    checkins,
  };
}

export function checkinsFetchData(url) {
  return dispatch => {
    dispatch(checkinsIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(checkinsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(checkins => dispatch(checkinsFetchDataSuccess(checkins)))
      .catch(() => dispatch(checkinsHasErrored(true)));
  };
}

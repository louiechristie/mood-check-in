export function checkinsHasErrored(state = false, action) {
  switch (action.type) {
    case 'CHECKINS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function checkinsIsLoading(state = false, action) {
  switch (action.type) {
    case 'CHECKINS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function checkins(state = [], action) {
  switch (action.type) {
    case 'CHECKINS_FETCH_DATA_SUCCESS':
      return action.checkins;
    default:
      return state;
  }
}

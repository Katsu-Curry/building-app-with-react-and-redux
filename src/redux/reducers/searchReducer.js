import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SET_SEARCH:
      return action.search;
    default:
      return state;
  }
}

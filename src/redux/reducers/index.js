import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import search from "./searchReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  search,
});

export default rootReducer;
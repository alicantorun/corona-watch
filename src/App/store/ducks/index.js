import { combineReducers } from "redux";

import globalStatistics from "./globalStatistics";
import countryStatistics from "./countryStatistics";

export default combineReducers({
  globalStatistics,
  countryStatistics,
});

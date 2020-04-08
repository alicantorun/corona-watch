import { all, takeLatest } from "redux-saga/effects";

import { Types as GlobalStatisticsTypes } from "../ducks/globalStatistics";

import {
  getSummaryStatictics,
  getCountriesStatictics,
  getGlobalTimelineStatistics,
} from "./globalStatistics";

export default function* rootSaga() {
  return yield all([
    takeLatest(
      GlobalStatisticsTypes.GET_SUMMARY_STATISTICS_REQUEST,
      getSummaryStatictics
    ),
    takeLatest(
      GlobalStatisticsTypes.GET_COUNTRIES_STATISTICS_REQUEST,
      getCountriesStatictics
    ),
    takeLatest(
      GlobalStatisticsTypes.GET_GLOBAL_TIMELINE_STATISTICS_REQUEST,
      getGlobalTimelineStatistics
    ),
  ]);
}

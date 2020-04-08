import { all, takeLatest } from "redux-saga/effects";

import { Types as GlobalStatisticsTypes } from "../ducks/globalStatistics";
import { Types as CountryStatisticsTypes } from "../ducks/countryStatistics";

import {
  getGlobalSummaryStatistics,
  getGlobalCountryStatistics,
  getGlobalTimelineStatistics,
} from "./globalStatistics";

import {
  getCountrySummaryStatistics,
  getCountryTimelineStatistics,
} from "./countryStatistics";

export default function* rootSaga() {
  return yield all([
    takeLatest(
      GlobalStatisticsTypes.GET_GLOBAL_SUMMARY_STATISTICS_REQUEST,
      getGlobalSummaryStatistics
    ),
    takeLatest(
      GlobalStatisticsTypes.GET_GLOBAL_COUNTRY_STATISTICS_REQUEST,
      getGlobalCountryStatistics
    ),
    takeLatest(
      GlobalStatisticsTypes.GET_GLOBAL_TIMELINE_STATISTICS_REQUEST,
      getGlobalTimelineStatistics
    ),
    takeLatest(
      CountryStatisticsTypes.GET_COUNTRY_SUMMARY_STATISTICS_REQUEST,
      getCountrySummaryStatistics
    ),
    takeLatest(
      CountryStatisticsTypes.GET_COUNTRY_TIMELINE_STATISTICS_REQUEST,
      getCountryTimelineStatistics
    ),
  ]);
}

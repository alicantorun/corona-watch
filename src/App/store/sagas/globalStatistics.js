import { call, select, delay, put } from "redux-saga/effects";
import api from "../../../API";
import { Creators as GlobalStatisticsCreators } from "../ducks/globalStatistics";
import { compare } from "../../utils/compare";
import countryCodes from "../../utils/countryCodes.json";
import { useTheme } from "@material-ui/core/styles";

export function* getGlobalSummaryStatistics() {
  try {
    const { data } = yield call(api.get, "api/all");

    yield put(GlobalStatisticsCreators.getGlobalSummaryStatisticsSuccess(data));
  } catch (err) {
    yield put(GlobalStatisticsCreators.getGlobalSummaryStatisticsFailure());
  }
}

export function* getGlobalCountryStatistics() {
  try {
    let modifiedData = [];
    const { data } = yield call(api.get, "api/countries");

    data.sort(compare);

    data.forEach((element) => {
      modifiedData.push({
        id: countryCodes[element.country],
        country: element.country,
        cases: element.cases,
        todayCases: element.todayCases,
        deaths: element.deaths,
        todayDeaths: element.todayDeaths,
        recovered: element.recovered,
        active: element.active,
        critical: element.critical,
        casesPerOneMillion: element.casesPerOneMillion,
        deathsPerOneMillion: element.deathsPerOneMillion,
        name: element.country,
      });
    });

    yield put(
      GlobalStatisticsCreators.getGlobalCountryStatisticsSuccess(modifiedData)
    );
  } catch (err) {
    yield put(GlobalStatisticsCreators.getGlobalCountryStatisticsFailure());
  }
}

export function* getGlobalTimelineStatistics() {
  try {
    let modifiedData = [];

    const { data } = yield call(api.get, "api/timeline/global");

    Object.keys(data).forEach((key) => {
      modifiedData.push({
        date: new Date(key),
        cases: data[key].cases,
        recoveries: data[key].recovered,
        deaths: data[key].deaths,
      });
    });

    yield put(
      GlobalStatisticsCreators.getGlobalTimelineStatisticsSuccess(modifiedData)
    );
  } catch (err) {
    yield put(GlobalStatisticsCreators.getGlobalTimelineStatisticsFailure());
  }
}

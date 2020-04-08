import { call, select, delay, put } from "redux-saga/effects";
import api from "../../../API";
import { Creators as GlobalCreators } from "../ducks/globalStatistics";
import { compare } from "../../utils/compare";
import countryCodes from "../../utils/countryCodes.json";
import { useTheme } from "@material-ui/core/styles";

export function* getSummaryStatictics() {
  try {
    const { data } = yield call(api.get, "/all");

    yield put(GlobalCreators.getSummaryStaticticsSuccess(data));
  } catch (err) {
    yield put(GlobalCreators.getSummaryStaticticsFailure());
  }
}

export function* getCountriesStatictics() {
  try {
    let modifiedData = [];
    const { data } = yield call(api.get, "/countries");

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
        colorCases: "info",
        colorCritical: "warning",
        colorRecovered: "success",
        colorDeaths: "error",
      });
    });

    yield put(GlobalCreators.getCountriesStaticticsSuccess(modifiedData));
  } catch (err) {
    yield put(GlobalCreators.getCountriesStaticticsFailure());
  }
}

export function* getGlobalTimelineStatistics() {
  try {
    let modifiedData = [];

    const { data } = yield call(api.get, "/timeline/global");

    Object.keys(data).forEach((key) => {
      modifiedData.push({
        date: new Date(key),
        cases: data[key].cases,
        recoveries: data[key].recovered,
        deaths: data[key].deaths,
      });
    });

    yield put(GlobalCreators.getGlobalTimelineStatisticsSuccess(modifiedData));
  } catch (err) {
    yield put(GlobalCreators.getGlobalTimelineStatisticsFailure());
  }
}

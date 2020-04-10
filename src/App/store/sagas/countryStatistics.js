import { call, select, delay, put } from "redux-saga/effects";
import api from "../../../API";
import { Creators as CountryStatisticsCeators } from "../ducks/countryStatistics";
import { compare } from "../../utils/compare";
import countryCodes from "../../utils/countryCodes.json";
import { useTheme } from "@material-ui/core/styles";

export function* getCountrySummaryStatistics({ country }) {
  try {
    const { data } = yield call(api.get, `/countries/${country}`);

    for (const property in countryCodes) {
      if (data.country === property) data.id = countryCodes[property];
    }

    yield put(
      CountryStatisticsCeators.getCountrySummaryStatisticsSuccess(data)
    );
  } catch (err) {
    yield put(CountryStatisticsCeators.getCountrySummaryStatisticsFailure());
  }
}

export function* getCountryTimelineStatistics({ country }) {
  try {
    let modifiedData = [];

    const { data } = yield call(api.get, `/timeline/${country}`);
    const timeline = data.data.timeline;

    timeline.forEach((key) => {
      modifiedData.push({
        date: new Date(key.date),
        cases: key.cases,
        recoveries: key.recovered,
        deaths: key.deaths,
      });
    });

    yield put(
      CountryStatisticsCeators.getCountryTimelineStatisticsSuccess(modifiedData)
    );
  } catch (err) {
    yield put(CountryStatisticsCeators.getCountryTimelineStatisticsFailure());
  }
}

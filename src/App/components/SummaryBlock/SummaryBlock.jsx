import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SummaryBox from "../SummaryBox/SummaryBox";

// const useStyles = makeStyles((theme) => ({}));
import { calculateSum } from "../../utils/calculateSum";

export default function SummaryBlock({ summaryData, countryData }) {
  const { data, loading, error } = summaryData;

  const todayDeaths =
    countryData &&
    countryData.data &&
    calculateSum("todayDeaths", countryData.data);
  const todayCases =
    countryData &&
    countryData.data &&
    calculateSum("todayCases", countryData.data);
  const totalActive =
    countryData && countryData.data && calculateSum("active", countryData.data);
  const remainingRecovered =
    countryData &&
    countryData.data &&
    data &&
    data.cases - data.deaths - data.recovered;
  return (
    <Grid container item xs={12} lg={8}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title="Infections"
            count={data && data.cases}
            type="info"
            loading={loading}
            error={error}
            data={data}
            extraInfo={todayCases}
            extraInfoText={countryData && countryData.data && "today"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title="Deaths"
            count={data && data.deaths}
            loading={loading}
            error={error}
            data={data}
            type="error"
            extraInfo={todayDeaths}
            extraInfoText={countryData && countryData.data && "today"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title="Recoveries"
            count={data && data.recovered}
            type="success"
            loading={loading}
            error={error}
            data={data}
            extraInfo={remainingRecovered}
            extraInfoText={countryData && countryData.data && "remaining"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title="Critical"
            count={data && data.critical}
            type="warning"
            loading={loading}
            error={error}
            data={data}
            extraInfo={totalActive}
            extraInfoText={countryData && countryData.data && "active cases"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

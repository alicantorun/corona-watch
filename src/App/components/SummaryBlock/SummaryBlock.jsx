import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SummaryBox from "../SummaryBox/SummaryBox";

// const useStyles = makeStyles((theme) => ({}));

export default function SummaryBlock({ summaryData }) {
  const { data, loading, error } = summaryData;

  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Infections"
          count={data && data.recovered}
          type="info"
          loading={loading}
          error={error}
          data={data}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Deaths"
          count={data && data.deaths}
          loading={loading}
          error={error}
          data={data}
          type="error"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Recoveries"
          count={data && data.cases}
          type="success"
          loading={loading}
          error={error}
          data={data}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Critical"
          count={data && data.critical}
          type="warning"
          loading={loading}
          error={error}
          data={data}
        />
      </Grid>
    </>
  );
}

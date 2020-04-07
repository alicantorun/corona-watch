import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SummaryBox from "../SummaryBox/SummaryBox";

// const useStyles = makeStyles((theme) => ({}));

export default function SummaryBlock() {
  const [stats, setStats] = useState();
  //   const classes = useStyles();

  useEffect(() => {
    async function fetchList() {
      const rawResponse = await fetch("/all");
      const response = await rawResponse.json();
      setStats(response);
    }
    fetchList();
  }, []);

  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Infections"
          count={stats && stats.recovered}
          type="info"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox title="Deaths" count={stats && stats.deaths} type="error" />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Recoveries"
          count={stats && stats.cases}
          type="success"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryBox
          title="Critical"
          count={stats && stats.critical}
          type="warning"
        />
      </Grid>
    </>
  );
}

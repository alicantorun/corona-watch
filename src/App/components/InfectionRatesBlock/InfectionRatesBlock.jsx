import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import InfectionRateBox from "../InfectionRateBox/InfectionRateBox";

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

  console.log(stats);
  return (
    <Grid container item xs={12} md={6} lg={4}>
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InfectionRateBox
              title="Nations Affected"
              count={999}
              type="info"
              color="info.main"
            />
          </Grid>
          <Grid item xs={6}>
            <InfectionRateBox
              title="Death Rate"
              count={
                stats &&
                ((stats.deaths / stats.closedCases) * 100).toFixed(2) + "%"
              }
              type="error"
              color="error.main"
            />
          </Grid>
          <Grid item xs={6}>
            <InfectionRateBox
              title="Recovery Rate"
              count={
                stats &&
                ((stats.recovered / stats.closedCases) * 100).toFixed(2) + "%"
              }
              type="success"
              color="success.main"
            />
          </Grid>
          <Grid item xs={6}>
            <InfectionRateBox
              title="Critical Rate"
              count={
                stats &&
                ((stats.critical / stats.activeCases) * 100).toFixed(2) + "%"
              }
              type="warning"
              color="warning.main"
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

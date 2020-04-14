import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";
import InfectionRateBox from "../InfectionRateBox/InfectionRateBox";
import CircularProgress from "../CircularProgress/CircularProgress";
// import theme from "@amcharts/amcharts4/themes/animated";

// const useStyles = makeStyles((theme) => ({}));

export default function InfectionRatesBlock({ summaryData }) {
  const { data, loading, error } = summaryData;

  return (
    <Grid container item xs={12} md={6} lg={5}>
      <Paper style={{ width: "100%", padding: 16 }}>
        {loading && !error && <CircularProgress />}
        {!loading && !error && (
          <>
            <Box fontSize="h6.fontSize" paddingBottom={2}>
              Infection Rates
            </Box>
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
                    data &&
                    ((data.deaths / (data.cases - data.active)) * 100).toFixed(
                      2
                    ) + "%"
                  }
                  type="error"
                  color="error.main"
                />
              </Grid>
              <Grid item xs={6}>
                <InfectionRateBox
                  title="Recovery Rate"
                  count={
                    data &&
                    (
                      (data.recovered / (data.cases - data.active)) *
                      100
                    ).toFixed(2) + "%"
                  }
                  type="success"
                  color="success.main"
                />
              </Grid>
              <Grid item xs={6}>
                <InfectionRateBox
                  title="Critical Rate"
                  count={
                    data &&
                    ((data.critical / data.active) * 100).toFixed(2) + "%"
                  }
                  type="warning"
                  color="warning.main"
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
}

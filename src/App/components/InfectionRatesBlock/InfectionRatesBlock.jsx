import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";
import InfectionRateBox from "../InfectionRateBox/InfectionRateBox";
import CircularProgress from "../CircularProgress/CircularProgress";
// import theme from "@amcharts/amcharts4/themes/animated";
import { useTranslation } from "react-i18next";

// const useStyles = makeStyles((theme) => ({}));

export default function InfectionRatesBlock({ summaryData, countryData }) {
  const { data, loading, error } = summaryData;
  const affectedNationsCount =
    countryData && countryData.data && countryData.data.length;
  const { t } = useTranslation();

  return (
    <Grid container item xs={12} md={6} lg={5}>
      <Paper style={{ width: "100%", padding: 16 }}>
        {loading && !error && <CircularProgress />}
        {!loading && !error && (
          <>
            <Box fontSize="h6.fontSize" paddingBottom={2}>
              {t("components.InfectionRatesBlock.title")}
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InfectionRateBox
                  title={t("components.InfectionRatesBlock.nationsAffected")}
                  titleCountry={t("components.InfectionRatesBlock.mildCountry")}
                  count={affectedNationsCount}
                  countCountry={
                    data &&
                    (
                      ((data.active - data.critical) / data.active) *
                      100
                    ).toFixed(2) + "%"
                  }
                  type="info"
                  color="info.main"
                />
              </Grid>
              <Grid item xs={6}>
                <InfectionRateBox
                  title={t("components.InfectionRatesBlock.deathRate")}
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
                  title={t("components.InfectionRatesBlock.recoveryRate")}
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
                  title={t("components.InfectionRatesBlock.criticalRate")}
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

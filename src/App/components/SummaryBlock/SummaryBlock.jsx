import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SummaryBox from "../SummaryBox/SummaryBox";
import { useTranslation } from "react-i18next";

// const useStyles = makeStyles((theme) => ({}));
import { calculateSum } from "../../utils/calculateSum";

export default function SummaryBlock({ summaryData, countryData }) {
  const { data, loading, error } = summaryData;
  const { t } = useTranslation();

  const todayDeaths =
    countryData &&
    countryData.data &&
    calculateSum("todayDeaths", countryData.data);
  const todayCases =
    countryData &&
    countryData.data &&
    calculateSum("todayCases", countryData.data);
  const criticalRate =
    countryData &&
    countryData.data &&
    data &&
    Math.ceil((data.critical / calculateSum("active", countryData.data)) * 100);

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
            title={t("components.SummaryBlock.coronavirusCases")}
            count={data && data.cases}
            type="info"
            loading={loading}
            error={error}
            data={data}
            extraInfo={todayCases}
            extraInfoText={
              countryData &&
              countryData.data &&
              t("components.SummaryBlock.today")
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title={t("components.SummaryBlock.deaths")}
            count={data && data.deaths}
            loading={loading}
            error={error}
            data={data}
            type="error"
            extraInfo={todayDeaths}
            extraInfoText={
              countryData &&
              countryData.data &&
              t("components.SummaryBlock.today")
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title={t("components.SummaryBlock.recovered")}
            count={data && data.recovered}
            type="success"
            loading={loading}
            error={error}
            data={data}
            extraInfo={remainingRecovered}
            extraInfoText={
              countryData &&
              countryData.data &&
              t("components.SummaryBlock.activeCases")
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox
            title={t("components.SummaryBlock.seriousOrCritical")}
            count={data && data.critical}
            type="warning"
            loading={loading}
            error={error}
            data={data}
            extraInfo={criticalRate}
            extraSign={"%"}
            extraInfoText={
              countryData &&
              countryData.data &&
              t("components.SummaryBlock.criticalCasesRate")
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

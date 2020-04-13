import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as GlobalStatisticsCreators } from "../../store/ducks/globalStatistics";

import { Container, Grid } from "@material-ui/core";
import CountryList from "../../components/CountryList/CountryList";
import SummaryBlock from "../../components/SummaryBlock/SummaryBlock";
import WorldMapGraph from "../../components/WorldMapGraph/WorldMapGraph";
import InfectionsGraph from "../../components/InfectionsGraph/InfectionsGraph";
import RateGraph from "../../components/RateGraph/RateGraph";
import DistributionGraph from "../../components/DistributionGraph/DistributionGraph";
import InfectionRatesBlock from "../../components/InfectionRatesBlock/InfectionRatesBlock";
import Counter from "../../components/Counter/Counter";
import Creator from "../../components/Creator/Creator";

import { useTranslation } from "react-i18next";

function AppDashboard(props) {
  const { t } = useTranslation();

  const {
    getGlobalSummaryStatistics,
    getGlobalCountryStatistics,
    getGlobalTimelineStatistics,
    globalStatistics,
  } = props;

  const { summaryData, timelineData, countryData } = globalStatistics;

  useEffect(() => {
    getGlobalSummaryStatistics();
    getGlobalCountryStatistics();
    getGlobalTimelineStatistics();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <SummaryBlock summaryData={summaryData} countryData={countryData} />
          <CountryList countryData={countryData} />
          <WorldMapGraph countryData={countryData} />
          <RateGraph summaryData={summaryData} />
          <InfectionsGraph timelineData={timelineData} />
          <DistributionGraph type="global" countryData={countryData} />
          <InfectionRatesBlock summaryData={summaryData} />
          <Grid container item xs={12} lg={3}>
            <Counter />
            <Creator />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(GlobalStatisticsCreators, dispatch);

const mapStateToProps = (state) => ({
  globalStatistics: state.globalStatistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDashboard);

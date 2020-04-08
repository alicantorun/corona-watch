import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as GlobalStatisticsCreators } from "../../store/ducks/globalStatistics";

import Header from "../../components/Header/Header";
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

import { GET_ALL, GET_COUNTRIES } from "../../../API";

function AppDashboard(props) {
  const {
    getSummaryStatictics,
    getCountriesStatictics,
    getGlobalTimelineStatistics,
    globalStatistics,
  } = props;

  const { summaryData, globalTimelineData, countriesData } = globalStatistics;

  useEffect(() => {
    getSummaryStatictics();
    getCountriesStatictics();
    getGlobalTimelineStatistics();
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <Container maxWidth="2000">
        <Grid
          container
          //   className={classes.root}
          spacing={2}
        >
          <SummaryBlock summaryData={summaryData} />
          <CountryList countriesData={countriesData} />
          <WorldMapGraph countriesData={countriesData} />
          <RateGraph summaryData={summaryData} />
          <InfectionsGraph globalTimelineData={globalTimelineData} />
          {/* 
          <DistributionGraph />
          <InfectionRatesBlock /> */}
          <Grid
            container
            item
            xs={12}
            lg={4}
            // spacing={2}

            //   className={classes.root}
            // spacing={2}
          >
            {/* <Counter /> */}
            {/* <Creator /> */}
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

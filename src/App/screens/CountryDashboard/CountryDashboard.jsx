import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as CountryStatisticsCreators } from "../../store/ducks/countryStatistics";
import { Container, Grid } from "@material-ui/core";

import RateGraph from "../../components/RateGraph/RateGraph";
import SummaryBlock from "../../components/SummaryBlock/SummaryBlock";
import InfectionsGraph from "../../components/InfectionsGraph/InfectionsGraph";
import InfectionRatesBlock from "../../components/InfectionRatesBlock/InfectionRatesBlock";
import DistributionGraph from "../../components/DistributionGraph/DistributionGraph";
import Counter from "../../components/Counter/Counter";
import Creator from "../../components/Creator/Creator";

function CountryDashboard(props) {
  let { country } = useParams();

  const {
    getCountrySummaryStatistics,
    getCountryTimelineStatistics,
    countryStatistics,
  } = props;

  const { summaryData, timelineData } = countryStatistics;

  useEffect(() => {
    getCountrySummaryStatistics(country);
    if (country === "USA") {
      getCountryTimelineStatistics("us");
    }
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid
          container
          //   className={classes.root}
          spacing={2}
        >
          <SummaryBlock summaryData={summaryData} />
          <RateGraph summaryData={summaryData} />
          <InfectionsGraph timelineData={timelineData} />
          <InfectionRatesBlock summaryData={summaryData} />

          <DistributionGraph type="country" countryData={summaryData} />

          <Grid
            container
            item
            xs={12}
            lg={4}
            // spacing={2}

            //   className={classes.root}
            // spacing={2}
          >
            <Counter />
            <Creator />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CountryStatisticsCreators, dispatch);

const mapStateToProps = (state) => ({
  countryStatistics: state.countryStatistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryDashboard);

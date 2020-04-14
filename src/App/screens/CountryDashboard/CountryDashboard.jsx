import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as CountryStatisticsCreators } from "../../store/ducks/countryStatistics";
import { Container, Grid, Typography, Box } from "@material-ui/core";

import RateGraph from "../../components/RateGraph/RateGraph";
import SummaryBlock from "../../components/SummaryBlock/SummaryBlock";
import InfectionsGraph from "../../components/InfectionsGraph/InfectionsGraph";
import InfectionRatesBlock from "../../components/InfectionRatesBlock/InfectionRatesBlock";
import DistributionGraph from "../../components/DistributionGraph/DistributionGraph";
import Counter from "../../components/Counter/Counter";
import Creator from "../../components/Creator/Creator";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

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
    } else {
      getCountryTimelineStatistics(country);
    }
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h4" color="inherit" align="center">
          <Box
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            marginBottom={2}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              src={
                summaryData &&
                summaryData.data &&
                summaryData.data.id &&
                `${process.env.PUBLIC_URL}/flags/${
                  summaryData &&
                  summaryData.data &&
                  summaryData.data.id.toLowerCase()
                }.svg`
              }
              alt=""
            />
            <Box paddingLeft={2} alignSelf="center">
              {country.toUpperCase()} STATISTICS
            </Box>
          </Box>
        </Typography>
        <Grid
          container
          //   className={classes.root}
          spacing={2}
        >
          <ChatRoom />

          <SummaryBlock summaryData={summaryData} />
          <RateGraph summaryData={summaryData} />
          <InfectionsGraph timelineData={timelineData} />
          <InfectionRatesBlock summaryData={summaryData} />

          <DistributionGraph type="country" countryData={summaryData} />

          <Grid
            container
            item
            xs={12}
            lg={3}
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

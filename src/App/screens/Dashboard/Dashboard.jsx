import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Container, Grid } from "@material-ui/core";
import CountryList from "../../components/CountryList/CountryList";
import SummaryBlock from "../../components/SummaryBlock/SummaryBlock";
import WorldMapGraph from "../../components/WorldMapGraph/WorldMapGraph";
import InfectionsGraph from "../../components/InfectionsGraph/InfectionsGraph";
import RateGraph from "../../components/RateGraph/RateGraph";
import DistributionGraph from "../../components/DistributionGraph/DistributionGraph";
function Dashboard() {
  return (
    <div>
      {/* <Header /> */}
      <Container maxWidth="2000">
        <Grid
          container
          //   className={classes.root}
          spacing={2}
        >
          <SummaryBlock />
          <CountryList />
          <WorldMapGraph />
          <RateGraph />
          <InfectionsGraph />
          <DistributionGraph />
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;

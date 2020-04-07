import React, { useEffect, useState } from "react";
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
          <InfectionRatesBlock />
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

export default Dashboard;

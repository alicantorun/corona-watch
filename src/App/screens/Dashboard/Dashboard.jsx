import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Container, Grid } from "@material-ui/core";
import CountryList from "../../components/CountryList/CountryList";
import SummaryBlock from "../../components/SummaryBlock/SummaryBlock";
import WorldMap from "../../components/WorldMap/WorldMap";
import InfectionsGraph from "../../components/InfectionsGraph/InfectionsGraph";
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
          <WorldMap />
          <InfectionsGraph />
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;

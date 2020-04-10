import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Divider } from "@material-ui/core";
import CountrySearch from "../CountrySearch/CountrySearch";
import CountrySort from "../CountrySort/CountrySort";
import VirtualizedTable from "../VirtualizedTable/VirtualizedTable";
import { compare } from "../../utils/compare";
import CircularProgress from "../CircularProgress/CircularProgress";
import { history } from "../../_helpers/history";

const useStyles = makeStyles((theme) => ({
  countryBox: {
    "&:hover": {
      // backgroundColor: "rgb(7, 177, 77, 0.42)",
      cursor: "pointer",
    },
  },
}));

let list = [];

export default function CountryList({ countryData }) {
  const { data, loading, error } = countryData;
  const classes = useStyles();
  list =
    data &&
    data.map((val, idx) => (
      <>
        <Box
          display="flex"
          padding={2}
          className={classes.countryBox}
          onClick={() => {
            history.push(val.country);
          }}
        >
          <Box display="flex" alignContent="center" alignItems="center">
            <img
              style={{ width: "40px", height: "40px" }}
              src={
                val.id &&
                `${process.env.PUBLIC_URL}/flags/${val.id.toLowerCase()}.svg`
              }
              alt=""
            />
          </Box>
          <Box width="100%">
            <Box display="flex" justifyContent="space-between" paddingLeft={2}>
              <Box fontWeight="bold">{val.country}</Box>
              <Box>+ {val.todayCases} Cases</Box>
            </Box>
            <Box display="flex" justifyContent="space-between" paddingLeft={2}>
              <Box>
                {val.cases} Cases & {val.deaths} Deaths
              </Box>
              <Box>+ {val.todayDeaths} Deaths</Box>
            </Box>
          </Box>
        </Box>
        <Box paddingLeft={2} paddingRight={2}>
          <Divider />
        </Box>
      </>
    ));

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ height: "100%", position: "relative" }}>
          {loading && !error && <CircularProgress />}

          {!loading && !error && (
            <Box
              style={{
                overflowY: "scroll",
                height: 500,
              }}
            >
              {list}
            </Box>
          )}
        </Paper>
      </Grid>
    </>
  );
}

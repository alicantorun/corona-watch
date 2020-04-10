import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Paper, Box, Divider } from "@material-ui/core";
import CountrySearch from "../CountrySearch/CountrySearch";
import CountrySort from "../CountrySort/CountrySort";
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
  const theme = useTheme();
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
              <Box>
                <Box component="span" color={theme.palette.info.main}>
                  + {val.todayCases.toLocaleString()} Cases
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              paddingLeft={2}
              paddingBottom={1}
            >
              <Box>
                <Box component="span" color={theme.palette.info.main}>
                  {val.cases.toLocaleString()} Cases
                </Box>{" "}
                &{" "}
                <Box component="span" color={theme.palette.error.main}>
                  {val.deaths.toLocaleString()} Deaths
                </Box>
              </Box>
              <Box>
                <Box component="span" color={theme.palette.error.main}>
                  + {val.todayDeaths.toLocaleString()} Deaths
                </Box>
              </Box>
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
          <Box fontSize="h6.fontSize" padding={2}>
            Affected countries
          </Box>
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

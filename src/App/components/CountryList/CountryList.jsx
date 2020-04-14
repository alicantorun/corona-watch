import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Paper, Box, Divider } from "@material-ui/core";
import CountrySearch from "../CountrySearch/CountrySearch";
import CountrySort from "../CountrySort/CountrySort";
import CircularProgress from "../CircularProgress/CircularProgress";
import { history } from "../../_helpers/history";
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const useStyles = makeStyles((theme) => ({
  countryBox: {
    "&:hover": {
      // backgroundColor: "rgb(7, 177, 77, 0.42)",
      cursor: "pointer",
    },
  },
}));

export default function CountryList({ countryData }) {
  const { data, loading, error } = countryData;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const Row = ({ index, style }) => (
    <div style={style}>
      <Box
        display="flex"
        padding={2}
        className={classes.countryBox}
        onClick={() => {
          history.push(data[index].country);
        }}
      >
        <Box display="flex" alignContent="center" alignItems="center">
          <img
            style={{ width: "40px", height: "40px" }}
            src={
              data[index].id &&
              `${process.env.PUBLIC_URL}/flags/${data[
                index
              ].id.toLowerCase()}.svg`
            }
            alt=""
          />
        </Box>
        <Box width="100%">
          <Box display="flex" justifyContent="space-between" paddingLeft={2}>
            <Box fontWeight="bold">{data[index].country}</Box>
            <Box>
              <Box component="span" color={theme.palette.info.main}>
                + {data[index].todayCases.toLocaleString()}{" "}
                {t("components.CountryList.cases")}
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
                {data[index].cases.toLocaleString()}{" "}
                {t("components.CountryList.cases")}
              </Box>{" "}
              &{" "}
              <Box component="span" color={theme.palette.error.main}>
                {data[index].deaths.toLocaleString()}{" "}
                {t("components.CountryList.deaths")}
              </Box>
            </Box>
            <Box>
              <Box component="span" color={theme.palette.error.main}>
                + {data[index].todayDeaths.toLocaleString()}{" "}
                {t("components.CountryList.deaths")}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingLeft={2} paddingRight={2}>
        <Divider />
      </Box>
    </div>
  );

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ height: "100%", position: "relative" }}>
          {loading && !error && <CircularProgress />}
          <Box fontSize="h6.fontSize" padding={2}>
            {t("components.CountryList.title")}
          </Box>
          {!loading && !error && (
            <Box
              style={{
                height: 500,
              }}
            >
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    className="List"
                    height={height}
                    itemCount={data && data.length}
                    itemSize={80}
                    width={width}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            </Box>
          )}
        </Paper>
      </Grid>
    </>
  );
}

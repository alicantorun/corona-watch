import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core/";
import {
  List,
  AutoSizer,
  Column,
  Table,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { Link } from "react-router-dom";
import { history } from "../../_helpers/history";

function MuiVirtualizedTable({ data, rowCount }) {
  const list = data.map((val, idx) => {
    return {
      id: idx,
      country: val.country,
      cases: val.cases,
      todayCases: val.todayCases,
      deaths: val.deaths,
      todayDeaths: val.todayDeaths,
      flag: val.id,
    };
  });
  console.log(list);

  const renderRow = ({ index, key, style, parent }) => {
    return (
      <>
        <Box display="flex" padding={2}>
          <Box display="flex" alignContent="center" alignItems="center">
            <img
              style={{ width: "40px", height: "40px" }}
              src={
                list[index].flag &&
                `${process.env.PUBLIC_URL}/flags/${list[
                  index
                ].flag.toLowerCase()}.svg`
              }
              alt=""
            />
          </Box>
          <Box width="100%">
            <Box display="flex" justifyContent="space-between" paddingLeft={2}>
              <Box fontWeight="bold">{list[index].country}</Box>
              <Box>+ {list[index].todayCases} Cases</Box>
            </Box>
            <Box display="flex" justifyContent="space-between" paddingLeft={2}>
              <Box>
                {list[index].cases} Cases & {list[index].deaths} Deaths
              </Box>
              <Box>+ {list[index].todayDeaths} Deaths</Box>
            </Box>
          </Box>
        </Box>
        <Box paddingLeft={2} paddingRight={2}>
          <Divider />
        </Box>
      </>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <List
            width={width}
            height={height}
            rowHeight={500}
            rowRenderer={renderRow}
            rowCount={rowCount}
            // overscanRowCount={3}
          />
        );
      }}
    </AutoSizer>
  );
}

export default //  withStyles(styles)(
MuiVirtualizedTable;
// )

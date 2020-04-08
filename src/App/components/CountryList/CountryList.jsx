import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CountrySearch from "../CountrySearch/CountrySearch";
import CountrySort from "../CountrySort/CountrySort";
import VirtualizedTable from "../VirtualizedTable/VirtualizedTable";
import { compare } from "../../utils/compare";
import LinearLoading from "../LinearLoading/LinearLoading";
const useStyles = makeStyles((theme) => ({}));

export default function CountryList({ countryData }) {
  const { data, loading, error } = countryData;

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ height: 500, width: "100%" }}>
          {loading && !error && <LinearLoading />}
          {!loading && !error && (
            <VirtualizedTable
              rowCount={data && data.length}
              rowGetter={({ index }) => data && data[index]}
              columns={[
                {
                  width: 200,
                  label: "Country",
                  dataKey: "country",
                },
                {
                  width: 120,
                  label: "Cases",
                  dataKey: "cases",
                  numeric: true,
                },
                {
                  width: 120,
                  label: "Deaths",
                  dataKey: "deaths",
                  numeric: true,
                },
                {
                  width: 120,
                  label: "Todays Cases",
                  dataKey: "todayCases",
                  numeric: true,
                },
                {
                  width: 120,
                  label: "Todays Deaths",
                  dataKey: "todayDeaths",
                  numeric: true,
                },
              ]}
            />
          )}
        </Paper>
        {/* <CountrySearch />
        <CountrySort /> */}
      </Grid>
    </>
  );
}

// const sample = [
//   ["Frozen yoghurt", 159, 6.0, 24, 4.0],
//   ["Ice cream sandwich", 237, 9.0, 37, 4.3],
//   ["Eclair", 262, 16.0, 24, 6.0],
//   ["Cupcake", 305, 3.7, 67, 4.3],
//   ["Gingerbread", 356, 16.0, 49, 3.9],
// ];

// function createData(id, dessert, calories, fat, carbs, protein) {
//   return { id, dessert, calories, fat, carbs, protein };
// }

// const rows = [];

// for (let i = 0; i < 200; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

// export default function ReactVirtualizedTable() {
//   return (
//     <Paper style={{ height: 400, width: "100%" }}>
//       <VirtualizedTable
//         rowCount={rows.length}
//         rowGetter={({ index }) => rows[index]}
//         columns={[
//           {
//             width: 200,
//             label: "Dessert",
//             dataKey: "dessert",
//           },
//           {
//             width: 120,
//             label: "Calories\u00A0(g)",
//             dataKey: "calories",
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: "Fat\u00A0(g)",
//             dataKey: "fat",
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: "Carbs\u00A0(g)",
//             dataKey: "carbs",
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: "Protein\u00A0(g)",
//             dataKey: "protein",
//             numeric: true,
//           },
//         ]}
//       />
//     </Paper>
//   );
// }

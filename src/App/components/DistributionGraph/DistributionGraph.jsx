import React from "react";
import { Grid, Paper, Box } from "@material-ui/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from "../CircularProgress/CircularProgress";

am4core.useTheme(am4themes_animated);

function DistributionGraph({ countryData, type }) {
  const { data, loading, error } = countryData;

  function calculateSum(index, array = data) {
    var total = 0;
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index];
    }
    return total;
  }

  am4core.ready(function () {
    let chart = am4core.create("pieChart", am4charts.PieChart);
    let pieSeries = chart.series.push(new am4charts.PieSeries());

    function drawMap() {
      if (type === "global") {
        chart.data = data.slice(0, 10);
        let otherCases = data.slice(10, data.length);
        chart.data.push({
          country: "Other",
          cases: calculateSum("cases", otherCases),
        });
        pieSeries.dataFields.value = "cases";
        pieSeries.dataFields.category = "country";
      } else if (type === "country") {
        chart.data.push({
          type: "Recoveries",
          number: data.recovered,
          color: am4core.color("#10c469"),
        });
        chart.data.push({
          type: "Deaths",
          number: data.deaths,
          color: am4core.color("#ff5b5b"),
        });
        chart.data.push({
          type: "Critical",
          number: data.critical,
          color: am4core.color("#f9c851"),
        });
        pieSeries.dataFields.value = "number";
        pieSeries.dataFields.category = "type";
      }

      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.slices.template.stroke = am4core.color("#313a46");
      pieSeries.slices.template.strokeWidth = 1;
      pieSeries.slices.template.strokeOpacity = 1;
    }

    !loading && !error && drawMap();
  });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper style={{ height: "100%", position: "relative" }}>
        {loading && !error && <CircularProgress />}
        {!loading && !error && (
          <Box fontSize="h6.fontSize" padding={2}>
            Infections Distribution
          </Box>
        )}
        <Box p={2}>
          <div id="pieChart" style={{ width: "100%", height: "300px" }}></div>
        </Box>
      </Paper>
    </Grid>
  );
}

export default DistributionGraph;

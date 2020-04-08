import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Chip,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { compare } from "../../utils/compare";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import LinearLoading from "../LinearLoading/LinearLoading";

am4core.useTheme(am4themes_animated);

function DistributionGraph({ countryData, type }) {
  const { data, loading, error } = countryData;

  const theme = useTheme();

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

    console.log(data);
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

      console.log(chart.data);

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
      <Paper style={{ position: "relative" }}>
        {loading && !error && <LinearLoading />}

        <div id="pieChart" style={{ width: "100%", height: "400px" }}></div>
      </Paper>
    </Grid>
  );
}

export default DistributionGraph;

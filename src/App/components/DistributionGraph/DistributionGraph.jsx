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

am4core.useTheme(am4themes_animated);

function App() {
  const [data, setData] = useState([]);
  const [mapState, setMapState] = useState("cases");

  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      const rawResponse = await fetch("/countries");
      const response = await rawResponse.json();
      setData(response.sort(compare));
    }
    fetchData();
  }, []);

  function calculateSum(index, array = data) {
    var total = 0;
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index];
    }
    return total;
  }

  am4core.ready(function () {
    let chart = am4core.create("pieChart", am4charts.PieChart);

    function drawMap() {
      chart.data = data.slice(0, 10);
      let otherCases = data.slice(10, data.length);
      chart.data.push({
        country: "Other",
        cases: calculateSum("cases", otherCases),
      });
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "cases";
      pieSeries.dataFields.category = "country";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.slices.template.stroke = am4core.color("#313a46");
      pieSeries.slices.template.strokeWidth = 1;
      pieSeries.slices.template.strokeOpacity = 1;
    }

    drawMap();
  });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper style={{ position: "relative" }}>
        <div id="pieChart" style={{ width: "100%", height: "500px" }}></div>
      </Paper>
    </Grid>
  );
}

export default App;

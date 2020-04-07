import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Chip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

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
      let mapData = [];
      const rawResponse = await fetch("/timeline/global");
      const response = await rawResponse.json();

      Object.keys(response).forEach((key) => {
        mapData.push({
          date: new Date(key),
          cases: response[key].cases,
          recoveries: response[key].recovered,
          deaths: response[key].deaths,
        });
      });
      //   mapData.push({
      //     date: new Date().getTime(),
      //     cases: this.totalCases,
      //     recoveries: this.totalRecoveries,
      //     deaths: this.totalDeaths
      //   });
      setData(mapData);
    }
    fetchData();
  }, []);

  am4core.ready(function () {
    let chart = am4core.create("lineChart", am4charts.XYChart);

    function createSeriesLine(chart, color, type) {
      let name = type.charAt(0).toUpperCase() + type.slice(1);
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = type;
      series.fill = am4core.color(color);
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.minBulletDistance = 10;
      series.tooltipText = "{valueY} " + name;
      series.tooltip.pointerOrientation = "vertical";

      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.fillOpacity = 0.5;

      series.stroke = am4core.color(color);
      series.legendSettings.labelText = name;
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#282e38");
      return chart;
    }

    function drawMap() {
      //   Object.keys(this.timeLine).forEach((key) => {
      //     this.caseData.push({
      //       date: new Date(key),
      //       cases: this.timeLine[key].cases,
      //       recoveries: this.timeLine[key].recovered,
      //       deaths: this.timeLine[key].deaths,
      //     });
      //   });
      // this.caseData.push({
      //   date: new Date().getTime(),
      //   cases: this.totalCases,
      //   recoveries: this.totalRecoveries,
      //   deaths: this.totalDeaths,
      // });

      chart.numberFormatter.numberFormat = "#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];
      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //   valueAxis.logarithmic = chartType;
      valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
      dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

      createSeriesLine(chart, "#21AFDD", "cases");
      createSeriesLine(chart, "#10c469", "recoveries");
      createSeriesLine(chart, "#ff5b5b", "deaths");

      chart.data = data;

      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.fill = am4core.color("#adb5bd");

      chart.cursor = new am4charts.XYCursor();
      //   this.lineChart = chart;
    }

    drawMap();
  });

  return (
    <Grid item xs={12} md={6} lg={8}>
      <Paper style={{ position: "relative" }}>
        <div id="lineChart" style={{ width: "100%", height: "500px" }}></div>
      </Paper>
    </Grid>
  );
}

export default App;

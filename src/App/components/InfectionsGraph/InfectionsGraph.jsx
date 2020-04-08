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

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import LinearLoading from "../LinearLoading/LinearLoading";

am4core.useTheme(am4themes_animated);

function InfectionsGraph({ timelineData }) {
  const { data, loading, error } = timelineData;
  const [logMap, setLogMap] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event) => {
    setLogMap(event.target.checked);
  };

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

    function drawMap(chartType) {
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
      valueAxis.logarithmic = chartType;
      valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
      dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

      createSeriesLine(chart, theme.palette.info.main, "cases");
      createSeriesLine(chart, theme.palette.success.main, "recoveries");
      createSeriesLine(chart, theme.palette.error.main, "deaths");

      chart.data = data;

      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.fill = am4core.color("#adb5bd");

      chart.cursor = new am4charts.XYCursor();
    }

    !loading && !error && drawMap(logMap);
  });

  return (
    <Grid item xs={12} md={6} lg={8}>
      <Paper style={{ position: "relative" }}>
        <div id="lineChart" style={{ width: "100%", height: "500px" }}></div>
        <div
          style={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={logMap}
                onChange={handleChange}
                color="primary"
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
            }
            label="Logarithmic"
          />
        </div>
      </Paper>
    </Grid>
  );
}

export default InfectionsGraph;

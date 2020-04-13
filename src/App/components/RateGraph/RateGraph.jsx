import React, { useEffect } from "react";
import { Grid, Paper, Box } from "@material-ui/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CircularProgress from "../CircularProgress/CircularProgress";

am4core.useTheme(am4themes_animated);

function RateGraph({ summaryData }) {
  const { data, loading, error } = summaryData;

  useEffect(() => {
    let chart = am4core.create("rateGraph", am4charts.RadarChart);

    function drawMap(chartType) {
      chart.data = [
        {
          category: "Critical",
          value: (data.critical / data.active) * 100,
          full: 100,
        },
        {
          category: "Death",
          value: (data.deaths / (data.cases - data.active)) * 100,
          full: 100,
        },
        {
          category: "Recovered",
          value: (data.recovered / (data.cases - data.active)) * 100,
          full: 100,
        },
        {
          category: "Active",
          value: 100 - (data.critical / data.active) * 100,
          full: 100,
        },
      ];

      // Make chart not full circle
      chart.startAngle = -90;
      chart.endAngle = 180;
      chart.innerRadius = am4core.percent(20);

      // Set number format
      chart.numberFormatter.numberFormat = "#.#'%'";

      // Create axes
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.adapter.add("fill", function (
        fill,
        target
      ) {
        if (target.dataItem.index === 0) {
          return am4core.color("#f9c851");
        }
        if (target.dataItem.index === 1) {
          return am4core.color("#ff5b5b");
        }
        if (target.dataItem.index === 2) {
          return am4core.color("#10c469");
        }
        return am4core.color("#21AFDD");
      });
      categoryAxis.renderer.minGridDistance = 10;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;

      valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

      // Create series
      let series1 = chart.series.push(new am4charts.RadarColumnSeries());
      series1.dataFields.valueX = "full";
      series1.dataFields.categoryY = "category";
      series1.clustered = false;
      series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
        "alternativeBackground"
      );
      series1.columns.template.fillOpacity = 0.08;
      series1.columns.template["cornerRadiusTopLeft"] = 20;
      series1.columns.template.strokeWidth = 0;
      series1.columns.template.radarColumn.cornerRadius = 20;

      let series2 = chart.series.push(new am4charts.RadarColumnSeries());
      series2.dataFields.valueX = "value";
      series2.dataFields.categoryY = "category";
      series2.clustered = false;
      series2.columns.template.strokeWidth = 0;
      series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
      series2.columns.template.radarColumn.cornerRadius = 20;

      series2.columns.template.adapter.add("fill", function (fill, target) {
        //return chart.colors.getIndex(target.dataItem.index);
        if (target.dataItem.index === 0) {
          return am4core.color("#f9c851");
        }
        if (target.dataItem.index === 1) {
          return am4core.color("#ff5b5b");
        }
        if (target.dataItem.index === 2) {
          return am4core.color("#10c469");
        }
        return am4core.color("#21AFDD");
      });

      chart.cursor = new am4charts.RadarCursor();
      chart.cursor.fill = am4core.color("#282e38");
      chart.tooltip.label.fill = am4core.color("#282e38");
    }

    !loading && !error && drawMap();
    return () => chart.dispose();
  }, [data, error, loading]);

  // });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper style={{ height: "100%", position: "relative" }}>
        {!loading && !error && (
          <Box fontSize="h6.fontSize" padding={2}>
            Rate Distribution
          </Box>
        )}
        {loading && !error && <CircularProgress />}
        <Box p={2}>
          <div id="rateGraph" style={{ width: "100%", height: "450px" }}></div>
        </Box>
      </Paper>
    </Grid>
  );
}

export default RateGraph;

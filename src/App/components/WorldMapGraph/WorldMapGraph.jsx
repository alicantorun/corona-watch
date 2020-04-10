import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Chip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import countryCodes from "../../utils/countryCodes.json";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import CircularProgress from "../CircularProgress/CircularProgress";

am4core.useTheme(am4themes_animated);

function WorldMapGraph({ countryData }) {
  const [mapState, setMapState] = useState("cases");
  const theme = useTheme();
  const { data, loading, error } = countryData;

  am4core.ready(function () {
    let chartMap = am4core.create("chartdiv", am4maps.MapChart);
    chartMap.geodata = am4geodata_worldLow;
    chartMap.projection = new am4maps.projections.Miller();

    function getColor(mapState) {
      switch (mapState) {
        case "cases":
          return theme.palette.info.main;
          break;
        case "recovered":
          return theme.palette.success.main;
          break;
        case "deaths":
          return theme.palette.error.main;
          break;
        case "critical":
          return theme.palette.warning.main;
          break;

        default:
          break;
      }
    }

    function drawMap(mapState) {
      let polygonSeries = chartMap.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;

      let imageSeries = chartMap.series.push(new am4maps.MapImageSeries());
      imageSeries.data = data;
      imageSeries.dataFields.value = mapState;

      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true;

      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;

      circle.tooltipText = "{name}: [bold]{value}[/]";
      circle.fill = getColor(mapState);

      imageSeries.heatRules.push({
        target: circle,
        property: "radius",
        min: 4,
        max: 30,
        dataField: "value",
      });

      imageTemplate.adapter.add("latitude", function (latitude, target) {
        let polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext["id"]
        );
        if (polygon) {
          return polygon.visualLatitude;
        }
        return latitude;
      });

      imageTemplate.adapter.add("longitude", function (longitude, target) {
        let polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext["id"]
        );
        if (polygon) {
          return polygon.visualLongitude;
        }
        return longitude;
      });

      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color(theme.palette.background.default);
      polygonTemplate.stroke = am4core.color(theme.palette.background.paper);
    }

    !loading && !error && drawMap(mapState);
  });

  return (
    <Grid item xs={12} md={6} lg={8}>
      <Paper style={{ height: "100%", position: "relative" }}>
        {loading && !error && <CircularProgress />}
        <Box p={2}>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </Box>
        {!loading && !error && (
          <>
            <div
              style={{
                position: "absolute",
                top: theme.spacing(2),
                right: theme.spacing(2),
                width: "96%",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Box fontSize="h6.fontSize">Worldwide Infections</Box>
                <Box>
                  <Chip
                    size="small"
                    style={{ backgroundColor: theme.palette.info.main }}
                    label="Cases"
                    onClick={() => setMapState("cases")}
                  />
                  <Chip
                    size="small"
                    style={{ backgroundColor: theme.palette.error.main }}
                    label="Deaths"
                    onClick={() => setMapState("deaths")}
                  />
                  <Chip
                    size="small"
                    style={{ backgroundColor: theme.palette.warning.main }}
                    label="Critical"
                    onClick={() => setMapState("critical")}
                  />
                  <Chip
                    size="small"
                    style={{ backgroundColor: theme.palette.success.main }}
                    label="Recoveries"
                    onClick={() => setMapState("recovered")}
                  />
                </Box>
              </Box>
            </div>
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default WorldMapGraph;

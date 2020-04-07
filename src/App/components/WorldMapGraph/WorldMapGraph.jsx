import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Chip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import countryCodes from "../../utils/countryCodes.json";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

function App() {
  const [data, setData] = useState([]);
  const [mapState, setMapState] = useState("cases");
  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      let mapData = [];
      const rawResponse = await fetch("/countries");
      const response = await rawResponse.json();
      await response.forEach((element) => {
        mapData.push({
          id: countryCodes[element.country],
          cases: element.cases,
          todayCases: element.todayCases,
          deaths: element.deaths,
          todayDeaths: element.todayDeaths,
          recovered: element.recovered,
          active: element.active,
          critical: element.critical,
          casesPerOneMillion: element.casesPerOneMillion,
          deathsPerOneMillion: element.deathsPerOneMillion,
          name: element.country,
          colorCases: theme.palette.info.main,
          colorCritical: theme.palette.warning.main,
          colorRecovered: theme.palette.success.main,
          colorDeaths: theme.palette.error.main,
        });
      });
      setData(mapData);
    }
    fetchData();
  }, []);

  am4core.ready(function () {
    let chartMap = am4core.create("chartdiv", am4maps.MapChart);
    chartMap.geodata = am4geodata_worldLow;
    chartMap.projection = new am4maps.projections.Miller();

    function getColor(mapState) {
      switch (mapState) {
        case "cases":
          return "colorCases";
          break;
        case "recovered":
          return "colorRecovered";
          break;
        case "deaths":
          return "colorDeaths";
          break;
        case "critical":
          return "colorCritical";
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
      circle.propertyFields.fill = getColor(mapState);
      circle.tooltipText = "{name}: [bold]{value}[/]";

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
      polygonTemplate.fill = am4core.color("#fff");
      polygonTemplate.stroke = am4core.color("#313a46");
    }

    drawMap(mapState);
  });

  console.log(data);
  return (
    <Grid item xs={12} md={6} lg={8}>
      <Paper style={{ position: "relative" }}>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        <div
          style={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <Chip
            style={{ backgroundColor: theme.palette.info.main }}
            label="Cases"
            onClick={() => setMapState("cases")}
          />
          <Chip
            style={{ backgroundColor: theme.palette.error.main }}
            label="Deaths"
            onClick={() => setMapState("deaths")}
          />
          <Chip
            style={{ backgroundColor: theme.palette.warning.main }}
            label="Critical"
            onClick={() => setMapState("critical")}
          />
          <Chip
            style={{ backgroundColor: theme.palette.success.main }}
            label="Recoveries"
            onClick={() => setMapState("recovered")}
          />
        </div>
      </Paper>
    </Grid>
  );
}

export default App;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Divider, Typography, Box } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
    height: theme.spacing(1),
  },
  info: { backgroundColor: theme.palette.info.main },
  success: { backgroundColor: theme.palette.success.main },
  warning: { backgroundColor: theme.palette.warning.main },
  error: { backgroundColor: theme.palette.error.main },
}));

export default function InfectionRateBox({
  title,
  count,
  totalCount,
  type,
  color,
  titleCountry,
  countCountry,
}) {
  const classes = useStyles();

  return (
    <Paper style={{ backgroundColor: "#17223b", height: "100%" }}>
      <Box padding={2}>
        <Typography>
          <Box textAlign="center" fontSize="h4.fontSize" m={1} color={color}>
            {countCountry ? countCountry : count}
          </Box>
        </Typography>
        <Box fontSize="h6.fontSize" textAlign="center" m={1}>
          {titleCountry ? titleCountry : title}
        </Box>
        <Divider
          className={clsx(
            classes.divider,
            type === "info" && classes.info,
            type === "success" && classes.success,
            type === "warning" && classes.warning,
            type === "error" && classes.error
          )}
          color="info"
        />
      </Box>
    </Paper>
  );
}

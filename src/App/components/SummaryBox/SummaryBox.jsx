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

export default function SummaryBox({ title, count, totalCount, type }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box padding={2}>
        <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1}>
          {title}
        </Box>
        <Box
          fontFamily="Monospace"
          fontSize="h6.fontSize"
          textAlign="right"
          m={1}
        >
          {count}
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

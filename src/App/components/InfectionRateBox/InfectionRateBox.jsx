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
}) {
  const classes = useStyles();

  return (
    <Paper>
      <Box padding={2}>
        <Typography>
          <Box
            fontFamily="Monospace"
            textAlign="center"
            fontSize="h4.fontSize"
            m={1}
            color={color}
          >
            {count}
          </Box>
        </Typography>
        <Box
          fontFamily="Monospace"
          fontSize="h6.fontSize"
          textAlign="center"
          m={1}
        >
          {title}
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

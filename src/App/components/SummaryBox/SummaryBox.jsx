import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Divider, Box } from "@material-ui/core";
import clsx from "clsx";
import CircularProgress from "../CircularProgress/CircularProgress";

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

export default function SummaryBox({
  title,
  count,
  totalCount,
  type,
  loading,
  error,
  extraInfo,
  extraInfoText,
  extraSign,
}) {
  const classes = useStyles();

  return (
    <Paper>
      <Box padding={2}>
        {loading && !error && <CircularProgress />}
        {/* {!loading && error && (
          <Box
            
            fontSize="h6.fontSize"
            textAlign="center"
            m={1}
          >
            An error occured try later
          </Box>
        )} */}
        {!loading && !error && (
          <>
            <Box fontSize="h6.fontSize" m={1}>
              {title}
            </Box>
            <Box fontSize="h4.fontSize" textAlign="right" m={1}>
              {count.toLocaleString()}
            </Box>
            <Box fontSize="h6.fontSize" textAlign="right" m={1}>
              {extraSign && extraSign}
              {extraInfo && extraInfo.toLocaleString()}{" "}
              {extraInfoText && extraInfoText}
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
          </>
        )}
      </Box>
    </Paper>
  );
}

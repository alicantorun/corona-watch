import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SuspenseLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress disableShrink color="secondary" />
    </div>
  );
}

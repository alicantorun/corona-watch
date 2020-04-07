import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="default" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
          >
            CORONA WATCH
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

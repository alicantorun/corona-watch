import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import ThemeContextProvider from "../../../ThemeContextProvider";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  appbar: {
    alignItems: "center",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { onToggleDarkTheme } = useContext(ThemeContextProvider);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="inherit" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            onClick={() => {
              onToggleDarkTheme();
            }}
          >
            CORONA WATCH
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Switch } from "@material-ui/core";
import ThemeContextProvider from "../../../ThemeContextProvider";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

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
  const [theme, setTheme] = useState(true);
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="inherit" position="static">
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            className={classes.typography}
          >
            {t("components.Header.title")}
          </Typography>
          <LanguageSwitcher />
          {/* <Switch
            checked={theme}
            onChange={() => {
              onToggleDarkTheme();
              setTheme(!theme);
            }}
            color="primary"
            inputProps={{ "aria-label": "checkbox with default color" }}
          /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

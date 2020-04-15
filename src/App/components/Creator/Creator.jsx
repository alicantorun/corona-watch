import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
const useStyles = makeStyles((theme) => ({
  grid: { marginTop: theme.spacing(2) },
  box: { padding: 20 },
  paperRoot: { width: "100%" },
  hover: {
    "&:hover": {
      color: theme.palette.background.default,
    },
  },
}));

function Counter() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paperRoot}>
      <Box className={classes.box}>
        <Typography>
          <Box textAlign="center" fontSize="h4.fontSize" m={1}>
            {t("components.Creator.title")}
          </Box>
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          p={3}
        >
          <Link
            className={classes.hover}
            color="inherit"
            href="https://github.com/alicantorun"
          >
            <GitHubIcon fontSize="large" />
          </Link>
          <Link
            className={classes.hover}
            color="inherit"
            href="https://www.linkedin.com/in/alican-torun/"
          >
            <LinkedInIcon fontSize="large" />
          </Link>
          <Link
            className={classes.hover}
            color="inherit"
            href="https://www.instagram.com/alicantorun_/"
          >
            <InstagramIcon fontSize="large" />
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}

export default Counter;

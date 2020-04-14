import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: { marginTop: theme.spacing(2) },
  box: { padding: 20 },
  paperRoot: { width: "100%" },
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
      </Box>
    </Paper>
  );
}

export default Counter;

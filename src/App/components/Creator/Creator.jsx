import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: { marginTop: theme.spacing(2) },
  box: { padding: 50 },
  paperRoot: { width: "100%" },
}));

function Counter() {
  const classes = useStyles();

  return (
    <Paper className={classes.paperRoot}>
      <Box className={classes.box}>
        <Typography>
          <Box textAlign="center" fontSize="h4.fontSize" m={1}>
            Created by Alican Torun
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
}

export default Counter;

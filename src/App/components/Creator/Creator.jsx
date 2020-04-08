import React from "react";
import {
  Paper,
  Divider,
  Typography,
  Box,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: { marginTop: theme.spacing(2) },
  box: { padding: 50 },
}));

function Counter() {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid item xs={12} className={matches && classes.grid}>
      <Paper>
        <Box className={classes.box}>
          <Typography>
            <Box textAlign="center" fontSize="h4.fontSize" m={1}>
              Created by Alican Torun
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Counter;

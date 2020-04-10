import React from "react";
import Timer from "react-compound-timer";
import { Paper, Typography, Box, Table, TableRow } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperRoot: { width: "100%", marginBottom: theme.spacing(2) },
}));

const TableCell = withStyles((theme) => ({
  root: {
    borderBottom: "none",
    padding: theme.spacing(1),
  },
}))(MuiTableCell);

function Counter() {
  const classes = useStyles();

  return (
    <Paper className={classes.paperRoot}>
      <Box padding={2}>
        <Typography>
          <Box textAlign="center" fontSize="h4.fontSize" m={1}>
            Outbreak Started
          </Box>
        </Typography>

        <Timer initialTime={11131200000} direction="forward">
          {() => (
            <React.Fragment>
              <Typography>
                <Box textAlign="center" fontSize="h4.fontSize" m={1}>
                  <Table align="center">
                    <TableRow>
                      <TableCell align="center">
                        <Timer.Days />
                      </TableCell>
                      <TableCell align="center">
                        <Timer.Hours />
                      </TableCell>
                      <TableCell align="center">
                        <Timer.Minutes />
                      </TableCell>
                      <TableCell align="center">
                        <Timer.Seconds />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Days</TableCell>
                      <TableCell align="center">Hours</TableCell>
                      <TableCell align="center">Minutes</TableCell>
                      <TableCell align="center">Seconds</TableCell>
                    </TableRow>
                  </Table>
                </Box>
              </Typography>
            </React.Fragment>
          )}
        </Timer>
      </Box>
    </Paper>
  );
}

export default Counter;

import React from "react";
import Timer from "react-compound-timer";
import {
  Paper,
  Divider,
  Typography,
  Box,
  Grid,
  Table,
  TableRow,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

function Counter() {
  return (
    <Grid item xs={12}>
      <Paper>
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
    </Grid>
  );
}

export default Counter;

import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListEntry from './ListEntry.jsx';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});



export default function List({list, companies}) {
  var company = companies[0]
  const classes = useStyles();
  return (

    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((company) => (
              <TableRow key={company.symbol}>
                <TableCell 
                  component="th" 
                  scope="row"
                >
                  {company.symbol}
                </TableCell>
                <TableCell align="right">{company.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

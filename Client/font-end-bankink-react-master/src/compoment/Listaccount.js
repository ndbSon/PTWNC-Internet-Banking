import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
Listaccount.propTypes = {
  rows:PropTypes.array,
};
Listaccount.defaultProps = {
  rows:[]
}

export default function Listaccount(props) {
    var {rows,Nametable}=props
  return (
    <React.Fragment>
      <Title>{Nametable}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Number Account</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id} hover>
                <TableCell><h3>{row.Id}</h3></TableCell>
              <TableCell align="right"><h4>{row.Amount} VND</h4></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
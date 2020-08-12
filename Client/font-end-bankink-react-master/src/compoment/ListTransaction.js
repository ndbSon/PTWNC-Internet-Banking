import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination  from '@material-ui/lab/Pagination';
import Title from './Title';
import PropTypes from 'prop-types';
ListTransaction.propTypes = {
  rows:PropTypes.array,
};
ListTransaction.defaultProps = {
  rows:[]
}


export default function ListTransaction(props) {
    var {rows,Nametable,count}=props;
    console.log("rows",rows)
    console.log("count",typeof count)
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
      console.log(value)
      var {getpage} = props;
      getpage(value)
    };
  return (
    <React.Fragment>
      <Title>{Nametable}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell><h3>Account</h3></TableCell>
            <TableCell ><h3>Amount</h3></TableCell>
            <TableCell ><h3>Content</h3></TableCell>
            <TableCell ><h3>Time</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id} hover>
              {Nametable==="To Account Transaction" ?<TableCell><h4>{row.Fromaccount}</h4>{row.FromName}</TableCell> :
              <TableCell><h4>{row.Toaccount}</h4>{row.ToName}</TableCell> }
              <TableCell ><h4>{row.Amount} VND</h4> </TableCell>
              <TableCell >{row.Content}</TableCell>
              <TableCell >{row.Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={Math.ceil(count/5)} page={page} onChange={handleChange} color="secondary" />
    </React.Fragment>
  );
}
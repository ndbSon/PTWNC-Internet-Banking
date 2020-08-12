import React, { useState, useRef } from 'react';
import Dashboard from '../../compoment/Dashboard'
import ListAccount from '../../compoment/adListAccount'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
Account.propTypes = {
  listAccount: PropTypes.array,
};

Account.defaultProps = {
  listAccount: []
}


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '75vh'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // backgroundColor: fade('#03a9f4', 0.15),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '100ch',
      },
    },
  },
}));

function Account(props) {
  const classes = useStyles();
  var { listAccount,onSubmit} = props;
  let [search,setsearch]=useState('');
  const typingTime =useRef(null);
  function onChange(e){
    let {Search}=props
    let tempt=e.target.value;
    setsearch(tempt)
    if(typingTime.current){
      clearTimeout(typingTime.current);
    }
    typingTime.current=setTimeout(()=>{
      Search(tempt)
      // console.log("tempt: ",tempt)
    },400)
   
  }
  return (
    <Dashboard NameDashboard={"Account"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
                value={search}
              />
            </div>
            <ListAccount rows={listAccount} onSubmit={onSubmit}></ListAccount>
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default Account;
import React,{useState} from 'react';

import Dashboard from '../../compoment/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Listmemorize from '../../compoment/Listmemorize'
import Fromaddmemorize from '../../compoment/Fromaddmemorize'


MemorizeAccount.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '75vh'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

function MemorizeAccount(props) {
    const classes = useStyles();
    var [isLoading, setLoading] = useState(true);
    var [nameForm,setnameForm]=useState('Add person');
    var [itemUpdate,setitemUpdate]=useState(null)
    var {listRemind}=props;
    function openaddform() {
        setLoading(false)
        setnameForm('Add person')
        setitemUpdate(null)
    }
    function openupdateform(person) {
        setLoading(false)
        setnameForm('Update person')
        setitemUpdate(person)
    }
    function goback(){
        setLoading(true)
    }
    function onSubmit(values){
        var {onSubmit}=props;
        onSubmit({values,nameForm});
    }

    function ondelete(item){
        var {ondelete}=props;
        ondelete(item);
    }

    return (
        <Dashboard NameDashboard={"Menorize Account"}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper} >
                    {isLoading ? <Button size="medium" variant="contained" color="primary" onClick={openaddform}>
                        Add person
                    </Button> : ''}
                        {isLoading ? <Listmemorize rows={listRemind} openform={openupdateform} ondelete={ondelete}></Listmemorize> : ''}
                        {isLoading===false ? 
                        <Fromaddmemorize 
                        goback={goback} 
                        nameForm={nameForm} 
                        itemUpdate={itemUpdate} 
                        onSubmit={onSubmit}>

                        </Fromaddmemorize> : ''}
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}




export default MemorizeAccount
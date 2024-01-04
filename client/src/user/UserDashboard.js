import React, {useContext} from 'react'
import {AuthContext} from '../globalStates';
import UserLayout from './Layout/UserLayout'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
}));

const UserDashboard = () => {

    const classes = useStyles();

    const [authState] = useContext(AuthContext);

    return (
        <UserLayout>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h2 className="text-center">Hello {authState.prefix === undefined ? authState.firstName+" "+authState.lastName : authState.prefix+". "+authState.firstName+" "+authState.lastName}</h2>
              </Paper>
            </Grid>
            
        </UserLayout>
    )
}

export default UserDashboard

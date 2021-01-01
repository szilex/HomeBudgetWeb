import React from 'react';
import StrategyCard from './StrategyCard'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const StrategiesList = ({ strategies, options }) => {
    
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                {strategies.map((strategy, key) => (
                    <Grid key={key} item>
                        <StrategyCard strategy={strategy} key={key} options={options}/>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StrategiesList;
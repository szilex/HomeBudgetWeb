import React from 'react';
import RegularExpenseCard from './ExpenseCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

const RegularExpenseList = ({ expenses }) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                {expenses.map((expense, key) => (
                    <Grid key={key} item>
                        <RegularExpenseCard expense={expense} key={key}/>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RegularExpenseList;
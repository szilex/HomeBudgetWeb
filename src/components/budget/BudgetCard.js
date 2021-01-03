import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    border: 5,
    borderRadius: 13,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FD8F49 90%)',
    boxShadow: '0 3px 5px 2px rgba(250, 107, 135, .4s)',
    color: 'white',
  },
  avatar: {
    backgroundColor: green[700],
  },
  button: {
    border: 0,
    borderRadius: 3,
    background:  'linear-gradient(45deg, #2196F3 30%, #23CAF0 90%)',
    boxShadow: '0 3px 5px 2px rgba(37, 201, 247, .3)',
    color: 'white',
    height: 44,
    padding: '0 25px',
    margin: 8,
  },
  linkAction: {
    justifyContent: 'center',
  },
  link: {
    color: "#FFFFFF"
  },
  cardHeaderRoot: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  cardHeaderContent: {
      overflow: "hidden",
      display: "flex",
  },
}));

export default function BudgetCard( { budget, options } ) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.header}
                avatar={
                <Avatar aria-label="Budget" className={classes.avatar}>
                    B
                </Avatar>
                }
                action={
                  <>
                    { options && options.showDelete && 
                      <IconButton aria-label="settings" onClick={() => {console.log("delete"); options.onDelete(budget.id)}}>
                        <Delete />
                    </IconButton>
                    }
                  </>
                }
                title={`Budget: ${moment(budget.date).format("MM-YYYY")}`}
                titleTypographyProps={{variant: 'h5', component: 'span'}}
                classes={{
                  root: classes.cardHeaderRoot,
                  content: classes.cardHeaderContent
              }}
            />
            { options && options.showIncome && 
              <CardContent>
                <Typography variant="body1" component="p">
                  Income: {budget.income}
                </Typography>
              </CardContent>
            }
            <CardActions disableSpacing className={classes.linkAction}>
                <Button aria-label="show more" className={classes.button} component={Link} variant='outlined' to={{ pathname: `/budget/id/${budget.id}`, budget: budget }}>
                    Show more
                </Button>
            </CardActions>
        </Card>
    );
}
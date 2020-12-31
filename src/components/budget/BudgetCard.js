import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
}));

export default function BudgetCard( { budget } ) {
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
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={`Budget: ${moment(budget.date).format("MM-YYYY")}`}
                titleTypographyProps={{variant: 'h5'}}
            />
            <CardContent>
                <Typography variant="body1" component="p">
                Income: {budget.income}

                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.linkAction}>
                <Button aria-label="show more" className={classes.button} component={Link} variant='outlined' to={{ pathname: `/budget/id/${budget.id}`, budget: budget }}>
                    Show more
                </Button>
            </CardActions>
        </Card>
    );
}
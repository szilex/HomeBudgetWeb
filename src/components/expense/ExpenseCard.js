import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardActions, Avatar, Button, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {
        width: 350,
        border: 5,
        borderRadius: 13,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(250, 107, 135, .4s)',
        color: 'white',
    },
    avatar: {
        backgroundColor: red[400],
    },
    button: {
        border: 2,
        borderRadius: 6,
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
    }
}));

export default function ExpenseCard( { expense, options } ) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.header}
                avatar={
                    <Avatar aria-label="Strategy" className={classes.avatar}>
                      E
                    </Avatar>
                }
                action={
                    <>
                        { options && options.showDelete && 
                            <IconButton aria-label="settings" onClick={() => {console.log("delete"); options.onDelete(expense.id)}}>
                                <Delete />
                            </IconButton> 
                        }
                    </>
                }
                title={expense.name}
                titleTypographyProps={{variant: 'h5', component: 'span'}}
                classes={{
                    root: classes.cardHeaderRoot,
                    content: classes.cardHeaderContent
                }}
            />
            { options && options.showCategory &&
                <CardContent>
                    <Typography variant="body1" component="p">
                        Category: {expense.category}
                    </Typography>
                </CardContent>
            }
            { options && options.showAmount && 
                <CardContent>
                    <Typography variant="body1" component="p">
                        Amount: {expense.amount}
                    </Typography>
                </CardContent>
            }
            { options && options.showLink &&
                <CardActions disableSpacing className={classes.linkAction}>
                    <Button aria-label="show more" className={classes.button} component={Link} variant='outlined' to={{ pathname: `/expense/id/${expense.id}`, expense: expense }}>
                        Show more
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
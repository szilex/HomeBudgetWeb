import React from "react";
import { Spinner } from 'react-bootstrap'
import { Redirect, withRouter } from "react-router-dom";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment'
import AuthService from '../../services/AuthService'
import ExpenseService from '../../services/ExpenseService'
import StrategyService from '../../services/StrategyService'
import BudgetService from '../../services/BudgetService'
import ExpenseModal from '../../components/expense/ExpenseModal'
import ExpenseList from '../../components/expense/ExpenseList'
import StrategyList from '../../components/strategy/StrategyList'
import NumberFormatFloat from '../../helpers/NumberFormatCustom'
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const styles = theme => ({
    textField: {
        width: 500
    },
    select: {
        textAlign: 'left'
    },
    menuItem: {
        textAlign: 'left'
    },
    helperText: {
        color: red[400]
    },
})

class NewBudgetPage extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { props: props, income: 0, fetched: false, currentDate: moment(), date: null};
    }

    async componentDidMount() {
        
        var categories, regularExpenses, strategies;

        try {
            const result = await ExpenseService.getExpenseCategories();
            console.log(result);
            categories = result;
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "Could not obtain categories" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        try {
            const result = await ExpenseService.getCurrentRegularExpenses();
            console.log(result);
            regularExpenses = result
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "No regular expense found" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        try {
            const result = await StrategyService.getCurrentStrategies();
            console.log(result)
            strategies = result
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "No strategy found" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        this.setState({ categories: categories, customExpenses: [], regularExpenses: regularExpenses, strategies: strategies, categoryId: '', fetched: true})
    }

    render() {
        const { status, handleChange, handleBlur, classes, setFieldValue, validateField } = this.props;
        const handleIncomeChange = (event) => {
            this.setState({ 
                income: event.target.value,
                isIncomeSet: true 
            })
            validateField('income')
            handleChange(event)
        }
        const handleCustomExpenseChange = (event) => {
            var customExpenses = this.state.customExpenses;
            customExpenses.push(event.target.value)
            this.setState({
                customExpenses: customExpenses
            })
            console.log(customExpenses)
        }

        if (!AuthService.currentTokenValue) {
            AuthService.logout();
            return <Redirect to={"/login"}/>
        } else {
            if (!this.state.fetched) {
                return (
                    <div className="spinner">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>  
                        <br/><br/>
                        <h2>Fetching content...</h2>  
                    </div>
                )    
            } else {
                if (this.state.error) {
                    return (
                        <>
                        <h1>Error while retrieving regular expenses: {this.state.error}</h1>
                        <button className="btn btn-primary btn-block" type="submit" onClick={() => this.props.history.goBack()}>Go back</button>
                        </>
                    )
                } else {
                    return(
                        <div className="container">
                            <div className="strategy-form-wrapper" >
                                <h2>New budget</h2>
                                <Form className="form-container">
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="income">
                                            {({ field, form }) => (
                                                <TextField 
                                                    className={classes.textField}
                                                    name={"income"}
                                                    label={"Income"}
                                                    placeholder="Income" 
                                                    variant="outlined" 
                                                    InputLabelProps={{shrink: true,}}
                                                    InputProps={{ inputComponent: NumberFormatFloat }}
                                                    error={Boolean(form.errors.income && form.touched.income)}
                                                    onChange={handleIncomeChange}
                                                    onBlur={handleBlur}
                                                    helperText={form.errors.income && form.touched.income && String(form.errors.income)}
                                                />
                                        )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="date">
                                            {({ field, form }) => (
                                                    <FormControl variant="outlined" className={classes.textField}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                name="date"
                                                                autoOk={true}
                                                                variant="inline"
                                                                inputVariant="outlined"
                                                                format='MM-yyyy'
                                                                //views={['year','month']}
                                                                minDate={this.state.currentDate}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                label="Date"
                                                                error={Boolean(form.errors.date && form.touched.date)}
                                                                value={this.state.date}
                                                                onChange={ event => {
                                                                    console.log(event)
                                                                    setFieldValue('date', event)
                                                                    this.setState({date: event, isDateSet: true})
                                                                }}
                                                                onBlur={handleBlur}
                                                                KeyboardButtonProps={{'aria-label': 'change date',}}
                                                                TextFieldComponent={ (props) => <TextField {...props} disabled={true}/>}
                                                            />                                   
                                                        </MuiPickersUtilsProvider>
                                                        {form.errors.date && form.touched.date && <FormHelperText className={classes.helperText}>Field required</FormHelperText>}
                                                    </FormControl>
                                            )}
                                        </Field>
                                    </div>
                                    { this.state.isIncomeSet && this.state.isDateSet &&
                                        <>
                                            <div className="form-group">
                                                <Field validateOnBlur validateOnChange name="customExpenses">
                                                {({ field, form }) => (
                                                    <>
                                                        <input type="hidden" name="customExpenses" value={this.state.customExpenses}/>
                                                        <h2>Custom expenses</h2>
                                                        <ExpenseModal categories={this.state.categories} date={this.state.currentDate} onSubmit={handleCustomExpenseChange}/>
                                                        <ExpenseList expenses={this.state.customExpenses} options={{showCategory: true, showAmount: true}}/>
                                                    </>
                                                )}
                                                </Field>
                                            </div>
                                            { 
                                                this.state.regularExpenses && <div className="form-group">
                                                    <Field validateOnBlur validateOnChange name="regularExpenses">
                                                    {({ field, form }) => (
                                                        <>
                                                            <input type="hidden" name="regularExpenses" value={this.state.regularExpenses}/>
                                                            <h2>Regular expenses</h2>
                                                            <ExpenseList expenses={this.state.regularExpenses} options={{showCategory: true, showAmount: true}}/>
                                                        </>
                                                    )}
                                                    </Field>
                                                </div>
                                            }
                                            { this.state.strategies &&
                                                <div className="form-group">
                                                    <Field validateOnBlur validateOnChange name="strategies">
                                                    {({ field, form }) => (
                                                        <>
                                                            <input type="hidden" name="strategies" value={this.state.strategies}/>
                                                            <h2>Strategies</h2>
                                                            <StrategyList strategies={this.state.strategies} options={{showCategory: true, showGoal: true}}/>
                                                        </>
                                                    )}
                                                    </Field>
                                                </div>
                                            }
                                            <button style={{paddingTop: "60dp"}} type="submit" className="btn btn-primary btn-block" 
                                                onClick={() => {
                                                    setFieldValue("customExpenses", this.state.customExpenses)
                                                    setFieldValue("regularExpenses", this.state.regularExpenses)
                                                    setFieldValue("strategies", this.state.strategies)
                                                }}>Submit</button>
                                            { status && status.failed  && <span className="help-block text-danger">{"Operation failed: " + status.failed}</span>}
                                        </>
                                    } 
                                </Form>
                        </div>
                    </div>
                    )
                }
            }
        }
    }
}
    
const NewBudgetFormik = withFormik({

    mapPropsToValues: (props) => {
        return {
        income: props.income || '',
        date: props.date || '',
        customExpenses: props.customExpenses || [],
        regularExpenses: props.regularExpenses || [],
        strategies: props.strategies || [],
        }
    },
    handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
        try {
            let budget = {
                income: Math.round(values.income * 100) / 100,
                date: moment(values.date).format("YYYY-MM-DD"),
                customExpenses: values.customExpenses,
                regularExpenses: values.regularExpenses,
                strategies: values.strategies,
            }
            console.log(budget)
            let result = await BudgetService.postBudget(budget)
            if (result) {
                props.history.push("/home");
            } else {
                setStatus({failed: "incorrect data"})
            }
        } catch(exception) {
            console.log(exception)
            if (exception && exception.message) {
                if (exception.message.includes(401)) {
                    setStatus({failed: "incorrect credentials"})
                } else if (exception.message.includes(400)) {
                    setStatus({failed: "incorrect request"})
                }
            } else {
                setStatus({failed: "server error"})
            }
        }
    },
    validationSchema: Yup.object().shape({
        income: Yup.string().matches(/^\d*(\.{1}\d{1,2}){0,1}$/, "Incorrect value").required("Field required"),
        date: Yup.string().required("Field required"),
        customExpenses: Yup.array().optional(),
        regularExpenses: Yup.array().optional(),
        strategies: Yup.array().optional(),
    }),
})(NewBudgetPage)
  
export default withRouter(withStyles(styles)(NewBudgetFormik))


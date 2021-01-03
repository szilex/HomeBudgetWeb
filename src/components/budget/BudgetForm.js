import React from "react";
import { withFormik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment'
import ExpenseModal from '../expense/ExpenseModal'
import ExpenseList from '../expense/ExpenseList'
import StrategyList from '../strategy/StrategyList'
import NumberFormatFloat from '../../helpers/NumberFormatCustom'
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { withRouter } from "react-router-dom";

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
    stepper: {
        padding: theme.spacing(3, 0, 5)
      },
})

class BudgetForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            income: 0, 
            date: null, 
            customExpenses: [], 
            categories: props.categories,
            regularExpenses: props.regularExpenses,
            selectedRegularExpenses: [], 
            strategies: props.strategies , 
            selectedStrategies: [],
            currentDate: moment(),
            currentStep: 1,
            };
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

        const handleDateChange = (event) => {
            setFieldValue('date', event)
            let date = moment(event)

            let selectedRegularExpenses = this.state.regularExpenses.filter( function(element) {
                let elementStartDate = moment(element.startDate, 'YYYY-MM-DD')
                let elementEndDate = moment(element.startDate, 'YYYY-MM-DD').add(element.months, 'M')
                return elementStartDate.isSameOrBefore(date, 'M') && elementEndDate.isSameOrAfter(date, 'M')
            });

            let selectedStrategies = this.state.strategies.filter( function(element) {
                let elementStartDate = moment(element.startDate, 'YYYY-MM-DD')
                let elementEndDate = moment(element.startDate, 'YYYY-MM-DD').add(element.months, 'M')
                return elementStartDate.isSameOrBefore(date, 'M') && elementEndDate.isSameOrAfter(date, 'M')
            });

            this.setState({date: event, isDateSet: true, selectedRegularExpenses: selectedRegularExpenses, selectedStrategies: selectedStrategies})
        }
        
        return (
            <>
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
                                                //variant="inline"
                                                inputVariant="outlined"
                                                format='MM-yyyy'
                                                views={['year','month']}
                                                minDate={this.state.currentDate}
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date"
                                                error={Boolean(form.errors.date && form.touched.date)}
                                                value={this.state.date}
                                                onChange={handleDateChange}
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
                                            <input type="hidden" name="regularExpenses" value={this.state.selectedRegularExpenses}/>
                                            <h2>Regular expenses</h2>
                                            <ExpenseList expenses={this.state.selectedRegularExpenses} options={{showCategory: true, showAmount: true}}/>
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
                                            <input type="hidden" name="strategies" value={this.state.selectedStrategies}/>
                                            <h2>Strategies</h2>
                                            <StrategyList strategies={this.state.selectedStrategies} options={{showCategory: true, showGoal: true}}/>
                                        </>
                                    )}
                                    </Field>
                                </div>
                            }
                            <button style={{paddingTop: "60dp"}} type="submit" className="btn btn-primary btn-block" 
                                onClick={() => {
                                    setFieldValue("customExpenses", this.state.customExpenses)
                                    setFieldValue("regularExpenses", this.state.selectedRegularExpenses)
                                    setFieldValue("strategies", this.state.selectedStrategies)
                                }}>Submit</button>
                            { status && status.failed  && <span className="help-block text-danger">{"Operation failed: " + status.failed}</span>}
                        </>
                    } 
                </Form>
            </>
        )
    }
}
    
const MasterFormik = withFormik({

    mapPropsToValues: (props) => {
        return {
        income: props.income || '',
        date: props.date || '',
        customExpenses: props.customExpenses || [],
        regularExpenses: props.regularExpenses || [],
        strategies: props.strategies || [],
        }
    },
    handleSubmit: async (values, { props, setStatus }) => {
        try {
            let budget = {
                income: Math.round(values.income * 100) / 100,
                date: moment(values.date).format("YYYY-MM-DD"),
                customExpenses: values.customExpenses,
                regularExpenses: values.regularExpenses,
                strategies: values.strategies,
            }
            console.log(budget)
            let result = await props.onSubmit({target: {value: budget}})
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
})(BudgetForm)

export default withRouter(withStyles(styles)(MasterFormik));

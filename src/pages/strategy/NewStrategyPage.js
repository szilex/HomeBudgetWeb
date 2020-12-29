import React from "react";
import {Spinner} from 'react-bootstrap'
import { Redirect, } from "react-router-dom";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'
import StrategyService from '../../services/StrategyService'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NumberFormatFloat, { NumberFormatInt } from '../../helpers/NumberFormatCustom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import { red } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

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

class NewStrategyPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { props: props, goal: 0, months: 0, fetched: false };
    }

    async componentDidMount() {
        try {
            const result = await StrategyService.getStrategyCategories()
            console.log(result)
            this.setState({ categories: result, fetched: true, categoryId: '', startDate: null, })
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ fetched: true, error: "Incorrect request send to server" })
            } else {
                this.setState({ fetched: true, error: "Server error" })
            }
        }
    }

    render() {
        const { status, handleChange, handleBlur, classes, setFieldValue } = this.props;
        const handleGoalChange = (event) => {
            this.setState({ goal: parseFloat(event.target.value).toFixed(2) })
            handleChange(event)
        }
        const handleCategoryChange = (event) => {
            this.setState({ categoryId: event.target.value, categoryName: event.target.name })
            handleChange(event)
        }
        const handleMonthsChange = (event) => {
            this.setState({ goal: parseInt(event.target.value).toFixed(0) })
            handleChange(event)
        }
        const handleDateChange = (event) => {
            this.setState({ startDate: event.target.value })
            handleChange(event)
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
                        <h1>Error while retrieving strategies: {this.state.error}</h1>
                    )
                } else {
                    return(
                        <div className="container">
                            <div className="strategy-form-wrapper" >
                                <h2>New strategy:</h2>
                                <Form className="form-container">
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="name">
                                            {({ field, form }) => (
                                                <TextField
                                                    className={classes.textField}
                                                    name={"name"}
                                                    label={"Name"}
                                                    placeholder="Name" 
                                                    variant="outlined" 
                                                    rows={3}
                                                    InputLabelProps={{shrink: true,}}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(form.errors.name && form.touched.name)}
                                                    helperText={form.errors.name && form.touched.name && String(form.errors.name)}
                                                />
                                        )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="description">
                                            {({ field, form }) => (
                                                <TextField 
                                                    className={classes.textField}
                                                    name={"description"}
                                                    label={"Description"}
                                                    placeholder="Description" 
                                                    variant="outlined" 
                                                    InputLabelProps={{shrink: true,}}
                                                    error={Boolean(form.errors.description && form.touched.description)}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={ form.errors.description && form.touched.description && String(form.errors.description)}
                                                />
                                        )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="category">
                                            {({ field, form }) => (
                                                <FormControl variant="outlined" className={classes.textField}>
                                                    <InputLabel id="category-select-label">Category</InputLabel>
                                                    <Select
                                                        className="select"
                                                        name={"category"}
                                                        labelId="category-select-label"
                                                        id="category-select"
                                                        value={this.state.categoryId}
                                                        onChange={handleCategoryChange}
                                                        onBlur={handleBlur}
                                                        label="Category"
                                                        error={Boolean(form.errors.category && form.touched.category)}
                                                    >
                                                        {/* <MenuItem className={classes.menuItem} key={0} value={""} name={"default"}>Select category</MenuItem> */}
                                                        {this.state.categories.map((category, key) => (
                                                            <MenuItem className={classes.menuItem} key={key} value={key} name={category.name} label={category.name}>{category.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {form.errors.category && form.touched.category && <FormHelperText className={classes.helperText}>Category not chosen</FormHelperText>}
                                                </FormControl>
                                        )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="goal">
                                            {({ field, form }) => (
                                                <TextField 
                                                    className={classes.textField}
                                                    name={"goal"}
                                                    label={"Goal"}
                                                    placeholder="Goal" 
                                                    variant="outlined" 
                                                    InputLabelProps={{shrink: true,}}
                                                    InputProps={{ inputComponent: NumberFormatFloat }}
                                                    error={Boolean(form.errors.goal && form.touched.goal)}
                                                    onChange={handleGoalChange}
                                                    onBlur={handleBlur}
                                                    helperText={form.errors.goal && form.touched.goal && String(form.errors.goal)}
                                                />
                                        )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="startDate">
                                            {({ field, form }) => (
                                                    <FormControl variant="outlined" className={classes.textField}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                name="startDate"
                                                                disableToolbar
                                                                autoOk={true}
                                                                variant="inline"
                                                                inputVariant="outlined"
                                                                format='yyyy-MM-dd'
                                                                margin="normal"
                                                                id="date-picker"
                                                                label="Start date"
                                                                error={Boolean(form.errors.startDate && form.touched.startDate)}
                                                                value={this.state.startDate}
                                                                onChange={ event => {
                                                                    setFieldValue('startDate', event)
                                                                    this.setState({startDate: event})
                                                                }}
                                                                onBlur={handleBlur}
                                                                KeyboardButtonProps={{'aria-label': 'change date',}}
                                                            />
                                                        
                                                        </MuiPickersUtilsProvider>
                                                        {form.errors.startDate && form.touched.startDate && <FormHelperText className={classes.helperText}>Field required</FormHelperText>}
                                                    </FormControl>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <Field validateOnBlur validateOnChange name="months">
                                            {({ field, form }) => (
                                                <TextField 
                                                    className={classes.textField}
                                                    name={"months"}
                                                    label={"Months"}
                                                    placeholder="Months" 
                                                    variant="outlined" 
                                                    InputLabelProps={{shrink: true,}}
                                                    InputProps={{ inputComponent: NumberFormatInt }}
                                                    error={Boolean(form.errors.months && form.touched.months)}
                                                    onChange={handleMonthsChange}
                                                    onBlur={handleBlur}
                                                    helperText={form.errors.months && form.touched.months && String(form.errors.months)}
                                                />
                                        )}
                                        </Field>
                                    </div>               
                                <button style={{paddingTop: "60dp"}} type="submit" className="btn btn-primary btn-block">Submit</button>
                                { status  && <span className="help-block text-danger">{"Login failed: " + status.failed}</span>}
                            </Form>
                        </div>
                    </div>
                    )
                }
            }
        }
    }
}
    
  const NewStrategyFormik = withFormik({
    
    mapPropsToValues: (props) => {
      return {
        name: props.name || '',
        description: props.description || '',
        category: props.category || '',
        goal: props.goal || '',
        startDate: props.startDate || '',
        months: props.months || ''
      }
    },
    handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
    //   try {
    //     let result = await AuthService.login(values.name, values.password)
    //     if (result) {
    //       props.history.push("/home");
    //     } else {
    //       setStatus({failed: "operation failed"})
    //     }
    //   } catch(exception) {
    //     if (exception && exception.message && exception.message.includes(401)) {
    //       setStatus({failed: "incorrect credentials"})
    //     } else {
    //       setStatus({failed: "server error"})
    //     }
    //   }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Field required'),
        description: Yup.string().optional(),
        category: Yup.string().required("Field required"),
        goal: Yup.string().required("Field required"),
        startDate: Yup.string().required("Field required"),
        months: Yup.string().required("Field required")
    })
  })(NewStrategyPage)
  
  export default withStyles(styles)(NewStrategyFormik) 
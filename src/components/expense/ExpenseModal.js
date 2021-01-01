import React from "react";
import { Button, Modal } from 'react-bootstrap'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NumberFormatFloat from '../../helpers/NumberFormatCustom'
import { TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import * as moment from 'moment'

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


class CustomExpenseModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            show: false,
            categories: props.categories,
            amount: 0,
            date: null,
            currentDate: moment(),
            budgetDate: props.date,
            categoryId: ''
        }
    }   

    render() {
        const { handleChange, handleBlur, classes, setFieldValue, resetForm, status } = this.props;
        
        const handleClose = () => {
            this.setState({
                show: false,
                amount: 0,
                date: null,
                currentDate: null,
                budgetDate: null,
                categoryId: ''
            })
            resetForm({
                values: {
                    name: '',
                    amount: '',
                    category: '',
                    date: '',
                    months: ''
                }
            })
        }

        const handleShow = () => {
            this.setState({show: true})
        }

        const handleAmountChange = (event) => {
            this.setState({ amount: event.target.value })
            handleChange(event)
        }
        
        const handleCategoryChange = (event) => {
            this.setState({ categoryId: event.target.value, categoryName: event.target.name })
            setFieldValue('category', this.state.categories[event.target.value].name)
        }

        if (status && status.created) {
            handleClose();
        }

        return (
            <>
                <Button variant="primary" onClick={handleShow} style={{marginBottom: 20}}>
                        Add custom expense
                </Button>
        
                <Modal show={this.state.show} onHide={handleClose} animation={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static">
                    <Modal.Header closeButton
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }} 
                    >
                        <Modal.Title>New expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Form className="form-container" id="expenseForm">
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
                                                helperText={form.errors.name && form.touched.name && String(form.errors.name)}/>
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
                                                    style={{textAlign: "left"}}
                                                    name={"category"}
                                                    labelId="category-select-label"
                                                    id="category-select"
                                                    value={this.state.categoryId}
                                                    onChange={handleCategoryChange}
                                                    onBlur={handleBlur}
                                                    label="Category"
                                                    error={Boolean(form.errors.category && form.touched.category)}>
                                                    {this.props.categories.map((category, key) => (
                                                        <MenuItem className={classes.menuItem} key={key} value={key} name={category.name} label={category.name}>{category.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                {form.errors.category && form.touched.category && <FormHelperText className={classes.helperText}>Category not chosen</FormHelperText>}
                                            </FormControl>
                                    )}
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <Field validateOnBlur validateOnChange name="amount">
                                        {({ field, form }) => (
                                            <TextField 
                                                className={classes.textField}
                                                name={"amount"}
                                                label={"Amount"}
                                                placeholder="Amount" 
                                                variant="outlined" 
                                                InputLabelProps={{shrink: true,}}
                                                InputProps={{ inputComponent: NumberFormatFloat }}
                                                error={Boolean(form.errors.amount && form.touched.amount)}
                                                onChange={handleAmountChange}
                                                onBlur={handleBlur}
                                                helperText={form.errors.amount && form.touched.amount && String(form.errors.amount)}/>
                                    )}
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <Field validateOnBlur validateOnChange name="date">
                                        {({ field, form }) => (
                                                <FormControl variant="outlined" className={classes.textField}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            name="date"
                                                            disableToolbar
                                                            autoOk={true}
                                                            variant="inline"
                                                            inputVariant="outlined"
                                                            format='yyyy-MM-dd'
                                                            minDate={this.state.currentDate}
                                                            margin="normal"
                                                            id="date-picker"
                                                            label="Date"
                                                            error={Boolean(form.errors.date && form.touched.date)}
                                                            value={this.state.date}
                                                            onChange={ event => {
                                                                setFieldValue('date', event)
                                                                this.setState({date: event})
                                                            }}
                                                            onBlur={handleBlur}
                                                            KeyboardButtonProps={{'aria-label': 'change date',}}
                                                            TextFieldComponent={ (props) => <TextField {...props} disabled={true}/>}/>
                                                    
                                                    </MuiPickersUtilsProvider>
                                                    {form.errors.date && form.touched.date && <FormHelperText className={classes.helperText}>Field required</FormHelperText>}
                                                </FormControl>
                                        )}
                                    </Field>
                                </div>            
                                <button style={{paddingTop: "60dp"}} type="submit" form="expenseForm" className="btn btn-primary btn-block">Submit</button>

                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
                                                  }
}

const CustomExpenseModalFormik = withFormik({

    mapPropsToValues: (props) => {
        return {
        name: props.name || '',
        category: props.category || '',
        amount: props.amount || '',
        date: props.date || '',
        }
    },
    handleSubmit: async (values, { props, setStatus, setSubmitting, ...actions }) => {
        console.log("submit")
        console.log(values)
        console.log(props)
        console.log(actions)
        let expense = {
            name: values.name,
            category: values.category,
            amount: Math.round(values.amount * 100) / 100,
            date: moment(values.date).format("YYYY-MM-DD"),
            months: 1
        }
        props.onSubmit({ target: { value: expense} })
        setStatus({created: true})
    },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Field required'),
            category: Yup.string().required("Field required"),
            amount: Yup.string().matches(/^\d*(\.{1}\d{1,2}){0,1}$/, "Incorrect value").required("Field required"),
            date: Yup.string().required("Field required"),
        })
    })(CustomExpenseModal)

export default (withStyles(styles)(CustomExpenseModalFormik))
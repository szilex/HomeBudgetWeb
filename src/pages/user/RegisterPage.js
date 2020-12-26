import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'

const ChangePasswordPage = (props) => {
    const { touched, errors } = props;
    if (AuthService.currentTokenValue) {
        return <Redirect to={"/home"} props={props}/>
    } else {
        return(
            <div className="container">
                <div className="login-wrapper" >
                    <h2>Register</h2>
                    <Form className="form-container">
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <Field type="text" name="login" className={"form-control"} placeholder="Login" />
                            { touched.login && errors.login && <span className="help-block text-danger">{errors.login}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className={"form-control"} placeholder="Password" />
                            { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <Field type="password" name="confirmPassword" className={"form-control"} placeholder="Password" />
                            { touched.confirmPassword && errors.confirmPassword && <span className="help-block text-danger">{errors.confirmPassword}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <Field type="text" name="firstName" className={"form-control"} placeholder="First name" />
                            { touched.firstName && errors.firstName && <span className="help-block text-danger">{errors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <Field type="text" name="lastName" className={"form-control"} placeholder="Last name" />
                            { touched.lastName && errors.lastName && <span className="help-block text-danger">{errors.lastName}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                        <p className="register text-right">
                            <Link to="/login">Sign in</Link>
                        </p>
                    </Form>
                </div>
            </div>
        )
    }
  }
  
  const ChangePasswordFormik = withFormik({
    mapPropsToValues: (props) => {
      return {
        login: props.login || '',
        password: props.password || '',
        confirmPassword: props.confirmPassword || '',
        firstName: props.firstName || '',
        lastName: props.lastName || ''
      }
    },
    handleSubmit: (values) => {
      console.log(values)
    },
    validationSchema: Yup.object().shape({
        login: Yup.string().required('Login is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Password is required'),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required")
    })
  })(ChangePasswordPage)
  
  export default ChangePasswordFormik
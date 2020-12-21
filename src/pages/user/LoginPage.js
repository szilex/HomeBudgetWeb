import React from "react";
import { Link, } from "react-router-dom";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginPage = (props) => {
    const { touched, errors } = props;
    return(
        <div className="container">
          <div className="login-wrapper" >
            <h2>Login Page</h2>
            <Form className="form-container">
              <div className="form-group">
                <label htmlFor="login">Login</label>
                <Field type="text" name="text" className={"form-control"} placeholder="Login" />
                { touched.login && errors.login && <span className="help-block text-danger">{errors.login}</span>}
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" className={"form-control"} placeholder="Password" />
                  { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
              <div className="single-line-paragraphs">
                <p className="forgot-password text-left">
                    <Link to="/changePassword">Forgot password?</Link>
                </p>
                <p className="forgot-password text-right">
                    <Link to="/register">Register</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
    )
  }
  
  const LoginFormik = withFormik({
    mapPropsToValues: (props) => {
      return {
        login: props.login || '',
        password: props.password || ''
      }
    },
    handleSubmit: (values) => {
      console.log(values)
    },
    validationSchema: Yup.object().shape({
        login: Yup.string().required('Login is required'),
        password: Yup.string().required('Password is required')
    })
  })(LoginPage)
  
  export default LoginFormik
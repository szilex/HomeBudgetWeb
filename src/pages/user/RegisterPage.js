import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props: props };
    }

    render() {
        const { touched, errors, status } = this.props;
        if (AuthService.currentTokenValue) {
            return <Redirect to={"/home"}/>
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
                            { status && <span className="help-block text-danger">{"Failed to create user: " + status.failed}</span> }
                            <p className="register text-right">
                                <Link to="/login">Sign in</Link>
                            </p>
                        </Form>
                    </div>
                </div>
            )
        }
    }
}
  
  const RegisterFormik = withFormik({
    mapPropsToValues: (props) => {
      return {
        login: props.login || '',
        password: props.password || '',
        confirmPassword: props.confirmPassword || '',
        firstName: props.firstName || '',
        lastName: props.lastName || ''
      }
    },
    handleSubmit: async (values, { props, setStatus }) => {
        try {
            let result = await AuthService.register(values.login, values.password, values.firstName, values.lastName)
            console.log(result);
            if (result) {
              props.history.push("/login");
            } else {
              setStatus({failed: "operation failed"})
            }
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(401)) {
                setStatus({failed: "login unavailable"})
            } else {
                setStatus({failed: "server error"})
            }     
        }
    },
    validationSchema: Yup.object().shape({
        login: Yup.string().min(8, "Too short").required('Login is required'),
        password: Yup.string().min(8, "Too short").required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required('Password is required'),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required")
    })
  })(RegisterPage)
  
  export default RegisterFormik
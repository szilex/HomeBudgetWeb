import React from "react";
import { Link, Redirect, } from "react-router-dom";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'

class LoginPage extends React.Component {
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
              <h2>Login form</h2>
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
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                { status  && <span className="help-block text-danger">{"Login failed: " + status.failed}</span>}
                <div className="form-group">
                  <div style={{overflow: "hidden"}}>
                    <Link className="forgot-password text-left" style={{float: "left", color: "#167bff"}} to="/login/changePassword">Forgot password?</Link>
                    <Link className="forgot-password text-right" style={{float: "right", color: "#167bff"}} to="/login/register">Register</Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )
    }
  }
}
  
const LoginFormik = withFormik({
  
  mapPropsToValues: (props) => {
    return {
      login: props.login || '',
      password: props.password || ''
    }
  },
  handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
    try {
      let result = await AuthService.login(values.login, values.password)
      if (result) {
        props.history.push("/home");
      } else {
        setStatus({failed: "operation failed"})
      }
    } catch(exception) {
      if (exception && exception.message && exception.message.includes(401)) {
        setStatus({failed: "incorrect credentials"})
      } else {
        setStatus({failed: "server error"})
      }
    }
  },
  validationSchema: Yup.object().shape({
      login: Yup.string().required('Login is required'),
      password: Yup.string().required('Password is required')
  })
})(LoginPage)

export default LoginFormik
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'

class ChangePasswordPage extends React.Component {
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
                  <h2>Change password</h2>
                  <Form className="form-container">
                  <div className="form-group">
                      <label htmlFor="login">Login</label>
                      <Field type="text" name="login" className={"form-control"} placeholder="Login" />
                      { touched.login && errors.login && <span className="help-block text-danger">{errors.login}</span>}
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">New password</label>
                      <Field type="password" name="password" className={"form-control"} placeholder="Password" />
                      { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
                  </div>
                  <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm password</label>
                      <Field type="password" name="confirmPassword" className={"form-control"} placeholder="Password" />
                      { touched.confirmPassword && errors.confirmPassword && <span className="help-block text-danger">{errors.confirmPassword}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                  { status && <span className="help-block text-danger">{"Failed to change password: " + status.failed}</span> }
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

const ChangePasswordFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      login: props.login || '',
      password: props.password || '',
      confirmPassword: props.confirmPassword || ''
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
          setStatus({failed: "incorrect login"})
      } else {
          setStatus({failed: "server error"})
      }     
    }
  },
  validationSchema: Yup.object().shape({
      login: Yup.string().min(8, "Login too short").required('Login is required'),
      password: Yup.string().min(8, "Password too short").required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required('Password is required')
  })
})(ChangePasswordPage)

export default ChangePasswordFormik
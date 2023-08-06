import { Component } from "react"
import { Navigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import AuthService from "./services/auth.service"

type Props = {}

type State = {
  redirect: string | null
  username: string
  password: string
  loading: boolean
  message: string
}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: ""
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()

    if (currentUser) {
      this.setState({ redirect: "/profile" })
    }
  }

  componentWillUnmount() {
    //window.location.reload()
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!")
    })
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue

    this.setState({
      message: "",
      loading: true
    })

    AuthService.login(username, password)
      .then(
        () => {
          console.log("Success")
          this.setState({
            redirect: "/profile"
          })
        },
        error => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

          this.setState({
            loading: false,
            message: resMessage
          })
        }
      )
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { loading, message } = this.state

    const initialValues = {
      username: "",
      password: ""
    }

    return (
      <Formik initialValues={initialValues} validationSchema={this.validationSchema} onSubmit={this.handleLogin}>
        <Form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet? <span className="link-primary">Sign Up</span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control mt-1" />
              <ErrorMessage name="username" component="div" className="alert alert-danger" />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control mt-1" />
              <ErrorMessage name="password" component="div" className="alert alert-danger" />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Login</span>
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </div>
        </Form>
      </Formik>
    )
  }
}

import React from "react";
import "../landing.css";
import { Link } from "react-router-dom";
import "./register.css";
import FacebookButton from "./facebookButton.jsx";
import GoogleButton from "./googleButton.jsx";
import { loginUser } from "../../../actions/authActions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div align="center">
        <div align="center" className="landing">
          <div align="center" className="container">
            <div align="center" className="row centered-form">
              <div
                id="lol"
                align="center"
                className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4"
              >
                <div align="center" className="panel panel-default">
                  <div align="center" className="panel-heading">
                    <h3 className="panel-title">
                      <br />
                      Please Login to continue to DateMe <br />
                    </h3>
                  </div>
                  <div className="panel-body">
                    <br />
                    <form align="center" onSubmit={this.onSubmit}>
                      <div className="container">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className={classnames("form-control input-sm", {
                              "is-invalid": errors.email
                            })}
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className={classnames("form-control input-sm", {
                              "is-invalid": errors.password
                            })}
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <input
                          type="submit"
                          value="Login"
                          className="btn btn-info btn-block"
                        />
                        <br />
                        <h4>OR</h4>
                        <br />
                        <GoogleButton />
                        <FacebookButton />
                      </div>
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { loginUser }
)(withRouter(Login));

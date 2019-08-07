import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./landing.css";
import { loginLocal } from "../../actions/profileActions";

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      let Data = {
        email: this.props.auth.user.email,
        password: this.props.auth.user.password
      };
      let p1 = this.props.loginLocal(Data);
      let p2 = this.props.history.push("/profile");
      Promise.all([p1, p2])
        .then(a => {
          console.log(a);
        })
        .catch(err => console.log(err));
      // this.props.loginLocal(Data)
      // this.props.history.push("/profile");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Dating App</h1>
                <p className="lead">
                  {" "}
                  Don’t hesitate, make a date, You may meet your soul mate.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
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
  { loginLocal }
)(Landing);

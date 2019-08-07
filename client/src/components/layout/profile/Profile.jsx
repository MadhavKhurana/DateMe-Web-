import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Maindata from "./Maindata.jsx";
import Setting from "./Settings.jsx";
import Social from "./Social.jsx";
import { withRouter } from "react-router-dom";
import { getCurrentProfile, loginLocal } from "../../../actions/profileActions";
import updateProfile from "./updateProfile.jsx";
import PropTypes from "prop-types";

class Profile extends React.Component {
  componentDidMount() {
    let Data = {
      email: this.props.auth.user.email,
      password: this.props.auth.user.password
    };
    this.props.loginLocal(Data);
    this.props.getCurrentProfile();
  }
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  render() {
    const { profile } = this.props.profile;
    console.log(this.props.profile);

    return (
      <div className="Profile">
        <div
          className="w3-content w3-margin-top"
          style={{ maxWidth: "1400px" }}
        >
          <div className="w3-row-padding">
            <div className="w3-twothird">
              <div className="w3-white w3-text-grey w3-card-4">
                <Maindata />
              </div>
            </div>

            {this.isEmpty(this.props.profile.profile) ? (
              ""
            ) : (
              <div className="w3-third">
                <div className="w3-container w3-card w3-white w3-margin-bottom">
                  <h2 className="w3-text-grey w3-padding-16">
                    &nbsp;&nbsp;
                    <i className="fas fa-user-cog" /> Settings
                  </h2>

                  <Setting />
                </div>
                <div className="w3-container w3-card w3-white">
                  <Social />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { getCurrentProfile, loginLocal }
)(withRouter(Profile));

import React from "react";
import { connect } from "react-redux";
import UpdateProfile from "./updateProfile.jsx";
import { getCurrentProfile, bio } from "../../../actions/profileActions.js";
import { Link } from "react-router-dom";

class Maindata extends React.Component {
  state = {
    bioClick: false,
    bio: 2
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  bioClick = () => {
    this.setState({
      bioClick: true,
      bio: this.props.profile.profile.bio
    });
    //    console.log(document.getElementById('bio').value);
  };

  saveClick = () => {
    this.setState({
      bioClick: false
    });
    const biodata = {
      bio: this.state.bio
    };
    this.props.bio(biodata);
  };

  bioChange = e => {
    this.setState({
      bio: e.target.value
    });
  };

  arrow = () => {
    // const { profile } = this.props.profile;
    for (let i = 0; i < this.props.profile.profile.images.length; i++) {
      return <li data-target="#demo" data-slide-to={i} className="active" />;
    }
  };
  pics = () => {
    for (let i = 0; i < this.props.profile.profile.images.length; i++) {
      return (
        <div className="carousel-item active">
          <img className="img-fluid" src="4by3.png" />
        </div>
      );
    }
  };

  next = () => {
    if (this.props.profile.profile.images.length > 0) {
      return (
        <div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon" />
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon" />
          </a>
        </div>
      );
    }
  };

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileContent;

    if (loading) {
      profileContent = <div>Loading...</div>;
    } else if (profile == null) {
      profileContent = <UpdateProfile />;
    } else {
      profileContent = (
        <div>
          <div className="w3-display-container">
            <div id="demo" className="carousel slide" data-ride="carousel">
              <ul className="carousel-indicators">
                {this.arrow}
                {/* <li data-target="#demo" data-slide-to="0" className="active" />
                <li data-target="#demo" data-slide-to="1" />
                <li data-target="#demo" data-slide-to="2" />
                <li data-target="#demo" data-slide-to="3" />
                <li data-target="#demo" data-slide-to="4" />
                <li data-target="#demo" data-slide-to="5" /> */}
              </ul>

              <div className="carousel-inner">
                {this.pics}
                {/* <div className="carousel-item active">
                  <img className="img-fluid" src="4by3.png" alt="Avatar" />
                </div>
                <div className="carousel-item">
                  <img className="img-fluid" src="pic2.jpg" alt="Avatar" />
                </div>
                <div className="carousel-item">
                  <img className="img-fluid" src="pic3.jpg" alt="Avatar" />
                </div>
                <div className="carousel-item">
                  <img className="img-fluid" src="pic4.jpg" alt="Avatar" />
                </div>
                <div className="carousel-item">
                  <img className="img-fluid" src="pic5.jpg" alt="Avatar" />
                </div>
                <div className="carousel-item">
                  <img className="img-fluid" src="pic6.jpg" alt="Avatar" />
                </div> */}
              </div>

              {this.next}
            </div>
          </div>
          <div align="center">
            <br />
            <h2>{user.name}</h2>
          </div>
          <div className="w3-container">
            {this.state.bioClick === true ? (
              <span>
                <p>
                  <textarea
                    style={{ height: "170px" }}
                    id="bio"
                    className="form-control"
                    value={this.state.bio === 2 ? profile.bio : this.state.bio}
                    onChange={this.bioChange}
                  />
                </p>
                <button
                  className="btn btn-warning"
                  style={{ borderRadius: "100%" }}
                  onClick={this.saveClick}
                >
                  Save Bio
                </button>
              </span>
            ) : (
              <span>
                <p style={{ whiteSpace: " pre-line" }}>{profile.bio}</p>
                <button
                  className="btn btn-warning"
                  style={{ borderRadius: "100%" }}
                  onClick={this.bioClick}
                >
                  Edit Bio
                </button>

                {/* {this.picbuttons} */}
              </span>
            )}
            &nbsp;&nbsp;&nbsp;
            {this.props.profile.profile.images.length > 0 ? (
              <button
                className="btn btn-warning"
                style={{ borderRadius: "100%" }}
              >
                View Pics
              </button>
            ) : (
              <Link to="/AddPic">
                <button
                  className="btn btn-warning"
                  style={{ borderRadius: "100%" }}
                >
                  Add Pics
                </button>
              </Link>
            )}
            <br />
          </div>
          <br />
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { getCurrentProfile, bio }
)(Maindata);

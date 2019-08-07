import React from "react";
import { connect } from "react-redux";
import { updateProfiles } from "../../../actions/profileActions.js";
import { withRouter } from "react-router-dom";
class UpdateProfile extends React.Component {
  state = {
    agerange: null,
    distance: null,
    lookingfor: "Female",
    age: null,
    gender: "Male"
  };

  agerange = e => {
    let value = e.target.value;

    const range = {
      agerange: value
    };
    // this.props.ageRange(range);
    this.setState({
      agerange: value
    });
  };

  distance = e => {
    let value = e.target.value;
    const range = {
      distance: value
    };
    this.setState({
      distance: value
    });
    // this.props.distanceRange(range);
  };
  lookingfor = e => {
    let value = e.target.value;
    const range = {
      lookingfor: value
    };
    this.setState({
      lookingfor: value
    });
    // this.props.lookingFor(range);
  };
  gender = e => {
    let value = e.target.value;
    this.setState({
      gender: value
    });
  };
  age = e => {
    let value = e.target.value;
    this.setState({
      age: value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const Settings = {
      age: this.state.age,
      agerange: this.state.agerange,
      gender: this.state.gender,
      maxdistance: this.state.distance,
      lookingfor: this.state.lookingfor
    };
    // console.log(Settings);
    this.props.updateProfiles(Settings);
  };
  render() {
    return (
      <div className="container col-md-6">
        <h2 align="center">Set up your PROFILE</h2>
        <br />
        <form onSubmit={this.onSubmit}>
          <h5 className="w3-opacity">
            <b>Age</b>
          </h5>
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={this.state.age}
            onChange={this.age}
          />
          <h5 className="w3-opacity">
            <b>Gender</b>
          </h5>
          <select
            name="cars"
            className="custom-select"
            onChange={this.gender}
            value={this.state.gender}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            {/* <option value="Both">Both</option> */}
          </select>
          <h5 className="w3-opacity">
            <b>Age Range</b> &nbsp;{this.state.agerange}
          </h5>
          <input
            type="range"
            className="custom-range"
            id="customRange"
            name="points1"
            onChange={this.agerange}
            value={this.state.agerange}
          />

          <h5 className="w3-opacity">
            <b>Max Distance (KM)</b>&nbsp;{this.state.distance}
          </h5>
          <input
            type="range"
            className="custom-range"
            id="customRange"
            name="points1"
            onChange={this.distance}
            value={this.state.distance}
          />
          <h5 className="w3-opacity">
            <b>Looking For ??</b>
          </h5>
          <select
            name="cars"
            className="custom-select"
            onChange={this.lookingfor}
            value={this.state.lookingfor}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Both">Both</option>
          </select>
          <br />
          <br />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStatetoProps,

  { updateProfiles }
)(withRouter(UpdateProfile));

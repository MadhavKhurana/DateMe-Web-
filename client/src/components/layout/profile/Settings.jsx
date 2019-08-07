import React from "react";
import {
    ageRange,
    distanceRange,
    lookingFor
} from "../../../actions/profileActions.js";
import { connect } from "react-redux";

class Setting extends React.Component {
    //    componentDidUpdate() {
    //    this.setState({
    //                agerange:this.props.profile.profile.agerange
    //            })
    //  }

    state = {
        agerange: "",
        distance: "",
        lookingfor: 1
    };

    agerange = e => {
        let value = e.target.value;

        const range = {
            agerange: value
        };
        this.props.ageRange(range);
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
        this.props.distanceRange(range);
    };
    lookingfor = e => {
        let value = e.target.value;
        const range = {
            lookingfor: value
        };
        this.setState({
            lookingfor: value
        });
        this.props.lookingFor(range);
    };

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <div>Loading...</div>;
        } else {
            //            var currentagerange=profile.agerange
            //            this.setState({
            //                agerange:currentagerange
            //            })
            let currentagerange = profile;
            profileContent = (
                <div>
                    <div className="w3-container">
                        <h5 className="w3-opacity">
                            <b>Age Range</b>
                        </h5>

                        <form>
                            <label for="customRange" />
                            <input
                                type="range"
                                className="custom-range"
                                id="customRange"
                                name="points1"
                                onChange={this.agerange}
                                value={
                                    this.state.agerange === ""
                                        ? currentagerange.agerange
                                        : this.state.agerange
                                }
                            />
                        </form>

                        <hr />
                    </div>
                    <div className="w3-container">
                        <h5 className="w3-opacity">
                            <b>Distance (KM)</b>
                        </h5>
                        <form>
                            <label for="customRange" />
                            <input
                                type="range"
                                className="custom-range"
                                id="customRange"
                                name="points1"
                                onChange={this.distance}
                                value={
                                    this.state.distance === ""
                                        ? currentagerange.maxdistance
                                        : this.state.distance
                                }
                            />
                        </form>
                        <hr />
                    </div>
                    <div className="w3-container">
                        <form>
                            <h5 className="w3-opacity">
                                <b>Looking For ??</b>
                            </h5>
                            <select
                                name="cars"
                                className="custom-select"
                                onChange={this.lookingfor}
                                value={
                                    this.state.lookingfor === 1
                                        ? currentagerange.lookingfor
                                        : this.state.lookingfor
                                }
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Both">Both</option>
                            </select>
                        </form>
                    </div>
                    <br />
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
    { ageRange, distanceRange, lookingFor }
)(Setting);

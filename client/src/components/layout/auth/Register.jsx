import React from "react";
import "../landing.css";
import { Link } from "react-router-dom";
import "./register.css";
import FacebookButton from "./facebookButton.jsx";
import GoogleButton from "./googleButton.jsx";
import { registerUser } from "../../../actions/authActions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends React.Component {
	state = {
		name: "",
		username: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			name: this.state.name,
			//		username:this.state.username,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		//		console.log(userData);
		this.props.registerUser(userData, this.props.history);
	};
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/profile");
		}
	}
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
											Please sign up for DateMe <br />
											<small>It's free!</small>
										</h3>
									</div>
									<div className="panel-body">
										<form align="center" onSubmit={this.onSubmit}>
											<div className="container">
												<br />
												<div align="center" className="row">
													<div className="col-xs-6 col-sm-6 col-md-6">
														<div className="form-group">
															<input
																type="text"
																name="name"
																id="name"
																className={classnames("form-control input-sm", {
																	"is-invalid": errors.name
																})}
																placeholder="Full Name"
																value={this.state.name}
																onChange={this.onChange}
															/>
															{errors.name && (
																<div className="invalid-feedback">
																	{errors.name}
																</div>
															)}
														</div>
													</div>
													<div className="col-xs-6 col-sm-6 col-md-6">
														<div className="form-group">
															<input
																type="text"
																name="username"
																id="username"
																className="form-control input-sm"
																placeholder="UserName (eg:-@JohnDoe)"
																value={this.state.username}
																onChange={this.onChange}
															/>
														</div>
													</div>
												</div>

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

												<div className="row">
													<div className="col-xs-6 col-sm-6 col-md-6">
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
													</div>
													<div className="col-xs-6 col-sm-6 col-md-6">
														<div className="form-group">
															<input
																type="password"
																name="password2"
																id="password2"
																className={classnames("form-control input-sm", {
																	"is-invalid": errors.password2
																})}
																placeholder="Confirm Password"
																value={this.state.password2}
																onChange={this.onChange}
															/>
															{errors.password2 && (
																<div className="invalid-feedback">
																	{errors.password2}
																</div>
															)}
														</div>
													</div>
												</div>

												<input
													type="submit"
													value="Register"
													className="btn btn-info btn-block"
												/>
												<br />
												<h4>OR</h4>
												<br />
												<GoogleButton />
												<FacebookButton />
											</div>
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
	{ registerUser }
)(withRouter(Register));

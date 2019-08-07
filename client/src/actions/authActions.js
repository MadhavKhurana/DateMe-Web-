import axios from "axios";
import setAuthToken from "./setAuthToken.js";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      let user = {};
      axios.get("/api/users/current").then(data => {
        // console.log(data.data);
        localStorage.setItem("jwtToken", JSON.stringify(data.data));
        dispatch(setCurrentUser(data.data));
      });
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(setCurrentUser({}));
};

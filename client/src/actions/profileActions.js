import axios from "axios";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: "PROFILE_LOADING"
  };
};

export const clearCurrentProfile = () => {
  return {
    type: "CLEAR_CURRENT_PROFILE"
  };
};

export const bio = biodata => dispatch => {
  axios
    .post("/api/profile/", biodata)
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const ageRange = agerange => dispatch => {
  axios
    .post("/api/profile/agerange", agerange)
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const distanceRange = distancerange => dispatch => {
  axios
    .post("/api/profile/distance", distancerange)
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const lookingFor = lookingfor => dispatch => {
  axios
    .post("/api/profile/lookingfor", lookingfor)
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const updateProfiles = data => dispatch => {
  axios
    .post("/api/profile/defaultSettings", data)
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const loginLocal = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //
    })
    .catch(err => {
      console.log(err);
      // console.log(userData);
    });
};

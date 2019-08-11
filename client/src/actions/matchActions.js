import axios from "axios";

export const getAlllookingFor = () => dispatch => {
  axios
    .get("/api/match/allLookingFor")
    .then(res => {
      dispatch({
        type: "GET_LOOKING_FOR",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const done = id => dispatch => {
  axios
    .post(`/api/match/done/${id}`)
    .then(res => {
      dispatch({
        type: "GET_LOOKING_FOR",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// export const likeTheLove = id => dispatch => {
//   axios.post(`api/match/like/${id}`).then()
// };

const states = {
  users: []
};

// function isEmpty(obj) {
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) return false;
//   }
//   return true;
// }

const matchReducer = (state = states, action) => {
  switch (action.type) {
    case "GET_LOOKING_FOR":
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default matchReducer;

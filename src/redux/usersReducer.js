import { fetchData } from "../mockData";

const initialState = {
  isLoading: false,
  list: [
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_REDUCER/FETCH_DATA":
      return {
        ...state,
        list: [...action.fetchData], 
        // ...fetchData.created_at.map((user) => new Date(user.created_at)), 
        //...fetchData.created_at.map((user) => new Date(user.created_at))]
      };
    case "USERS_REDUCER/IS_LOADING":
        return {
            ...state,
            isLoading: action.isLoading
          };
    case "USERS_REDUCER/DATE_CHANGE":
        return {
            ...state,
            // if (!list) {
            // list: [list.map((date) => new Date(date.created_at))]
            // }
            
            //list: [...list.map((date) => new Date(date.created_at))]
        }
    default:
      return state;
  }
};

//actions
const getUsersAC = (fetchData) => {
  return {
    type: "USERS_REDUCER/FETCH_DATA",
    fetchData
  };
};
const isLoadingAC = (isLoading) => {
    return {
      type: "USERS_REDUCER/IS_LOADING",
      isLoading
    };
  };
// const dateChangeAC = () => {
//     return {
//       type: "USERS_REDUCER/DATE_CHANGE",
//     };
//   };

//thunk
export const getUsersThunk = () => (dispatch) => {
    dispatch(isLoadingAC(true));
    fetchData()
    .then((response) => {
        dispatch(getUsersAC(response));
        dispatch(isLoadingAC(false));
})
};

export default reducer;

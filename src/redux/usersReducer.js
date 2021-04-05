import { fetchData } from "../mockData";

const initialState = {
  isLoading: false,
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_REDUCER/FETCH_DATA":
      return {
        ...state,
        list: [...action.fetchData],
      };
    case "USERS_REDUCER/IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

//actions
const getUsersAC = (fetchData) => {
  return {
    type: "USERS_REDUCER/FETCH_DATA",
    fetchData,
  };
};
const isLoadingAC = (isLoading) => {
  return {
    type: "USERS_REDUCER/IS_LOADING",
    isLoading,
  };
};

//thunk
//добавить обработку ошибок
export const getUsersThunk = () => (dispatch) => {
  dispatch(isLoadingAC(true));
  fetchData()
    .then((response) => {
      dispatch(getUsersAC(response));
      dispatch(isLoadingAC(false));
    })
    .catch((error) => console.log(error));
};

export default reducer;

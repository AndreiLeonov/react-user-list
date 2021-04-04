import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  users: usersReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
import { combineReducers } from "@reduxjs/toolkit";
import blog from "./blog-store";

const createReducer = (asyncReducers?: any) => (state?: any, action?: any) => {
  const combinedReducer = combineReducers({
    blog,
  });

  /*
  Reset the redux store when user logged out
   */
  if (action.type === "auth/user/userLoggedOut") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;

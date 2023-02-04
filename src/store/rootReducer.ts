import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import blog from "./blog-store";

const createReducer =
  (asyncReducers?: any) =>
  (
    state:
      | CombinedState<{
          blog: CombinedState<{
            blogReducer: {
              blogs: never[];
              /*
        Reset the redux store when user logged out
         */
              detailBlog: null;
              modalVisible: { data: null; open: boolean; type: null };
            };
          }>;
        }>
      | undefined,
    action: AnyAction
  ) => {
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

import { configureStore } from "@reduxjs/toolkit";

import { NODE_ENV } from "../constants";
import createReducer from "./rootReducer";

if (NODE_ENV === "development") {
  if (module.hot)
    module.hot.accept("./rootReducer", () => {
      const newRootReducer = require("./rootReducer").default;
      store.replaceReducer(newRootReducer.createReducer());
    });
}

const middlewares: any = [];

if (NODE_ENV === "development") {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    collapsed: (getState: any, action: any, logEntry: { error: any }) =>
      !logEntry.error,
  });

  middlewares.push(logger);
}

const store: any = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: NODE_ENV === "development",
});

store.asyncReducers = {};

export const injectReducer = (key: string | number, reducer: any) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;

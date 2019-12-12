import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../ducks";

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

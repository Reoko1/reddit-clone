import { combineReducers } from "redux";
import user from "./user";
import modals from "./modals";

const reducer = combineReducers({
  user,
  modals
});

export default reducer;

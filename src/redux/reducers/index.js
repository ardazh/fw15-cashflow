import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import profile from "./profile";
import transactions from "./transactions";

const reducer = combineReducers({
  auth,
  profile,
  transactions,
});

export default reducer;

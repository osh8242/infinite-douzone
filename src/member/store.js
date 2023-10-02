import { createStore, combineReducers } from "redux";
import authReducer from "./reducers";
import { loginSuccess } from "./actions";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;

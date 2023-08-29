import { createStore } from "redux";
import pkReducer from "./pkReducer";

const store = createStore(pkReducer);

export default store;

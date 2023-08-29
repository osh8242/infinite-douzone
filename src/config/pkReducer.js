import { SET_PK } from "./pkActions";

const initialState = null; // 초기값은 null로 설정

const pkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PK:
      return action.payload;
    default:
      return state;
  }
};

export default pkReducer;

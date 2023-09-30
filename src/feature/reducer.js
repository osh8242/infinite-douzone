// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   UPDATE_ID,
//   UPDATE_PWD,
// } from "./Login/actionTypes";

// const initialState = {
//   isLoading: false,
//   user: null,
//   error: null,
//   id: "",
//   pwd: "",
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         user: action.payload,
//         error: null,
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         user: null,
//         error: action.payload,
//       };
//     case UPDATE_ID:
//       return {
//         ...state,
//         id: action.payload,
//       };

//     case UPDATE_PWD:
//       return {
//         ...state,
//         pwd: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default loginReducer;

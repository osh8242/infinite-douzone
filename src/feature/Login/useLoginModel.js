// import { loginRequest, loginSuccess, loginFailure } from "./actions";

// export const loginUser = (credentials) => (dispatch) => {
//   dispatch(loginRequest());

//   fetch("/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.error) {
//         dispatch(loginFailure(data.error));
//       } else {
//         dispatch(loginSuccess(data.user));
//       }
//     })
//     .catch((error) => {
//       dispatch(loginFailure(error.message));
//     });
// };

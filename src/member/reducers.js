import { LOGIN_SUCCESS, LOGOUT } from "./actions";

// 사용자 초기 인증 상태
const initialStates = {
  isAuthenticated: false, // 사용자 인증여부
  user: null, // 인증된 사용자의 정보. 인증되지 않았다면 null
};

// 인증 리듀서
// 기존 데이터나 action 값 저장
const authReducer = (states = initialStates, action) => {
  console.log("authReducer called with action:", action);

  // console.log("action");
  // console.log(action.type);
  switch (action.type) {
    case LOGIN_SUCCESS:
      // 로그인 성공 액션의 경우
      console.log("login_succeesssss .....");
      console.log(action);
      // console.log(action.payload);
      return {
        ...states,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    case LOGOUT:
      // 로그아웃 액션의 경우
      return {
        ...states,
        isAuthenticated: false,
        user: null, // 사용자 정보 초기화
      };
    default:
      // 일치하는 액션 타입이 없는 경우
      return states;
  }
};

export default authReducer;

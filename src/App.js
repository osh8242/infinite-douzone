import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LoginGrid from "./Login/LoginGrid";
import LoginLayout from "./member/loginLayout";
import LaborContractLayout from "./templates/LaborContract/LaborContractLayout";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import SignUp from "./SignUp/SignUp";
import SignUpLayout from "./SignUp/SignUpLayout";
import MainHome from "./templates/MainHome";
import MyPage from "./templates/myPage";
import { LoginProvider } from "./Login/LoginProvider";
import { Provider } from "react-redux";
import store from "./member/store";
import LoginFindId from "./member/loginFindId";
import LoginFindPwd from "./member/loginFindPwd";
import { useLocation } from "react-router-dom";
import MainTestPage from "./templates/MainTestPage";
import ErrorPage from "./templates/ErrorPage";

//   if (location.pathname === "/") return <LoginLayout />;
//   else if (location.pathname === "/loginFindId") {
//     return <LoginFindId />;
//   } else if (location.pathname === "/loginFindPwd") {
//     return <LoginFindPwd />;
//   } else if (location.pathname === "/signup") {
//     return <SignUpLayout />;
//   } else return <Header />;
// }

function ConditionalHeader() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <LoginLayout />;
  } else if (location.pathname === "/loginFindId") {
    return <LoginFindId />;
  } else if (location.pathname === "/loginFindPwd") {
    return <LoginFindPwd />;
  } else if (location.pathname === "/signup") {
    return <SignUpLayout />;
  } else if (location.pathname === "/error") {
    return <ErrorPage />;
  } else {
    return <Header />;
  }
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ConditionalHeader />
          <Routes>
            <Route path="/mypageTest" element={<MainTestPage />} />
            <Route path="/main" element={<MainHome />} />
            {/* 임시 링크 */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/er" element={<EmpRegisterationLayout />} />
            <Route path="/hr" element={<HrManagementLayout />} />
            <Route path="/lc/*" element={<LaborContractLayout />} />
            <Route path="/si" element={<SalaryInformationEntryLayout />} />
            {/* <Route path="/login" element={<LoginLayout />} /> */}
            {/* <Route path="/loginFindId" element={<LoginFindId />} /> */}
            {/* <Route path="/loginFindPwd" element={<LoginFindPwd />} /> */}
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

// return (
//   <div>
//     {/* <LoginProvider> */}
//     <Provider store={store}>
//       <BrowserRouter>
//         {/* <Routes>
//           <Route path="/login" element={<LoginLayout />} />
//         </Routes> */}
//         {/* {location.pathname !== "/login" && <Header />} */}
//         <Routes>
//           <Route path="/" element={<MainHome />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/er" element={<EmpRegisterationLayout />} />
//           <Route path="/hr" element={<HrManagementLayout />} />
//           <Route path="/lc/*" element={<LaborContractLayout />} />
//           <Route path="/si" element={<SalaryInformationEntryLayout />} />
//           {/* <Route path="/login" element={<LoginLayout />} /> */}
//           <Route path="/loginFindId" element={<LoginFindId />} />
//           <Route path="/loginFindPwd" element={<LoginFindPwd />} />
//           <Route path="/mypage" element={<MyPage />} />
//         </Routes>
//       </BrowserRouter>
//       {/* </LoginProvider> */}
//     </Provider>
//   </div>
// );
// }

export default App;

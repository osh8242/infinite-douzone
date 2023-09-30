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
import SuccessSignUp from "./templates/SuccessSignUp";
import { LoadingContext } from "./Loading/LoadingProvider";
import { useContext } from "react";
import Loading from "./components/Loading";

function ConditionalHeader() {
  const location = useLocation();

  if (location.pathname === "/login") {
    // return <LoginLayout />; //redux login page
    return <LoginGrid />;
  } else if (location.pathname === "/loginFindId") {
    return <LoginFindId />;
  } else if (location.pathname === "/loginFindPwd") {
    return <LoginFindPwd />;
  } else if (location.pathname === "/signup") {
    return <SignUpLayout />;
  } else if (location.pathname === "/error") {
    return <ErrorPage />;
  } else if (location.pathname === "/successSignup") {
    return <SuccessSignUp />;
  } else {
    return <Header />;
  }
}

function App() {
  const { loading } = useContext(LoadingContext);

  return (
    <div>
      {/* <Provider store={store}> */}
      <LoginProvider>
        <BrowserRouter>
          <ConditionalHeader />
          <Routes>
            <Route path="/mypageTest" element={<MainTestPage />} />
            <Route path="/" element={<MainHome />} />
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
        {/* </Provider> */}
      </LoginProvider>
      <BrowserRouter>
        <Header />
        {loading && <Loading />}{" "}
        {/* 로딩 상태에 따라 로딩 화면을 조건부로 렌더링 */}
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc/*" element={<LaborContractLayout />} />
          <Route path="/si" element={<SalaryInformationEntryLayout />} />
          <Route path="/login" element={<LoginGrid />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

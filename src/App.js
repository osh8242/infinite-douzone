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
import { useContext } from "react";
import { LoadingContext } from "./Loading/LoadingProvider";
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
      <BrowserRouter>
        <Header />
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
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

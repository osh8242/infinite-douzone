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
import MainHome from "./templates/MainHome";
import MyPage from "./templates/myPage";
import { LoginProvider } from "./Login/LoginProvider";
import { Provider } from "react-redux";
import store from "./member/store";
import LoginFindId from "./member/loginFindId";
import LoginFindPwd from "./member/loginFindPwd";

function App() {
  return (
    <div>
      {/* <LoginProvider> */}
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/er" element={<EmpRegisterationLayout />} />
            <Route path="/hr" element={<HrManagementLayout />} />
            <Route path="/lc/*" element={<LaborContractLayout />} />
            <Route path="/si" element={<SalaryInformationEntryLayout />} />
            <Route path="/login" element={<LoginLayout />} />
            <Route path="/loginFindId" element={<LoginFindId />} />
            <Route path="/loginFindPwd" element={<LoginFindPwd />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
        {/* </LoginProvider> */}
      </Provider>
    </div>
  );
}

export default App;

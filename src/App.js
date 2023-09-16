import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LoginGrid from "./Login/LoginGrid";
import LaborContractGrid from "./templates/LaborContract/LaborContractLayout";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import SignUp from "./SignUp/SignUp";
import MainHome from "./templates/MainHome";
import MyPage from "./templates/myPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc/*" element={<LaborContractGrid />} />
          <Route path="/si" element={<SalaryInformationEntryLayout />} />
          <Route path="/login" element={<LoginGrid />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

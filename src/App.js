import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
// import LaborContractGrid from "./templates/LaborContractGrid";
// import LaborContractGrid from "./LaborContract/LaborContract";
import SalaryInformationEntry from "../src/templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import Login from "./templates/Login/Login";
import LaborContractGrid from "./templates/LaborContract/LaborContractLayout";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import LoginGrid from "./Login/LoginGrid";
// import SignUp from "./templates/Login/Sign";
import SignUp from "./SignUp/SignUp";
import MainHome from "./templates/MainHome";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

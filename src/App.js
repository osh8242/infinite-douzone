import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
// import LaborContractGrid from "./templates/LaborContractGrid";
import LaborContractGrid from "./templates/LaborContract/LaborContractLayout";
// import LaborContractGrid from "./LaborContract/LaborContract";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";
import Login from "./templates/Login/Login";
import LoginGrid from "./Login/LoginGrid";
// import SignUp from "./templates/Login/Sign";
import SignUp from "./SignUp/SignUp";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import LaborContract from "./templates/LaborContract";
import MainHome from "./templates/MainHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<MainHome />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc/*" element={<LaborContractGrid />} />
          <Route path="/si" element={<SalaryInformationEntry />} />
          <Route path="/login" element={<LoginGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

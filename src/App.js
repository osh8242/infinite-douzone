import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManageMent/HrManagementLayout";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import LaborContractGrid from "./templates/LaborContractGrid";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";
import MainHome from "./templates/MainHome";
import Login from "./templates/Login/Login";
import SignUp from "./templates/Login/SignTemp";

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
          <Route path="/si" element={<SalaryInformationEntry />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

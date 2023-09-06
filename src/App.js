import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LaborContractGrid from "./templates/LaborContractGrid";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";
import Login from "./templates/Login/Login";
import SignUp from "./templates/Login/SignTemp";
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
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

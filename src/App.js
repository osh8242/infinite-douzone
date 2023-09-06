import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManageMent/HrManagementLayout";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import LaborContract from "./templates/LaborContract";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";
import MainHome from "./templates/MainHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc" element={<LaborContract />} />
          <Route path="/si" element={<SalaryInformationEntry />} />
          <Route path="*" element={<HrManagementLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

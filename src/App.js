import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LaborContract from "./templates/LaborContract";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc" element={<LaborContract />} />
          <Route path="/si" element={<SalaryInformationEntryLayout />} />
          <Route path="*" element={<SalaryInformationEntryLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

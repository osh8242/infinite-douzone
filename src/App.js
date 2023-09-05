import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LaborContract from "./templates/LaborContract";
import EmpRegisterationLayout from "./templates/EmpRegisterationLayout";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/si" element={<SalaryInformationEntry />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/lc" element={<LaborContract />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="*" element={<HrManagementLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

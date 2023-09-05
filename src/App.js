import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManageMent/HrManagementLayout";
import LaborContract from "./templates/LaborContract";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/LaborContract" element={<LaborContract />} />
          <Route path="*" element={<HrManagementLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

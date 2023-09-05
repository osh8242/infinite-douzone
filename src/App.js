import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagement from "./templates/HrManageMent/HrManagement";
import LaborContract from "./templates/LaborContract";
import Login from "./templates/Login/Login";
import SignTemp from "./templates/Login/SignTemp";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/LaborContract" element={<LaborContract />} />
          <Route path="/HrManagement" element={<HrManagement />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignTemp" element={<SignTemp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

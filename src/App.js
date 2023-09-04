import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./templates/Header";
import HrManagement from "./templates/HrManageMent/HrManagement";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<HrManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.scss";
import Header from "./templates/Header";
import HrManagement from "./templates/HrManagement";
import LaborContract from "./templates/LaborContract";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <LaborContract />
    </div>
  );
}

export default App;

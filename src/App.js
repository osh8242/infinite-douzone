import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagement from "./templates/HrManageMent/HrManagement";

function App() {
  return (
    <div>
      <Header />
      <EmpRegisterationLayout />
    </div>
  );
}

export default App;

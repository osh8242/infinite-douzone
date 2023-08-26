import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";
import EmpRegisterationLayout from "./templates/EmpRegisterationLayout";
import SwsmSearchGrid from "./templates/SwsmSearchGrid";
import SwsmGrid from "./templates/SwsmGrid";
import TestSwsnGrid from "./templates/TestSwsnGrid";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";

// const names = ["kendrick", "christopher", "theo", "dave"];
function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <TestSwsnGrid />
      </Container>
    </div>
  );
}

export default App;

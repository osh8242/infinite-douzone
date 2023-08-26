import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";
import EmpRegisterationLayout from "./templates/EmpRegisterationLayout";
import SwsmGrid from "./templates/SwsmGrid";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";

// const names = ["kendrick", "christopher", "theo", "dave"];
function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <SwsmGrid />
      </Container>
    </div>
  );
}

export default App;

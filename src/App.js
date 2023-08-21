import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";
import SwsmEntry from "./templates/SwsmEntry";
import SalaryInfomationEntry from "./templates/SalaryInformationEntry";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <SwsmEntry />
        {/* <SalaryInfomationEntry /> */}
      </Container>
    </div>
  );
}

export default App;

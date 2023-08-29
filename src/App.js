import { Container } from "react-bootstrap";
import "./App.scss";
import { ContextProvider } from "./model/ContextModel";
import Header from "./templates/Header";
import SalaryInformationEntry from "./templates/SalaryInformationEntry";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <SalaryInformationEntry />
      </Container>
    </div>
  );
}

export default App;

import { Container } from "react-bootstrap";
import "./App.css";
import SelectForm from "./components/SelectForm";
import Header from "./templates/Header";
import TestGrid from "./templates/TestGrid";
import SearchPanel from "./components/SearchPanel";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <TestGrid />
      </Container>
    </div>
  );
}

export default App;

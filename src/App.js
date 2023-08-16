import { Container } from "react-bootstrap";
import "./App.css";
import SelectForm from "./components/SelectForm";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";
import SearchPanel from "./components/SearchPanel";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <LRlevel2Grid />
      </Container>
    </div>
  );
}

export default App;

import { Container } from "react-bootstrap";
import "./App.scss";
import { ContextProvider } from "./model/ContextModel";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";
import TestSwsnGrid from "./templates/TestSwsnGrid";

// const names = ["kendrick", "christopher", "theo", "dave"];
function App() {
  return (
    <div>
      <ContextProvider>
        <Header />
        <Container>
          <TestSwsnGrid />
        </Container>
      </ContextProvider>
    </div>
  );
}

export default App;

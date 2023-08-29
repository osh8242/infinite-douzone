import { Container } from "react-bootstrap";
import "./App.scss";
import { ContextProvider } from "./model/ContextModel";
import Header from "./templates/Header";
import LRlevel2Grid from "./templates/LRlevel2Grid";

function App() {
  return (
    <div>
      <ContextProvider>
        <Header />
        <Container>
          <LRlevel2Grid />
        </Container>
      </ContextProvider>
    </div>
  );
}

export default App;

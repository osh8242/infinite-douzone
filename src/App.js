import { Container } from "react-bootstrap";
import "./App.scss";
import { ContextProvider } from "./model/ContextModel";
import Header from "./templates/Header";
import HrManagement from "./templates/HrManagement";

function App() {
  return (
    <div>
      <ContextProvider>
        <Header />

        <HrManagement />
      </ContextProvider>
    </div>
  );
}

export default App;

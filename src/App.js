import { Container } from "react-bootstrap";
import "./App.css";
import DateForm from "./components/DateForm";

function App() {
  const radioList = [
    { key: "M", value: "남자" },
    { key: "F", value: "여자" },
  ];

  return (
    <div>
      <Container>
        <DateForm />
      </Container>
    </div>
  );
}

export default App;

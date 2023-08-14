import { Container } from "react-bootstrap";
import "./App.css";
import SelectForm from "./components/SelectForm";
import Header from "./templates/Header";

function App() {
  const optionList = [
    { key: "ename", value: "이름" },
    { key: "ecode", value: "사원번호" },
  ];
  return (
    <div>
      <Header />
      <Container>
        <SelectForm label={"옵션"} optionList={optionList} />
      </Container>
    </div>
  );
}

export default App;

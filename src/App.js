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

// import { Container } from "react-bootstrap";
// import "./App.css";
// import DateForm from "./components/DateForm";
// import SelectForm from "./components/SelectForm";
// import Header from "./templates/Header";
// import LRlevel2Grid from "./templates/LRlevel2Grid";
// import SearchPanel from "./components/SearchPanel";

// function App() {
//   const radioList = [
//     { key: "M", value: "남자" },
//     { key: "F", value: "여자" },
//   ];

//   return (
//     <div>
//       <Container>
//         <DateForm />
//       </Container>
//     </div>
//   );
// }

// export default App;

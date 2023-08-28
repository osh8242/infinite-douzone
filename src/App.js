import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './templates/Header';
import LRlevel2Grid from './templates/LRlevel2Grid';
import EmpRegisterationLayout from './templates/EmpRegisterationLayout';
import SalaryInformationEntry from './templates/SalaryInformationEntry';

function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <SalaryInformationEntry />
      </Container>
    </div>
  );
}

export default App;

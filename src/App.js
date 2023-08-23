import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './templates/Header';
import LRlevel2Grid from './templates/LRlevel2Grid';
import SalaryInfomationEntry from './templates/SalaryInformationEntry';
import EmpRegisterationLayout from './templates/EmpRegisterationLayout';
import SwsmSearchGrid from './templates/SwsmSearchGrid';
import SwsmGrid from './templates/SwsmGrid';

function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <SwsmGrid />
      </Container>
    </div>
  );
}

export default App;

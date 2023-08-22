import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './templates/Header';
import LRlevel2Grid from './templates/LRlevel2Grid';
import SalaryInfomationEntry from './templates/SalaryInformationEntry';
import SwsmEntry from './templates/SwsmEntry';

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

import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './templates/Header';
import LRlevel2Grid from './templates/LRlevel2Grid';
import SalaryInfomationEntry from './templates/SalaryInformationEntry';
import SwsmGrid from './templates/SwsmSearchGrid';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <SwsmGrid />
      </Container>
    </div>
  );
}

export default App;

import { ProgressBar } from 'components/ProgressBar';
import './App.css';
import { Accordion } from './components/Accordion';

const App = () => (
  <div className="container">
    <div className="group-container">
      <header className="group-header">
        <h1 className="group-title">Grouped Tasks</h1>
        <ProgressBar />
      </header>
      <main>
        <Accordion />
      </main>
    </div>
  </div>
);

export default App;

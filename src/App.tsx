import { ProgressBar } from 'components/ProgressBar';
import { GroupsContextProvider } from 'contexts/GroupsContext';
import './App.css';
import { Accordion } from './components/Accordion';

const App = () => (
  <GroupsContextProvider>
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
  </GroupsContextProvider>
);

export default App;

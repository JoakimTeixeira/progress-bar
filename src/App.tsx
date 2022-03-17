import React from 'react';
import { Accordion } from './components/Accordion';
import './App.css';

const App = () => (
  <div className="container">
    <div className="group-container">
      <h1 className="group-title">Grouped Tasks</h1>
      <main>
        <Accordion />
      </main>
    </div>
  </div>
);

export default App;

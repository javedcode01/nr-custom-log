import React from 'react';
import './App.css';
import NewRelicCustomLogger from './NewrelicCustom.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NewRelicCustomLogger />
      </header>
    </div>
  );
}

export default App;

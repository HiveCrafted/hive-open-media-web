import React from 'react';
import './App.css';
import GoogleSignIn from './components/GoogleSignIn';
// import CreateFolder from './components/CreateFolder';
import SelectSource from './components/SelectSource';

const logo = require('./assets/images/logo-1.png');

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hive Open Media</h1>
      </header>
      <GoogleSignIn />
      {/* <CreateFolder /> */}
      <SelectSource />
    </div>
  );
};

export default App;

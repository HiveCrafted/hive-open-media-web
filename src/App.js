import React, { useState } from 'react';
import { ConfigProvider, Card, Button, theme } from 'antd';
import GoogleSignIn from './components/GoogleSignIn';
import SelectSource from './components/SelectSource';
import FileUpload from './components/FileUpload';
// import CreateFolder from './components/CreateFolder';
import './App.css';

const logo = require('./assets/images/logo-1.png');

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Card title="Hive Open Media" style={{ width: 'max-content' }}>
          <Button onClick={handleClick}>Change Theme to {isDarkMode ? 'Light' : 'Dark'}</Button>
          <GoogleSignIn />
          <FileUpload />
          <SelectSource />
        </Card>
      </ConfigProvider>
    </div>
  );
}

export default App;

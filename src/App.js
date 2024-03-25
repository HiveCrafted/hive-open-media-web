import React, { useState } from 'react';
import { ConfigProvider, Layout, Button, theme } from 'antd';
import GoogleSignIn from './components/GoogleSignIn';
import SelectSource from './components/SelectSource';
import FileUpload from './components/FileUpload';
import { createGlobalStyle } from 'styled-components';
// import CreateFolder from './components/CreateFolder';
import './App.css';

const { Header, Footer, Content } = Layout;

const GlobalStyle = createGlobalStyle`
  .ant-layout {
    background-color: ${(props) => (props.isDarkMode ? '#282c34' : '#f4f4f4')};
    color: ${(props) => (props.isDarkMode ? '#f4f4f4' : '#282c34')};
    vh: 100vh;
    vw: 100vw;
    display: flex;
    // add more styles as needed
  }
  .ant-header {
    background-color: ${(props) => (props.isDarkMode ? '#282c34' : '#f4f4f4')};
    color: ${(props) => (props.isDarkMode ? '#f4f4f4' : '#282c34')};
    // add more styles as needed
  
  }
  .ant-content {
    background-color: ${(props) => (props.isDarkMode ? '#282c34' : '#f4f4f4')};
    color: ${(props) => (props.isDarkMode ? '#f4f4f4' : '#282c34')};
    // add more styles as needed
  }
  .ant-footer {
    background-color: ${(props) => (props.isDarkMode ? '#282c34' : '#f4f4f4')};
    color: ${(props) => (props.isDarkMode ? '#f4f4f4' : '#282c34')};
    // add more styles as needed
  }
  .App-logo {
    height: 40px;
    pointer-events: none;
  }
`;

const logo = require('./assets/images/logo-1.png');

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Layout>
          <Header>
            <img src={logo} className="App-logo" alt="logo" />
            <span
              style={{
                fontSize: '20px',
                color: `${isDarkMode ? '#f4f4f4' : '#282c34'}`,
              }}
            >
              Hive Open Media
            </span>
          </Header>
          <Content>
            <Button onClick={handleClick}>Change Theme to {isDarkMode ? 'Light' : 'Dark'}</Button>
            <GoogleSignIn />
            <FileUpload />
            <SelectSource />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;

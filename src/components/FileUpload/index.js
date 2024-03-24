import React, { useCallback, useState } from 'react';
import { Row, Button } from 'antd';
import styled from 'styled-components';
import DisplayFileContents from '../DisplayFileContents';
import { style } from './styles';

const NewDocumentWrapper = styled.div`
  ${style}
`;

const FileUpload = () => {
  const [displayFileContentsVisible, setDisplayFileContentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);

  const displayFiles = (searchTerm = null, response) => {
    console.log('displayFiles hit');
    let files = [];

    for (let i in response) {
      if (i == 'Video') {
        for (let n in response[i]) {
          for (let m in response[i][n]) {
            for (let o in response[i][n][m]) {
              files.push({
                Date: response[i][n][m][o].Date,
                Likes: response[i][n][m][o].Likes,
                Link: response[i][n][m][o].Link,
              });
              console.log(`o: ${o}, response[i][n][m][o]: ${JSON.stringify(response[i][n][m][o])}`);
            }
          }
        }
      }
    }

    setDocuments(files);
    console.log(`files: ${files}`);
    setDisplayFileContentsVisibility(true);
  };

  const onClose = () => {
    setDisplayFileContentsVisibility(false);
    console.log(`dislayFileContentsVisible = ${displayFileContentsVisible}`);
  };

  const showDocuments = () => {
    setDisplayFileContentsVisibility(true);
    console.log(`dislayFileContentsVisible = ${displayFileContentsVisible}`);
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/json') {
      const message = 'Invalid file type. Please upload a JSON file.';
      alert(message + ` File type: ${file.type}, File name: ${file.name}`);
      console.error(`Error: ${message}  File type: ${file.type}, File name: ${file.name} `);
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const contents = event.target.result;
      console.log(contents);
      displayFiles(null, JSON.parse(contents));
    };

    reader.onerror = function () {
      console.error('An error occurred while reading the file:', reader.error);
    };

    reader.readAsText(file);
    // showDocuments();
  }, []);

  return (
    <div>
      <h1>Upload a JSON File</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <Button type="primary" onClick={showDocuments} ghost>
        Show File Contents
      </Button>
      <NewDocumentWrapper>
        <Row gutter={16} className="custom-row">
          <DisplayFileContents
            visible={displayFileContentsVisible}
            onClose={onClose}
            documents={documents}
            onSearch={displayFiles}
          />
        </Row>
      </NewDocumentWrapper>
    </div>
  );
};

export default FileUpload;

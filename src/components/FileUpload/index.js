import React, { useCallback } from 'react';

const FileUpload = () => {
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
    };

    reader.onerror = function () {
      console.error('An error occurred while reading the file:', reader.error);
    };

    reader.readAsText(file);
  }, []);

  return (
    <div>
      <h1>Upload a JSON File</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;

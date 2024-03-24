import React from 'react';
import { gapi } from 'gapi-script';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

const scope = 'https://www.googleapis.com/auth/drive.file';
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

const CreateFolder = () => {
  // const [status, setStatus] = (useState < string) | (null > null);

  const initializeClient = async () => {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: discoveryDocs,
        scope: scope,
      });
      console.log('Google API client initialized successfully');
    } catch (error) {
      console.error('Error initializing the Google API client:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const createFolder = async () => {
    try {
      await initializeClient();
      console.log('Proceeding to create folder');
      // Folder creation logic...
    } catch (error) {
      console.error('Error in createFolder function:', error);
      //      setStatus(`Failure: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={createFolder}>Create Folder in Drive</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default CreateFolder;

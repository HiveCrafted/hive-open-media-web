import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const clientId = '650574562962-th60805lacl58ggmqrb6cul4kdd4vnss.apps.googleusercontent.com';
const apiKey = 'AIzaSyAMPB4qVJUhk47KM5qQSrxUIs63yHfqkV8';

const scope = 'https://www.googleapis.com/auth/drive.file';
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

const CreateFolder = () => {
    const [status, setStatus] = useState<string | null>(null);

    const initializeClient = async () => {
      try {
          await gapi.client.init({
              apiKey: apiKey,
              clientId: clientId,
              discoveryDocs: discoveryDocs,
              scope: scope
          });
          console.log('Google API client initialized successfully');
      } catch (error) {
          console.error('Error initializing the Google API client:', error);
          throw error;  // Re-throw the error to handle it in the calling function
      }
  };
  
    const createFolder = async () => {
      try {
        await initializeClient();
        console.log('Proceeding to create folder');
        // Folder creation logic...
      } catch (error: any) {
        console.error('Error in createFolder function:', error);
        setStatus(`Failure: ${error.message}`);
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

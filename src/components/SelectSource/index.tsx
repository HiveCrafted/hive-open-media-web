import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { gapi } from 'gapi-script';
import styled from 'styled-components';
import ListDocuments from '../ListDocuments';

const style = require('./styles.css');

const NewDocumentWrapper = styled.div`
  ${style}
`;

interface GoogleUser {
  // Define the type for GoogleUser here
}

interface SelectProps {
  signedInUser: GoogleUser;
  onSignOut: () => void;
  onSignIn: () => void;
}

// Client ID and API key from the Developer Console
const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID || '';
const API_KEY: string = process.env.API_KEY || '';
const DISCOVERY_DOCS: Array<string> = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES: string = 'https://www.googleapis.com/auth/drive.metadata.readonly';

// Google Drive image
const GoogleDriveImage = require('../../assets/images/google-drive.png');

const SelectSource: React.FC<SelectProps> = ({ onSignOut, onSignIn }) => {
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState<GoogleUser | null>(null);
 
  const handleChange = (file: any) => {
    // handle file change
  };

  /**
   * Print files.
   */
  const listFiles = (searchTerm: string | null = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm || '', // Fix: Convert null to an empty string
      })
      .then((response: gapi.client.Response<gapi.client.drive.FileList>) => {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const files: any = response.result.files;
        if (files) {
          setDocuments(files);
        }
      });
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      setIsLoadingGoogleDriveApi(true);
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setIsLoadingGoogleDriveApi(false);
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    });
  }, []);

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.get() as GoogleUser);
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      onSignOut();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = () => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {}
      );
  };

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  };

  const showDocuments = () => {
    setListDocumentsVisibility(true);
  };

  const onClose = () => {
    setListDocumentsVisibility(false);
  };

  return (
    <NewDocumentWrapper>
    <Row gutter={16} className="custom-row">      
    <ListDocuments
        visible={listDocumentsVisible}
        onClose={onClose}
        documents={documents}
        onSearch={listFiles}
        signedInUser={signedInUser}
        onSignOut={handleSignOutClick}
        isLoading={isFetchingGoogleDriveFiles}
      />
      <Col span={8}>
        <Spin spinning={isLoadingGoogleDriveApi} style={{ width: '100%' }}>
          <div
            onClick={() => {
              handleClientLoad();
            }}
            className="source-container"
            >
            <div className="icon-container">
              <div className="icon icon-success">
                <img height="80" width="80" src={GoogleDriveImage} />
              </div>
            </div>
            <div className="content-container">
              <p className="title">Google Drive</p>
              <span className="content">Import documents straight from your google drive</span>
            </div>
          </div>
        </Spin>
      </Col>
    </Row>
  </NewDocumentWrapper>
  );
};

export default SelectSource;

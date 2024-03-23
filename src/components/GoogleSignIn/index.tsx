import React, { useEffect } from 'react';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID

function GoogleSignIn() {
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }  // Customize the button
    );
  }, []);

  function handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Process the ID token or use it to get user information
  }

  return (
    <div>
      <div id="signInDiv">the signInDiv</div>
    </div>
  );
}

export default GoogleSignIn;

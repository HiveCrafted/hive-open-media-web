import React, { useEffect } from 'react';

const clientId = '650574562962-th60805lacl58ggmqrb6cul4kdd4vnss.apps.googleusercontent.com';

function GoogleSignIn() {
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
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

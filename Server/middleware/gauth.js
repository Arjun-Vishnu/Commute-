const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '585016231360-2sjb507mt02vbn844t18q6ukvmi9s34r.apps.googleusercontent.com';
const token = 'token'; // Replace with the ID token you want to verify

async function verifyIdToken() {
  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    // If request specified a G Suite domain:
    // const domain = payload.hd;

    // Handle the verification result
    console.log('Token verified successfully');
    console.log('User ID:', userId);

    // Perform further actions based on the verification result
    // e.g., grant access, save user information, redirect to a protected area

  } catch (error) {
    console.error('Token verification failed:', error.message);
    // Handle the error, e.g., display an error message or redirect to an error page
  }
}

verifyIdToken();

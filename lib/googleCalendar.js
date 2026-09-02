import { google } from 'googleapis';

const getAuth = () => {
  // Try to parse the private key correctly, whether it has literal \n or actual newlines
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return auth;
};

export const getCalendar = () => {
  const auth = getAuth();
  return google.calendar({ version: 'v3', auth });
};


import { google } from 'googleapis';

const getAuth = () => {
  // If the private key has escaped newlines, replace them
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : '';

  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/calendar']
  );

  return auth;
};

export const getCalendar = () => {
  const auth = getAuth();
  return google.calendar({ version: 'v3', auth });
};

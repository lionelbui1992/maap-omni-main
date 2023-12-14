import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export async function getAuthToken() {
    const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS_CONTENT;
    if (!credentialsEnv)
        throw new Error(
            'GOOGLE_APPLICATION_CREDENTIALS_CONTENT is not defined'
        );
    try {
        const decryptCredentials = Buffer.from(
            credentialsEnv,
            'base64'
        ).toString('ascii');
        const credentials = JSON.parse(decryptCredentials);
        const auth = new google.auth.GoogleAuth({
            scopes: SCOPES,
            credentials: credentials,
        });
        const authToken = await auth.getClient();
        return authToken;
    } catch (error) {}
}

export async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
    const sheets = google.sheets('v4');
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName,
    });
    return res;
}

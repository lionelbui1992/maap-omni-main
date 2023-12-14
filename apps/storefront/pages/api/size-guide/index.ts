import { getAuthToken, getSpreadSheetValues } from '@lib/google';

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const sheetNameRange = process.env.GOOGLE_SHEETNAME_RANGE;

export default async function handler(req, res) {
    try {
        const auth = await getAuthToken();
        const sheetName = sheetNameRange;
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName,
            auth,
        });
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=180');
        res.status(200).json({ success: true, data: response?.data });
    } catch (error) {
        console.log(error.message, error.stack);
        res.status(400).json({ success: false, data: error });
    }
}

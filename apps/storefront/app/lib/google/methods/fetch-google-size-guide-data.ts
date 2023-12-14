import { getAuthToken, getSpreadSheetValues } from '@lib/google';
import { captureException } from '@sentry/nextjs';
import { transformGoogleSizeGuideData } from '@app/lib/google/size-guide';

/* IMPORTANT: Since we're using googleapis and not Next's fetch function, 
we don't get the nice automatic caching and revalidation options.
We need to think about what to do instead. */

export async function fetchAndTransformGoogleSizeGuideData() {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const sheetNameRange = process.env.GOOGLE_SHEETNAME_RANGE;

    try {
        const auth = await getAuthToken();
        const sheetName = sheetNameRange;
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName,
            auth,
        });

        if (!response?.data?.values) {
            console.error('No size guide data found');
            return null;
        }

        return transformGoogleSizeGuideData(response.data.values);
    } catch (error) {
        console.error(
            'Error fetching and transforming size guide data:',
            error
        );
        captureException(error);
        return null;
    }
}

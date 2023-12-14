import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

type GeoLocation = {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: string;
    long: string;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | GeoLocation>
) {
    let locationData = {};
    const localMode = req.headers['host'] === 'localhost:3000';
    // const testIP = '121.200.4.22'; // AU
    // const testIP = '37.120.233.186'; // UK
    const testIP = '45.89.173.98'; // USA

    const ipAddress = localMode ? testIP : req.headers['x-real-ip'];

    if (ipAddress && ipAddress !== '::1') {
        try {
            const res = await fetch(
                `http://ip-api.com/json/${ipAddress}?key=zjSkBN1Vyyij1pd`
            );

            locationData = await res.json();
        } catch (Error) {
            console.log('Geolocation Fetch Error Server-Side', Error);
        }
    }

    res.status(200).json(locationData);
}

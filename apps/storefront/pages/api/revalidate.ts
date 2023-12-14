import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const secret = process.env.REVALIDATE_SECRET_TOKEN;
        const { token, path } = req.query;

        if (!path) throw new Error('Path is empty');
        if (secret !== token) throw new Error('Unauthorized');

        await res.revalidate(path as string);

        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(403).send(err.message);
    }
}

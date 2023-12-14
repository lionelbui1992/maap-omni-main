import Fetch from './fetch';

const OMNEO_DOMAIN = process.env.OMNEO_DOMAIN;
const OMNEO_TOKEN = process.env.OMNEO_TOKEN;

class Omneo extends Fetch {
    constructor() {
        const url = `https://${OMNEO_DOMAIN}/api/v3`;
        super(url, OMNEO_TOKEN);
    }
}

module.exports = new Omneo();

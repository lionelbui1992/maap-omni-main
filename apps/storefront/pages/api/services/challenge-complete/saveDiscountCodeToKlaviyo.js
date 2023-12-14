import klaviyo from 'services/klaviyo';

const getProfileIdByEmail = async (config, email) => {
    return klaviyo(config)
        .get(
            `/v2/people/search?api_key=${
                config.klaviyo_api_key
            }&email=${encodeURIComponent(email)}`
        )
        .then(async response => {
            return response?.body?.id;
        })
        .catch(e => {
            console.log('Unable to get Klaviyo profile', e);
        });
};

const createProfile = async (config, payload) => {
    return klaviyo(config)
        .get(
            `/identify?data=${Buffer.from(JSON.stringify(payload)).toString(
                'base64'
            )}`
        )
        .then(async response => {
            return response?.body;
        })
        .catch(e => {
            console.log('Unable to create Klaviyo profile', e);
        });
};

const updateProfile = async (config, id, payload) => {
    return klaviyo(config)
        .call({
            method: 'PUT',
            url: encodeURI(`/v1/person/${id}`),
            body: null,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: payload,
        })
        .then(async response => {
            return response?.body;
        })
        .catch(e => {
            console.log('Unable to update Klaviyo profile', id, e);
        });
};

export async function saveDiscountCodeToKlaviyo(
    profile,
    region,
    discountCode,
    klaviyoPropertyKey
) {
    let klaviyoApiKey = process.env.KLAVIYO_API_KEY_INT;
    if (region === 'US') klaviyoApiKey = process.env.KLAVIYO_API_KEY_US;
    if (region === 'EU') klaviyoApiKey = process.env.KLAVIYO_API_KEY_EU;
    if (region === 'UK') klaviyoApiKey = process.env.KLAVIYO_API_KEY_UK;

    let klaviyoPublicKey = process.env.KLAVIYO_PUBLIC_KEY_INT;
    if (region === 'US') klaviyoPublicKey = process.env.KLAVIYO_PUBLIC_KEY_US;
    if (region === 'EU') klaviyoPublicKey = process.env.KLAVIYO_PUBLIC_KEY_EU;
    if (region === 'UK') klaviyoPublicKey = process.env.KLAVIYO_PUBLIC_KEY_UK;

    const config = {
        klaviyo_api_domain: process.env.KLAVIYO_DOMAIN,
        klaviyo_api_key: klaviyoApiKey,
    };

    const id = await getProfileIdByEmail(config, profile.email);

    let data = null;
    if (!id) {
        data = await createProfile(config, {
            token: klaviyoPublicKey,
            properties: { ...profile, [klaviyoPropertyKey]: discountCode },
        });
    } else {
        data = await updateProfile(config, id, {
            api_key: klaviyoApiKey,
            ...profile,
            [klaviyoPropertyKey]: discountCode,
        });
    }
    return data;
}

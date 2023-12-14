import Omneo from 'services/Omneo';

export async function checkProfileAvailability(email) {
    const result = await Omneo.post('/profiles/availability', { email });
    return result?.body?.data;
}

async function createProfile(payload) {
    const result = await Omneo.post('/profiles', payload);
    return result?.body?.data;
}

async function updateProfile(id, payload) {
    const result = await Omneo.put(`/profiles/${id}`, payload);
    return result?.body?.data;
}

export async function getProfile(id) {
    const result = await Omneo.get(`/profiles/${id}`);
    return result?.body?.data;
}

export async function checkOmneoTagExists(id, tag) {
    const data = await getProfile(id);

    return data?.tags?.includes(tag);
}

export async function getOmneoExistingTags(id) {
    const data = await getProfile(id);

    return data?.tags;
}

export async function upsertProfileToOmneo(id, payload) {
    let data = null;

    if (id) {
        data = await updateProfile(id, payload);
        // console.log('update Omneo profile:', data);
    } else {
        data = await createProfile(payload);
        // console.log('create Omneo profile:', data);
    }
    return data;
}

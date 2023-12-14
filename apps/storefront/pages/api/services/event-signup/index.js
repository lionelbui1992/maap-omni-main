'use strict';

import { auth } from '@arkadecx/arkade-cloud-functions-auth';

const {
    upsertProfileToOmneo,
    checkProfileAvailability,
    checkOmneoTagExists,
    getOmneoExistingTags,
} = require('./upsertProfileToOmneo');

// map omneo error
const ErrorMap = {
    'The mobile phone has already been taken.':
        'Looks like that mobile number is already associated with another email address. Please update your number or email before proceeding.',
};

function mapOmneoError(errors) {
    if (!errors) return null;

    if (errors.body?.errors?.mobile_phone) {
        const mobileError = errors.body.errors.mobile_phone[0];

        return ErrorMap[mobileError];
    }
}

module.exports = async (req, res) => {
    try {
        const r = auth(req, {
            hmacSecret: process.env.NEXT_PUBLIC_API_SECRET,
            originDomainWhitelist: process.env.API_DOMAIN_WHITELIST.split(','),
        });
        if (!r) {
            return res.status(401).json({ error: 'Unauthorised' });
        }

        const {
            first_name,
            last_name,
            mobile_phone,
            email,
            gender,
            region,
            email_promo,
            sms_promo,
            tag,
            event_form_complete_message,
            voting_option,
            textArea_title,
            textArea_input,
            instagram_handle,
            strava_profile_handle,
        } = req.body;

        const PROFILE_TAG = tag.replace(/\s+/g, '');

        if (email.indexOf('+') !== -1) {
            return res.json({
                region,
                status: 'ok',
                message:
                    'Please enter a valid email address with no + character',
            });
        }

        const response = await checkProfileAvailability(email);

        const omneoId = response?.email?.profile?.id;

        let profileTags = [];

        // existing user
        if (omneoId) {
            const alreadySignedup = await checkOmneoTagExists(
                omneoId,
                PROFILE_TAG
            );

            if (alreadySignedup) {
                return res.json({
                    region,
                    status: 'signedup',
                    message:
                        "Looks like you have already registered for this event in the past, please check your email or get in touch if you can't find it.",
                });
            }

            // profile tags
            profileTags = await getOmneoExistingTags(omneoId);
            profileTags.push(PROFILE_TAG);

            if (voting_option !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `${PROFILE_TAG}-${voting_option}`
                );
            }

            if (textArea_input?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `${textArea_title}-${textArea_input}`
                );
            }

            if (instagram_handle?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `instagram-handle-is-${instagram_handle}`
                );
            }

            if (strava_profile_handle?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `strava-profile-handle-is-${strava_profile_handle}`
                );
            }

            // new user
        } else {
            // profile tags
            profileTags.push(PROFILE_TAG);
            if (voting_option !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `${PROFILE_TAG}-${voting_option}`
                );
            }

            if (textArea_input !== undefined && textArea_input?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `${textArea_title}-${textArea_input}`
                );
            }

            if (instagram_handle?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `instagram-handle-is-${instagram_handle}`
                );
            }

            if (strava_profile_handle?.trim() !== '') {
                profileTags.push(
                    PROFILE_TAG,
                    `strava-profile-handle-is-${strava_profile_handle}`
                );
            }
        }

        let omneoCompatibleRegionCode = region?.toLowerCase();
        if (omneoCompatibleRegionCode === 'us')
            omneoCompatibleRegionCode = 'usa'; // Codes dont match.

        await upsertProfileToOmneo(omneoId, {
            first_name,
            last_name,
            email,
            secondary_phone: mobile_phone?.length ? mobile_phone : undefined,
            gender: gender?.length ? gender : undefined,
            region: omneoCompatibleRegionCode,
            tags: profileTags,
            comms_attributes: {
                email_promo: email_promo,
                sms_promo: sms_promo,
            },
        });

        res.json({
            region,
            status: 'ok',
            message: event_form_complete_message
                ? event_form_complete_message
                : 'Thank You',
        });
    } catch (error) {
        if (error) {
            res.status(500).json({
                error,
                omneoErrorMessage: mapOmneoError(error),
            });
        }
    }
};

'use strict';

import * as Sentry from '@sentry/node';
import { auth } from '@arkadecx/arkade-cloud-functions-auth';
import {
    checkProfileAvailability,
    getProfile,
    upsertProfileToOmneo,
} from './event-signup/upsertProfileToOmneo';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

Sentry.configureScope((scope) => scope.setTransactionName('Newsletter Signup'));

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

    return errors;
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

        const { region, emailAddress, tags } = req.body;

        Sentry.setContext('profile', {
            email: emailAddress,
        });

        Sentry.captureMessage('Sending email to Omneo.');

        // if (emailAddress.indexOf('+') !== -1) {
        //     return res.json({
        //         region,
        //         status: 'ok',
        //         message:
        //             'Please enter a valid email address with no + character',
        //     });
        // }

        let omneoCompatibleRegionCode = region?.toLowerCase();
        if (omneoCompatibleRegionCode === 'us')
            omneoCompatibleRegionCode = 'usa';

        const response = await checkProfileAvailability(emailAddress);
        const omneoId = response?.email?.profile?.id;

        let profileTags = [];
        let first_name = 'Unknown';
        let last_name = 'Unknown';

        // existing user
        if (omneoId) {
            const profile = await getProfile(omneoId);
            first_name = profile?.first_name;
            last_name = profile?.last_name;
            profileTags = profile?.tags;
            omneoCompatibleRegionCode = profile?.region.handle;
        }

        if (tags?.length) {
            profileTags.push(...tags);
        }

        const responseObject = await upsertProfileToOmneo(omneoId, {
            first_name,
            last_name,
            email: emailAddress,
            region: omneoCompatibleRegionCode,
            tags: profileTags,
            comms_attributes: {
                email_promo: true,
            },
        });

        let message = 'Thank you for joining the MAAP mailing list.';
        if (tags?.includes('amsterdam-store')) {
            message =
                'Thank you for joining the MAAP Amsterdam Lab mailing list.';
        }

        if (
            responseObject?.errors &&
            Object.keys(responseObject?.errors).length
        ) {
            message = responseObject.errors?.email;
        }

        res.json({
            status: 'ok',
            region,
            message,
        });
    } catch (error) {
        if (error) {
            console.log('Omneo post error', error);

            Sentry.captureException(error, {
                tags: {
                    process: 'newsletter-signup',
                },
            });
            res.status(500).json({
                error,
                omneoErrorMessage: mapOmneoError(error),
            });
        }
    }
};

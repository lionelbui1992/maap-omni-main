'use strict';
import { saveDiscountCodeToKlaviyo } from './saveDiscountCodeToKlaviyo';
import { auth } from '@arkadecx/arkade-cloud-functions-auth';
import { saveDiscountCodeToShopify } from './saveDiscountCodeToShopify';

const {
    upsertProfileToOmneo,
    checkProfileAvailability,
    checkOmneoTagExists,
    getOmneoExistingTags,
} = require('./upsertProfileToOmneo');

function getRandomString(length) {
    return (Math.random() + 1).toString(36).substring(2, 2 + length);
}

function generateDiscountCode(discountCodePrefix) {
    return `${discountCodePrefix}-${getRandomString(6)}`.toUpperCase();
}

// map omneo error

const ErrorMap = {
    'The mobile phone has already been taken.':
        'Looks like that mobile number is already associated with another email address. Please update your number or email before proceeding.',
};

function mapOmneoError(errors) {
    if (!errors) return null;

    if (errors.body.errors.mobile_phone) {
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
            discountCodePrefix,
            klaviyo_property_key,
            discountRuleIdEu,
            discountRuleIdIntl,
            discountRuleIdRetail,
            discountRuleIdUk,
            discountRuleIdUs,
            eu_discount_rule_control,
            uk_discount_rule_control,
            us_discount_rule_control,
            intl_discount_rule_control,
            retail_discount_rule_control,
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

        const discountCode = generateDiscountCode(discountCodePrefix);

        let profileTags = [];

        if (omneoId) {
            const alreadyRedeemed = await checkOmneoTagExists(
                omneoId,
                PROFILE_TAG
            );

            if (alreadyRedeemed) {
                return res.json({
                    region,
                    status: 'redeemed',
                    message:
                        "Looks like you have already redeemed your reward in the past, please check your email or get in touch if you can't find it.",
                });
            }

            profileTags = await getOmneoExistingTags(omneoId);
            profileTags.push(PROFILE_TAG, discountCode);
        } else {
            profileTags.push(PROFILE_TAG, discountCode);
        }

        let omneoCompatibleRegionCode = region?.toLowerCase();
        if (omneoCompatibleRegionCode === 'us')
            omneoCompatibleRegionCode = 'usa';

        const profilePayload = {
            first_name,
            last_name,
            email,
            gender: gender?.length ? gender : undefined,
            region: omneoCompatibleRegionCode,
            tags: profileTags,
            comms_attributes: {
                email_promo: email_promo,
                sms_promo: sms_promo,
            },
        };

        if (mobile_phone && mobile_phone.length) {
            profilePayload['secondary_phone'] = mobile_phone;
        }

        const profile = await upsertProfileToOmneo(omneoId, profilePayload);

        if (
            us_discount_rule_control === true ||
            us_discount_rule_control === 'true'
        ) {
            const usResult = await saveDiscountCodeToShopify(
                'US',
                discountCode,
                discountRuleIdUs
            );
        }

        if (
            uk_discount_rule_control === true ||
            uk_discount_rule_control === 'true'
        ) {
            const ukResult = await saveDiscountCodeToShopify(
                'UK',
                discountCode,
                discountRuleIdUk
            );
        }

        if (
            eu_discount_rule_control === true ||
            eu_discount_rule_control === 'true'
        ) {
            const euResult = await saveDiscountCodeToShopify(
                'EU',
                discountCode,
                discountRuleIdEu
            );
        }

        if (
            intl_discount_rule_control === true ||
            intl_discount_rule_control === 'true'
        ) {
            const intlResult = await saveDiscountCodeToShopify(
                'INTL',
                discountCode,
                discountRuleIdIntl
            );
        }

        if (
            retail_discount_rule_control === true ||
            retail_discount_rule_control === 'true'
        ) {
            const retailResult = await saveDiscountCodeToShopify(
                'RETAIL',
                discountCode,
                discountRuleIdRetail
            );
        }

        const klaviyoResult = await saveDiscountCodeToKlaviyo(
            // how to save phone number ???
            { first_name, last_name, email, gender },
            region,
            discountCode,
            klaviyo_property_key
        );

        res.json({
            discountCode,
            region,
            status: 'ok',
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

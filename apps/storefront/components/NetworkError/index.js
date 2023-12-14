import React from 'react';
import Button from 'components/Button';
import config from 'config/brandConfig';
import { captureException } from '@sentry/nextjs';

const { breakPoints } = config;

const Index = () => {
    captureException(new Error('Network Error has been displayed.'));

    return (
        <div className="networkError">
            <div className="networkErrorText">
                The page you are looking for could not be loaded.
                <br />
                <br />
                Please tap below to retry, or refresh the page.
                <br />
                <br />
                <Button
                    className="button--center button--link button--wide"
                    text="Retry"
                    onClick={() => location.reload()}
                />
            </div>
            <style jsx>
                {`
                    .networkError {
                        margin: 80px 0;
                        text-align: center;
                        font-size: 1em;
                        font-weight: 700;
                    }
                    @media (max-width: ${breakPoints.mobile.maxDeviceWidth}px) {
                        .h1 {
                            font-size: 1.9em;
                        }
                        .networkError {
                            margin: 30px 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Index;

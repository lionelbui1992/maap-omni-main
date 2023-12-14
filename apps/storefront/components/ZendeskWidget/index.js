import React, { useState } from 'react';
import Image from 'next/image';
import ChatIcon from './zendesk-chat-icon.png';
import config from 'config/brandConfig';

const { breakPoints } = config;

const ZendDeskWidget = () => {
    const [widgetLoading, setWidgetLoading] = useState(false);

    const loadZendeskWidget = () => {
        setWidgetLoading(true);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'ze-snippet';
        // script.async = true;
        script.src = `https://static.zdassets.com/ekr/snippet.js?key=${config.zendeskKey}`;
        script.onload = () => {
            zE(() => {
                $zopim(() => {
                    zE.activate({
                        hideOnClose: true,
                    });
                    setTimeout(() => {
                        setWidgetLoading(false);
                    }, 1500);
                });
            });
        };

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    return (
        <div className="zendeskWidget">
            <div id="ze-snippet"> </div>
            <button onClick={loadZendeskWidget}>
                <Image
                    src={ChatIcon}
                    width={34}
                    height={33}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                    alt="zendesk-widget-chat-icon"
                />
                &nbsp;
                {!widgetLoading ? `Get Help` : `One moment...`}
            </button>
            <style jsx>
                {`
                    .zendeskWidget {
                        z-index: 0;
                        transform: translateZ(0px);
                        position: fixed;
                        bottom: 14px;
                        right: 25px;
                    }

                    img {
                    }

                    button {
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        box-shadow: none;
                        background-color: rgb(255, 255, 255);
                        border: none;
                        padding: 8px 22px 6px 14px;
                        border-radius: 999rem;
                        bottom: 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: rgb(0, 0, 0);
                    }
                    @media (max-width: ${breakPoints.mobile.maxDeviceWidth}px) {
                        .zendeskWidget {
                            right: 20px;
                            bottom: 40px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ZendDeskWidget;

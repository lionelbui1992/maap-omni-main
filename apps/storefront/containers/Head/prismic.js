import React from 'react';
import Script from 'next/script';

export default (
    <Script
        strategy="lazyOnload"
        src="https://static.cdn.prismic.io/prismic.min.js?repo=maap&new=true"
    />
);

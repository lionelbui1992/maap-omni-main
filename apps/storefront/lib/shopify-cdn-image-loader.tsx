const shopifyCdnImageLoader = ({ src, width, quality }): string => {
    return `${src}&width=${width}&quality=${quality || 100}`;
};

export default shopifyCdnImageLoader;

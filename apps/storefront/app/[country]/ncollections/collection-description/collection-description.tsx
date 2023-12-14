import { PatternLanguageSEO } from 'mmds';

export const CollectionDescription = ({ collection }) => {
    const title = collection?.long_description_read_more[0].text.split('>')[1];
    const description = collection?.long_description_read_more?.find(
        (item) => item.type === 'paragraph'
    ).text;

    return <PatternLanguageSEO context={title} content={description} />;
};
export default CollectionDescription;

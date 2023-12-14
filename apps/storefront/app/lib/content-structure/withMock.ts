import ContentStructureMock from './mock';
import { UseContentStructure } from './content-structure';
import { useContentStructure } from './use-content-structure';

export const withMock = (useContentStructure: UseContentStructure) => {
    return function () {
        return useContentStructure(ContentStructureMock);
    };
};

export const useContentStructureWithMock = withMock(useContentStructure);

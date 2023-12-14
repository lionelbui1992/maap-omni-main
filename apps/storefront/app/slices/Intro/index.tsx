import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PatternLanguageIntro } from 'mmds';

/**
 * Props for `Intro`.
 */
export type IntroProps = SliceComponentProps<Content.IntroSlice>;

/**
 * Component for "Intro" Slices.
 */
const Intro = ({ slice }: IntroProps): JSX.Element => {
    return (
        <article
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <PatternLanguageIntro
                context={slice.primary.context}
                content={slice.primary.content}
                sub_count={slice.primary.sub_count}
            />
        </article>
    );
};

export default Intro;

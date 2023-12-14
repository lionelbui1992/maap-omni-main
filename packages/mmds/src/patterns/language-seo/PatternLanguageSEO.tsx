import cn from 'clsx';
import s from './PatternLanguageSEO.module.css';
import { Button } from '../../components/button';

export type LanguageSEO = {
    context: string | null;
    content: string | null;
    link?: string | undefined;
};

export const PatternLanguageSEO = ({ context, content, link }: LanguageSEO) => {
    if (!content) return null;
    return (
        <article className={cn(s.region, s.stack)}>
            <div className={s.header}>
                <h3 className="mmds-copy-one">{context}</h3>
            </div>
            <p className="mmds-copy-one">{content}</p>
            {link && (
                <Button
                    label="Read more"
                    hrefLink={link}
                    variant="text"
                    className={s.link}
                    padding="zeroInline"
                />
            )}
        </article>
    );
};

export default PatternLanguageSEO;

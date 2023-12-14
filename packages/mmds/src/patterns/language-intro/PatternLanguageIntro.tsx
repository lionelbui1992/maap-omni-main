import cn from 'clsx';
import s from './PatternLanguageIntro.module.css';

export type LanguageIntroProps = {
    context: string | null;
    sub_count?: string | null;
    content: string | null;
};

export const PatternLanguageIntro = ({
    context,
    sub_count,
    content,
}: LanguageIntroProps) => {
    if (!content) return null;
    return (
        <div className={cn(s.region, s.stack, s.border)}>
            <div className={s.header}>
                <h3 className="mmds-component-one-detail">{context}</h3>
                {sub_count && (
                    <p className={cn(s.subCount, 'mmds-copy-three-detail')}>
                        {sub_count}
                    </p>
                )}
            </div>
            <p className={cn(s.description, 'mmds-subtitle-one')}>{content}</p>
        </div>
    );
};

export default PatternLanguageIntro;

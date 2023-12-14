import cn from 'clsx';
import s from './NewsletterSubscriptionForm.module.css';
import { Right } from 'mmds';

const NewsletterSubscriptionForm = () => {
    return (
        <div className={s.newsletter}>
            <h4 className={cn('mmds-title-four')}>Roll with us</h4>
            <p className={cn('mmds-copy-two')}>Sign up to our Newsletter</p>
            <div className={s.newsletterInputContainer}>
                <input
                    type="email"
                    id="email"
                    data-testid="newsletter_email_input"
                    className={cn(s.newsletterInput, 'mmds-component-one')}
                    placeholder="Enter your email address"
                />
                <button type="button" className={s.buttonIcon}>
                    <Right />
                </button>
            </div>
        </div>
    );
};

export default NewsletterSubscriptionForm;

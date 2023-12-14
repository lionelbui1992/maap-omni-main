import s from './callouts.module.css';
import { Button, Icon } from 'mmds';

export default () => {
    return (
        <div className={s.root}>
            <div className={s.callout}>
                <div>
                    <Icon icon="free-shipping" />
                </div>
                <div className={s.calloutContent}>
                    <h3 className="mmds-copy-three">Free Shipping</h3>
                    <p className="mmds-copy-three">On orders over $250 AUD*</p>
                    <div className={s.calloutButton}>
                        <Button label="Learn More" variant="text" />
                    </div>
                </div>
            </div>
            <div className={s.callout}>
                <div>
                    <Icon icon="free-returns" />
                </div>
                <div className={s.calloutContent}>
                    <h3 className="mmds-copy-three">Free Returns</h3>
                    <p className="mmds-copy-three">
                        On full priced items only.*
                    </p>
                    <div className={s.calloutButton}>
                        <Button label="Learn More" variant="text" />
                    </div>
                </div>
            </div>
            <div className={s.callout}>
                <div>
                    <Icon icon="crash-replacement" />
                </div>
                <div className={s.calloutContent}>
                    <h3 className="mmds-copy-three">Crash Replacement</h3>
                    <p className="mmds-copy-three">40% of your new kit.*</p>
                    <div className={s.calloutButton}>
                        <Button label="Learn More" variant="text" />
                    </div>
                </div>
            </div>
            <div className={s.callout}>
                <div>
                    <Icon icon="blue-sign" />
                </div>
                <div className={s.calloutContent}>
                    <h3 className="mmds-copy-three">What is Bluesign?</h3>
                    <p className="mmds-copy-three">
                        We're on a path of sustainability, protecting the places
                        we ride.
                    </p>
                    <div className={s.calloutButton}>
                        <Button label="Learn More" variant="text" />
                    </div>
                </div>
            </div>
        </div>
    );
};

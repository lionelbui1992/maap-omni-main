import React from 'react';
import styles from './styles';

const NoCollection = () => (
    <section className="no_collection">
        <div className="no_collection__inner">
            <h1>Page Not Found</h1>
            <div className="no_collection__text">
                We're sorry, but the page you're looking for could not be found.
                <br /> <br />
            </div>
            <div className="no_collection__action">
                Click here to return to{' '}
                <a className="no_collection__link" href="/Index">
                    {' '}
                    Home Page
                </a>
            </div>
        </div>
        <style jsx>{styles}</style>
    </section>
);

export default NoCollection;

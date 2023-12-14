import React from 'react';
import styles from './styles';

const networkStatus = () => (
    <div className="network_status">
        <div className="network_status__inner">
            <h1>Oops!</h1>
            <div className="network_status__text">
                Unable to connect to the network!
            </div>
            <div className="network_status__text">
                Please check the network and try again later...
            </div>
            <div className="network_status__action">
                Click here to return to
                <a className="network_status__link" href="/Index">
                    Home Page
                </a>
            </div>
        </div>
        <style jsx>{styles}</style>
    </div>
);

export default networkStatus;

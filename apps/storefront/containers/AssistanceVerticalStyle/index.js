import Info from '@images/small_icon/Info.svg';
import { useLoop } from '@lib/providers/LoopProvider';
import {
    brandActiveGrey,
    brandBlack,
    brandSelectedGrey,
} from 'config/styles/colours';
import SSRLink from 'helpers/SSRLink';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import css from 'styled-jsx/css';

const AssistanceVerticalStyle = ({ assistanceNav }) => {
    const { creditShoppingActive } = useLoop();
    const { className, styles } = css.resolve`
        a {
            text-decoration: none;
            color: black;
            padding: 4px 6px;
            margin-right: 20px;
        }
        a:hover {
            background-color: ${brandSelectedGrey};
        }
    `;

    const email = pathOr(
        '',
        ['data', 'body', 0, 'primary', 'email'],
        assistanceNav
    );

    const emailLink = pathOr(
        'https://maap.cc',
        ['data', 'body', 0, 'primary', 'email_link'],
        assistanceNav
    );

    const phone = pathOr(
        '',
        ['data', 'body', 0, 'primary', 'phone'],
        assistanceNav
    );
    const items = pathOr([], ['data', 'body', 0, 'items'], assistanceNav);
    const numberOfRow = Math.ceil(items.length / 2);
    return (
        <>
            <div className="assistance__container">
                <div className="assistance__menu">Support</div>
                <div className="assistance__content">
                    <div className="assistance__top_content">Maap Support</div>
                    <div className="assistance__content_wrapper">
                        <div className="assistance__column">
                            <div className="assistance__column_item">
                                <img
                                    className="assistance__column_info_icon"
                                    src={Info.src}
                                    alt="info"
                                />
                                <a
                                    className={className}
                                    href={emailLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={email}
                                >
                                    {email}
                                </a>
                            </div>
                            <div className="assistance__column_item">
                                <img
                                    className="assistance__column_info_icon"
                                    src={Info.src}
                                    alt="info"
                                />
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={className}
                                    href={`tel:${phone}`}
                                >{`Phone ${phone}`}</a>
                            </div>
                            <hr className="assistance__line_break" />
                        </div>
                        <div className="assistance__column-double">
                            {items.map((item) => {
                                return item.child_nav_link.includes(
                                    'https://'
                                ) ? (
                                    <a
                                        className="assistanceVertical__link_item"
                                        href={item.child_nav_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={item.child_nav_title}
                                        key={item.child_nav_title}
                                    >
                                        {item.child_nav_title}
                                    </a>
                                ) : (
                                    <SSRLink
                                        key={item.child_nav_title}
                                        linkUrl={item.child_nav_link}
                                        title={item.child_nav_title}
                                        className={className}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {styles}
            <style jsx>
                {`
                    .assistance__menu {
                        padding: 25px 0;
                        padding-left: 10px;
                    }
                    .assistance__menu:hover {
                        text-decoration: underline;
                        text-underline-position: under;
                        cursor: pointer;
                    }
                    .assistance__content {
                        // display: none;
                        position: absolute;
                        z-index: 9999999;
                        // padding: 30px 49px;
                        // background-color: ${brandActiveGrey};
                        background-color: #fff;
                        right: 0;
                        min-width: 380px;
                        height: 100vh;
                        top: ${creditShoppingActive ? `144px` : `65px`};
                        transform: translate(200%, 0);
                        animation-delay: 0s;
                        animation-play-state: running;
                        animation-iteration-count: 1;
                        animation-duration: 800ms;
                        animation-name: drawerhide;
                        opacity: 1;
                    }

                    @keyframes drawerhide {
                        from {
                            transform: translate(0%, 0);
                        }
                        to {
                            transform: translate(200%, 0);
                        }
                    }

                    .assistance__content_wrapper {
                        padding: 10px 10px 30px 10px;
                    }
                    .assistance__column {
                        // flex: 1.3;
                        display: flex;
                        flex-direction: column;
                    }
                    .assistance__column_item {
                        padding: 4px 6px;
                        margin-right: 20px;
                        display: flex;
                    }
                    .assistance__column_item:hover {
                        background-color: ${brandSelectedGrey};
                    }
                    .assistance__column_item > a {
                        text-decoration: none;
                        color: ${brandBlack};
                    }
                    .assistance__column-double {
                        flex: 1;
                        display: flex;
                        grid-auto-flow: column;
                        // grid-template-rows: repeat(${numberOfRow}, auto);
                        flex-direction: column;
                    }
                    .assistance__container:hover .assistance__content {
                        display: flex;
                        flex-direction: column;
                        transform: translate(0%, 0);
                        animation-delay: 0s;
                        animation-play-state: running;
                        animation-iteration-count: 1;
                        animation-duration: 800ms;
                        animation-name: drawershow;
                        opacity: 1;
                    }

                    @keyframes drawershow {
                        from {
                            transform: translate(200%, 0);
                            opacity: 0;
                        }
                        to {
                            transform: translate(0%, 0);
                            opacity: 1;
                        }
                    }

                    .assistance__column_info_icon {
                        margin-right: 8px;
                    }

                    .assistance__top_content {
                        background-color: #d9d9d9;
                        padding: 12px;
                    }

                    .assistance__line_break {
                        width: 90%;

                        background-color: #d9d9d9;
                        height: 1px;
                        border: none;
                    }

                    .assistanceVertical__link_item {
                        color: inherit;
                        text-decoration: none;
                        padding: 8px;
                    }

                    .assistanceVertical__link_item:hover {
                        text-decoration: underline;
                    }
                `}
            </style>
        </>
    );
};

AssistanceVerticalStyle.propTypes = {
    assistanceNav: PropTypes.object,
};

export default AssistanceVerticalStyle;

import React from 'react';
import PropTypes from 'prop-types';
import { brandBlack, brandSelectedGrey } from 'config/styles/colours';
import { breakpointSmall } from 'config/styles/breakpoints';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
import Link from 'next/link';

const InformationPageBreadcrumb = ({ blockTitle }) => {
    const level1 = 'Home';
    const level2 = blockTitle;
    const slash = <span>&nbsp;/&nbsp;</span>;

    const level2_url = level2.toLowerCase().split(' ').join('-');

    return (
        <>
            <div className="information_page_breadcrumb">
                <Link
                    as={getCountrySpecificUrl(`/`)}
                    href={getCountrySpecificUrl(`/`)}
                    legacyBehavior
                >
                    <a>{level1}</a>
                </Link>
                {!level2 ? '' : slash}
                <Link
                    as={getCountrySpecificUrl(`/${level2_url}`)}
                    href={getCountrySpecificUrl(`/${level2_url}`)}
                    legacyBehavior
                >
                    <a>{level2}</a>
                </Link>
            </div>
            <style jsx>
                {`
                    .information_page_breadcrumb {
                        background-color: ${brandSelectedGrey};
                        padding: 10px 54px;
                        font-weight: 300;
                        font-size: 1em;
                    }
                    a {
                        color: ${brandBlack};
                        text-decoration: none;
                    }
                    @media (max-width: ${breakpointSmall}) {
                        .information_page_breadcrumb {
                            padding: 10px 40px;
                        }
                    }
                `}
            </style>
        </>
    );
};

InformationPageBreadcrumb.propTypes = {
    blockTitle: PropTypes.string.isRequired,
};

export default InformationPageBreadcrumb;

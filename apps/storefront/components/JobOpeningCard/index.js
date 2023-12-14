import Link from 'next/link';
import Share from '@images/small_icon/Share.svg';
import {
    breakpointMedium,
    breakpointSmall,
    breakpointExtraSmall,
    breakpointLarge,
} from 'config/styles/breakpoints';
import { getCountrySpecificUrl } from 'helpers/linkHelper';
const JobOpeningCard = ({ jobDetails }) => {
    const { heading, job_details_location } = jobDetails.data;
    return (
        <Link
            href={getCountrySpecificUrl(`/pages/careers/${jobDetails.uid}`)}
            legacyBehavior
        >
            <div className="jobCard__container">
                <div className="jobCard__titleRow">
                    {' '}
                    <h3 className="jobCard__title">{heading}</h3>
                    {/* <div>
                    <a
                        className="shareLink"
                        href={jobDetails.data.share_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={Share.src}
                            alt="share"
                            className="shareIcon"
                        />
                        <span>SHARE</span>
                    </a>
                </div> */}
                </div>

                <p className="jobCard__location">{job_details_location}</p>
                <p>{jobDetails.data.body[1].primary.short_description}</p>

                <a className="jobCard__findOutMore">Find out more</a>

                <style jsx>
                    {`
                        .jobCard__container {
                            background-color: #f1f1f1;
                            border-left: 3px solid #000;
                            // margin-right: 35px;
                            padding: 25px 25px 25px 25px;
                            margin-bottom: 20px;
                            cursor: pointer;
                        }

                        .jobCard__titleRow {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }

                        .jobCard__title {
                            font-size: 18px;
                            color: #272727;
                            font-weight: 500;
                            text-decoration: underline;
                            text-underline-offset: 3px;
                            text-decoration-color: #7f7f7f;
                            text-decoration-thickness: 2px;
                            margin-top: 0px;
                            margin-bottom: 0px;
                            text-transform: capitalize;
                        }

                        .jobCard__location {
                            font-size: 18px;
                            text-transform: capitalize;
                        }

                        .jobCard__findOutMore {
                            font-size: 16px;
                            text-decoration: none;
                            color: #272727;
                        }

                        .jobCard__findOutMore:after {
                            content: '>>';
                            padding-left: 5px;
                        }

                        .shareLink {
                            display: flex;
                            align-items: center;
                            text-decoration: none;
                            color: #000000;
                        }

                        .shareIcon {
                            padding-right: 20px;
                        }

                        .jobCard__container:hover {
                            border-left: 3px solid rgb(190, 255, 0);
                        }

                        @media (max-width: ${breakpointSmall}) {
                            .jobCard__container {
                                width: auto;
                                margin-bottom: 30px;
                                margin-right: 0px;
                                max-width: 100%;
                            }
                        }

                        @media (min-width: ${breakpointMedium}) {
                            .jobCard__container {
                                margin-right: 35px;
                            }
                        }
                    `}
                </style>
            </div>
        </Link>
    );
};

export default JobOpeningCard;

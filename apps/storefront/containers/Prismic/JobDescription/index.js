import React from 'react';
import PropTypes from 'prop-types';
import { breakpointMedium } from 'config/styles/breakpoints';
import { RichText } from 'prismic-reactjs';
import Share from '@images/small_icon/Share.svg';
import OpenInNew from '@images/small_icon/icon-openinnew.svg';

const JobDescription = ({ block }) => {
    if (!block) return null;
    const {
        heading,
        description,
        job_description,
        job_details_title,
        job_details_location,
        job_details_department,
        how_to_apply,
        seek_button_text,
        seek_link,
        linkedin_button_text,
        linkedin_link,
        greenhouse_button_text,
        greenhouse_link,
        share_description,
        share_link,
    } = block;

    return (
        <>
            <div className="careers_jobDescription">
                <div className="careers_columnLeft">
                    <div className="heading">{heading}</div>
                    <div className="description">{description}</div>
                    <div className="jobDescription">
                        {RichText.render(job_description)}
                    </div>
                </div>
                <div className="careers_columnRight">
                    <div className="title">Job Details</div>
                    <div className="jobInfo_container">
                        <div className="jobInfo">
                            <span>Title:</span>
                            <span>Location:</span>
                            <span>Department:</span>
                        </div>
                        <div className="jobInfo">
                            <span>{job_details_title}</span>
                            <span>{job_details_location}</span>
                            <span>{job_details_department}</span>
                        </div>
                    </div>
                    <div>
                        <div className="howToApply">
                            {RichText.render(how_to_apply)}
                        </div>
                        <div className="applyButtonContainer">
                            <a
                                className="link"
                                href={seek_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="applyButton">
                                    {seek_button_text}
                                    <img
                                        src={OpenInNew.src}
                                        alt="OpenInNew"
                                        className="openInNewIcon"
                                    />
                                </div>
                            </a>
                            <a
                                className="link"
                                href={linkedin_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="applyButton">
                                    {linkedin_button_text}
                                    <img
                                        src={OpenInNew.src}
                                        alt="OpenInNew"
                                        className="openInNewIcon"
                                    />
                                </div>
                            </a>
                            <a
                                className="link"
                                href={greenhouse_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="applyButton">
                                    {greenhouse_button_text}
                                    <img
                                        src={OpenInNew.src}
                                        alt="OpenInNew"
                                        className="openInNewIcon"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="shareJob">
                            <div>{share_description}</div>
                            <div>
                                <a
                                    className="shareLink"
                                    href={share_link}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>
                {`
                    .jobDescription h1 {
                        margin: 0;
                        color: #000000;
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-size: 16px;
                        letter-spacing: 0;
                        text-transform: uppercase;
                        font-weight: 600;
                        padding-top: 40px;
                        padding-bottom: 20px;
                    }
                    .jobDescription p {
                        color: #000000;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 13px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 20px;
                    }
                    .jobDescription ul li {
                        color: #000000;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 13px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 20px;
                        padding-bottom: 10px;
                    }
                    .jobDescription ul {
                        margin: 0;
                        padding: 0 0 0 15px;
                    }
                    .howToApply h1 {
                        color: #000000;
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-size: 16px;
                        letter-spacing: 0;
                        line-height: 16px;
                        margin: 0;
                        padding: 40px 0 30px 0;
                    }
                    .howToApply p {
                        color: #000000;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 13px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 20px;
                        margin: 0;
                        padding-bottom: 20px;
                    }
                    .howToApply ol li {
                        color: #000000;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 13px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 20px;
                        padding: 0 0 15px 0;
                    }
                    .howToApply ol {
                        margin: 0;
                        padding: 0 0 0 15px;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .careers_jobDescription {
                        display: flex;
                    }
                    .careers_columnLeft {
                        padding: 60px 115px 80px 48px;
                        flex: 5;
                    }
                    .heading {
                        color: #000000;
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-size: 42px;
                        font-weight: 600;
                        letter-spacing: 0;
                        line-height: 42px;
                        padding-bottom: 20px;
                    }
                    .description {
                        color: #000000;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 20px;
                        font-weight: 300;
                        letter-spacing: 0;
                        line-height: 28px;
                    }
                    .careers_columnRight {
                        background-color: #e2e3e3;
                        padding: 60px 32px 60px 48px;
                        flex: 2;
                    }
                    .title {
                        color: #000000;
                        font-family: MonumentExtended-Regular, sans-serif;
                        font-size: 16px;
                        letter-spacing: 0;
                        line-height: 16px;
                        font-weight: 600;
                        text-transform: uppercase;
                        padding-bottom: 30px;
                    }
                    .jobInfo_container {
                        width: 50%;
                        display: flex;
                        justify-content: space-between;
                    }
                    .jobInfo {
                        display: flex;
                        flex-direction: column;
                    }
                    .applyButtonContainer {
                        padding: 15px 0 10px 0;
                    }
                    .applyButton {
                        border-radius: 30px;
                        background-color: #000000;
                        color: #ffffff;
                        font-family: Acumin-pro, sans-serif;
                        font-size: 15px;
                        letter-spacing: 0;
                        line-height: 18px;
                        text-align: center;
                        padding: 18px 0;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .link {
                        text-decoration: none;
                        color: #ffffff;
                    }
                    .openInNewIcon {
                        height: 15px;
                        width: 15px;
                        padding-left: 5px;
                    }
                    .shareIcon {
                        height: 16px;
                        width: 16px;
                        padding-right: 5px;
                    }
                    .shareJob {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .shareLink {
                        display: flex;
                        align-items: center;
                        text-decoration: none;
                        color: #000000;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .heading {
                            font-size: 30px;
                            letter-spacing: 0;
                            line-height: 30px;
                        }
                        .careers_jobDescription {
                            flex-direction: column;
                        }
                        .careers_columnLeft {
                            padding: 40px 16px 60px 16px;
                        }
                        .careers_columnRight {
                            padding: 30px 16px;
                        }
                        .jobInfo_container {
                            width: 65%;
                        }
                    }
                `}
            </style>
        </>
    );
};

JobDescription.propTypes = {
    block: PropTypes.object,
};

export default JobDescription;

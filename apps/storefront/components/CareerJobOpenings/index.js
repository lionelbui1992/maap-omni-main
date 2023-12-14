import React, { useState } from 'react';
import JobOpeningCard from '@components/JobOpeningCard';
import {
    breakpointMedium,
    breakpointSmall,
    breakpointExtraSmall,
    breakpointLarge,
} from 'config/styles/breakpoints';

const CareerJobOpenings = ({ jobDetailArticles }) => {
    const [allJobsDetails, setAllJobsDetails] = useState(jobDetailArticles);
    const [selectedLocation, setSelectedLocation] = useState('all');

    allJobsDetails
        .filter(job => job.data.job_details_department == null)
        .forEach(
            job => (job.data.job_details_department = 'Department Unspecified')
        );

    allJobsDetails
        .filter(job => job.data.job_details_location == null)
        .forEach(
            job => (job.data.job_details_location = 'Location Unspecified')
        );

    let tempLocations = jobDetailArticles.map(jobDetail =>
        jobDetail.data.job_details_location.toLowerCase()
    );

    let locationsList = [...new Set(tempLocations)].sort(function(a, b) {
        return a.localeCompare(b);
    });

    let tempDepartments = allJobsDetails.map(jobDetail =>
        jobDetail.data.job_details_department.toLowerCase()
    );
    let departmentsList = [...new Set(tempDepartments)].sort(function(a, b) {
        return a.localeCompare(b);
    });

    const allLocationsClickHandler = () => {
        setAllJobsDetails(jobDetailArticles);
        setSelectedLocation('all');
    };

    const locationClickHandler = location => {
        setSelectedLocation(location);
        setAllJobsDetails(
            jobDetailArticles.filter(
                jobDetailArticle =>
                    jobDetailArticle.data.job_details_location.toLowerCase() ===
                    location.toLowerCase()
            )
        );
    };

    return (
        <>
            <div id="jobOpeningsAnchor"></div>
            <div className="careers__jobOpeningsContainer">
                <h3 className="careers__subHeading">Job Openings</h3>
                <div className="careers__locationsFilter">
                    <p
                        className={`${selectedLocation == 'all' &&
                            'careers__locationFilterActivebtn'}`}
                        onClick={() => allLocationsClickHandler()}
                    >
                        All
                    </p>{' '}
                    {locationsList.map(location => {
                        return (
                            <p
                                className={`${selectedLocation == location &&
                                    'careers__locationFilterActivebtn'}`}
                                onClick={() => locationClickHandler(location)}
                            >
                                {location}
                            </p>
                        );
                    })}
                </div>

                {departmentsList.map(department => {
                    return (
                        <div>
                            <p className="careers__department">{department}</p>
                            <div className="jobCard__row">
                                {allJobsDetails
                                    .filter(
                                        jobDetailArticle =>
                                            jobDetailArticle.data.job_details_department.toLowerCase() ==
                                            department
                                    )
                                    .sort(function(a, b) {
                                        return a.data.job_details_location.localeCompare(
                                            b.data.job_details_location
                                        );
                                    })
                                    .map(jobDetailArticle => (
                                        <JobOpeningCard
                                            jobDetails={jobDetailArticle}
                                        />
                                    ))}
                            </div>
                        </div>
                    );
                })}

                <style jsx>
                    {`
                        .jobCard__row {
                            display: grid;
                            grid-template-columns: 1fr;
                        }
                        .careers__jobOpeningsContainer {
                            padding: 30px 16px;
                        }
                        .careers__subHeading {
                            text-transform: uppercase;
                            font-weight: 600;
                            font-family: MonumentExtended-Regular, sans-serif;
                            margin-bottom: 0px;
                        }

                        .careers__department {
                            font-size: 20px;
                            text-transform: capitalize;
                        }

                        .careers__locationsFilter {
                            display: flex;
                            margin-bottom: 40px;
                        }
                        .careers__locationsFilter p {
                            padding-right: 30px;
                            font-size: 18px;
                            cursor: pointer;
                            margin-bottom: 0px;
                            text-transform: capitalize;
                        }

                        .careers__locationsFilter p:after {
                            content: '>';
                            padding-left: 5px;
                        }

                        .careers__locationFilterActivebtn {
                            text-decoration: underline;
                            text-underline-offset: 3px;
                            text-decoration-color: #7f7f7f;
                            text-decoration-thickness: 2px;
                        }
                        .careers__locationFilterActivebtn:after {
                            content: '' !important;
                        }

                        @media (max-width: ${breakpointMedium}) {
                            .careers__locationsFilter {
                                flex-wrap: wrap;
                            }
                            .careers__locationsFilter p {
                                padding-right: 20px;
                            }
                        }

                        @media (min-width: ${breakpointMedium}) {
                            .jobCard__row {
                                grid-template-columns: 1fr 1fr;
                            }
                        }

                        @media (min-width: 1260px) {
                            .careers__jobOpeningsContainer {
                                padding: 48px 0px 48px 48px;
                            }
                        }

                        @media (min-width: ${breakpointLarge}) {
                            .jobCard__row {
                                grid-template-columns: 1fr 1fr 1fr;
                            }
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default CareerJobOpenings;

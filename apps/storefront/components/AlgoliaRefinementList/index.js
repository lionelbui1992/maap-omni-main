import React from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import CrossIcon from '@images/small_icon/Close-icon-black.svg';
import { connectRefinementList, Highlight } from 'react-instantsearch-dom';
import { brandBlack, brandSelectedGrey } from 'config/styles/colours';

const sizeOrder = [
    'Extra Extra Extra Small',
    'Extra Extra Extra Small/Extra Extra Small',
    'Extra Extra Small',
    'Extra Extra Small/Extra Small',
    'Extra Small',
    'Extra Small/Small',
    'Small',
    'Small/Medium',
    'Medium',
    'Medium/Large',
    'Large',
    'Large/Extra Large',
    'Extra Large',
    'Extra Large/Extra Extra Large',
    'Extra Extra Large',
    'Extra Extra Large/Extra Extra Extra Large',
    'Extra Extra Extra Large',
    'XXXS',
    'XXXS/XXS',
    'XXS',
    'XXS/XS',
    'XS',
    'XS/S',
    'S',
    'S/M',
    'M',
    'M/L',
    'L',
    'L/XL',
    'XL',
    'XL/XXL',
    'XXL/XXXL',
    'XXXL',
    'ONE',
    'ONE SIZE',
    'STANDARD',
    'N/A',
    'NONE',
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '13.5',
    '14',
    '36',
    '36.5',
    '37',
    '37.5',
    '38',
    '38.5',
    '39',
    '39.5',
    '40',
    '40.5',
    '41',
    '41.5',
    '42',
    '42.5',
    '43',
    '43.5',
    '44',
    '44.5',
    '45',
    '45.5',
    '46',
    '46.5',
    '47',
    '47.5',
    '48',
];

// Color Order: Alphabetical order
const colorsOrder = [
    'Amber',
    'Black',
    'Black/Black',
    'Black/Military',
    'Black/White',
    'Black/Spearmint',
    'Black Smoke',
    'Black/White',
    'Blue',
    'Blue Stone',
    'Bluestone',
    'Brick',
    'Bright Green',
    'Beech',
    'Burgundy',
    'Cappuccino',
    'Cement',
    'Charcoal',
    'Chilli',
    'Citron',
    'Cyan',
    'Cobalt',
    'Dark Burgundy',
    'Dark Sage',
    'Desert',
    'Dusk',
    'Ecru',
    'Fern',
    'Fog',
    'Flame',
    'Grape',
    'Gravel',
    'Green',
    'Grey',
    'Grey/White',
    'Guava',
    'Haze',
    'Ivy',
    'Lava',
    'Light Coral',
    'Light Haze',
    'Light Olive',
    'Maroon',
    'Military',
    'Musk',
    'Metal',
    'Natural',
    'Navy',
    'Navy/Citron',
    'Navy/Navy',
    'Navy/White',
    'Olive',
    'Olive Drab',
    'Ocean',
    'Purple Ash',
    'Pale Pink',
    'Red',
    'Royal',
    'Sage',
    'Sand',
    'Sapphire',
    'Shock Pink',
    'Sky',
    'Slate',
    'Slate Blue',
    'Shock Pink',
    'Solar',
    'Space Blue',
    'Spearmint',
    'Steel',
    'Sulphur',
    'Wasabi',
    'White',
    'White/Black',
    'Willow',
    'Yellow',
];

const fitOrder = ['team', 'pro', 'race', 'standard'];

const weatherOrder = ['cold', 'rain', 'wind', 'hot'];

// Alphabetical order: Riding Discipline
// New Option which needs to included in filtering panel(Desktop and Mobile).
const ridingDiscipline = [
    'Adventure',
    'Bike-packing',
    'Casual',
    'Commuting',
    'Cyclocross',
    'Gravel',
    'Indoor trainer',
    'Mountain',
    'Road',
    'Tourist',
    'Track',
];

const getSortingArray = (attribute) => {
    switch (attribute) {
        case 'named_tags.fit':
            return fitOrder;
        case 'named_tags.dicipline':
            return ridingDiscipline;
        case 'options.color':
            return colorsOrder;
        case 'named_tags.weather':
            return weatherOrder;
        default:
        case 'options.size':
            return sizeOrder;
    }
};

const mapFilterOrder = (filters, order, key) => {
    filters.sort(function (a, b) {
        const filterNameOne = a[key];
        const filterNameTwo = b[key];

        if (order.indexOf(filterNameOne) > order.indexOf(filterNameTwo)) {
            return 1;
        }
        return -1;
    });

    return filters;
};

// eslint-disable-next-line react/prop-types
const RefinementList = ({
    attribute,
    items,
    isFromSearch,
    refine,
    searchForItems,
    createURL,
    limit = 20,
}) => {
    const sortingArray = getSortingArray(attribute);

    let filters = items;

    if (sortingArray) {
        filters = mapFilterOrder(items, sortingArray, 'label');
    }

    return (
        <ul>
            {filters.map((item) => {
                const label = item.label.split('-').join(' ');
                return (
                    <li
                        key={item.label}
                        className={`${item.isRefined ? 'selected' : ''}`}
                    >
                        <a
                            href={createURL(item.value)}
                            onClick={(event) => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {isFromSearch ? (
                                <Highlight attribute="label" hit={item} />
                            ) : (
                                label
                            )}
                            {item.isRefined && (
                                <div className="right">
                                    <div className="count">({item.count})</div>
                                    <div className="icon">
                                        <img
                                            src={CrossIcon.src}
                                            alt="Cross Icon"
                                        />
                                    </div>
                                </div>
                            )}
                        </a>
                    </li>
                );
            })}
            <style jsx>
                {`
                    ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        text-transform: capitalize;
                        line-height: 1.5em;
                    }
                    li {
                        line-height: 23px;
                        padding: 1px 7px;
                    }
                    a {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: ${brandBlack};
                        text-decoration: none;
                        text-align: left;
                    }
                    li:hover {
                        background-color: ${brandSelectedGrey};
                    }
                    .right {
                        display: flex;
                        justify-content: space-between;
                    }
                    .icon {
                        display: flex;
                        align-items: center;
                    }
                    img {
                        width: 10px;
                    }
                    .selected {
                        background-color: ${brandSelectedGrey};
                    }
                    @media only screen and (min-width: ${breakpointMedium}) {
                        .count {
                            display: none;
                        }
                        .right {
                            justify-content: flex-end;
                        }
                    }

                    @media only screen and (max-width: ${breakpointMedium}) {
                        img {
                            width: 20px;
                        }
                        li {
                            padding: 10px 20px 10px 10px;
                        }
                        .count {
                            font-size: 0.7em;
                        }
                        .right {
                            width: 60px;
                        }
                    }
                `}
            </style>
        </ul>
    );
};

const AlgoliaRefinementList = connectRefinementList(RefinementList);

export default AlgoliaRefinementList;

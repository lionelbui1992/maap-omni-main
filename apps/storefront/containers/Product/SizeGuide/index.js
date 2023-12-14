import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { breakpointMedium } from 'config/styles/breakpoints';
import { RichText } from 'prismic-reactjs';
import CloseIcon from '@images/small_icon/Close-gray-icon.svg';
import Modal from 'components/Modal';
import SizeGuideAccordion from 'components/SizeGuideAccordion';
import {
    globalStyles,
    desktopContentStyles,
    mobileContentStyles,
} from './styles';
import { getSizeGuide } from '@lib/google/size-guide';

const SizeGuide = ({ product, sizeGuideData, active, onClose }) => {
    const { getDocument } = useProductPrismicDocuments();
    const [metric, setMetric] = useState('Centimetres');
    const breadcrumbs = product?.metafields.filter((v)=>{
        if(!v){
            return false;
        }
        return v && v.namespace.startsWith("breadcrumb_") && v.key === "title"
    }).map((v)=> v.value)
    const productTitle = product?.title;
    const productType = product?.productType;

    const sizeGuideProduct = useMemo(() => {
        const gender = breadcrumbs[0]
        const unit = metric === "Centimetres" ? "CM" : "IN"
        const sizeGuideProduct = getSizeGuide(sizeGuideData, gender, [productType], unit)
        return sizeGuideProduct
    }, [metric, productType, sizeGuideData]);

    const sizeGuide = getDocument('size-guide');
    if (!sizeGuide) return null;


    const sizeGuideTable = sizeGuide.data?.body2.filter(
        slice => slice?.primary?.units === metric
    );
    const sizeGuideTitle = sizeGuide.data?.size_guide_title;
    const sizeGuideDescription = sizeGuide.data?.size_guide_description;
    const sizeGuideDesktopImage = sizeGuide.data?.size_guide_image;
    const sizeGuideMobileImage = sizeGuide.data?.mobile_size_guide_image;
    const sizeGuideMobileContent =
        sizeGuide.data?.mobile_size_guide_content_block;

    const styleCentimetres = {
        fontWeight: metric === 'Centimetres' ? 'bold' : 'normal',
        textDecoration: metric === 'Centimetres' ? 'underline' : 'unset',
    };

    const styleInches = {
        fontWeight: metric === 'Inches' ? 'bold' : 'normal',
        textDecoration: metric === 'Inches' ? 'underline' : 'unset',
    };

    const desktopContent = (
        <>
            <div className="size_guide__title_measurement">
                <div className="size_guide__title">
                    {RichText.asText(sizeGuideTitle)}
                </div>
                <div className="size_guide__metric">
                    <a
                        className="metric_cm"
                        style={styleCentimetres}
                        onClick={() => setMetric('Centimetres')}
                    >
                        CM
                    </a>
                    <a
                        className="metric_in"
                        style={styleInches}
                        onClick={() => setMetric('Inches')}
                    >
                        IN
                    </a>
                </div>
            </div>
            <div className="size_guide__description">
                {RichText.asText(sizeGuideDescription)}
            </div>
            <style jsx>{desktopContentStyles}</style>
        </>
    );

    const mobileContent = (
        <>
            <div className="size_guide__title">
                {RichText.asText(sizeGuideTitle)}
            </div>
            <div className="size_guide__description">
                {RichText.asText(sizeGuideDescription)}
            </div>
            <div className="size_guide__measurement_content">
                {sizeGuideMobileContent.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="measurement_title">
                                {RichText.render(item.measurement_title)}
                            </div>
                            <div className="measurement_description">
                                {RichText.render(item.measurement_description)}
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>{mobileContentStyles}</style>
        </>
    );

    return (
        <>
            <div className="size_guide">
                <Modal
                    isOpen={active}
                    modalClass="size_guide_modal"
                    overlayClassName="size_guide_modal__overlay"
                >
                    <div className="modalWrapper">
                        <div className="size_guide__container">
                            <div className="size_guide__left_content_block">
                                {!sizeGuideDesktopImage ? null : (
                                    <img
                                        src={sizeGuideDesktopImage.url}
                                        alt={sizeGuideDesktopImage.alt}
                                        className="size_guide__desktop_image"
                                    />
                                )}
                                <div className="size_guide_modal__mobile_container">
                                    {!sizeGuideMobileImage ? null : (
                                        <img
                                            src={sizeGuideMobileImage.url}
                                            alt={sizeGuideMobileImage.alt}
                                            className="size_guide__mobile_image"
                                        />
                                    )}
                                    <div className="size_guide_modal__close_icon_mobile_image">
                                        <img
                                            src={CloseIcon.src}
                                            alt="Close Icon"
                                            onClick={onClose}
                                            className="size_guide_modal__close_icon_image"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="size_guide__right_content_block">
                                <div className="size_guide_modal__close_icon_desktop_image">
                                    <img
                                        src={CloseIcon.src}
                                        alt="Close Icon"
                                        onClick={onClose}
                                        className="size_guide_modal__close_icon_image"
                                    />
                                </div>
                                <div className="growContainer">
                                    <div className="constrainedContent">
                                        <div className="size_guide_right_content_block_wrapper">
                                            <div className="size_guide__desktop_content">
                                                {desktopContent}
                                            </div>
                                            <div className="size_guide__mobile_content">
                                                {mobileContent}
                                            </div>
                                        </div>
                                        <div className="size_guide__accordion_container">
                                            <div className="size_guide__metric">
                                                <a
                                                    className="metric_cm"
                                                    style={styleCentimetres}
                                                    onClick={() =>
                                                        setMetric('Centimetres')
                                                    }
                                                >
                                                    CM
                                                </a>
                                                <a
                                                    className="metric_in"
                                                    style={styleInches}
                                                    onClick={() =>
                                                        setMetric('Inches')
                                                    }
                                                >
                                                    IN
                                                </a>
                                            </div>
                                            <SizeGuideAccordion
                                                productType={productType}
                                                productTitle={productTitle}
                                                breadcrumbs={breadcrumbs}
                                                sizeGuideProduct={sizeGuideProduct}
                                                sizeGuideTable={sizeGuideTable}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <style jsx>
                {`
                    .size_guide_modal__close_icon_desktop_image {
                        display: flex;
                        justify-content: flex-end;
                    }
                    .size_guide_modal__close_icon_image {
                        height: 26px;
                        width: 26px;
                        cursor: pointer;
                    }
                    .size_guide_modal__close_icon_mobile_image {
                        display: none;
                    }
                    .modalWrapper {
                        padding: 100px 60px 0 60px;
                    }
                    .size_guide__container {
                        margin: 0 auto;
                        box-sizing: border-box;
                        z-index: 6;
                        display: flex;
                        background-color: #d8d8d8;
                    }
                    .size_guide__left_content_block {
                        flex: 1;
                        position: relative;
                    }
                    .size_guide__desktop_image {
                        display: block;
                        width: 100%;
                        position: sticky;
                        top: 0;
                        bottom: 0;
                        position: -webkit-sticky;
                    }
                    .size_guide__mobile_image {
                        display: none;
                    }
                    .size_guide__right_content_block {
                        flex: 1;
                        padding: 20px;
                    }
                    .growContainer {
                        flex: 1 0 100%;
                        height: 90%;
                        position: relative;
                    }
                    .constrainedContent {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        overflow: scroll;
                        overflow-x: hidden;
                        -ms-overflow-style: none;
                        padding: 20px;
                        box-sizing: border-box;
                    }
                    .constrainedContent::-webkit-scrollbar {
                        display: none;
                    }
                    .size_guide_right_content_block_wrapper {
                        padding: 20px;
                    }
                    .size_guide__desktop_content {
                        display: flex;
                        flex-direction: column;
                    }
                    .size_guide__mobile_content {
                        display: none;
                    }
                    .size_guide__accordion_container {
                        padding: 20px;
                    }
                    .size_guide__metric {
                        display: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .size_guide__container {
                            padding: 0 0;
                            flex-direction: column;
                            height: unset;
                        }
                        .modalWrapper {
                            padding: 0;
                        }
                        .size_guide__left_content_block {
                            width: 100%;
                            position: unset;
                        }
                        .size_guide__right_content_block {
                            width: auto;
                            padding: 0;
                        }
                        .constrainedContent {
                            position: unset;
                            padding: 0;
                        }
                        .size_guide__mobile_image {
                            display: block;
                            width: 100%;
                        }
                        .size_guide_modal__close_icon_desktop_image {
                            display: none;
                        }
                        .size_guide_modal__mobile_container {
                            position: relative;
                        }
                        .size_guide_modal__close_icon_mobile_image {
                            display: flex;
                            position: absolute;
                            top: 4%;
                            right: 6%;
                        }
                        .size_guide__desktop_image {
                            display: none;
                        }
                        .size_guide_right_content_block_wrapper {
                            background-color: #e7e7e7;
                            padding: 40px 30px;
                            margin: 0 auto;
                        }
                        .size_guide__desktop_content {
                            display: none;
                        }
                        .size_guide__mobile_content {
                            display: flex;
                            flex-direction: column;
                        }
                        .size_guide__accordion_container {
                            padding: 30px 30px;
                            margin: 0 auto;
                        }
                        .size_guide__metric {
                            display: flex;
                            justify-content: flex-end;
                            padding-bottom: 20px;
                        }
                        .metric_cm {
                            padding: 0 10px 0 0;
                        }
                        .metric_in {
                            padding: 0 20px;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {globalStyles}
            </style>
        </>
    );
};

SizeGuide.propTypes = {
    prismicData: PropTypes.object,
};

export default SizeGuide;

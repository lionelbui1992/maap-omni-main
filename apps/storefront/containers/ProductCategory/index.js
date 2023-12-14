import React, { Component, Fragment } from 'react';
import ProductCard from '../ProductCard-';
import Head from '../Head';

class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: 100,
        };
    }

    seeMore = () => {
        const { noOfProductCollection } = this.props;
        this.setState(prev => {
            return { visible: prev.visible + noOfProductCollection };
        });
    };

    render() {
        const products = this.props.products.slice(0, this.state.visible).map((product, key) => {
            return <ProductCard product={product.node} key={key} />;
        });

        const loadMore_markup = (
            <div className="products__button">
                {this.state.visible < this.props.products.length && (
                    <button
                        onClick={this.seeMore}
                        type="button"
                        className="products__button_inner heading_style__regular_no_bold"
                    >
                        See more tops
                    </button>
                )}
            </div>
        );

        return (
            <Fragment>
                <Head url="/" />

                <div className="products">
                    <div className="products__title heading_style__regular_no_bold">
                        {this.props.title}
                    </div>
                    <div className="products__inner">{products}</div>
                    {this.props.loadMore === true ? loadMore_markup : null}
                </div>
            </Fragment>
        );
    }
}

export default ProductCategory;

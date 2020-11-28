"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShopProduct from './ShopProduct';

import './ShopCatalog.css';

class ShopCatalog extends Component {

    static propTypes = {
        shopName: PropTypes.string.isRequired,
        initialProducts: PropTypes.array.isRequired,

        fields: PropTypes.arrayOf( PropTypes.string ).isRequired,
        fieldNames: PropTypes.object,

        canDeleteProducts: PropTypes.bool,
    };

    static defaultProps = {
        shopName: "Anonymous Shop",
        initialProducts: [],

        fields: [],
        fieldNames: {},

        canDeleteProducts: false,
    };

    state = {
        products: [...this.props.initialProducts],
        selectedProductID: null,
    };

    showControlColumn = () =>  {
        return this.props.canDeleteProducts;
    };

    onProductDeleteClickedCallback = ( product, indexToDelete ) => {
        confirm(`Are you sure you want to delete product ` +
                `#${product.id} '${product.itemName}'?`) ?
            this.setState( ( currentState, props ) => ( {
                products:
                    /* Mutates Array, but more faster, than filter */
                    currentState.products.splice( indexToDelete, 1 ) &&
                    currentState.products,
                selectedProductID:
                    product.id !== currentState.selectedProductID ?
                        currentState.selectedProductID :
                        null,
            } ) ) :
            null;
    };

    onProductElementClickedCallback = ( product ) => {
        this.setState( ( currentState, props ) => ( {
            selectedProductID:
                product.id !== currentState.selectedProductID ?
                    product.id :
                    null,
        } ) );
    };

    onTableBlur = ( event ) => {
        event.currentTarget.contains( event.relatedTarget ) ?
            null :
            this.setState( {
                selectedProductID: null,
            } );
    };

    render() {

        const Products = this.state.products.map( ( product, index ) => (
            <ShopProduct
                key={product.id}
                fields={this.props.fields}
                product={product}
                index={index}
                addControlCell={this.showControlColumn()}
                deleteable={this.props.canDeleteProducts}
                state={
                    this.state.selectedProductID === product.id
                    ? 
                        ShopProduct.States.selected
                    :
                        undefined
                }
                onDeleteClickedCallback={
                    this.onProductDeleteClickedCallback
                }
                onElementClickedCallback={
                    this.onProductElementClickedCallback
                }
            />
        ) );

        return (
            <div className="ShopCatalog">
                <div className="Name">{this.props.shopName}</div>
                <div className="Table"
                     tabIndex={-1}
                     onBlur={this.onTableBlur}
                >
                    <div className="Row Header">
                        {
                            this.props.fields.map( field => (
                                <div key={field}
                                     className={
                                         `Cell HeaderCell Column-${field}`
                                     }
                                >
                                    {this.props.fieldNames[ field ]}
                                </div>
                            ) )
                        }
                        {
                            (this.showControlColumn()) &&
                            <div className="Cell HeaderCell Column-Control">
                                Control
                            </div>
                        }
                    </div>
                    {Products}
                </div>
            </div>
        );
    }

};

export default ShopCatalog;

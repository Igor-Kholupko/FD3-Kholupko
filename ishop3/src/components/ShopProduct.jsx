"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ShopProduct.css';

class ShopProduct extends Component {

    static States = {
        default: 0,
        selected: 1,
    };

    static propTypes = {
        fields: PropTypes.arrayOf(PropTypes.string),
        product: PropTypes.object,
        index: PropTypes.number.isRequired,

        addControlCell: PropTypes.bool,
        deleteable: PropTypes.bool,

        state: PropTypes.number,

        onDeleteClickedCallback: PropTypes.func,
        onElementClickedCallback: PropTypes.func,
    };

    static defaultProps = {
        fields: [],
        product: {},
        index: null,

        addControlCell: false,
        deleteable: false,

        state: this.States.default,

        onDeleteClickedCallback: () => undefined,
        onElementClickedCallback: () => undefined,
    };

    onDeleteClicked = (event) => {
        event.stopPropagation();
        this.props.onDeleteClickedCallback(
            this.props.product,
            this.props.index,
        );
    };

    onElementClicked = (event) => {
        this.props.onElementClickedCallback(
            this.props.product,
            this.props.index,
        );
    };

    getDynamicClassName() {
        return this.props.state === ShopProduct.States.selected
            ?
            'selected'
            :
            '';
    };

    render() {

        const DataCells = this.props.fields.map(fieldName => (
            <div key={fieldName} className={`DataCell Data-${fieldName}`}>
                {this.props.product[fieldName]}
            </div>
        ));

        const ControlCell = (
            (this.props.addControlCell) &&
            <div className="DataCell Data-Control">
                {
                    (this.props.deleteable) &&
                    <button className="DeleteButton"
                        onClick={this.onDeleteClicked}
                    >
                        Delete
                    </button>
                }
            </div>
        );

        return (
            <div className={`ShopProduct ${this.getDynamicClassName()}`}
                onClick={this.onElementClicked}
            >
                {DataCells}
                {ControlCell}
            </div>
        );
    };

};

export default ShopProduct;

const ShopCatalog = React.createClass({

    displayName: 'ShopCatalog',

    propTypes: {
        shopName: React.PropTypes.string.isRequired,
        initialProducts: React.PropTypes.array.isRequired,

        fields: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
        fieldNames: React.PropTypes.object,

        canDeleteProducts: React.PropTypes.bool,
    },

    getDefaultProps: function () {
        return {
            shopName: "Anonymous Shop",
            initialProducts: [],

            fields: [],
            fieldNames: {},

            canDeleteProducts: false,
        }
    },

    getInitialState: function () {
        return {
            products: [...this.props.initialProducts],
            selectedProductID: null,
        };
    },

    showControlColumn: function () {
        return this.props.canDeleteProducts;
    },

    onProductDeleteClickedCallback: function ( product, indexToDelete ) {
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
    },

    onProductElementClickedCallback: function ( product ) {
        this.setState( ( currentState, props ) => ( {
            selectedProductID:
                product.id !== currentState.selectedProductID ?
                    product.id :
                    null,
        } ) );
    },

    onTableBlur: function ( event ) {
        event.currentTarget.contains( event.relatedTarget ) ?
            null :
            this.setState( {
                selectedProductID: null,
            } );
    },

    render: function() {
        return React.DOM.div( { className: 'ShopCatalog' },
            React.DOM.div( { className: 'Name' }, this.props.shopName ),
            React.DOM.div( {
                    className: 'Table',
                    onBlur: this.onTableBlur,
                    /* 'onBlur' event not fired without 'tabIndex' */
                    tabIndex: -1,
                },
                React.DOM.div( { className: 'Row Header' },
                    this.props.fields.map( field => React.DOM.div( {
                            key: field,
                            className: `Cell HeaderCell Column-${field}`
                        },
                        this.props.fieldNames[ field ],
                    ) ),
                    this.showControlColumn() ?
                        React.DOM.div( {
                                className: 'Cell HeaderCell Column-Control'
                            },
                            'Control',
                        ) :
                        null,
                ),
                this.state.products.map( ( product, index ) => 
                    React.createElement( ShopProduct, {
                        key: product.id,

                        fields: this.props.fields,
                        product,
                        index,

                        addControlCell: this.showControlColumn(),
                        deleteable: this.props.canDeleteProducts,

                        state:
                            this.state.selectedProductID === product.id ? 
                                ShopProduct.States.selected :
                                undefined,
                        
                        onDeleteClickedCallback:
                            this.onProductDeleteClickedCallback,
                        onElementClickedCallback:
                            this.onProductElementClickedCallback,
                    } )
                ),
            ),
        );
    },

});

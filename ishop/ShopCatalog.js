var tableFields = {
    id: { name: 'ID', reactType: React.PropTypes.isRequired },
    itemName: { name: 'Name', reactType: React.PropTypes.string.isRequired },
    price: { name: 'Price', reactType: React.PropTypes.number },
    photoUrl: { name: 'Photo URL', reactType: React.PropTypes.string },
    storehouseQuantity: { name: 'Quantity', reactType: React.PropTypes.number },
};

var ShopCatalog = React.createClass({

    displayName: 'ShopCatalog',

    getDefaultProps: function () {
        return {
            shopName: "Anonymous Shop",
            products: [],
        }
    },

    propTypes: {
        shopName: React.PropTypes.string.isRequired,
        products: React.PropTypes.arrayOf( React.PropTypes.shape(
            Object.fromEntries( Object.entries( tableFields ).filter( function ( [ , fieldProps ] ) {
                return fieldProps.hasOwnProperty('reactType');
            } ).map( function ( [ fieldName, fieldProps ] ) {
                return [ fieldName, fieldProps.reactType ];
            } ) )
        ) ).isRequired,
    },

    render: function() {
        return React.DOM.div( { className: 'ShopCatalog' },
            React.DOM.div( { className: 'Name' }, this.props.shopName ),
            React.DOM.div( { className: 'Table' },
                React.DOM.div( { className: 'Row Header' }, Object.entries( tableFields ).map( function ( [ fieldName, fieldProps ] ) {
                    return React.DOM.div( { key: fieldName, className: `Cell HeaderCell Column-${fieldName}` }, fieldProps.name );
                } ) ),
                this.props.products.map( function ( product ) {
                    return React.DOM.div( { key: product.id, className: 'Row' }, Object.keys( tableFields ).map( function ( fieldName ) {
                        return React.DOM.div( { key: fieldName, className: `Cell Column-${fieldName}` }, product[fieldName] );
                    } ) );
                } ),
            ),
        );
    },

});

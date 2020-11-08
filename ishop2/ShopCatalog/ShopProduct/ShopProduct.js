ShopProductStates = {
    default: 0,
    selected: 1,
};

const ShopProduct = React.createClass({

    displayName: 'ShopProduct',

    propTypes: {
        fields: React.PropTypes.arrayOf( React.PropTypes.string ),
        product: React.PropTypes.object,
        index: React.PropTypes.number.isRequired,

        addControlCell: React.PropTypes.bool,
        deleteable: React.PropTypes.bool,

        state: React.PropTypes.number,

        onDeleteClickedCallback: React.PropTypes.func,
        onElementClickedCallback: React.PropTypes.func,
    },

    States: ShopProductStates,

    getDefaultProps: function () {
        return {
            fields: [],
            product: {},
            index: null,

            addControlCell: false,
            deleteable: false,

            state: ShopProductStates.default,

            onDeleteClickedCallback: () => undefined,
            onElementClickedCallback: () => undefined,
        };
    },

    onDeleteClicked: function ( event ) {
        event.stopPropagation();
        this.props.onDeleteClickedCallback(
            this.props.product,
            this.props.index,
        );
    },

    onElementClicked: function ( event ) {
        this.props.onElementClickedCallback(
            this.props.product,
            this.props.index,
        );
    },

    getDynamicClassName: function () {
        return this.props.state === this.States.selected ? 'selected' : '';
    },

    render: function() {
        return React.DOM.div( {
                className: `ShopProduct ${this.getDynamicClassName()}`,
                onClick: this.onElementClicked,
            },
            this.props.fields.map( fieldName => React.DOM.div(
                { key: fieldName, className: `DataCell Data-${fieldName}` },
                this.props.product[fieldName],
            ) ),
            this.props.addControlCell ?
                React.DOM.div( { className: 'DataCell Data-Control' },
                    this.props.deleteable ?
                        React.DOM.button( {
                            className: 'DeleteButton',
                            onClick: this.onDeleteClicked,
                        }, 'Delete' ) :
                        null,
                ) :
                null,
        );
    },

});

ShopProduct.States = ShopProductStates;
delete ShopProductStates;

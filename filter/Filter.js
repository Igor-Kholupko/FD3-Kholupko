var Filter = React.createClass({

    displayName: 'Filter',

    propTypes: {
        data: React.PropTypes.arrayOf( React.PropTypes.shape( {
            id: React.PropTypes.number.isRequired,
            value: React.PropTypes.string.isRequired,
        } ) ),
        defaultFilterValue: React.PropTypes.string,
        defaultSortFlag: React.PropTypes.bool,
    },

    getDefaultProps: function () {
        return {
            data: [],
            defaultFilterValue: '',
            defaultSortFlag: false,
        };
    },

    getInitialState: function () {
        return {
            sortedData: this.sortData( this.props.data ),

            filterValue: this.props.defaultFilterValue,
            sortFlag: this.props.defaultSortFlag,
        };
    },

    filterData: function ( data, filterValue ) {
        return data.filter( item => item.value.includes( filterValue ) );
    },

    sortData: function ( data ) {
        return [...data].sort( ( a, b ) => a.value.localeCompare(b.value) );
    },

    getDisplayData: function () {
        return this.filterData( 
            this.state.sortFlag ? this.state.sortedData : this.props.data,
            this.state.filterValue,
        );
    },

    onFilterChanged: function ( event ) {
        this.setState( {
            filterValue: event.target.value,
        } );
    },

    onSortClicked: function ( event ) {
        this.setState( {
            sortFlag: event.target.checked,
        } );
    },

    onResetClicked: function () {
        this.setState( {
            filterValue: this.props.defaultFilterValue,
            sortFlag: this.props.defaultSortFlag,
        } );
    },

    render: function () {
        return React.DOM.div( { className: 'Filter' }, 
            React.DOM.div( { className: 'FilterForm' },
                React.DOM.div( { className: 'FilterFormItem SortFlag' }, 
                    React.DOM.input( {
                        className: 'SortFlagInput',
                        type: 'checkbox',
                        checked: this.state.sortFlag,
                        onClick: this.onSortClicked,
                    } ),
                ),
                React.DOM.div( { className: 'FilterFormItem FilterField' },
                    React.DOM.input( {
                        className: 'FilterFieldInput',
                        type: 'text',
                        value: this.state.filterValue,
                        onChange: this.onFilterChanged,
                    } ),
                ),
                React.DOM.div( { className: 'FilterFormItem Reset' }, 
                    React.DOM.button( {
                        className: 'ResetButton',
                        onClick: this.onResetClicked,
                    }, 'Reset' ),
                ),
            ),
            React.DOM.div( { className: 'FilterData' },
                React.DOM.select( { className: 'DataBlock', multiple: true, disabled: true },
                    this.getDisplayData().map( item => {
                        return React.DOM.option( { className: 'DataItem', key: item.id }, 
                            item.value,
                        );
                    } ),
                ),
            ),
        );
    },

});

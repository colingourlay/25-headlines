var React = require('react/addons');

module.exports = React.createClass({
    render: function () {
        var items = this.props.items;

        return (
            <ul id="headline-list">
                {items}
            </ul>
        );
    }
});
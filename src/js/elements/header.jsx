var React = require('../react');
var utils = require('../utils');
var constants = require('../constants');

module.exports = React.createClass({

    onKeyDown: function (event) {
        if (event.which !== constants.ENTER_KEY) {
            return;
        }

        var val = this.refs.newField.getDOMNode().value.trim();
        var newHeadline;

        if (val) {
            this.props.addHeadline(val);
            this.refs.newField.getDOMNode().value = '';
        }

        return false;
    },

    render: function () {
        var units = utils.pluralize(this.props.count, ' headline');

        return (
            <header id="header">
                <h1>{this.props.count}{units}</h1>
                <input
                    ref="newField"
                    id="new-headline"
                    placeholder="Enter a new headline..."
                    onKeyDown={this.onKeyDown}
                />
            </header>
        );
    }
});
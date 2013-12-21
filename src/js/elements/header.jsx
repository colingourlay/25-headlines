var React = require('react/addons');

var utils = require('../utils');
var constants = require('../constants');

module.exports = React.createClass({

    componentDidMount: function () {
        this.refs.newField.getDOMNode().focus();
    },

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
        var newField = null;

        if (this.props.count < 25) {
            newField = (
                <input
                    ref="newField"
                    id="new-headline"
                    placeholder="Enter a new headline..."
                    onKeyDown={this.onKeyDown}
                />
            );
        }

        return (
            <header id="header">
                <h1>{this.props.count}{units}</h1>
                {newField}
            </header>
        );
    }
});
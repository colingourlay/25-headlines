var React = require('../react');
var utils = require('../utils');

module.exports = React.createClass({
    render: function () {
        var units;
        var toClear;
        var shortlistStatus = null;
        var clearButton = null;

        if (this.props.shortlistedCount > 0) {
            units = utils.pluralize(this.props.shortlistedCount, ' headline');
            shortlistStatus = (
                <span id="shortlist-count">
                    {this.props.shortlistedCount} shortlisted {units}
                </span>
            );
        }

        if (this.props.notShortlistedCount > 0) {
            toClear = this.props.shortlistedCount > 0 ? 'the rest (' + this.props.notShortlistedCount + ')' : 'all';
            clearButton = (
                <button
                    id="clear-shortlisted"
                    onClick={this.props.onClearNotShortlisted}>
                    {''}Clear {toClear}
                </button>
            );
        }

        return (
            <footer id="footer">
                {shortlistStatus}{clearButton}
            </footer>
        );
    }
});
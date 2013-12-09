var React = require('../react');
var utils = require('../utils');

module.exports = React.createClass({
    render: function () {
        var units = utils.pluralize(this.props.count, 'headline');
        var count = (
            <span id="count">
                {this.props.count}{' '}{units}
            </span>
        );

        return (
            <footer id="footer">
                {count}
                <span id="credits">
                    <a href="http://twitter.com/collypops">Colin Gourlay</a> 2013
                </span>
            </footer>
        );
    }
});
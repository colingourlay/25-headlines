var React = require('../react');

module.exports = React.createClass({
    render: function () {
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    id="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    {''}Clear completed ({this.props.completedCount}){''}
                </button>
            );
        }

        return (
            <footer id="footer">
                {clearButton}
            </footer>
        );
    }
});
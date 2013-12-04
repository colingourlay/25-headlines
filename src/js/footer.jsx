// var React = require('react-tools').React;
var React = require('./react');

var Utils = require('./utils');

module.exports = React.createClass({
    render: function () {
        var activeTodoWord = Utils.pluralize(this.props.count, 'item');
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

        var show = {
            ALL_TODOS: '',
            ACTIVE_TODOS: '',
            COMPLETED_TODOS: ''
        };
        show[this.props.nowShowing] = 'selected';

        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{this.props.count}</strong>
                    {' '}{activeTodoWord}{' '}left{''}
                </span>
                <ul id="filters">
                    <li>
                        <a href="#/" className={show[ALL_TODOS]}>All</a>
                    </li>
                    {' '}
                    <li>
                        <a href="#/active" className={show[ACTIVE_TODOS]}>Active</a>
                    </li>
                    {' '}
                    <li>
                        <a href="#/completed" className={show[COMPLETED_TODOS]}>Completed</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
});
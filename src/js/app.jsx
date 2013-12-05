var React = require('./react');
var Router = require('director').Router;

var HeadlineModel = require('./models/headline.js');
var HeadlineElement = require('./elements/headline.jsx');
var HeadlineListElement = require('./elements/headline-list.jsx');
var HeaderElement = require('./elements/header.jsx');
var FooterElement = require('./elements/footer.jsx');
var constants = require('./constants');
var utils = require('./utils');

var App = React.createClass({
    getInitialState: function () {
        var headlines = utils.store('react-headlines');
        return {
            headlines: headlines,
            nowShowing: constants.ALL_HEADLINES,
            editing: null
        };
    },

    componentDidMount: function () {
        var router = new Router({
            '/': this.setState.bind(this, {nowShowing: constants.ALL_HEADLINES}),
            '/active': this.setState.bind(this, {nowShowing: constants.ACTIVE_HEADLINES}),
            '/completed': this.setState.bind(this, {nowShowing: constants.COMPLETED_HEADLINES})
        });
        router.init();
        // this.refs.newField.getDOMNode().focus();
    },

    addHeadline: function (title) {
        var headline = HeadlineModel(title);

        this.setState({headlines: this.state.headlines.concat(headline)});
    },

    toggleAll: function (event) {
        var checked = event.target.checked;

        // Note: it's usually better to use immutable data structures since they're easier to
        // reason about and React works very well with them. That's why we use map() and filter()
        // everywhere instead of mutating the array or headline items themselves.
        var newHeadlines = this.state.headlines.map(function (headline) {
            return utils.extend({}, headline, {completed: checked});
        });

        this.setState({headlines: newHeadlines});
    },

    toggle: function (headlineToToggle) {
        var newHeadlines = this.state.headlines.map(function (headline) {
            return headline !== headlineToToggle ? headline : utils.extend({}, headline, {completed: !headline.completed});
        });

        this.setState({headlines: newHeadlines});
    },

    destroy: function (headline) {
        var newHeadlines = this.state.headlines.filter(function (candidate) {
            return candidate.id !== headline.id;
        });

        this.setState({headlines: newHeadlines});
    },

    edit: function (headline, callback) {
        // refer to headlineItem.js `handleEdit` for the reasoning behind the
        // callback
        this.setState({editing: headline.id}, function () {
            callback();
        });
    },

    save: function (headlineToSave, text) {
        var newHeadlines = this.state.headlines.map(function (headline) {
            return headline !== headlineToSave ? headline : utils.extend({}, headline, {title: text});
        });

        this.setState({headlines: newHeadlines, editing: null});
    },

    cancel: function () {
        this.setState({editing: null});
    },

    clearCompleted: function () {
        var newHeadlines = this.state.headlines.filter(function (headline) {
            return !headline.completed;
        });

        this.setState({headlines: newHeadlines});
    },

    componentDidUpdate: function () {
        utils.store('react-headlines', this.state.headlines);
    },

    render: function () {
        var header = null;
        var main = null;
        var footer = null;

        var activeHeadlineCount = this.state.headlines.reduce(function(accum, headline) {
            return headline.completed ? accum : accum + 1;
        }, 0);

        var completedCount = this.state.headlines.length - activeHeadlineCount;

        var headlineItems = this.state.headlines.map(function (headline) {
            return (
                <HeadlineElement
                    key={headline.id}
                    headline={headline}
                    onToggle={this.toggle.bind(this, headline)}
                    onDestroy={this.destroy.bind(this, headline)}
                    onEdit={this.edit.bind(this, headline)}
                    editing={this.state.editing === headline.id}
                    onSave={this.save.bind(this, headline)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        header = <HeaderElement
                    count={this.state.headlines.length}
                    addHeadline={this.addHeadline}
                />;

        if (this.state.headlines.length) {
            main = (
                <section id="main">
                    <input
                        id="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeHeadlineCount === 0}
                    />
                    <HeadlineListElement items={headlineItems} />
                </section>
            );
        }

        if (activeHeadlineCount || completedCount) {
            footer = (
                <FooterElement
                    completedCount={completedCount}
                    onClearCompleted={this.clearCompleted}
                />
            );
        }

        return (
            <div>
                {header}
                {main}
                {footer}
            </div>
        );
    }
});

React.renderComponent(<App />, document.getElementById('app'));

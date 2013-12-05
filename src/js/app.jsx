var React = require('./react');

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
        this.setState.bind(this, {nowShowing: constants.ALL_HEADLINES});
        // this.refs.newField.getDOMNode().focus();
    },

    addHeadline: function (title) {
        var headline = HeadlineModel(title);

        this.setState({headlines: this.state.headlines.concat(headline)});
    },

    toggle: function (headlineToToggle) {
        var newHeadlines = this.state.headlines.map(function (headline) {
            return headline !== headlineToToggle ? headline : utils.extend({}, headline, {shortlisted: !headline.shortlisted});
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

    clearNotShortlisted: function () {
        var newHeadlines = this.state.headlines.filter(function (headline) {
            return headline.shortlisted;
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

        var shortlistedCount = this.state.headlines.reduce(function(accum, headline) {
            return headline.shortlisted ? accum + 1 : accum;
        }, 0);

        var notShortlistedCount = this.state.headlines.length - shortlistedCount;

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
                    <HeadlineListElement items={headlineItems} />
                </section>
            );
        }

        if (shortlistedCount || notShortlistedCount) {
            footer = (
                <FooterElement
                    shortlistedCount={shortlistedCount}
                    notShortlistedCount={notShortlistedCount}
                    onClearNotShortlisted={this.clearNotShortlisted}
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

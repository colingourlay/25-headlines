var React = require('../react');
var utils = require('../utils');

module.exports = React.createClass({
    render: function () {
        var units = utils.pluralize(this.props.count, 'headline');
        var shareUrl = encodeURIComponent(window.location);
        var shareText = encodeURIComponent('Want a headline worthy of your content? Write 25 and discover your inner genius.');
        var tweetHref = 'https://twitter.com/intent/tweet?url=' + shareUrl + '&hashtags=25headlines&related=collypops&text='+ shareText + '&layout=popup';
        var fbPostHref = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + shareUrl + '&p[title]=25%20Headlines&p[summary]=' + shareText + '&layout=popup';
        var tweet = (
            <a target="_blank" href={tweetHref} >
                <span className="ss-icon ss-social-circle ss-twitter"></span>
            </a>
        );

        var fbPost = (
            <a target="_blank" href={fbPostHref} >
                <span className="ss-icon ss-social-circle ss-facebook"></span>
            </a>
        );

        return (
            <footer id="footer">
                <span id="share">{tweet}{' '}{fbPost}</span>
                <span id="credits">
                    <a href="http://twitter.com/collypops">Colin Gourlay</a> 2013
                </span>
            </footer>
        );
    }
});
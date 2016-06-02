var articleLengthReporter = (function () {
    'use strict';

    var body,
        article,
        reporter;

    var BODY_SELECTOR       = 'body',
        SCROLL_EVENT_NAME   = 'scroll',
        MEASUREMENT_UNIT    = 'px',
        MAX_PERCENT         = 100;

    var handleScroll = function (e) {
        reporter.style.width = getReporterWidth(
            calculateScrolledPercentage(article, body.scrollTop),
            getElementWidth(body)
        );
    };

    var bindEvents = function () {
        window.addEventListener(SCROLL_EVENT_NAME, handleScroll, false);
    };

    var getElementHeight = function (element) {
        return element.offsetHeight;
    };

    var getElementWidth = function (element) {
        return element.offsetWidth;
    };

    var getReporterWidth = function (percentageScrolled, reporterParentWidth) {
        return ((percentageScrolled * reporterParentWidth) / MAX_PERCENT) + MEASUREMENT_UNIT;
    };

    var calculateScrolledPercentage = function (element, amountScrolled) {
        return Math.ceil(
            (amountScrolled * MAX_PERCENT) / getElementHeight(element)
        );
    };

    return {
        init: function () {
            body = document.querySelector(BODY_SELECTOR);

            bindEvents();
        },
        report: function report (settings) {
            article = document.querySelector(settings.scrollableElement);
            reporter = document.querySelector(settings.reporter);
        }
    };
})();

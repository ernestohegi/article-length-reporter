var readingProgress = (function () {
    'use strict';

    var BODY_SELECTOR       = 'body',
        SCROLL_EVENT_NAME   = 'scroll',
        MEASUREMENT_UNIT    = 'px',
        MAX_PERCENT         = 100;

    var body = document.querySelector(BODY_SELECTOR),
        article,
        reporter;

    var handleScroll = function (e) {
        if (reporter === undefined) {
            return false;
        }

        reporter.style.width = getReadingProgress(
            calculateScrolledPercentage(article, body.scrollTop),
            getContainerElementWidth(reporter)
        );
    };

    var bindEvents = function () {
        window.addEventListener(SCROLL_EVENT_NAME, handleScroll);
    };

    var getElementHeight = function (element) {
        return element.offsetHeight + 40;
    };

    var getContainerElementWidth = function (element) {
        return element.parentNode.offsetWidth;
    };

    var getReadingProgress = function (percentageScrolled, reporterParentWidth) {
        return ((percentageScrolled * reporterParentWidth) / MAX_PERCENT) + MEASUREMENT_UNIT;
    };

    var calculateScrolledPercentage = function (element, amountScrolled) {
        var scrolledPercentage = (amountScrolled * MAX_PERCENT) / getElementHeight(element);

        // The script never gets to 100%, this is a small fix.
        // The problem needs further investigation.
        if (scrolledPercentage > 0 && scrolledPercentage < MAX_PERCENT) {
            scrolledPercentage += 1;
        }

        return Math.ceil(
            scrolledPercentage
        );
    };

    return {
        init: function () {
            bindEvents();
        },
        report: function report (settings) {
            article = document.querySelector(settings.article);
            reporter = document.querySelector(settings.reporter);
        }
    };
})();

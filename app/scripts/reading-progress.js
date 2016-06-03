var readingProgress = (function () {
    'use strict';

    var BODY_SELECTOR       = 'body',
        SCROLL_EVENT_NAME   = 'scroll',
        MEASUREMENT_UNIT    = 'px',
        MAX_PERCENT         = 100;

    var body = document.querySelector(BODY_SELECTOR),
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
        return element.offsetHeight;
    };

    var getContainerElementWidth = function (element) {
        return element.parentNode.offsetWidth;
    };

    var getReadingProgress = function (percentageScrolled, reporterParentWidth) {
        return ((percentageScrolled * reporterParentWidth) / MAX_PERCENT) + MEASUREMENT_UNIT;
    };

    var calculateScrolledPercentage = function (element, amountScrolled) {
        var scrolledPercentage = (amountScrolled * MAX_PERCENT) / getElementHeight(element);

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
            reporter = document.querySelector(settings.reporter);
        }
    };
})();

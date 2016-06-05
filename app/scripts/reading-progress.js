var readingProgress = (function () {
    'use strict';

    var SCROLL_EVENT_NAME   = 'scroll',
        MEASUREMENT_UNIT    = 'px',
        MAX_PERCENT         = 100;

    var getScrollableElementHeight = function (element) {
        return element.scrollHeight;
    };

    var getContainerElementWidth = function (element) {
        return element.parentNode.offsetWidth;
    };

    var getReadingProgress = function (percentageScrolled, reporterParentWidth) {
        return ((percentageScrolled * reporterParentWidth) / MAX_PERCENT) + MEASUREMENT_UNIT;
    };

    var calculateScrolledPercentage = function (element, amountScrolled) {
        var scrolledPercentage = (amountScrolled * MAX_PERCENT) / getScrollableElementHeight(element);

        // The script never gets to 100%, this is a small fix.
        // The problem needs further investigation.
        if (scrolledPercentage > 0 && scrolledPercentage < MAX_PERCENT) {
            scrolledPercentage += 1.8;
        }

        console.log(scrolledPercentage);

        return Math.ceil(
            scrolledPercentage
        );
    };

    var handleScroll = function (e) {
        var scrollableElement = e.currentTarget;
        var reporter = scrollableElement.previousElementSibling.querySelector('.reporter');

        reporter.style.width = getReadingProgress(
            calculateScrolledPercentage(scrollableElement, scrollableElement.scrollTop),
            getContainerElementWidth(reporter)
        );
    };

    var bindScrollEvent = function (element) {
        element.addEventListener(SCROLL_EVENT_NAME, handleScroll);
    };

    return {
        report: function report (settings) {
            var mainElement = document.querySelectorAll(settings.main);

            Array.prototype.slice.call(mainElement).map(function (element) {
                bindScrollEvent(element.querySelector(settings.scroller));
            });
        }
    };
})();

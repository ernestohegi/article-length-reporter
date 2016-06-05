# Reading Progress reporter

## Problem

Sometimes when reading articles on the web, we'd like to know how much of the article remains to be read.

## Solution

Once a user scrolls through an article, show how much of the article has been read by displaying the reading progress at the top of the article.

Sites like <a href="http://www.bloomberg.com/news/articles/2016-06-05/u-k-s-major-takes-aim-at-leave-camp-as-brexit-debate-heats-up"  >Bloomberg</a> and <a href="https://www.tofugu.com/" >Tofugu</a> use this approach to make the reading of long texts more user friendly.

## Technologies involved

This solution was written purely on JS, CSS and HTML. No external libraries or frameworks have been used in the process.

## Structure

There should be a container element wrapping the reading progress reporter and the scrollable text.
The reporter and the text should be together on a siblings relationship.

## Usage

- Initialize the readingProgress object with the required selectors as in the example.
- Call the report method of the readingProgress object once it has been initialized.

```
<script>
    readingProgress.initialize({
        main: '.text-container',
        reporter: '.reporter',
        scroller: '.text__content'
    });

    readingProgress.report();
</script>
```

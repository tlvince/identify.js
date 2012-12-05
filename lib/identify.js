// Generate `id` attributes for HTML block elements.
// Copyright 2012 Tom Vincent <http://tlvince.com/contact>
// <https://github.com/tlvince/identify.js>

// DOM selectors and general heavy lifting
var cheerio = require('cheerio');

// Big list of HTML(5) block elements.
//
// From: [Mozilla Developer Network][1].
// [1]: https://developer.mozilla.org/en-US/docs/HTML/Block-level_elements
var block_elements = [
  'address',
  'article',
  'aside',
  'audio',
  'blockquote',
  'canvas',
  'dd',
  'div',
  'dl',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'noscript',
  'ol',
  'output',
  'p',
  'pre',
  'section',
  'table',
  'tfoot',
  'ul',
  'video'
]

// Sanitise a given string
//
// Performs the following transformations (in order):
//
//   * Replace ampersand with 'and'
//   * Replace one or more spaces or commars with a dash
//   * Filter non alphanumerics and dashes
//   * Flatten a series of two or more dashes
//   * Strip leading/trailing dash
//
// `words` - The number of words to return.
//
//  Returns the sanitised string
var sanitise = function(str, words) {
  if (words == null) {
    words = 0;
  }
  str = str.toLowerCase();
  if (words > 0) {
    str = str.split(' ').slice(0, +(words - 1) + 1 || 9e9).toString();
  }
  str = str.replace(/&/g, 'and');
  str = str.replace(/(\s+|,+)/g, '-');
  str = str.replace(/[^a-z0-9-]/g, '');
  str = str.replace(/-{2,}/g, '-');
  return str = str.replace(/(^-|-$)/, '');
};

// Add id attributes to block elements in the given HTML.
//
// Does not clobber existing attributes.
//
// Returns the processed HTML.
var identify = function(html) {
  var $ = cheerio.load(html, {
    lowerCaseTags: true
  });

  var i, len;
  for (i = 0, len = block_elements.length; i < len; i++) {
    var tag = block_elements[i];
    $(tag).each(function(index, elem) {
      if (!$(this).attr('id')) {
        switch (tag) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return $(this).attr('id', sanitise($(this).text()));
          case 'p':
            return $(this).attr('id', sanitise($(this).text(), 3));
          default:
            return $(this).attr('id', tag + index);
        }
      }
    });
  }
  return $.html();
};

module.exports = identify;

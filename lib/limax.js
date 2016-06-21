'use strict';

var speakingurl = require('speakingurl');
var pinyin = require('pinyin');
var hepburn = require('hepburn');

module.exports = function(text, opt) {
  var options = opt || {};
  var separateNumbers = true;

  if (typeof options === 'string') {
    options = {separator: options};
  }

  if (typeof options.separateNumbers !== 'undefined') {
    separateNumbers = options.separateNumbers;
  }

  // Remove apostrophes contained within a word
  text = text.replace(/(\S)['\u2018\u2019\u201A\u201B\u2032\u2035](\S)/g, '$1$2');

  // Break out any numbers contained within a word
  if (separateNumbers) {
    text = text.replace(/([^\d\s])([0-9]+)([^\d\s])/g, '$1 $2 $3');
  }

  // Should we remove the separator before a digit where previous word does not end in a digit?
  var mergeDigitSuffixes = false;

  // Language-specific behaviour
  var lang = options.lang;
  if (typeof lang === 'undefined') {
    if (hepburn.containsKana(text)) {
      // Convert from Japanese Kana using Hepburn romanisation
      text = hepburn.fromKana(text);
      // Remove any remaining non-Kana, e.g. Kanji
      text = text.replace(/([^A-Za-z0-9\- ]+)/g, '');
    } else if (/[\u4e00-\u9fa5]+/.test(text)) {
      // Convert Mandarin Chinese to Pinyin with numeric tones
      mergeDigitSuffixes = true;
      // Should we use tone numbers? (default is true)
      var tone = (typeof options.tone === 'boolean') ? options.tone : true;
      text = pinyin(text, {
        'style': tone ? pinyin.STYLE_TONE2 : pinyin.STYLE_NORMAL
      }).join(' ');
      // Remove punctuation symbols
      text = text.replace(/([^0-9A-Za-z ]+)/g, '');
      // Remove space around single character words, caused by non-Mandarin symbols in otherwise Mandarin text
      text = text.replace(/([^1-4]) ([A-Za-z]) /g, '$1$2');
    }
  }
  // Convert to slug using speakingurl
  var separator = options.replacement || options.separator;
  if (typeof separator !== 'string') {
    separator = '-';
  }
  var slug = speakingurl(text, {
    lang: lang || 'en',
    separator: separator
  });
  // Remove separator before a digit where previous word does not end in a digit
  if (mergeDigitSuffixes) {
    slug = slug.replace(/([^0-9])-([0-9])/g, '$1$2');
  }
  return slug;
};

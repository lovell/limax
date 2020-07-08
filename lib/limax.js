'use strict';

const speakingurl = require('speakingurl');
const pinyin = require('pinyin');
const hepburn = require('hepburn');

function customCharsAsArray (custom) {
  custom = custom || [];
  return Array.isArray(custom) ? custom : Object.keys(custom);
}

module.exports = function (text, opt) {
  const options = typeof opt === 'string'
    ? { separator: opt }
    : opt || {};

  text = text.replace(
    /(\S)['\u2018\u2019\u201A\u201B\u2032\u2035\u0301](\S)/g, // eslint-disable-line no-misleading-character-class
    options.separateApostrophes === true ? '$1 $2' : '$1$2'
  );

  // Break out any numbers contained within a word
  if (options.separateNumbers === true) {
    text = text.replace(/([^\d\s])([0-9]+)([^\d\s])/g, '$1 $2 $3');
  }

  // Should we remove the separator before a digit where previous word does not end in a digit?
  let mergeDigitSuffixes = false;

  // Language-specific behaviour
  const lang = options.lang || '';
  if (lang.toLowerCase().startsWith('ja') || hepburn.containsKana(text)) {
    // Convert from Japanese Kana using Hepburn romanisation
    text = hepburn.fromKana(text);
    // Remove any remaining non-Kana, e.g. Kanji
    text = text.replace(/([^A-Za-z0-9\- ]+)/g, '');
  } else if (lang.toLowerCase().startsWith('zh') || /[\u4e00-\u9fa5]+/.test(text)) {
    // Should we use tone numbers? (default is true)
    const tone = (typeof options.tone === 'boolean') ? options.tone : true;
    mergeDigitSuffixes = tone;
    text = pinyin(text, {
      style: tone ? pinyin.STYLE_TONE2 : pinyin.STYLE_NORMAL
    }).join(' ');
    // Remove punctuation symbols
    const customNonPunctuation = customCharsAsArray(options.custom).map(function (c) { return `\\${c}`; }).join('');
    const nonPunctuationMatcher = new RegExp(`([^0-9A-Za-z ${customNonPunctuation}]+)`, 'g');
    text = text.replace(nonPunctuationMatcher, '');
    // Remove space around single character words, caused by non-Mandarin symbols in otherwise Mandarin text
    text = text.replace(/([^1-4]) ([A-Za-z]) /g, '$1$2');
  }
  // Convert to slug using speakingurl
  const separator = options.replacement || options.separator;
  const slug = speakingurl(text, {
    lang: lang || 'en',
    separator: typeof separator === 'string' ? separator : '-',
    maintainCase: options.maintainCase || false,
    custom: options.custom || {}
  });
  // Remove separator before a digit where previous word does not end in a digit
  return mergeDigitSuffixes
    ? slug.replace(/([^0-9])-([0-9])/g, '$1$2')
    : slug;
};

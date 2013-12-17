/**
 * limax
 * @author Lovell Fuller
 *
 * This code is distributed under the Apache License Version 2.0, the terms of
 * which may be found at http://www.apache.org/licenses/LICENSE-2.0.html
 */

var speakingurl = require("speakingurl");
var cld = require("cld");
var pinyin = require("pinyin2");
var hepburn = require("hepburn");

module.exports = function(text, opt) {
  var options = opt || {};
  if (typeof options === "string") {
    options = {separator: options};
  }
  var lang = options.lang || cld.detect(text).code;
  // Convert Mandarin Chinese to Pinyin with numeric tones
  if (lang === "zh") {
    text = pinyin(text, {
      "style": pinyin.STYLE_TONE2
    }).join(" ");
    // Remove punctuation symbols
    text = text.replace(/([^0-9A-Za-z ]+)/g, "");
    // Remove space around single character words, caused by non-Mandarin symbols in otherwise Mandarin text
    text = text.replace(/([^1-4]) ([A-Za-z]) /g, "$1$2");
    lang = "en";
  }
  // Convert Japanese Kana to Romaji
  if (lang === "ja") {
    text = hepburn.fromKana(text);
    // Remove any non-Kana, e.g. Kanji
    text = text.replace(/([^A-Za-z0-9\- ]+)/g, "");
    lang = "en";
  }
  // Convert to slug using speakingurl
  var separator = options.replacement || options.separator || "-";
  var slug = speakingurl(text, {
    lang: lang,
    separator: separator
  });
  // Remove separator before a digit where previous word does not end in a digit
  return slug.replace(/([^0-9])-([0-9])/g, "$1$2");
};

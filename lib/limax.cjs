// Copyright 2013 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0
'use strict';

const speakingurl = require('speakingurl');
const hepburn = require('hepburn');
const deburr = require('lodash.deburr');
const pinyinPro = require('pinyin-pro');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const speakingurl__default = /*#__PURE__*/_interopDefaultCompat(speakingurl);
const hepburn__default = /*#__PURE__*/_interopDefaultCompat(hepburn);
const deburr__default = /*#__PURE__*/_interopDefaultCompat(deburr);

function customCharsAsArray(custom) {
  custom = custom || [];
  return Array.isArray(custom) ? custom : Object.keys(custom);
}
function limax(text, opt) {
  const options = typeof opt === "string" ? { separator: opt } : opt || {};
  text = text.replace(
    /(\S)['\u2018\u2019\u201A\u201B\u2032\u2035\u0301](\S)/g,
    // eslint-disable-line no-misleading-character-class
    options.separateApostrophes === true ? "$1 $2" : "$1$2"
  );
  if (options.separateNumbers === true) {
    text = text.replace(/([^\d\s])([0-9]+)([^\d\s])/g, "$1 $2 $3");
  }
  let mergeDigitSuffixes = false;
  const lang = options.lang || "";
  if (lang.toLowerCase().startsWith("ja") || hepburn__default.containsKana(text)) {
    text = hepburn__default.fromKana(text);
    text = text.replace(/([^A-Za-z0-9\- ]+)/g, "");
  } else if (pinyinPro.pinyin && (lang.toLowerCase().startsWith("zh") || /[\u4e00-\u9fa5]+/.test(text))) {
    const tone = typeof options.tone === "boolean" ? options.tone : true;
    mergeDigitSuffixes = tone;
    const data = pinyinPro.pinyin(text, { type: "all", toneType: "none", nonZh: "consecutive" }).map((item) => {
      if (item.isZh) {
        return tone ? `${item.pinyin}${item.num || ""}` : item.pinyin;
      } else {
        return item.origin;
      }
    });
    text = data.join(" ");
    const customNonPunctuation = customCharsAsArray(options.custom).map(function(c) {
      return `\\${c}`;
    }).join("");
    const nonPunctuationMatcher = new RegExp(`([^0-9A-Za-z ${customNonPunctuation}]+)`, "g");
    text = text.replace(nonPunctuationMatcher, "");
    text = text.replace(/([^1-4]) ([A-Za-z]) /g, "$1$2");
  }
  const separator = options.replacement || options.separator;
  const deburredText = deburr__default(text);
  const slug = speakingurl__default(deburredText, {
    lang: lang || "en",
    separator: typeof separator === "string" ? separator : "-",
    maintainCase: options.maintainCase || false,
    custom: options.custom || {}
  });
  return mergeDigitSuffixes ? slug.replace(/([^0-9])-([0-9])/g, "$1$2") : slug;
}

module.exports = limax;

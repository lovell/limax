/**
 * limax unit tests
 * @author Lovell Fuller
 *
 * This code is distributed under the Apache License Version 2.0, the terms of
 * which may be found at http://www.apache.org/licenses/LICENSE-2.0.html
 */

var assert = require("assert");
var slug = require("../lib/limax");

var tests = {
  "i ♥ latin": "i-love-latin",
  "Я люблю русский": "ya-lyublyu-russkij",
  "私は ひらがな が大好き": "ha-hiragana-gaki",
  "我爱官话": "wo3-ai4-guan1-hua4",
  // https://github.com/keystonejs/keystone-utils/issues/12
  "one2three": "one-2-three",
  "The User's Guide": "the-users-guide",
  "The User’s Guide": "the-users-guide"
};

Object.keys(tests).forEach(function(test) {
  var actual = slug(test);
  var expected = tests[test];
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, "_");
  var expected = tests[test].replace(/-/g, "_");
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, {replacement: "_"});
  var expected = tests[test].replace(/-/g, "_");
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, {separator: "_"});
  var expected = tests[test].replace(/-/g, "_");
  assert.strictEqual(actual, expected);
});

assert.strictEqual(slug("Ich ♥ Deutsch", {lang: "de"}), "ich-liebe-deutsch");

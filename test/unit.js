'use strict';

var assert = require('assert');
var slug = require('../lib/limax');

var tests = {
  'i ♥ latin': 'i-love-latin',
  'Я люблю русский': 'ya-lyublyu-russkii',
  '私は ひらがな が大好き': 'ha-hiragana-gaki',
  '我爱官话': 'wo3-ai4-guan1-hua4',
  // https://github.com/keystonejs/keystone-utils/issues/12
  'one2three': 'one-2-three',
  'The User\'s Guide': 'the-users-guide',
  'The User’s Guide': 'the-users-guide',
  // https://github.com/lovell/limax/issues/4
  '弄堂里的菜品赤醬': 'nong4-tang2-li3-di2-cai4-pin3-chi4-jiang4',
  // https://github.com/lovell/limax/issues/12
  '12345': '12345',
  'one 2three': 'one-2three'
};

Object.keys(tests).forEach(function(test) {
  var actual = slug(test);
  var expected = tests[test];
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, '_');
  var expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, {replacement: '_'});
  var expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  var actual = slug(test, {separator: '_'});
  var expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

assert.strictEqual(slug('Ich ♥ Deutsch', {lang: 'de'}), 'ich-liebe-deutsch');

// https://github.com/lovell/limax/issues/4
assert.strictEqual(slug('弄堂里的菜品赤醬', {tone: true}), 'nong4-tang2-li3-di2-cai4-pin3-chi4-jiang4');
assert.strictEqual(slug('弄堂里的菜品赤醬', {tone: false}), 'nong-tang-li-di-cai-pin-chi-jiang');

// https://github.com/lovell/limax/issues/14
assert.strictEqual(slug('hello2world', { separateNumbers: false }), 'hello2world');
assert.strictEqual(slug('hello2world', { separateNumbers: true }), 'hello-2-world');

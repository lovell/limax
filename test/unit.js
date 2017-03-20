'use strict';

const assert = require('assert');
const slug = require('../lib/limax');

const tests = {
  'i ♥ latin': 'i-love-latin',
  'Я люблю русский': 'ya-lyublyu-russkii',
  '私は ひらがな が大好き': 'ha-hiragana-gaki',
  '我爱官话': 'wo3-ai4-guan1-hua4',
  // https://github.com/keystonejs/keystone-utils/issues/12
  'one2three': 'one-2-three',
  'The User\'s Guide': 'the-users-guide',
  'The User’s Guide': 'the-users-guide',
  // https://github.com/lovell/limax/issues/4
  '弄堂里的菜品赤醬': 'nong4-tang2-li3-de-cai4-pin3-chi4-jiang4',
  // https://github.com/lovell/limax/issues/12
  '12345': '12345',
  'one 2three': 'one-2three',
  // https://github.com/lovell/limax/pull/17
  'Pop brésilienne header': 'pop-bresilienne-header'
};

Object.keys(tests).forEach(function(test) {
  const actual = slug(test);
  const expected = tests[test];
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  const actual = slug(test, '_');
  const expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  const actual = slug(test, {replacement: '_'});
  const expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

Object.keys(tests).forEach(function(test) {
  const actual = slug(test, {separator: '_'});
  const expected = tests[test].replace(/-/g, '_');
  assert.strictEqual(actual, expected);
});

assert.strictEqual(slug('Ich ♥ Deutsch', {lang: 'de'}), 'ich-liebe-deutsch');

// https://github.com/lovell/limax/issues/4
assert.strictEqual(slug('弄堂里的菜品赤醬', {tone: true}), 'nong4-tang2-li3-de-cai4-pin3-chi4-jiang4');
assert.strictEqual(slug('弄堂里的菜品赤醬', {tone: false}), 'nong-tang-li-de-cai-pin-chi-jiang');

// https://github.com/lovell/limax/issues/14
assert.strictEqual(slug('hello2world', { separateNumbers: false }), 'hello2world');
assert.strictEqual(slug('hello2world', { separateNumbers: true }), 'hello-2-world');

// Test maintainCase option
assert.strictEqual(slug('Hello2World', { maintainCase: false }), 'hello-2-world');
assert.strictEqual(slug('Hello2World', { maintainCase: true }), 'Hello-2-World');

// Test custom option
assert.strictEqual(slug('hello.world', { custom: ['.'] }), 'hello.world');
assert.strictEqual(slug('hello-*-world', { custom: { '*': 'asterisk' } }), 'hello-asterisk-world');

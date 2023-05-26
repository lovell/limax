'use strict';

const ava = require('ava');
const limax = require('../lib/limax');

const tests = {
  'i ♥ latin': 'i-love-latin',
  'Я люблю русский': 'ya-lyublyu-russkii',
  '私は ひらがな が大好き': 'ha-hiragana-gaki',
  我爱官话: 'wo3-ai4-guan1-hua4',
  one2three: 'one2three',
  'The User\'s Guide': 'the-users-guide',
  'The User’s Guide': 'the-users-guide',
  弄堂里的菜品赤醬: 'nong4-tang2-li3-de-cai4-pin3-chi4-jiang4',
  12345: '12345',
  'one 2three': 'one-2three',
  'Pop brésilienne header': 'pop-bresilienne-header',
  Pōneke: 'poneke'
};
const testInputs = Object.keys(tests);

ava('Basic usage', function (t) {
  t.plan(testInputs.length);
  testInputs.forEach(function (input) {
    t.true(limax(input) === tests[input]);
  });
});

ava('Set separator via parameter', function (t) {
  t.plan(testInputs.length);
  testInputs.forEach(function (input) {
    t.true(limax(input, '_') === tests[input].replace(/-/g, '_'));
  });
});

ava('Set separator via replacement option', function (t) {
  t.plan(testInputs.length);
  testInputs.forEach(function (input) {
    t.true(limax(input, { replacement: '_' }) === tests[input].replace(/-/g, '_'));
  });
});

ava('Set separator via separator option', function (t) {
  t.plan(testInputs.length);
  testInputs.forEach(function (input) {
    t.true(limax(input, { separator: '_' }) === tests[input].replace(/-/g, '_'));
  });
});

ava('Set language via lang option', function (t) {
  t.plan(5);
  t.true(
    limax('Ich ♥ Deutsch', { lang: 'de' }) === 'ich-liebe-deutsch'
  );
  t.true(
    limax('私は ひらがな が大好き', { lang: 'jp' }) === 'ha-hiragana-gaki'
  );
  t.true(
    limax('我爱官话', { lang: 'zh' }) === 'wo3-ai4-guan1-hua4'
  );
});

ava('Set Pinyin tone numbering via tone option', function (t) {
  t.plan(3);
  t.true(
    limax('弄堂里的菜品赤醬', { tone: true }) === 'nong4-tang2-li3-de-cai4-pin3-chi4-jiang4'
  );
  t.true(
    limax('弄堂里的菜品赤醬', { tone: false }) === 'nong-tang-li-de-cai-pin-chi-jiang'
  );
  t.true(
    limax('特殊天-1', { tone: false }) === 'te-shu-tian-1'
  );
  t.true(
    limax('路上的行人', { tone: true }) === 'lu4-shang-de-xing2-ren2'
  );
  t.true(
    limax('银行', { tone: true }) === 'yin2-hang2'
  );
});

ava('Set separateNumbers via options', function (t) {
  t.plan(6);
  t.true(
    limax('hello2world', { separateNumbers: false }) === 'hello2world'
  );
  t.true(
    limax('hello2world', { separateNumbers: true }) === 'hello-2-world'
  );
  t.true(
    limax('404', { separateNumbers: true }) === '404'
  );
  t.true(
    limax('404', { separateNumbers: false }) === '404'
  );
  t.true(
    limax('状态404页面未找到', { separateNumbers: true }) === 'zhuang4-tai4-404-ye4-mian4-wei4-zhao3-dao4'
  );
  t.true(
    limax('状态404页面未找到', { separateNumbers: false }) === 'zhuang4-tai4-404-ye4-mian4-wei4-zhao3-dao4'
  );
});

ava('Set separateApostrophes via options', function (t) {
  t.plan(2);
  t.true(
    limax('j\'aime', { separateApostrophes: false }) === 'jaime'
  );
  t.true(
    limax('j\'aime', { separateApostrophes: true }) === 'j-aime'
  );
});

ava('Set maintainCase via options', function (t) {
  t.plan(2);
  t.true(
    limax('HelloWorld', { maintainCase: false }) === 'helloworld'
  );
  t.true(
    limax('HelloWorld', { maintainCase: true }) === 'HelloWorld'
  );
});

ava('Set custom via options', function (t) {
  t.plan(4);
  t.true(
    limax('hello.world', { custom: ['.'] }) === 'hello.world'
  );
  t.true(
    limax('hello-*-world', { custom: { '*': 'asterisk' } }) === 'hello-asterisk-world'
  );
  t.true(
    limax('中文.pdf', { custom: ['.'] }) === 'zhong1-wen2-.pdf'
  );
  t.true(
    limax('中文.pdf', { custom: { '.': 'dot' } }) === 'zhong1-wen2-dotpdf'
  );
});

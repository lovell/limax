# limax

(Yet another) Node.js module to generate URL slugs,
also known as clean URLs, user-friendly URLs and SEO-friendly URLs.

The difference?

This module extends the fantastic
[speakingurl](https://www.npmjs.com/package/speakingurl)
module to include Romanisation of Chinese and Japanese scripts.

Give it a string of text in pretty much any major world language
and it will convert it to valid characters,
conforming to [RFC3986](http://www.ietf.org/rfc/rfc3986.txt),
for use within the path element of a URL.

Currently supports, but not limited to, the following scripts:

* Latin: e.g. English, français, Deutsch, español, português
* Cyrillic: e.g. Русский язык, български език, українська мова
* Chinese: e.g. 官话, 吴语  (converts to Latin script using Pinyin with optional tone number)
* Japanese: e.g. ひらがな, カタカナ (converts to Romaji using Hepburn)

If you already use either the
[speakingurl](https://www.npmjs.com/package/speakingurl) or
[slug](https://www.npmjs.com/package/slug) modules,
you can probably swap in `limax` without changing the logic in your code.

Oh, and `limax` is the Latin word for slug.

## Install

    npm install limax

## Usage

```javascript
import slug from 'limax';
```

### slug(text)

```javascript
const latin = slug('i ♥ latin'); // i-love-latin
const cyrillic = slug('Я люблю русский'); // ya-lyublyu-russkij
const pinyin = slug('我爱官话'); // wo3-ai4-guan1-hua4
const romaji = slug('私は ひらがな が大好き'); // ha-hiragana-gaki
```

### slug(text, options)

options:
* `replacement`: String to replace whitespace with, defaults to `-` (provides API compatibility with the `slug` module)
* `separator`: String, equivalent to `replacement` (provides API compatibility with the `speakingurl` module)
* `lang`: String, ISO 639-1 two-letter language code, defaults to auto-detected language
* `tone`: Boolean, add tone numbers to Pinyin transliteration of Chinese, defaults to `true`
* `separateNumbers`: Boolean, separate numbers that are within a word, defaults to `false`
* `separateApostrophes`: Boolean, separate apostrophes that are within a word, defaults to `false`
* `maintainCase`: Boolean, maintain the original string's casing, defaults to `false`
* `custom`:
  - Object, custom map for translation, overwrites all i.e. `{ '&': '#', '*': ' star ' }`
  - Array, add chars to allowed charMap

```javascript
const strich = slug('Ich ♥ Deutsch', {lang: 'de'}); // ich-liebe-deutsch
const unterstreichen1 = slug('Ich ♥ Deutsch', {lang: 'de', replacement: '_'}); // i_liebe_deutsch
const unterstreichen2 = slug('Ich ♥ Deutsch', {lang: 'de', separator: '_'}); // i_liebe_deutsch
const wuYin = slug('弄堂里的菜品赤醬', {tone: false}); // nong-tang-li-di-cai-pin-chi-jiang

// separateNumbers example
const numbersInWord = slug('hello2world'); // hello2world
const numbersSeparated = slug('hello2world', { separateNumbers: true }); // hello-2-world

// separateApostrophes example
const apostrophesInWord = slug('j\'aime'); // jaime
const apostrophesSeparated = slug('j\'aime', { separateApostrophes: true }); // j-aime

// maintainCase example
const caseNotMaintained = slug('HelloWorld'); // helloworld
const caseMaintained = slug('HelloWorld', { maintainCase: true }); // HelloWorld

// custom example
const custom1 = slug('hello.world', { custom: ['.'] }); // hello.world
const custom2 = slug('hello-*-world', { custom: { '*': 'asterisk' } }); // hello-asterisk-world
```

### slug(text, replacement)

Provided to support backwards-compatibility with the `slug` module.

```javascript
const underscore = slug('i ♥ unicode', '_'); // i_love_unicode
```

## Test [![Build Status](https://travis-ci.org/lovell/limax.png?branch=master)](https://travis-ci.org/lovell/limax)

Run the unit tests with:

    npm test

## Contribute

Pull requests with mappings and tests for further scripts and languages are more than welcome.

## Licence

Copyright 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 Lovell Fuller and contributors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

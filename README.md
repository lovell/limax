# limax

(Yet another) Node.js module to generate URL slugs, also known as clean URLs, user-friendly URLs and SEO-friendly URLs.

The difference?

This module includes Romanisation of non-Latin scripts. Give it a string of text in pretty much any major world language and it will convert it to valid characters, conforming to [RFC3986](http://www.ietf.org/rfc/rfc3986.txt), for use within the path element of a URL.

Currently supports, but not limited to, the following scripts:

* Latin: e.g. English, français, Deutsch, español, português
* Cyrillic: e.g. Русский язык, български език, українська мова
* Chinese: e.g. 官话, 吴语  (converts to Latin script using tone number Pinyin)
* Japanese: e.g. ひらがな, カタカナ (converts to Romaji using Hepburn)

Based on number of `npm` downloads, the most popular Node.js module for generating slugs is `[slug](https://github.com/dodo/node-slug)`, which claims it "slugifies even utf-8 chars!" You may be pleased to discover that all characters in a utf-8 encoded string are "utf-8 chars"!

This module depends on the [speakingurl](https://github.com/pid/speakingurl) module and remains mostly API-compatible with both it and the more popular [slug](https://github.com/dodo/node-slug) module.

If you already use either the `speakingurl` or `slug` modules, you can probably swap in `limax` without changing the logic in your code.

Oh, and `limax` is the Latin word for slug.

## Install

    npm install limax

## Usage

```javascript
var slug = require("limax");
```

### slug(text)

```javascript
var latin = slug("i ♥ latin"); // i-love-latin
var cyrillic = slug("Я люблю русский"); // ya-lyublyu-russkij
var pinyin = slug("我爱官话"); // wo3-ai4-guan1-hua4
var romaji = slug("私は ひらがな が大好き"); // ha-hiragana-gaki
```

### slug(text, options)

options:
* replacement: char to replace whitespace with, defaults to `-` (provides API compatibility with the `slug` module)
* separator: equivalent to `replacement` (provides API compatibility with the `speakingurl` module)
* lang: ISO 639-1 two-letter language code, defaults to auto-detected language

```javascript
var strich = slug("Ich ♥ Deutsch", {lang: "de"}); // ich-liebe-deutsch
var unterstreichen1 = slug("Ich ♥ Deutsch", {lang: "de", replacement: "_"}); // i_liebe_deutsch
var unterstreichen2 = slug("Ich ♥ Deutsch", {lang: "de", separator: "_"}); // i_liebe_deutsch
```

### slug(text, replacement)

Provided to support backwards-compatibility with the `slug` module.

```javascript
var underscore = slug("i ♥ unicode", "_"); // i_love_unicode
```

## Test [![Build Status](https://travis-ci.org/lovell/limax.png?branch=master)](https://travis-ci.org/lovell/limax)

Run the unit tests with:

    npm test

## Contribute

Pull requests with mappings and tests for further scripts and languages are more than welcome.

## Licence

Copyright 2013 Lovell Fuller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

// Copyright 2013 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0

type Options = {
  custom?: string[] | { [key: string]: string; };
  lang?: string;
  maintainCase?: boolean;
  replacement?: string;
  separator?: string;
  separateNumbers?: boolean;
  separateApostrophes?: boolean;
  tone?: boolean;
} | string;

declare function slug(text: string, opt?: Options): string;

export = slug;

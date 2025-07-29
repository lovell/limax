import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  name: 'limax',
  entries: ['./src/limax.ts'],
  rollup: {
    emitCJS: true,
    output: {
      banner: `// Copyright 2013 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0`,
    }
  },
  outDir: 'lib',
  declaration: true,
})
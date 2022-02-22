<a href="https://www.npmjs.com/package/innet">
  <img src="https://raw.githubusercontent.com/d8corp/innet/main/logo.svg" align="left" width="90" height="90" alt="InnetJs logo by Mikhail Lysikov">
</a>

# &nbsp; @innet/html

&nbsp;

[![NPM](https://img.shields.io/npm/v/@innet/html.svg)](https://github.com/d8corp/innet-html/blob/main/CHANGELOG.md)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@innet/html)](https://bundlephobia.com/result?p=@innet/html)
[![downloads](https://img.shields.io/npm/dm/@innet/html.svg)](https://www.npmjs.com/package/@innet/html)
[![license](https://img.shields.io/npm/l/@innet/html)](https://github.com/d8corp/innet-html/blob/main/LICENSE)

## Abstract

This package helps to convert jsx elements into html text.

[![stars](https://img.shields.io/github/stars/d8corp/innet-html?style=social)](https://github.com/d8corp/innet-html/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet-html?style=social)](https://github.com/d8corp/innet-html/watchers)

## Install
npm
```bash
npm i @innet/html
```
yarn
```bash
yarn add @innet/html
```

Or you can include the scripts into the `head`.
```html
<!-- Target (innet) -->
<script defer src="https://unpkg.com/innet/innet.min.js"></script>

<!-- Target (innetHTML) -->
<script defer src="https://unpkg.com/@innet/html/innetHTML.min.js"></script>
```

## Usage

You can use `htmlPlugin` when you want to convert whole app.
```typescript jsx
import innet, { createHandler } from 'innet'
import { htmlPlugin } from '@innet/html'

const handler = createHandler([
  htmlPlugin,
])

innet(<div />, handler)
// '<div></div>'
```

You can combine it with other plugins to handle deep html.
```typescript jsx
import innet, { createHandler } from 'innet'
import { array, arraySync } from '@innet/utils'
import { htmlPlugin } from '@innet/html'

const join = () => arr => arr.join('')
const handler = createHandler([
  htmlPlugin,
  array([
    arraySync,
    join,
  ])
])

innet((
  <>
    <h1>Test</h1>
    <div class={'test'}>
      <span>
        <img src="#" alt="test" />
      </span>
      <p>
        Hello World!
      </p>
    </div>
  </>
), handler)
```

Also, you can use jsx plugin of `html` to handle it inside `html` component

`handler.ts`
```typescript jsx
import { createHandler } from 'innet'
import { array, arraySync, nullish, object, stop } from '@innet/utils'
import html from '@innet/html'

const join = () => arr => arr.join('')

export const handler = createHandler([
  nullish([stop]),
  array([arraySync, join]),
  object([
    jsxPlugins({
      html,
    }),
  ]),
])
```

`index.tsx`
```typescript jsx
import innet from 'innet'
import { handler } from './handler'

innet(<html><base href='test' /><body /></html>, handler)
// <html><base href="test"><body></body></html>
```

## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/innet-html/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet-html)](https://github.com/d8corp/innet-html/issues)

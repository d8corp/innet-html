import { jsxPlugins } from '@innet/jsx'
import { switchSync } from '@innet/switch'
import { array, arraySync, nullish, object, stop } from '@innet/utils'
import innet, { createHandler } from 'innet'

import htmlJSXPlugin, { htmlPlugin } from '.'

function join () {
  return arr => arr.join('')
}

const handler = createHandler([htmlPlugin, array([arraySync, join])])

function innetTest (children) {
  return innet(children, handler)
}

describe('html', () => {
  test('self-close', () => {
    expect(innetTest(<div />)).toBe('<div></div>')
    expect(innetTest(<img />)).toBe('<img>')
  })
  test('props', () => {
    expect(innetTest(<div class='test' />)).toBe('<div class="test"></div>')
    expect(innetTest(<img src='#' />)).toBe('<img src="#">')
  })
  test('children', () => {
    expect(innetTest(<div class='test'>Test</div>)).toBe('<div class="test">Test</div>')
    expect(innetTest(<img src='#'>Test</img>)).toBe('<img src="#">')
  })
  test('deep children', () => {
    expect(innetTest(<>
      <h1>Test</h1>
      <div class={'test'}>
        <span>
          <img src="#" alt="test" />
        </span>
        <p>
          Hello World!
        </p>
      </div>
    </>)).toBe('<h1>Test</h1><div class="test"><span><img src="#" alt="test"></span><p>Hello World!</p></div>')
  })
  test('jsx plugin', () => {
    const handler = createHandler([
      nullish([stop]),
      array([
        arraySync,
        join,
      ]),
      object([
        jsxPlugins({
          html: htmlJSXPlugin,
          switch: switchSync,
        }),
      ]),
    ])

    expect(<html><div /></html>).toEqual({ type: 'html', children: [{ type: 'div' }] })

    const result1 = innet(<html><div /></html>, handler)

    expect(result1).toBe('<html><div></div></html>')

    const result2 = innet(<html><base href='test' /><body /></html>, handler)

    expect(result2).toBe('<html><base href="test"><body></body></html>')

    expect(innet(<html><div><switch>{[undefined, 1]}</switch></div></html>, handler)).toBe('<html><div>1</div></html>')
  })
})

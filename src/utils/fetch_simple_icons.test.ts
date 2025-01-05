// make real network requests
import 'isomorphic-fetch'
import {
  fetchSimpleIcons,
  fetchSimpleIconText,
  getSimpleIconFromText,
} from './fetch_simple_icons'
import {SimpleIcon} from '../types/simple_icon'

export const slugs = [
  'android',
  'androidstudio',
  'antdesign',
  'css3',
  'cypress',
  'dart',
  'docker',
  'express',
  'figma',
  'firebase',
  'flutter',
  'git',
  'github',
  'gitlab',
  'html5',
  'javascript',
  'jest',
  'jira',
  'mui',
  'mysql',
  'nextdotjs',
  'nginx',
  'nodedotjs',
  'npm',
  'postgresql',
  'prisma',
  'react',
  'reactquery',
  'redux',
  'sonarqube',
  'testinglibrary',
  'typescript',
  'vercel',
]
const figmaText = `<svg fill="#F24E1E" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Figma</title><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg>`

describe('fetchSimpleIcons', () => {
  it("fetches 'figma' icon", async () => {
    const text = await fetchSimpleIconText('figma')
    expect(text).toBe(figmaText)
  })
  it('extracts simple icons from res text', () => {
    const resText = figmaText

    const icon = getSimpleIconFromText('figma', resText)

    expect(icon).toMatchInlineSnapshot(`
      Object {
        "hex": "#F24E1E",
        "path": "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
        "slug": "figma",
        "title": "Figma",
      }
    `)
  })
  it('fetches icons with valid properties', async () => {
    const res = await fetchSimpleIcons({slugs})
    const icons = Object.values(res.simpleIcons)
    const errors: SimpleIcon[] = []
    let isAllBlack = true
    for (const icon of icons) {
      if (icon.hex !== '#000' && icon.hex !== '#000000') {
        isAllBlack = false
      }
      if (!icon.hex || !icon.path || !icon.slug || !icon.title) {
        errors.push(icon)
      }
    }
    expect(isAllBlack).toBe(false)
    expect(icons).toHaveLength(slugs.length)
    expect(errors).toEqual([])
  })
})

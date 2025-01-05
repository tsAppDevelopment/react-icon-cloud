import type {SimpleIcon} from '../types/simple_icon'

export const extractHtmlProperty = (
  str: string,
  property: string,
  matchType: '>' | '='
) => {
  const propIndex = str.indexOf(property)
  if (propIndex === -1) return ''
  if (matchType === '=') {
    const eqIndex = str.indexOf('=', propIndex + property.length)
    if (eqIndex === -1) return ''
    const startIndex = eqIndex + 2
    const endIndex = str.indexOf('"', startIndex)
    if (startIndex >= endIndex) return ''
    return str.substring(startIndex, endIndex)
  }
  if (matchType === '>') {
    const gtIndex = str.indexOf('>', propIndex + property.length)
    if (gtIndex === -1) return ''
    const startIndex = gtIndex + 1
    const endIndex = str.indexOf('</', startIndex)
    if (startIndex >= endIndex) return ''
    return str.substring(startIndex, endIndex)
  }
  return ''
}

export const getSimpleIconFromText = (
  slug: string,
  resText: string
): SimpleIcon => {
  return {
    slug,
    hex: extractHtmlProperty(resText, 'fill', '='),
    title: extractHtmlProperty(resText, 'title', '>'),
    path: extractHtmlProperty(resText, 'd', '='),
  }
}

export const fetchSimpleIconText = async (slug: string) => {
  const res = await fetch(`https://cdn.simpleicons.org/${slug}`)
  const text = await res.text()
  return text
}

const cache: Record<string, SimpleIcon> = {}

export const fetchSimpleIcons = async ({slugs}: {slugs: string[]}) => {
  const simpleIcons: Record<string, SimpleIcon> = {}
  const promises: Promise<void>[] = []
  for (const slug of slugs) {
    if (cache[slug]) {
      simpleIcons[slug] = cache[slug]
      continue
    }
    promises.push(
      fetchSimpleIconText(slug).then((text) => {
        const icon = getSimpleIconFromText(slug, text)
        simpleIcons[slug] = icon
      })
    )
  }
  await Promise.allSettled(promises)
  return {
    simpleIcons,
    allIcon: cache!,
  }
}

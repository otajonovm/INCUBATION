const apostrophePattern = /[\u2018\u2019\u0060\u00B4\u0027]/g

export function normalizeUzbekText(value) {
  if (typeof value !== 'string') {
    return value
  }

  return value.replace(apostrophePattern, 'ʻ')
}

export function normalizeContent(content) {
  if (Array.isArray(content)) {
    return content.map((item) => normalizeContent(item))
  }

  if (content && typeof content === 'object') {
    return Object.fromEntries(
      Object.entries(content).map(([key, value]) => [key, normalizeContent(value)]),
    )
  }

  return normalizeUzbekText(content)
}
/**
 * Parse content within square brackets [content]
 */
export function parseBracketContent(str: string, startIndex: number): { content: string, endIndex: number } | null {
  if (str[startIndex] !== '[')
    return null

  let index = startIndex + 1

  while (index < str.length) {
    if (str[index] === '\\' && index + 1 < str.length) {
      index += 2 // Skip escaped character
      continue
    }
    if (str[index] === ']') {
      const content = str.slice(startIndex + 1, index)
      return { content, endIndex: index + 1 }
    }
    index += 1
  }

  // No closing bracket found
  return null
}

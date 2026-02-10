import { kebabCase } from 'scule'
import { parseBracketContent } from './brackets'
import { searchProps } from './props'

const RE_BLOCK_NAME = /^[a-z$][$\w.-]*/i

/**
 * Parse `component-name [content] {.params}` from block params.
 */
export function parseBlockParams(str: string) {
  str = str.trim()
  if (!str)
    return { name: '' }
  const name = str.match(RE_BLOCK_NAME)?.[0]
  if (!name)
    throw new Error(`Invalid block params: ${str}`)

  let remaining = str.slice(name.length).trim()
  let content: string | undefined
  let props: [string, string][] | undefined
  let unparsedRemaining: string | undefined

  // Check for content in brackets [content]
  if (remaining.startsWith('[')) {
    const result = parseBracketContent(remaining, 0)
    if (result) {
      content = result.content
      remaining = remaining.slice(result.endIndex).trim()
    }
  }

  // Check for props in braces {.class}
  if (remaining.startsWith('{')) {
    const propsResult = searchProps(remaining, 0)
    if (propsResult) {
      props = propsResult.props
      const afterProps = remaining.slice(propsResult.index).trim()
      if (afterProps) {
        // There's text after the props
        unparsedRemaining = afterProps
      }
    }
  }
  else if (remaining) {
    // There's text but it's not props
    unparsedRemaining = remaining
  }

  const result: { name: string, content?: string, props?: [string, string][], remaining?: string } = {
    name: kebabCase(name),
  }

  if (content !== undefined) {
    result.content = content
  }

  if (props !== undefined) {
    result.props = props
  }

  if (unparsedRemaining) {
    result.remaining = unparsedRemaining
  }

  return result
}

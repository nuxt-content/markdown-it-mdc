import { JSON_SCHEMA, load } from 'js-yaml'

/**
 * Parse YAML content
 * @param content - The content to parse
 * @returns The parsed data
 */
export function parseYaml(content: string): Record<string, unknown> {
  return load(content, { schema: JSON_SCHEMA }) as Record<string, unknown>
}

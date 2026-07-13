'use strict'

module.exports = parseJsonPath

/* Minimal jsonpath parser,
 * replacing `jsonpath` which depended on `static-eval`
 * (CVE-2026-1615, arbitrary code execution from untrusted input).
 *
 * Only the subset used by bfj is supported:
 *   $.foo.bar    dot-notation properties
 *   $["foo"]     bracket-notation strings
 *   $[0]         numeric indices
 *   $[*]         wildcards
 *
 * Filter expressions, script expressions, recursive descent, slices, and negative indices
 * are all rejected.
 * No eval, no regex, no dynamic code.
 */

function parseJsonPath (selector) {
  if (typeof selector !== 'string' || selector.length === 0 || selector[0] !== '$') {
    throw new SyntaxError('Invalid jsonpath: must start with $')
  }

  const result = [ { expression: { type: 'root', value: '$' } } ]
  let position = 1

  if (position >= selector.length) {
    throw new SyntaxError('Invalid jsonpath: must have at least one segment after $')
  }

  while (position < selector.length) {
    const character = selector[position]

    if (character === '.') {
      position += 1
      if (position >= selector.length || selector[position] === '.') {
        throw new SyntaxError('Invalid jsonpath: unexpected character after dot')
      }

      const id = parseIdentifier(selector, position)
      result.push({ expression: { type: 'identifier', value: id.value }, operation: 'member', scope: 'child' })
      position = id.position
    } else if (character === '[') {
      position += 1
      const content = parseBracketContent(selector, position)
      result.push({ expression: content.expression, operation: 'subscript', scope: 'child' })

      position = content.position
      if (position >= selector.length || selector[position] !== ']') {
        throw new SyntaxError('Invalid jsonpath: unterminated bracket')
      }

      position += 1
    } else {
      throw new SyntaxError(`Invalid jsonpath: unexpected character "${character}"`)
    }
  }

  return result
}

function parseBracketContent (selector, position) {
  if (position >= selector.length) {
    throw new SyntaxError('Invalid jsonpath: unterminated bracket')
  }

  const character = selector[position]

  if (character === '*') {
    return { expression: { type: 'wildcard', value: '*' }, position: position + 1 }
  }

  if (character === '"' || character === "'") {
    const str = parseStringLiteral(selector, position)
    return { expression: { type: 'string_literal', value: str.value }, position: str.position }
  }

  if (isDigit(character)) {
    const num = parseNumericLiteral(selector, position)
    return { expression: { type: 'numeric_literal', value: num.value }, position: num.position }
  }

  throw new SyntaxError(`Invalid jsonpath: unexpected bracket content "${character}"`)
}

function parseIdentifier (selector, position) {
  const start = position

  if (position >= selector.length || !isIdentifierStart(selector[position])) {
    throw new SyntaxError('Invalid jsonpath: expected identifier')
  }

  position += 1

  while (position < selector.length && isIdentifier(selector[position])) {
    position += 1
  }

  return { value: selector.slice(start, position), position }
}

function parseNumericLiteral (selector, position) {
  const start = position

  while (position < selector.length && isDigit(selector[position])) {
    position += 1
  }

  return { value: parseInt(selector.slice(start, position), 10), position }
}

function parseStringLiteral (selector, position) {
  const quote = selector[position]
  position += 1
  const start = position

  while (position < selector.length && selector[position] !== quote) {
    if (selector[position] === '\\') {
      throw new SyntaxError('Invalid jsonpath: escape sequences in strings are not supported')
    }
    position += 1
  }

  if (position >= selector.length) {
    throw new SyntaxError('Invalid jsonpath: unterminated string')
  }

  const value = selector.slice(start, position)
  position += 1
  return { value, position }
}

function isDigit (character) {
  return character >= '0' && character <= '9'
}

function isIdentifier (character) {
  return (character >= 'a' && character <= 'z') ||
    (character >= 'A' && character <= 'Z') ||
    (character >= '0' && character <= '9') ||
    character === '_' ||
    character === '$'
}

function isIdentifierStart (character) {
  return (character >= 'a' && character <= 'z') ||
    (character >= 'A' && character <= 'Z') ||
    character === '_' ||
    character === '$'
}

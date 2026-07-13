'use strict'

const assert = require('chai').assert

const modulePath = '../../src/jsonpath'

suite('jsonpath:', () => {
  let parseJsonPath

  setup(() => {
    parseJsonPath = require(modulePath)
  })

  test('require does not throw', () => {
    assert.doesNotThrow(() => require(modulePath))
  })

  test('require returns function', () => {
    assert.isFunction(require(modulePath))
  })

  suite('valid paths:', () => {
    test('$.foo returns member identifier', () => {
      assert.deepEqual(parseJsonPath('$.foo'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: 'foo' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$.foo.bar returns chained members', () => {
      assert.deepEqual(parseJsonPath('$.foo.bar'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: 'foo' }, operation: 'member', scope: 'child' },
        { expression: { type: 'identifier', value: 'bar' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$[0] returns numeric subscript', () => {
      assert.deepEqual(parseJsonPath('$[0]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'numeric_literal', value: 0 }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$[42] returns numeric subscript', () => {
      assert.deepEqual(parseJsonPath('$[42]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'numeric_literal', value: 42 }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$["foo"] returns string subscript with double quotes', () => {
      assert.deepEqual(parseJsonPath('$["foo"]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'string_literal', value: 'foo' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test("$['foo'] returns string subscript with single quotes", () => {
      assert.deepEqual(parseJsonPath("$['foo']"), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'string_literal', value: 'foo' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$[*] returns wildcard subscript', () => {
      assert.deepEqual(parseJsonPath('$[*]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'wildcard', value: '*' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$.foo.bar[*] returns mixed path', () => {
      assert.deepEqual(parseJsonPath('$.foo.bar[*]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: 'foo' }, operation: 'member', scope: 'child' },
        { expression: { type: 'identifier', value: 'bar' }, operation: 'member', scope: 'child' },
        { expression: { type: 'wildcard', value: '*' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$._private returns identifier with underscore prefix', () => {
      assert.deepEqual(parseJsonPath('$._private'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: '_private' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$.$ref returns identifier with dollar prefix', () => {
      assert.deepEqual(parseJsonPath('$.$ref'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: '$ref' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$["foo"].bar returns bracket then dot chaining', () => {
      assert.deepEqual(parseJsonPath('$["foo"].bar'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'string_literal', value: 'foo' }, operation: 'subscript', scope: 'child' },
        { expression: { type: 'identifier', value: 'bar' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$[0][1] returns consecutive brackets', () => {
      assert.deepEqual(parseJsonPath('$[0][1]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'numeric_literal', value: 0 }, operation: 'subscript', scope: 'child' },
        { expression: { type: 'numeric_literal', value: 1 }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$[0].foo[*] returns bracket-dot-bracket chaining', () => {
      assert.deepEqual(parseJsonPath('$[0].foo[*]'), [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'numeric_literal', value: 0 }, operation: 'subscript', scope: 'child' },
        { expression: { type: 'identifier', value: 'foo' }, operation: 'member', scope: 'child' },
        { expression: { type: 'wildcard', value: '*' }, operation: 'subscript', scope: 'child' },
      ])
    })
  })

  suite('rejection:', () => {
    test('empty string throws', () => {
      assert.throws(() => parseJsonPath(''), /Invalid jsonpath/)
    })

    test('$ alone throws', () => {
      assert.throws(() => parseJsonPath('$'), /Invalid jsonpath/)
    })

    test('does not start with $ throws', () => {
      assert.throws(() => parseJsonPath('foo.bar'), /Invalid jsonpath/)
    })

    test('$..foo recursive descent throws', () => {
      assert.throws(() => parseJsonPath('$..foo'), /Invalid jsonpath/)
    })

    test('$.foo[?(@.bar)] filter expression throws', () => {
      assert.throws(() => parseJsonPath('$.foo[?(@.bar)]'), /Invalid jsonpath/)
    })

    test('$[(@.length-1)] script expression throws', () => {
      assert.throws(() => parseJsonPath('$[(@.length-1)]'), /Invalid jsonpath/)
    })

    test('$.foo[-1] negative index throws', () => {
      assert.throws(() => parseJsonPath('$.foo[-1]'), /Invalid jsonpath/)
    })

    test('$.foo[0:5] slice throws', () => {
      assert.throws(() => parseJsonPath('$.foo[0:5]'), /Invalid jsonpath/)
    })

    test('unterminated bracket throws', () => {
      assert.throws(() => parseJsonPath('$.foo[0'), /Invalid jsonpath/)
    })

    test('unterminated string throws', () => {
      assert.throws(() => parseJsonPath('$.foo["bar'), /Invalid jsonpath/)
    })

    test('$.123 identifier starting with digit throws', () => {
      assert.throws(() => parseJsonPath('$.123'), /Invalid jsonpath/)
    })

    test('backslash escape in double-quoted string throws', () => {
      assert.throws(() => parseJsonPath('$["foo\\"bar"]'), /Invalid jsonpath/)
    })

    test('backslash escape in single-quoted string throws', () => {
      assert.throws(() => parseJsonPath("$['it\\'s']"), /Invalid jsonpath/)
    })
  })

  suite('security:', () => {
    test('prototype traversal RCE parses without code execution', () => {
      assert.throws(() => parseJsonPath('$[?(@.constructor.constructor("return process")().exit())]'))
    })

    test('$.__proto__ parses to inert AST without code execution', () => {
      const result = parseJsonPath('$.__proto__')
      assert.deepEqual(result, [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: '__proto__' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$["__proto__"] parses to inert AST without code execution', () => {
      const result = parseJsonPath('$["__proto__"]')
      assert.deepEqual(result, [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'string_literal', value: '__proto__' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$.constructor parses to inert AST without code execution', () => {
      const result = parseJsonPath('$.constructor')
      assert.deepEqual(result, [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: 'constructor' }, operation: 'member', scope: 'child' },
      ])
    })

    test('$["constructor"] parses to inert AST without code execution', () => {
      const result = parseJsonPath('$["constructor"]')
      assert.deepEqual(result, [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'string_literal', value: 'constructor' }, operation: 'subscript', scope: 'child' },
      ])
    })

    test('$.prototype parses to inert AST without code execution', () => {
      const result = parseJsonPath('$.prototype')
      assert.deepEqual(result, [
        { expression: { type: 'root', value: '$' } },
        { expression: { type: 'identifier', value: 'prototype' }, operation: 'member', scope: 'child' },
      ])
    })

    test('eval injection in filter throws', () => {
      assert.throws(() => parseJsonPath('$[?(@.eval("process.exit()"))]'))
    })

    test('semicolon expression escape throws', () => {
      assert.throws(() => parseJsonPath('$.foo; process.exit()'))
    })

    test('newline expression escape throws', () => {
      assert.throws(() => parseJsonPath('$.foo\nprocess.exit()'))
    })

    test('CRLF injection throws', () => {
      assert.throws(() => parseJsonPath("$.foo\r\nrequire('child_process').exec('rm -rf /')"))
    })

    test('Function constructor in bracket throws', () => {
      assert.throws(() => parseJsonPath('$[new Function("return process")()]'))
    })

    test('eval in bracket throws', () => {
      assert.throws(() => parseJsonPath('$[eval("1")]'))
    })

    test('bracket injection attempt throws', () => {
      assert.throws(() => parseJsonPath('$.foo](malicious)[bar'))
    })
  })
})

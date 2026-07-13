'use strict'

const assert = require('chai').assert
const { Readable } = require('stream')

const bfj = require('../src')

const ELEMENT_COUNT = 1_000_000

suite('memory:', () => {
  test('walk does not OOM on large array', function (done) {
    this.timeout(120_000)

    const json = `[${new Array(ELEMENT_COUNT).fill('1').join(',')}]`
    const stream = new Readable()
    stream._read = () => {}
    stream.push(json)
    stream.push(null)

    let count = 0
    const baselineRss = process.memoryUsage().rss
    const emitter = bfj.walk(stream)

    emitter.on('num', () => { count++ })
    emitter.on('err', done)
    emitter.on('err-data', (err) => done(err))
    emitter.on('end', () => {
      const peakRss = process.memoryUsage().rss
      const growth = peakRss - baselineRss
      assert.strictEqual(count, ELEMENT_COUNT)
      assert.isBelow(growth, 512 * 1024 * 1024, `RSS grew by ${(growth / 1024 / 1024).toFixed(0)} MB`)
      done()
    })
  })

  test('eventify does not OOM on large array', function (done) {
    this.timeout(120_000)

    const data = new Array(ELEMENT_COUNT).fill(1)

    let count = 0
    const baselineRss = process.memoryUsage().rss
    const emitter = bfj.eventify(data)

    emitter.on('num', () => { count++ })
    emitter.on('err', done)
    emitter.on('err-data', (err) => done(err))
    emitter.on('end', () => {
      const peakRss = process.memoryUsage().rss
      const growth = peakRss - baselineRss
      assert.strictEqual(count, ELEMENT_COUNT)
      assert.isBelow(growth, 512 * 1024 * 1024, `RSS grew by ${(growth / 1024 / 1024).toFixed(0)} MB`)
      done()
    })
  })
})

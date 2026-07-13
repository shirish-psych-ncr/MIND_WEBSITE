# isomorphic-image-size 📸📏
[![badge of current npm version](https://badgen.net/npm/v/isomorphic-image-size)](https://www.npmjs.com/package/isomorphic-image-size) [![badge of minified + gzip size](https://badgen.net/bundlephobia/minzip/isomorphic-image-size)](https://bundlephobia.com/package/isomorphic-image-size)

> Get image size without rendering. Supported image types: JPG, GIF, PNG, WebP, BMP, TIFF, SVG, PSD, ICO, AVIF, HEIC, HEIF.

Key features:
- Zero dependencies
- Tiny size, 4KB gzipped
- Isomorphic, works both in browser and node without changing anything
- Extracts orientation value when available

This code is an ES Module fork of [probe-image-size](https://github.com/nodeca/probe-image-size) and inspired by enhancements from [image-sizer](https://github.com/mfish33/image-sizer).

## Usage

```shell
npm install isomorphic-image-size
```

```js
import sizer from 'isomorphic-image-size'

const res = await fetch('http://example.com/image.jpg')
const data = await res.arrayBuffer()
const sizeInfo = sizer(data)
console.log(sizeInfo); // =>
/*
  {
    width: xx,
    height: yy,
    type: 'jpg',
    mime: 'image/jpeg',
    wUnits: 'px',
    hUnits: 'px',
  }
*/

// If you know the type of image you can run sizer with an extension
let sizeInfo = sizer(data, 'jpg')
console.log(sizeInfo); // =>
/*
  {
    width: xx,
    height: yy,
    type: 'jpg',
    mime: 'image/jpeg',
    wUnits: 'px',
    hUnits: 'px',
  }
*/
```

## Similar projects

- [image-size](https://github.com/netroy/image-size)
- [probe-image-size](https://github.com/nodeca/probe-image-size)
- [image-sizer](https://github.com/mfish33/image-sizer)

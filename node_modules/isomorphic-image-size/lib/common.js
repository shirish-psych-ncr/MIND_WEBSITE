
export function sliceEq(src, start, dest) {
  for (var i = start, j = 0; j < dest.length;) {
    if (src[i++] !== dest[j++]) return false;
  }
  return true;
}

export function str2arr(str, format) {
  var arr = [], i = 0;

  if (format && format === 'hex') {
    while (i < str.length) {
      arr.push(parseInt(str.slice(i, i + 2), 16));
      i += 2;
    }
  } else {
    for (; i < str.length; i++) {
      /* eslint-disable no-bitwise */
      arr.push(str.charCodeAt(i) & 0xFF);
    }
  }

  return arr;
}

export function readUInt16LE(data, offset) {
  return data[offset] | (data[offset + 1] << 8);
}

export function readUInt16BE(data, offset) {
  return data[offset + 1] | (data[offset] << 8);
}

export function readUInt32LE(data, offset) {
  return data[offset] |
    (data[offset + 1] << 8) |
    (data[offset + 2] << 16) |
    (data[offset + 3] * 0x1000000);
}

export function readUInt32BE(data, offset) {
  return data[offset + 3] |
    (data[offset + 2] << 8) |
    (data[offset + 1] << 16) |
    (data[offset] * 0x1000000);
}


export function ProbeError(message, code, statusCode) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;

  this.message = message;
  if (code) this.code = code;
  if (statusCode) this.statusCode = statusCode;
}

// Inherit from Error
ProbeError.prototype = Object.create(Error.prototype);
ProbeError.prototype.constructor = ProbeError;

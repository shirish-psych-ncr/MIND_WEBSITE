import * as parsers from './lib/parsers_sync.js';

function getParserForExtension(ext) {
  if (ext === 'jpg') return 'jpeg';
  if (ext === 'heic' || ext === 'heif') return 'avif';
  return ext;
}

export default function get_image_size(data, ext) {
  const parser_names = Object.keys(parsers);

  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data);
  }

  if (ext) {
    const parser = parsers[getParserForExtension(ext.toLowerCase())];
    if (!parser) throw new Error(`Unsupported file type ${ext}`);
    return parser(data) || null;
  }

  for (var i = 0; i < parser_names.length; i++) {
    const result = parsers[parser_names[i]](data);

    if (result) return result;
  }

  return null;
}

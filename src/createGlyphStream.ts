import { ReadStream, createReadStream } from "fs";
import { TConfig } from "./util";

export type TNumberRange = { min: number; max: number };
type ReadStreamWithMetaData = ReadStream & { metadata: any };

/**
 * Get unicode array from range
 * @param range
 */
function getUnicodeArrayFromRange(range: TNumberRange): Array<string> {
  const chars = [];
  for (let point = range.min; point <= range.max; point++) {
    chars.push(String.fromCodePoint(point));
  }
  return chars;
}

/**
 * Get an stream of glyphs
 *
 * @param range
 * @param iconPath
 * @param name
 */
export function createGlyphStream(config: TConfig): ReadStream {
  const unicode = getUnicodeArrayFromRange(config.numberRange);
  const shapePath = config.assetPath.shape;

  const stream = createReadStream(shapePath) as ReadStreamWithMetaData;
  stream.metadata = { unicode, name: config.shape };

  return stream;
}

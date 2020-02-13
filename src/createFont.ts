import * as SvgToFont from "svgicons2svgfont";

import { getConfiguration, ensureDirecory, TConfig } from "./util";
import { createWriteStream } from "fs";
import { writeCss } from "./css";
import { convertFonts } from "./convert";
import { createGlyphStream } from "./createGlyphStream";

export function createFont(config: TConfig): Promise<void> {
  ensureDirecory(config.outPath.dist);

  return new Promise((resolve, reject) => {
    const svgFontStream = new SvgToFont({
      fontName: config.fontName,
      fontHeight: 2000,
      normalize: true
    });

    svgFontStream
      .pipe(createWriteStream(config.outPath.svg))
      .on("finish", () => {
        console.log(
          `|> shape: ${config.shape} / range: ${config.unicodeRange}`
        );
        process.stdout.write("|> svg ✓ ");
        convertFonts(config);
        resolve();
      })
      .on("error", (err: Error) => reject(err));

    const glyphs = createGlyphStream(config);
    svgFontStream.write(glyphs);
    svgFontStream.end();
  });
}

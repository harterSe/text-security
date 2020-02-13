import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { TNumberRange } from "./createGlyphStream";

export function ensureDirecory(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

export type TConfig = {
  fontName: string;
  fontBaseName: string;
  shape: string;
  unicodeRange: string;
  numberRange: TNumberRange;
  assetPath: {
    styleTpl: string;
    shape: string;
  };
  outPath: {
    dist: string;
    svg: string;
    ttf: string;
    eot: string;
    woff: string;
    woff2: string;
    css: string;
    combinedCss: string;
  };
};

export function getConfiguration(
  fontBaseName: string,
  shape: string,
  unicodeRange: string,
  dist: string
): TConfig {
  const fontName = `${fontBaseName}-${shape}-${unicodeRange}`;

  const distPath = join(__dirname, "..", dist);

  const svg = join(distPath, `${fontName}.svg`);
  const ttf = join(distPath, `${fontName}.ttf`);
  const eot = join(distPath, `${fontName}.eot`);
  const woff = join(distPath, `${fontName}.woff`);
  const woff2 = join(distPath, `${fontName}.woff2`);
  const css = join(distPath, `${fontName}.css`);
  const combinedCss = join(distPath, `${fontBaseName}.css`);

  const assetPath = join(__dirname, "..", "assets");
  const styleTpl = join(assetPath, "style-template.css.tpl");
  const shapePath = join(assetPath, `${shape}.svg`);

  const numberRange = unicodeToNumberRange(unicodeRange);

  return {
    fontName,
    fontBaseName,
    shape,
    unicodeRange,
    numberRange,
    assetPath: { styleTpl, shape: shapePath },
    outPath: { dist: distPath, svg, ttf, eot, woff, woff2, css, combinedCss }
  };
}

function unicodeToNumberRange(range: string): TNumberRange {
  const [start, end] = range.replace("U+", "").split("-");

  return {
    min: parseInt(start, 16),
    max: parseInt(end, 16)
  };
}

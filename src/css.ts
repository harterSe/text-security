import { writeFileSync, readFileSync } from "fs";
import { TConfig } from "./util";

function getStyle(config: TConfig): string {
  return readFileSync(config.assetPath.styleTpl, "utf-8")
    .replace(/{{baseName}}/g, config.fontBaseName)
    .replace(/{{shape}}/g, config.shape)
    .replace(/{{range}}/g, config.unicodeRange);
}

export function writeCss(config: TConfig): void {
  const style = getStyle(config);
  writeFileSync(config.outPath.css, style);
}

export function writeCombinedCss(configs: TConfig[]): void {
  const style = configs.reduce(
    (style, config) => style + getStyle(config) + "\n",
    ""
  );

  writeFileSync(configs[0].outPath.combinedCss, style);
}

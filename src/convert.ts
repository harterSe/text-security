import * as svg2ttf from "svg2ttf";
import * as ttf2eot from "ttf2eot";
import * as ttf2woff from "ttf2woff";
import * as ttf2woff2 from "ttf2woff2";
import { readFileSync, writeFileSync } from "fs";
import { TConfig } from "./util";

function convert_svg_2_ttf(inPath: string, outPath: string): void {
  const ttf = svg2ttf(readFileSync(inPath, "utf-8"), {});
  writeFileSync(outPath, Buffer.from(ttf.buffer), "utf-8");
}

function convert_ttf_2_oet(inPath: string, outPath: string): void {
  const eot = ttf2eot(readFileSync(inPath));
  writeFileSync(outPath, Buffer.from(eot.buffer), "utf-8");
}

function convert_ttf_2_woff(inPath: string, outPath: string): void {
  const woff = ttf2woff(readFileSync(inPath), {});
  writeFileSync(outPath, Buffer.from(woff.buffer), "utf-8");
}

function convert_ttf_2_woff2(inPath: string, outPath: string): void {
  const woff2 = ttf2woff2(readFileSync(inPath), {});
  writeFileSync(outPath, Buffer.from(woff2.buffer), "utf-8");
}

export function convertFonts(config: TConfig): void {
  const { svg, ttf, eot, woff, woff2 } = config.outPath;

  convert_svg_2_ttf(svg, ttf);
  process.stdout.write(" ttf ✓ ");

  convert_ttf_2_oet(ttf, eot);
  process.stdout.write(" eot ✓ ");

  convert_ttf_2_woff(ttf, woff);
  process.stdout.write(" woff ✓ ");

  convert_ttf_2_woff2(ttf, woff2);
  process.stdout.write(" woff2 ✓ \n");
}

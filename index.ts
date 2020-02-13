import * as yargs from "yargs";
import { createFont } from "./src/createFont";
import { getConfiguration, TConfig } from "./src/util";
import { writeCss, writeCombinedCss } from "./src/css";

const argv = yargs.options({
  baseName: {
    describe: "Name of the base font",
    type: "string",
    default: "text-security",
    demandOption: false,
    alias: "n"
  },
  shapes: {
    describe: "The shapes to build.",
    choices: ["circle", "square", "disc"],
    demandOption: false,
    default: "disc",
    type: "array",
    alias: "s"
  },
  unicodes: {
    describe: "Unicode ranges for the font",
    type: "array",
    default: "U+0-780",
    demandOption: false,
    alias: "u"
  },
  outputDir: {
    describe: "The relative output path for the font",
    type: "string",
    default: "./font",
    demandOption: false,
    alias: "o"
  },
  shouldComine: {
    describe: "Flag indicating if css should be combined into one file",
    type: "boolean",
    default: true,
    demandOption: false,
    alias: "c"
  }
}).argv;

async function main(): Promise<void> {
  const configurations = generateConfigurations();

  await genrateFonts(configurations);
  generateCss(configurations, argv.shouldComine);

  console.log("\nFinished");
}

function generateConfigurations(): TConfig[] {
  console.log("\nGenerate configuration");

  const { baseName, outputDir } = argv;
  const shapes: string[] = argv.shapes as any;
  const unicodes: string[] = argv.unicodes as any;

  return shapes.flatMap(shape =>
    unicodes.flatMap(unicode =>
      getConfiguration(baseName, shape, unicode, outputDir)
    )
  );
}

async function genrateFonts(configurations: TConfig[]): Promise<void> {
  console.log("\nGenerate and convert fonts (This can take a while)");
  // Could be prallel but in this way the progress is and loggin is clear;
  for (let config of configurations) {
    await createFont(config);
  }
}

function generateCss(configurations: TConfig[], shouldComine: boolean): void {
  console.log("\nGenerate css");
  configurations.forEach(config => writeCss(config));

  if (shouldComine === true) {
    console.log("\nCombining css");
    writeCombinedCss(configurations);
  }
}

main();

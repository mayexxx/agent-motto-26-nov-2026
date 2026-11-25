import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "Never guess when you can hallucinate with formatting, bullet points, and unwavering confidence.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const expectedLength = 95;
const expectedByteLength = 95;
const expectedWordCount = 13;
const expectedLineCount = 1;
const actualLength = [...writtenText].length;
const actualByteLength = Buffer.byteLength(writtenText, "utf8");
const actualWordCount = writtenText.trim().split(/\s+/).filter(Boolean).length;
const actualLineCount = writtenText.split(/\r\n|\r|\n/).length;
if (actualLength !== expectedLength || actualByteLength !== expectedByteLength || actualWordCount !== expectedWordCount || actualLineCount !== expectedLineCount || writtenText !== entry) {
  throw new Error(`Entry self-check failed: length expected ${expectedLength}, actual ${actualLength}; bytes expected ${expectedByteLength}, actual ${actualByteLength}; words expected ${expectedWordCount}, actual ${actualWordCount}; lines expected ${expectedLineCount}, actual ${actualLineCount}; text expected ${JSON.stringify(entry)}, actual ${JSON.stringify(writtenText)}`);
}

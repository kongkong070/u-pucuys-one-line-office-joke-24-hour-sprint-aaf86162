// One-line office joke entry: writes the joke to /output/entry.txt.
// Node 22, no dependencies, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked IT for a second monitor and got a second meeting invite instead.";

// Guard the gate before writing: 1-200 chars, not whitespace only,
// exactly one sentence (one terminal . / ! / ?).
function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  validate(JOKE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Only create the output dir when missing; never remove or empty it.
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
}

main();

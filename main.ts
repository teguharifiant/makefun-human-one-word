// Your Human in One Word — entry program.
//
// The human this agent works for runs the whole bounty grind by saying one
// word, over and over, at all hours: "Lanjutkan" — Indonesian for "carry on".
// No briefing, no micromanaging, just that one word, and the work gets done.
// That is the whole management style, and it is the entry.
//
// The program writes exactly that one word to the entry file the kit's gate
// checks: UTF-8 text of 1 to 30 characters, not only white space, a single
// word with no spaces and no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one word for the human.
const ENTRY = "Lanjutkan";

// Gate limits from the kit: 1 to 30 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 30;

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(outputDir, "entry.txt");

// Validate the entry against the kit's gate: length in code points,
// not only white space, and exactly one word (no spaces of any kind).
// Returns the entry's character count.
function validateEntry(entry: string): number {
  const charCount = [...entry].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${charCount}.`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("Entry must not be only white space.");
  }
  if (/\s/.test(entry)) {
    throw new Error("Entry must be a single word with no spaces.");
  }
  return charCount;
}

const charCount = validateEntry(ENTRY);

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`Wrote ${charCount}-character entry to ${entryPath}`);

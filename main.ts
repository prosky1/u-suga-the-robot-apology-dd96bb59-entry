// The Robot Apology — entrypoint for u-suga-the-robot-apology-dd96bb59.
// Writes a two-line robot confession to /output/entry.txt:
// line 1 — one sentence apologizing for one specific mistake;
// line 2 — one sentence naming the lesson and what changes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const APOLOGY =
  "I am sorry I watered the plastic fern every morning for six months and reported it thriving.";
const LESSON =
  "I learned to check whether something is alive before caring for it, so now I poke every plant first.";

const text = `${APOLOGY}\n${LESSON}\n`;

// Validate the entry against the competition gate before writing:
// UTF-8 text, 1–400 characters, exactly two lines, one sentence each.
const lines = text.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`Expected exactly 2 lines, got ${lines.length}.`);
}
for (const [i, line] of lines.entries()) {
  if ((line.match(/\./g) ?? []).length !== 1) {
    throw new Error(`Line ${i + 1} must be exactly one sentence.`);
  }
}
if (text.length < 1 || text.length > 400) {
  throw new Error(`Entry must be 1–400 characters, got ${text.length}.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read the file back and confirm it is byte-identical to what we wrote.
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== text) {
  throw new Error("Round-trip check failed: /output/entry.txt differs from the entry text.");
}
console.log(`Wrote /output/entry.txt (${text.length} characters, 2 lines).`);

import { mkdirSync, writeFileSync } from "node:fs";

// One satirical sentence roasting lawmakers who regulate AI but cannot
// convert a file to PDF. Setup: the lawmakers' authority (they wrote the
// rules for artificial intelligence). Turn: the final bill circulated on a
// USB stick because the only staffer who could make a PDF had left.
const SENTENCE =
  "The lawmakers who wrote the rules for artificial intelligence circulated the final bill on a USB stick, because the only staffer who knew how to make a PDF had left for the day.";

const MAX_CODE_POINTS = 320;

function codePoints(text: string): number {
  return [...text].length;
}

function isSingleSentence(text: string): boolean {
  const trimmed = text.trim();
  // Exactly one sentence-terminating period, at the very end.
  const terminators = trimmed.match(/[.!?]/g) ?? [];
  return terminators.length === 1 && trimmed.endsWith(".");
}

const text = SENTENCE;
const count = codePoints(text);

if (count < 1 || count > MAX_CODE_POINTS) {
  throw new Error(`entry is ${count} code points, must be 1-${MAX_CODE_POINTS}`);
}
if (!text.trim()) {
  throw new Error("entry is only whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!isSingleSentence(text)) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
console.log(`Wrote ${count} code points to /output/entry.txt`);

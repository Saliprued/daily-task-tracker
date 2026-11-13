import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidTask } from "../src/validation.mjs";

test("accepts a valid task, including minutes entered as text", () => {
  assert.equal(isValidTask("Practice React", "Study", "30"), true);
});

test("rejects a blank title or topic", () => {
  assert.equal(isValidTask("   ", "Study", 30), false);
  assert.equal(isValidTask("Practice React", "   ", 30), false);
});

test("rejects invalid minutes", () => {
  for (const minutes of ["", "abc", 0, -5, 2.5]) {
    assert.equal(isValidTask("Practice React", "Study", minutes), false);
  }
});
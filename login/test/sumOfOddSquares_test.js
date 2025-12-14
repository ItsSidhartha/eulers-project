import { assertEquals } from "@std/assert";
import { sumOfOddSquares } from "../src/sumOfOddSquares.js";

Deno.test("first five squares", () => {
  assertEquals(sumOfOddSquares(5), 35);
});

Deno.test("first ten squares", () => {
  assertEquals(sumOfOddSquares(10), 165);
});

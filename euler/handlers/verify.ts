import { getAnswer } from "../do_not_open/decript.ts";
import { Handler } from "../models.ts";
import { run } from "./run.ts";

const isCorrectAnswer = async (id: string, answer: string): Promise<boolean> => {
  const correctAnswer = await getAnswer(id);
  return correctAnswer === answer;
}

export const  verify: Handler = async ({ id, answer }) => {
  const ans = answer ? answer : (await run({ id })).trim();
  console.log("Given answer --", ans);

  return await isCorrectAnswer(id, ans) ? "Correct Answer" : "Wrong Answer";
}
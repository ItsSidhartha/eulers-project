import { Command } from "commander";
import { run } from "../handlers/run.ts";

export const runCommand = new Command('run')
  .alias('RUN')
  .description('Runs the problem with given Id')
  .argument('<id>', 'Id of the problem')
  .action(async (id) => {
    try {
      const answer = await run({ id });
      console.log("Answer To Question No.", id, "is", answer);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else throw error;
    }
  });
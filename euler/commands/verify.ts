import { Command } from "commander";
import { verify } from "../handlers/verify.ts";

export const verifyCommand = new Command('verify')
  .alias('VERIFY')
  .description('verifies the problem with given Id and answer (if not given, runs the solution associated with the id and verifies)')
  .argument('<id>', 'Id of the problem')
  .argument('[answer]', 'Answer to the problem (Will run the solution associated with the id if not given and verify)')
  .action(async (id, answer) => {
    const result = await verify({ id, answer });
    console.log(result);
  });
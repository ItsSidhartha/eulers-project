import { Command } from "commander";
import { verify } from "../handlers/verify.ts";


export const verifyCommand = new Command('VERIFY')
  .description('Runs the problem with given Id')
  .argument('<id>', 'Id of the problem')
  .argument('<answer>', 'Anser to the problem (Will run the solution to assosiated with the id if not given and verify)')
  .action(async (id, answer) => {
    const result = await verify({ id, answer });
    console.log(result);
  });
import { Command } from "commander";
import { create } from "../handlers/create.ts";

export const createCommand = new Command('CREATE')
  .description('Creates Directory Struction Problem')
  .argument('<id>', 'Id of the problem')
  .action(async (id) => {
    await create({ id });
  });
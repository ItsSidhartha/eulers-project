import { Command } from "commander";
import { create } from "../handlers/create.ts";

export const createCommand = new Command('create')
  .alias('CREATE')
  .description('Creates Directory Structure for Problem')
  .argument('<id>', 'Id of the problem')
  .action(async (id) => {
    await create({ id });
  });
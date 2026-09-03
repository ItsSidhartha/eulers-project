// import { create } from "./handlers/create.ts";
// import { run } from "./handlers/run.ts";
// import { verify } from "./handlers/verify.ts";
// import { Command, Handler } from "./models.ts";
// import { parse } from "./parse.ts";
import { Command } from 'commander';
import { createCommand } from "./commands/create.ts";
import { runCommand } from "./commands/run.ts";
import { verifyCommand } from "./commands/verify.ts";
// export const HANDLERS: Record<Command, Handler> = {
//   CREATE: create,
//   RUN: run,
//   VERIFY: verify
// }

const main = (args: string[]) => {
  const program = new Command();

  program
    .name("euler")
    .description("A CLI tool to initiate run verify euler project problems")
    .version("1.0.0");


  program.addCommand(createCommand);
  program.addCommand(runCommand);
  program.addCommand(verifyCommand);

  program.parse(args, {from: "user"});

  // try {
  //   console.log("Parsing args");
  //   const { command, args } = parse(denoArgs);
  //   console.log("Executing", command);
  //   const res = await HANDLERS[command](args);
  //   console.log(res);
  // } catch (e) {
  //   const error = e as Error;
  //   console.log(error.message);
  // }
}

main(Deno.args)

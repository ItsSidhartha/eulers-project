import { create } from "./handlers/create.ts";
import { run } from "./handlers/run.ts";
import { verify } from "./handlers/verify.ts";
import { Command, Handler } from "./models.ts";
import { parse } from "./parse.ts";

export const HANDLERS: Record<Command, Handler> = {
  CREATE: create,
  RUN: run,
  VERIFY: verify
}

const main = async (denoArgs: string[]) => {
  try {
    console.log("Parsing args");
    const { command, args } = parse(denoArgs);
    console.log("Executing", command);
    const res = await HANDLERS[command](args);
    console.log(res);
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
}

main(Deno.args)

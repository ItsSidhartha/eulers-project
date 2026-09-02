import { HANDLERS } from "./euler.ts";
import { Command, HandlerArgs } from "./models.ts";

export const parse = (args: string[]): { command: Command; args: HandlerArgs; } => {
  const [command, id, answer] = args as [Command, ...string[]];

  if (!Object.keys(HANDLERS).includes(command)) throw new Error("Unknown Command");
  return { command, args: { id, answer } };
};

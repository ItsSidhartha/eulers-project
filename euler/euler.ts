import { htmlToMarkdown } from "../euler/html_to_md.ts";

const BASEPATH = "/Users/sidharthamaji/personal/eulers-project"

export const fetchDescription = async (id: string) => {
  const URL = `https://projecteuler.net/minimal=${id}`;
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error Fetching Problem Description");
  return await res.text();
}

const parseTitle = (problems: string, id: string): string => {
  const questions = problems.split("\n");
  for (const question of questions) {
    const [qId, title] = question.split("##");
    if (qId === id) return title;
  }

  throw new Error(`No Problem Found with id ${id}`);
}

const fetchTitle = async (id: string) => {
  const URL = `https://projecteuler.net/minimal=problems`;
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error Fetching problems")
  const problems = await res.text();

  return parseTitle(problems, id);
}

const toSnakeCase = (title: string) => title.toLowerCase().split(/[- ]/).join("_");

const formateFileName = (id: string, title: string): string => `${BASEPATH}/${id}_${toSnakeCase(title)}`;

export const prepareDirName = async (id: string) => {
  const title = await fetchTitle(id);
  return formateFileName(id, title);
}

const defaultContent = () => Deno.readTextFile("./default-content.txt");

const create: Handler = async ({ id }) => {
  console.log("Fetching Description");
  const questionDescription = await fetchDescription(id);
  console.log("Creating FileName");
  const dirName = await prepareDirName(id);

  console.log("Creating Directory", dirName);

  await Deno.mkdir(dirName, { recursive: true });

  const description = htmlToMarkdown(questionDescription);

  console.log("Writing problem.md and solution.ts");

  Deno.writeTextFileSync(`${dirName}/solution.ts`, await defaultContent(), { createNew: true });
  const problemFileName = `${dirName}/problem.md`;
  Deno.writeTextFileSync(problemFileName, description);

  console.log("Opening", problemFileName);

  const { success } = await new Deno.Command("Code", { args: [problemFileName] }).output();
  if (!success) console.log("Failed to open", problemFileName);

  return `${dirName} Created with Problem and solution file`;
};

const createFileName = (dir: string) => `${dir}/solution.ts`;

const run: Handler = async ({ id }) => {
  const path = "/Users/sidharthamaji/personal/eulers-project";
  const decoder = new TextDecoder();
  console.log("Preparing directory name");

  const requiredPath = await prepareDirName(id);
  console.log("Searching For Directory in Path -", path);

  for await (const { isDirectory, name } of Deno.readDir(path)) {
    if (isDirectory && name === requiredPath) {
      console.log("Directory Found");
      console.log("Executing the solution for", name);
      const fileToExec = createFileName(name);
      const { stdout, success, stderr } = await new Deno.Command("deno", { args: ["-A", fileToExec] }).output();

      console.log(`\n<${"-".repeat(25)}X${"-".repeat(25)}>\n`);

      if (success) return decoder.decode(stdout);
      throw new Error(decoder.decode(stderr));
    }
  }

  throw new Error(`No Such Directory Exists - ${requiredPath}`);
}

const parse = (args: string[]): { command: Command, args: HandlerArgs } => {
  const [command, id] = args as [Command, string];
  if (!Object.keys(HANDLERS).includes(command)) throw new Error("Unknown Command");
  return { command, args: { id } };
}

type HandlerArgs = Record<string, string>

type Handler = (args: HandlerArgs) => Promise<string>

type Command = "CREATE" | "RUN";

const HANDLERS: Record<Command, Handler> = {
  CREATE: create,
  RUN: run
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

import { Handler } from "../models.ts";
import { prepareDirName, resolvePath } from "../utils.ts";

const createFileName = (dir: string) => `${dir}/solution.ts`;

type SolutionFn = () => string | Promise<string>;

const execute = async (filePath: string) => {
  const { main } = await import(filePath);
  return main();
}

export const run: Handler = async ({ id }) => {
  const path = "/Users/sidharthamaji/personal/eulers-project";
  console.log("Preparing directory name");

  const requiredPath = await prepareDirName(id);
  console.log(`Searching For Directory ${requiredPath} in Path - ${path}`);
  for await (const { isDirectory, name } of Deno.readDir(path)) {
    if (isDirectory && name === requiredPath) {
      console.log("Directory Found");
      console.log("Executing the solution for", name);
      const fileToExec = createFileName(name);
      let answer;
      try {
        answer = await execute(resolvePath(fileToExec));
      } catch (e) {
        console.log(e);

        throw new Error(`Could not Execute ${fileToExec}`);
      }
      console.log(`\n<${"-".repeat(25)}X${"-".repeat(25)}>\n`);

      if (answer) return answer;
      throw new Error("No Answer Found");
    }
  }

  throw new Error(`No Such Directory Exists - ${requiredPath}`);
}

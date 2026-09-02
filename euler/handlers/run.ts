import { Handler } from "../models.ts";
import { prepareDirName, resolvePath } from "../utils.ts";

const createFileName = (dir: string) => `${dir}/solution.ts`;

export const run: Handler = async ({ id }) => {
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
      const { stdout, success, stderr } = await new Deno.Command("deno", { args: ["-A", resolvePath(fileToExec)] }).output();

      console.log(`\n<${"-".repeat(25)}X${"-".repeat(25)}>\n`);

      if (success) return decoder.decode(stdout);
      throw new Error(decoder.decode(stderr));
    }
  }

  throw new Error(`No Such Directory Exists - ${requiredPath}`);
}

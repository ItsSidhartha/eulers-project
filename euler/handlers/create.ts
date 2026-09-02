import { htmlToMarkdown } from "../html_to_md.ts";
import { Handler } from "../models.ts";
import { defaultContent, fetchDescription, prepareDirName, resolvePath } from "../utils.ts";

export const create: Handler = async ({ id }) => {
  console.log("Fetching Description");
  const questionDescription = await fetchDescription(id);
  console.log("Creating FileName");
  const dirName = await prepareDirName(id);

  console.log("Creating Directory", dirName);

  const resolvedDirPath = resolvePath(dirName);
  await Deno.mkdir(resolvedDirPath, { recursive: true });

  const description = htmlToMarkdown(questionDescription);

  console.log("Writing problem.md and solution.ts");

  Deno.writeTextFileSync(`${resolvedDirPath}/solution.ts`, await defaultContent(), { createNew: true });
  const problemFileName = `${resolvedDirPath}/problem.md`;
  Deno.writeTextFileSync(problemFileName, description);

  console.log("Opening", problemFileName);

  const { success } = await new Deno.Command("Code", { args: [problemFileName] }).output();
  if (!success) console.log("Failed to open", problemFileName);

  return `${dirName} Created with Problem and solution file`;
};

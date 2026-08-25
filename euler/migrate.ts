import { fetchDescription, prepareDirName } from "./euler.ts";
import { htmlToMarkdown } from "./html_to_md.ts";

const ROOT_DIR = new URL("..", import.meta.url).pathname;
const LOOSE_SOLUTION = /^(\d+)_.+\.(js|ts)$/;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const findLooseSolutions = async () => {
  const matches: { fileName: string; id: string }[] = [];
  for await (const entry of Deno.readDir(ROOT_DIR)) {
    const match = entry.isFile && entry.name.match(LOOSE_SOLUTION);
    if (!match) continue;
    matches.push({ fileName: entry.name, id: String(Number(match[1])) });
  }
  return matches.sort((a, b) => Number(a.id) - Number(b.id));
};

const alreadyMigrated = async (dirName: string) => {
  try {
    return (await Deno.stat(dirName)).isDirectory;
  } catch {
    return false;
  }
};

const migrate = async ({ fileName, id }: { fileName: string; id: string }, dryRun: boolean) => {
  // prepareDirName() already returns an absolute path (it prepends BASEPATH internally).
  const dirName = await prepareDirName(id);

  if (await alreadyMigrated(dirName)) {
    console.log(`Skipping ${fileName} - ${dirName} already exists`);
    return;
  }

  console.log(`${dryRun ? "[dry-run] " : ""}Migrating ${fileName} -> ${dirName}/solution.ts`);
  if (dryRun) return;

  const description = htmlToMarkdown(await fetchDescription(id));
  await Deno.mkdir(dirName, { recursive: true });
  await Deno.writeTextFile(`${dirName}/problem.md`, description);
  await Deno.rename(`${ROOT_DIR}${fileName}`, `${dirName}/solution.ts`);
};

const main = async () => {
  const dryRun = Deno.args.includes("--dry-run");
  const solutions = await findLooseSolutions();
  console.log(`Found ${solutions.length} loose solution file(s)`);

  for (const solution of solutions) {
    try {
      await migrate(solution, dryRun);
    } catch (e) {
      console.log(`Failed to migrate ${solution.fileName}:`, (e as Error).message);
    }
    if (!dryRun) await sleep(300);
  }
};

main();

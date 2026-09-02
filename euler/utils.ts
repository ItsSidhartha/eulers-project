const BASEPATH = "/Users/sidharthamaji/personal/eulers-project"
const DEFAULT_CONTENT_PATH = "/Users/sidharthamaji/personal/eulers-project/euler/default-content.txt"

export const resolvePath = (path: string) => `${BASEPATH}/${path}`;

export const defaultContent = () => Deno.readTextFile(DEFAULT_CONTENT_PATH);

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

const formateFileName = (id: string, title: string): string => `${id}_${toSnakeCase(title)}`;

export const prepareDirName = async (id: string) => {
  const title = await fetchTitle(id);
  return formateFileName(id, title);
}

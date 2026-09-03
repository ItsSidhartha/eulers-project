const decryptAnswers = async (
  encryptedFilePath: string,
  password: string,
): Promise<string> => {
  const encrypted = await Deno.readFile(encryptedFilePath);

  const header = new TextDecoder().decode(encrypted.slice(0, 8));

  if (header !== "Salted__") {
    throw new Error("Invalid OpenSSL encrypted file");
  }

  const salt = encrypted.slice(8, 16);
  const ciphertext = encrypted.slice(16);

  const passwordBytes = new TextEncoder().encode(password);

  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 200_000,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-CBC",
      length: 256,
    },
    false,
    ["decrypt"],
  );

  const ivHex = Deno.readTextFileSync("/Users/sidharthamaji/personal/eulers-project/euler/do_not_open/iv.txt").trim();

  if (!ivHex) {
    throw new Error("IV environment variable is missing");
  }

  const iv = Uint8Array.from(
    ivHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)),
  );

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plaintext);
}

const PASSWORD_PATH = "/Users/sidharthamaji/personal/eulers-project/euler/do_not_open/password.txt";
const ANSWER_PATH = "/Users/sidharthamaji/personal/eulers-project/euler/do_not_open/answers.enc"

const PASSWORD = Deno.readTextFileSync(PASSWORD_PATH).trim();

export const getAnswer = async (id: string) => {
  const answers = JSON.parse(await decryptAnswers(ANSWER_PATH, PASSWORD)) as Record<string, string>;
  if (!(id in answers)) throw new Error(`No answer Found for id ${id}`)
  return answers[id];
}

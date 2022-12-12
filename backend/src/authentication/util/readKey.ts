import fs from 'fs/promises'; 

async function readKey(path: string) {
  const key = await fs.readFile(path, 'utf8');

  return key;
}

export default readKey;
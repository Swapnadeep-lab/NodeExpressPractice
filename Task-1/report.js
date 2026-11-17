
import fs from "node:fs/promises";
import path from "node:path";

const folderPath = import.meta.dirname;

const files = await fs.readdir(folderPath);

console.log(`Total files: ${files.length}\n`);

for (const file of files) {

  const extension = path.extname(file);

  const fullPath = path.join(folderPath, file);

  const stats = await fs.stat(fullPath);

  // Skip directories
  if (!stats.isFile()) {
    continue;
  }

  const sizeInKB = (stats.size / 1024).toFixed(2);

  console.log(`File Name: ${file}`);
  console.log(`Extension: ${extension}`);
  console.log(`Size: ${sizeInKB} KB`);
  console.log("------------------------");
}




const fs = require("fs");
const path = require("path");

const SKINS_DIR = path.join(__dirname, "skins");
const OUTPUT = path.join(__dirname, "skins.json");

function walk(dir, base) {
  let results = [];

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath, base));
    } else {
      results.push(path.relative(base, fullPath).replace(/\\/g, "/"));
    }
  }

  return results;
}

const skins = {};

for (const skinName of fs.readdirSync(SKINS_DIR)) {
  const skinPath = path.join(SKINS_DIR, skinName);
  if (!fs.statSync(skinPath).isDirectory()) continue;

  skins[skinName] = walk(skinPath, skinPath);
}

fs.writeFileSync(OUTPUT, JSON.stringify(skins, null, 2));
console.log("skins.json generated");

const fs = require('fs');
const path = require('path');

const skinsDir = path.join(__dirname, 'skins');
const skins = fs.readdirSync(skinsDir).filter(name => {
  const fullPath = path.join(skinsDir, name);
  return fs.statSync(fullPath).isDirectory();
}).sort();

console.log('Found skins:', skins);

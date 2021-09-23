const fs = require("fs");
const dir = "./svgs/" + process.argv[2];
console.log("processing ", dir);
const files = fs.readdirSync(dir);
console.log(files);
const regex = /d="(.+?)"/u;
const output = [];
files.forEach((file) => {
  const svg = fs.readFileSync(`${dir}/${file}`).toString();
  const path = regex.exec(svg)[1];
  const name = file.split(".")[0];
  output.push(`/* ${name} */ "${path}",`);
});
console.log(output.join("\n"));

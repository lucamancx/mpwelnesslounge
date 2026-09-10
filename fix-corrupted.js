
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

const fixes = [
  ["percepiùsce", "percepisce"],
  ["piùacevole", "piacevole"],
  ["aspiùrazione", "aspirazione"],
  ["piùacere", "piacere"],
  ["ispiùrazione", "ispirazione"],
  ["piùetra", "pietra"],
  ["epiùdermide", "epidermide"],
  ["piùù", "più"],
  ["Pressoterapiùa", "Pressoterapia"],
  ["pressoterapiùa", "pressoterapia"],
  ["Maderoterapiùa", "Maderoterapia"],
  ["maderoterapiùa", "maderoterapia"]
];

for (const [bad, good] of fixes) {
  c = c.split(bad).join(good);
}

c = c.split("src=\"/Maderoterapia.mp4\"").join("src=\"/maderoterapia.mp4\"");

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");



const fs = require("fs");
let content = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// 1. Change main wrapper background to off-white (bianco pannato)
content = content.replace(
  /<div className="flex flex-col min-h-screen bg-white">/,
  `<div className="flex flex-col min-h-screen bg-[#F9F9F6]">`
);

// 2. Fix the Hero section
content = content.replace(
  /<section className="w-full bg-brand-light py-16 md:py-20 px-6 md:px-12 text-center">/,
  `<section className="w-full py-16 md:py-24 px-6 md:px-12 text-center bg-[#F9F9F6]">`
);

// 3. Convert Dark Sections to Cards
// Match <section className="..."> \s* <AnimatedSection direction="left" className="...">
content = content.replace(
  /<section className="w-full bg-brand-dark text-brand-light py-16 md:py-20 px-6 md:px-12">\s*<AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">/g,
  `<section className="w-full py-10 md:py-16 px-6 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-brand-dark text-brand-light p-8 md:p-16 rounded-[2.5rem] shadow-2xl">`
);

// 4. Convert Light Sections to Cards
content = content.replace(
  /<section className="w-full bg-brand-light py-16 md:py-20 px-6 md:px-12">\s*<AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">/g,
  `<section className="w-full py-10 md:py-16 px-6 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl">`
);

// 5. Giornate Specialisti at the bottom (has bg-brand-light)
content = content.replace(
  /<section className="w-full bg-brand-light py-20 px-6 md:px-12">\s*<div className="max-w-4xl mx-auto text-center">/,
  `<section className="w-full py-16 md:py-20 px-6 md:px-12 mb-12">
        <div className="max-w-4xl mx-auto text-center bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl">`
);

fs.writeFileSync("src/app/servizi/page.tsx", content);


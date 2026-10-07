#!/usr/bin/env node
// Rebuilds src/app/favicon.ico from src/app/icon.svg. Browsers and Google
// still request /favicon.ico directly, so it has to match the brand mark.
// Run after changing icon.svg. sharp ships with Next.js, so there is nothing
// extra to install.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const appDir = fileURLToPath(new URL("../src/app/", import.meta.url));
// 48px is the size Google Search displays; 16 and 32 cover browser tabs.
const SIZES = [16, 32, 48];

const svg = await readFile(`${appDir}icon.svg`);
const images = await Promise.all(
  SIZES.map((size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()),
);

// ICO container with PNG payloads: a 6 byte header, a 16 byte directory entry
// per image, then the images back to back.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = header.length + 16 * images.length;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZES[index], 0);
  entry.writeUInt8(SIZES[index], 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});

await writeFile(`${appDir}favicon.ico`, Buffer.concat([header, ...entries, ...images]));
console.log(`Wrote src/app/favicon.ico (${SIZES.join(", ")} px).`);

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Scanner } from '@tailwindcss/oxide';
import { compile } from '@tailwindcss/node';

// Catch utilities lost by the source scanner, including quoted pseudo-element
// content and escaped underscores, before a production build silently drops them.
const source = fs.readFileSync('src/styles/recipes.ts', 'utf8');
const candidates = [...new Set([...source.matchAll(/String\.raw`([^`]+)`/g)]
  .flatMap(match => match[1].split(/\s+/)).filter(Boolean))];
assert(candidates.length > 0, 'No Tailwind recipes found');
const scanner = new Scanner({});
const discovered = new Set(scanner.scanFiles([{ content: source, extension: 'ts' }]));
assert.deepEqual(candidates.filter(candidate => !discovered.has(candidate)), [], 'Undiscoverable Tailwind utilities');

const css = fs.readFileSync('src/styles/tailwind.css', 'utf8');
const compiler = await compile(css, { base: path.resolve('src/styles'), onDependency() {} });
const output = compiler.build(candidates);
const escapeClass = value => value.replace(/[^a-zA-Z0-9_\-\u0080-\uFFFF]/g, character => `\\${character}`);
assert.deepEqual(candidates.filter(candidate => !output.includes(`.${escapeClass(candidate)}`)), [], 'Uncompiled Tailwind utilities');

function checkImports(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) checkImports(file);
    else if (/\.[jt]sx?$/.test(file)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(/import\s+['"]([^'"]+\.css)['"]/g)) {
        assert(file === path.join('src', 'main.tsx') && match[1] === './styles/tailwind.css', `Legacy CSS import: ${file}`);
      }
    }
  }
}
checkImports('src');
console.log(`Styles OK: ${candidates.length} discoverable, compilable Tailwind utilities; one CSS entry point.`);

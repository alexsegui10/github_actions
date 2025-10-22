const fs = require('fs');

const outcome = (process.env['INPUT_OUTCOME'] || '').trim().toLowerCase();
const README = 'README.md';
const MARKER = 'RESULTAT DELS ÚLTIMS TESTS';
const BADGE_OK = '![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const BADGE_KO = '![Tests](https://img.shields.io/badge/test-failure-red)';
const badge = outcome === 'success' ? BADGE_OK : BADGE_KO;

let content = '';
try { content = fs.readFileSync(README, 'utf8'); } catch { content = '# Projecte\n'; }

if (!content.includes(MARKER)) {
  content += `\n## ${MARKER}\n${badge}\n`;
} else {
  const lines = content.split('\n');
  const i = lines.findIndex(l => l.includes(MARKER));
  let j = i + 1;
  while (j < lines.length && (lines[j].trim() === '' || lines[j].includes('img.shields.io'))) j++;
  const before = lines.slice(0, i + 1);
  const after  = lines.slice(j);
  content = [...before, '', badge, '', ...after].join('\n');
}

fs.writeFileSync(README, content, 'utf8');

// CommonJS para evitar líos de ESM en acciones
const fs = require('fs');

const outcome = (process.env['INPUT_OUTCOME'] || '').trim().toLowerCase();
const README_PATH = 'README.md';
const MARKER = 'RESULTAT DELS ÚLTIMS TESTS';

const BADGE_SUCCESS = '![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const BADGE_FAILURE = '![Tests](https://img.shields.io/badge/test-failure-red)';

const badge = outcome === 'success' ? BADGE_SUCCESS : BADGE_FAILURE;

let readme;
try {
  readme = fs.readFileSync(README_PATH, 'utf8');
} catch {
  readme = '# Projecte\n';
}

if (!readme.includes(MARKER)) {
  readme += `\n## ${MARKER}\n${badge}\n`;
} else {
  const lines = readme.split('\n');
  const idx = lines.findIndex(l => l.includes(MARKER));

  let j = idx + 1;
  while (j < lines.length && (lines[j].trim() === '' || lines[j].includes('img.shields.io'))) {
    j++;
  }

  const before = lines.slice(0, idx + 1);
  const after = lines.slice(j);

  readme = [...before, '', badge, '', ...after].join('\n');
}

fs.writeFileSync(README_PATH, readme, 'utf8');
console.log(`✅ README actualizado con badge: ${outcome || 'desconocido'}`);

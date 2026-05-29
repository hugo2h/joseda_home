import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { rename, unlink } from 'node:fs/promises';

const DIR = path.resolve('public/images');
const MAX_EDGE = 2000;          // px en el lado largo
const MAX_BYTES = 600 * 1024;   // umbral: solo procesa > 600 KB o > MAX_EDGE
const JPEG_Q = 82;

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const files = (await readdir(DIR)).filter((f) => exts.has(path.extname(f).toLowerCase()));

let processed = 0, skipped = 0;
const report = [];

for (const f of files) {
  const full = path.join(DIR, f);
  const ext = path.extname(f).toLowerCase();
  const { size } = await stat(full);
  let meta;
  try { meta = await sharp(full).metadata(); } catch (e) { report.push(`SKIP(bad) ${f}`); skipped++; continue; }
  const longEdge = Math.max(meta.width || 0, meta.height || 0);

  if (size <= MAX_BYTES && longEdge <= MAX_EDGE) { skipped++; continue; }

  const tmp = path.join(os.tmpdir(), `opt-${Date.now()}-${f}`);
  let pipe = sharp(full).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });

  if (ext === '.png') {
    pipe = pipe.png({ compressionLevel: 9, palette: true });
  } else if (ext === '.webp') {
    pipe = pipe.webp({ quality: JPEG_Q });
  } else {
    pipe = pipe.jpeg({ quality: JPEG_Q, mozjpeg: true });
  }

  await pipe.toFile(tmp);
  const after = await stat(tmp);
  // Solo reemplaza si realmente reduce
  if (after.size < size) {
    await unlink(full);
    await rename(tmp, full);
    report.push(`${f}: ${meta.width}x${meta.height} ${(size/1024/1024).toFixed(2)}MB -> ${MAX_EDGE}px ${(after.size/1024).toFixed(0)}KB`);
    processed++;
  } else {
    await unlink(tmp);
    skipped++;
  }
}

console.log(report.join('\n'));
console.log(`\nProcesadas: ${processed} · Saltadas: ${skipped}`);

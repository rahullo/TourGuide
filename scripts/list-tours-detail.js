const fs = require('fs');

const content = fs.readFileSync('src/lib/data.ts', 'utf8');
const toursStart = content.indexOf('export const tours: Tour[] = [');
const toursEnd = content.indexOf('export const reviews');
const toursBlock = content.slice(toursStart, toursEnd);

// Extract each tour
const tourRegex = /{\s*id:\s*'(t\d+)'[\s\S]*?images:\s*\[([\s\S]*?)\][\s\S]*?title:\s*'([^']+)'[\s\S]*?location:\s*'([^']+)'[\s\S]*?country:\s*'([^']+)'/g;

let m;
const tours = [];
while ((m = tourRegex.exec(toursBlock)) !== null) {
  const id = m[1];
  const images = m[2].split('\n').map(s => s.trim().replace(/^['"]|['"],?$/g, '')).filter(s => s.startsWith('http'));
  const title = m[3];
  const location = m[4];
  const country = m[5];
  tours.push({ id, title, location, country, images });
}

console.log(`Found ${tours.length} tours:`);
tours.forEach(t => console.log(`${t.id}: ${t.title} (${t.location}, ${t.country}) - ${t.images.length} images: ${t.images[0]}`));

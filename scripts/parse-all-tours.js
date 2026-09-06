const fs = require('fs');

const content = fs.readFileSync('src/lib/data.ts', 'utf8');
const lines = content.split('\n');
let inTours = false;

let currentTour = null;
const tours = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const tours: Tour[] = [')) inTours = true;
  if (!inTours) continue;
  if (line.includes('export const reviews: Review[] = [')) break;

  const idMatch = line.match(/^\s*id:\s*'(t\d+)',/);
  if (idMatch) {
    if (currentTour) tours.push(currentTour);
    currentTour = { id: idMatch[1], title: '', location: '', country: '', images: [], startLine: i + 1 };
  }

  if (currentTour) {
    const titleMatch = line.match(/title:\s*'([^']+)'/);
    if (titleMatch && !currentTour.title) currentTour.title = titleMatch[1];

    const locMatch = line.match(/location:\s*'([^']+)'/);
    if (locMatch && !currentTour.location) currentTour.location = locMatch[1];

    const countryMatch = line.match(/country:\s*'([^']+)'/);
    if (countryMatch && !currentTour.country) currentTour.country = countryMatch[1];

    const imgMatch = line.match(/'(https:\/\/images\.unsplash\.com\/[^']+)'/);
    if (imgMatch) {
      currentTour.images.push(imgMatch[1]);
    }
  }
}
if (currentTour) tours.push(currentTour);

console.log('Total tours:', tours.length);
tours.forEach(t => {
  console.log(`${t.id} (line ${t.startLine}): "${t.title}" | ${t.location}, ${t.country} | ${t.images.length} images`);
  t.images.forEach(img => console.log('   ', img));
});

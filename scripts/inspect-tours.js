const fs = require('fs');

const content = fs.readFileSync('src/lib/data.ts', 'utf8');

// Match each tour object in the tours array
const toursStart = content.indexOf('export const tours: Tour[] = [');
const toursEnd = content.indexOf('export const reviews');
const toursBlock = content.slice(toursStart, toursEnd);

// Let's find all images used in tours
const imgRegex = /images:\s*\[([\s\S]*?)\]/g;
let match;
let tourIndex = 0;
const allTourImages = [];
const imageUsage = {};

while ((match = imgRegex.exec(toursBlock)) !== null) {
  tourIndex++;
  const imgList = match[1]
    .split('\n')
    .map(s => s.trim().replace(/^['"]|['"],?$/g, ''))
    .filter(s => s.startsWith('http'));
  
  allTourImages.push({ tourIndex, images: imgList });
  imgList.forEach(img => {
    imageUsage[img] = (imageUsage[img] || 0) + 1;
  });
}

console.log('Total tours found:', tourIndex);
const duplicates = Object.entries(imageUsage).filter(([url, count]) => count > 1);
console.log('Duplicate images count:', duplicates.length);
duplicates.forEach(([url, count]) => {
  console.log(`Used ${count} times: ${url}`);
});

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Curated pools of unique travel images
const uniquePools = [
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
  'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
  'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80',
  'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
  'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
  'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?w=800&q=80',
  'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80',
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
  'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80',
  'https://images.unsplash.com/photo-1589405858862-2ac9031448b2?w=800&q=80',
  'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80',
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
  'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
  'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
  'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80',
  'https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=800&q=80',
  'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80',
];

async function updateDbTours() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
  if (!uriMatch) {
    console.log('No MONGODB_URI found in .env.local');
    return;
  }
  const uri = uriMatch[1].trim();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const toursCollection = db.collection('tours');
    const tours = await toursCollection.find({}).toArray();
    console.log(`Found ${tours.length} tours in database.`);

    if (tours.length === 0) {
      console.log('No tours in DB to update.');
      return;
    }

    let updatedCount = 0;
    for (let i = 0; i < tours.length; i++) {
      const tour = tours[i];
      // Pick distinct unique images
      const img1 = tour.images && tour.images[0] ? tour.images[0] : uniquePools[i % uniquePools.length];
      const img2 = uniquePools[(i * 2 + 1) % uniquePools.length];
      const img3 = uniquePools[(i * 3 + 2) % uniquePools.length];

      await toursCollection.updateOne(
        { _id: tour._id },
        { $set: { images: [img1, img2, img3] } }
      );
      updatedCount++;
    }
    console.log(`Successfully updated ${updatedCount} tours with unique images in MongoDB.`);
  } catch (err) {
    console.error('Error updating DB tours:', err.message);
  } finally {
    await client.close();
  }
}

updateDbTours();

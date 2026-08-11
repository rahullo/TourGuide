const { MongoClient } = require('mongodb');

async function check() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const tour = await db.collection('tours').findOne({ slug: 'uluru-food-wine-1-1786428995905' });
    console.log(JSON.stringify(tour, null, 2));
  } finally {
    await client.close();
  }
}

check();

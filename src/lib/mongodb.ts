import mongoose from 'mongoose';
import dns from 'node:dns';

// Override DNS servers to bypass querySrv resolution issues
dns.setServers(['192.168.1.1']);

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn(
    'MONGODB_URI not defined in environment variables. Database features will not work.'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global cache to avoid reconnecting on every API call in dev
declare global {
   
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => {
        console.log('✅ MongoDB connected successfully to database');
        return m;
      })
      .catch((err) => {
        console.error('❌ MongoDB Connection Failed!');
        console.error('   Reason:', err.message);
        console.error('   -> Check your IP Whitelist in MongoDB Atlas or your .env.local string.');
        cached.promise = null; // reset so we can try again on the next request
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const { MONGO_URI } = process.env;

export const client = new MongoClient(MONGO_URI || '');
export const db = client.db();

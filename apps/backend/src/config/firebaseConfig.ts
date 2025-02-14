import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = require("../../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export { db };
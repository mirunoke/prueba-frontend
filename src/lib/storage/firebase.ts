import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBG7KVZFHdEhMt8ev14UjdHhi1wT904THg",
  authDomain: "testdonet-49cc8.firebaseapp.com",
  projectId: "testdonet-49cc8",
  storageBucket: "testdonet-49cc8.appspot.com",
  messagingSenderId: "851177828926",
  appId: "1:851177828926:web:a9084fe7d5813e9c0d576f",
  measurementId: "G-1EPZTWPKVT"
};

const existingApps: App[] = getApps();
let app: App;

if (existingApps.length > 0) {
  app = existingApps[0];
} else {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
  );
  
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  app = initializeApp({
    credential: cert(serviceAccount),
    ...firebaseConfig
  }, 'default'); 
}

export const bucket = getStorage(app).bucket('gs://testdonet-49cc8.appspot.com');
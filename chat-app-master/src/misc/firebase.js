import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config =  {
  apiKey: "AIzaSyB_V9HINpe1dKNziDUvA-VgooUhfZCE2k4",
  authDomain: "chat-web-app-48974.firebaseapp.com",
  databaseURL: "https://chat-web-app-48974-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-48974",
  storageBucket: "chat-web-app-48974.appspot.com",
  messagingSenderId: "95706041655",
  appId: "1:95706041655:web:21c8693d2c04445f705eb2"
};

export const fcmVapidKey =
  'BLs_I-HQyrAuUJJh8H3U0vtHGhVhXLMqoVoomeNL90GMKm0-o7sSoN9CJYRiBAVz-Yi7ZAni8mKateJfDwodTnw';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

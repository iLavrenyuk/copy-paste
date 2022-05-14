import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyDXc8Q0Ha_CNmTNTOuntvUAA8WbUoLfg',
  authDomain: 'copy-paste-db821.firebaseapp.com',
  databaseURL: 'https://copy-paste-db821-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'copy-paste-db821',
  storageBucket: 'copy-paste-db821.appspot.com',
  messagingSenderId: '212921423643',
  appId: '1:212921423643:web:e4dde4966e6589ca4565be',
  measurementId: 'G-W50TBF0M6R',
};

// Initialize Firebase
export const appBase = initializeApp(firebaseConfig);
export const analyticsBase = getAnalytics(appBase);

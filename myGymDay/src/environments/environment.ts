// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBpruOdffum2L3f10bTeRFhCAQaRitjfdI',
    authDomain: 'mygymday.firebaseapp.com',
    projectId: 'mygymday',
    storageBucket: 'mygymday.firebasestorage.app',
    messagingSenderId: '492112146057',
    appId: '1:492112146057:web:af04ad7c0a5f5ad88f6058',
    measurementId: 'G-NFWWHYVH22',
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

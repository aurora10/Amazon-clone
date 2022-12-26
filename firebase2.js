import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB0xCltFpuE1NVrn8X3raiLvoemJzjL15M",
//   authDomain: "infra-lodge-371413.firebaseapp.com",
//   projectId: "infra-lodge-371413",
//   storageBucket: "infra-lodge-371413.appspot.com",
//   messagingSenderId: "85679328215",
//   appId: "1:85679328215:web:fe2a08fba8b62b204c1992",
// };

const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "infra-lodge-371413",
  keyFilename: "credentials.json",
});

export default db;

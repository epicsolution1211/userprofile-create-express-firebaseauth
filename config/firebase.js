const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');
// require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyBq3-xZkqOLRLzRW6FSvFaAfDmyLvSikHc",
  authDomain: "nodeauthapi-660f8.firebaseapp.com",
  databaseURL: "https://nodeauthapi-660f8-default-rtdb.firebaseio.com",
  projectId: "nodeauthapi-660f8",
  storageBucket: "nodeauthapi-660f8.appspot.com",
  messagingSenderId: "179340002889",
  appId: "1:179340002889:web:83a604ba64f23ca3256198",
  measurementId: "G-ETP8SF44N2"
}

// firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics(app);


module.exports = firebase;


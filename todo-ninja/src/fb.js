import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAFecECworMq1mMyMllAQ9HzIkx7uitysg",
  authDomain: "amber-torch-2676.firebaseapp.com",
  databaseURL: "https://amber-torch-2676.firebaseio.com",
  projectId: "amber-torch-2676",
  storageBucket: "amber-torch-2676.appspot.com",
  messagingSenderId: "173179736271"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
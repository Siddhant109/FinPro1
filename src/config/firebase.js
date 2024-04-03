// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore, collection} from "firebase/firestore";
// import firebase from 'firebase/app';
// import { getDatabase } from "firebase/database";
import 'firebase/database';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYkRO5xmfzDInV-pSPz2zUQsQpvpKUsuU",
  authDomain: "water-management-4399d.firebaseapp.com",
  databaseURL: "https://water-management-4399d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-management-4399d",
  storageBucket: "water-management-4399d.appspot.com",
  messagingSenderId: "486238005283",
  appId: "1:486238005283:web:38e0f757adc94a38936996",
  measurementId: "G-SXK8SGFSYM"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC0YIkk8qEHgdZGCMBnrxctL0l62T0WneA",
//   authDomain: "iot-sensor-data-730cb.firebaseapp.com",
//   databaseURL: "https://iot-sensor-data-730cb-default-rtdb.firebaseio.com",
//   projectId: "iot-sensor-data-730cb",
//   storageBucket: "iot-sensor-data-730cb.appspot.com",
//   messagingSenderId: "59995544489",
//   appId: "1:59995544489:web:7e5ac2fa1a9c728b8542b8"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
export const auth = getAuth(app);
// export const binStatus = getDatabase(app);

// export const tripsRef = collection(db, 'trips')
// export const expensesRef = collection(db, 'expenses')

export default app;

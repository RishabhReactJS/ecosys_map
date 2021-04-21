import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBp4WSUaG59Y6z1n4V97d-h9iVbbL2V4WQ",
    authDomain: "ecosysmap-d1cc7.firebaseapp.com",
    databaseURL: "https://ecosysmap-d1cc7-default-rtdb.firebaseio.com",
    projectId: "ecosysmap-d1cc7",
    storageBucket: "ecosysmap-d1cc7.appspot.com",
    messagingSenderId: "687024601246",
    appId: "1:687024601246:web:02788e8dacef7188c0238f",
    measurementId: "G-D1RKKWSPW9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const getAPI = async (collectionName) => {
    const db = firebase.firestore();
    const data = await db.collection(collectionName).orderBy("order", "asc").get();
    return data.docs;
}

export const addAPI = async (collectionName, body) => {
    const db = firebase.firestore();
    const data = await db.collection(collectionName).add(body);
    return true;
}

export const updateAPI = async (collectionName, id, body) => {
    const db = firebase.firestore();
    const data = await db.collection(collectionName).doc(id).set(body);
    return true;
}
export const deleteAPI = async (collectionName, id) => {
    const db = firebase.firestore();
    const data = await db.collection(collectionName).docs(id).delete();
    return true;
}


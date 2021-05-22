import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBp4WSUaG59Y6z1n4V97d-h9iVbbL2V4WQ",
  authDomain: "ecosysmap-d1cc7.firebaseapp.com",
  databaseURL: "https://ecosysmap-d1cc7-default-rtdb.firebaseio.com",
  projectId: "ecosysmap-d1cc7",
  storageBucket: "ecosysmap-d1cc7.appspot.com",
  messagingSenderId: "687024601246",
  appId: "1:687024601246:web:02788e8dacef7188c0238f",
  measurementId: "G-D1RKKWSPW9",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const getAPI = async (collectionName) => {
  const db = firebase.firestore();
  const data = await db
    .collection(collectionName)
    .orderBy("order", "asc")
    .get();
  return data.docs;
};

export const addAPI = async (collectionName, body) => {
  const db = firebase.firestore();
  const data = await db.collection(collectionName).add(body);
  return true;
};

export const updateAPI = async (collectionName, id, body) => {
  const db = firebase.firestore();
  const document = await db.collection(collectionName).doc(id).get();
  const reqObj = { ...document.data(), ...body };
  const data = await db.collection(collectionName).doc(id).set(reqObj);
  return true;
};

export const deleteAPI = async (collectionName, details) => {
  const db = firebase.firestore();

  // Get a new write batch
  const batch = db.batch();
  const documents = await getAPI(collectionName);

  console.log("in deleteAPI >>> ", documents, documents.length);

  const deleteDoc = db.collection(collectionName).doc(details.id);

  batch.delete(deleteDoc);

  if (details.order < documents.length - 1) {
    //  update below step
    documents.forEach((currDoc) => {
      const dosData = currDoc.data();
      if (dosData.order > details.order) {
        const deleteDoc = db.collection(collectionName).doc(currDoc.id);
        batch.update(deleteDoc, { order: dosData.order - 1 });
      }
    });
  }

  // Commit the batch
  batch.commit().then(() => {
    console.log("<<< in commited changes >>>>> ");
  });

  return true;
};

export const updateDocuments = async (
  collectionName,
  document,
  jumps,
  action,
  drc
) => {
  // const db = firebase.firestore();
  // const direction = droppedBelowThisOrderItem < orderOfDraggedItem? "up" : "down"
  // const update = list.map((item)=>{
  //     if (direction == "up") {
  //         return(
  //             item.order==orderOfDraggedItem?
  //                 {...item,order:droppedBelowThisOrderItem+1}:
  //             item.order > droppedBelowThisOrderItem && item.order <= orderOfDraggedItem?
  //                 {...item,order:item.order+1}:
  //             item
  //         )
  //     }
  //     else{
  //         return(
  //             item.order==orderOfDraggedItem?
  //                 {...item,order:droppedBelowThisOrderItem}:
  //             item.order > orderOfDraggedItem && item.order <= droppedBelowThisOrderItem?
  //                 {...item,order:item.order-1}:
  //             item
  //         )
  //     }
  // })
  return true;
  // const latesDocs = await db.collection(collectionName).doc(id).get();
};

export const createUserAPI = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log('in createUserAPI  userCredential >>>>> ', userCredential)
        resolve(userCredential)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.error('in createUserAPI >>>error  ', error)
        reject(error)
      });
  });
};


export const exastingUser = (email, password) => {
  return new Promise((resolve, reject) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('in exastingUser >>> userCredential', userCredential, user)
    resolve(userCredential)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error('in exastingUser >>> error', error)
    reject(error)
  });
  })

}
export const handleSingup = (event, email, password) => {
  event.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => console.log(res))
    .catch(console.log);
};

export const handleLogin = (event, email, password) => {
  event.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      localStorage.clear();
      console.log('in handleLogin >>> ', res.user)
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('userId', res.user.uid);
    })
    .catch(err => {
      alert(err);
    });
};

export const handelLogout = event => {
  firebase.auth().signOut();
};

export const authlistner = () => {
  return new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(user => {
    console.log('in authListner>>', user);
    if (user) {
      localStorage.setItem('email', user.email);
      localStorage.setItem('userId', user.uid);
      resolve(user.uid)
    } else {
      localStorage.clear()
      reject();
    }
  });
});
}
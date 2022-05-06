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

// export const setTest = async () => {
//   const db = firebase.firestore();

//   var citiesRef = await db.collection("cities");

//   citiesRef.doc("SF").set({
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"]
//   });
//   citiesRef.doc("LA").set({
//     name: "Los Angeles", state: "CA", country: "USA",
//     capital: false, population: 3900000,
//     regions: ["west_coast", "socal"]
//   });


// }

export const getAPI = async (collectionName) => {
  const db = firebase.firestore();
  const data = await db
    .collection(collectionName)
    .orderBy("order", "asc")
    .get();
  return data.docs;
};

export const getSubCollectionAPI = async (collectionName, flowId) => {
  console.log('in getSubCollectionAPI', collectionName, flowId)
  const db = firebase.firestore();
  const dataRef = await db
    .collection(`flows/${flowId}/${collectionName}`)
    .orderBy("order", "asc").get()
  console.log("Document data:", dataRef.docs);
  return dataRef.docs;
};


// querying flows collenction for users viewable and editable flows
export const getUserFlows = async (userId) => {
  const db = firebase.firestore();
  const editableFlowsdata = await db
    .collection('flows').orderBy("updated_at", "desc")
    .where("Access.Editors", "array-contains", userId)
    .get();
  const viewablwFlowsdata = await db
    .collection('flows')
    .where("Access.Viewers", "array-contains", userId)
    .get();
  const data = viewablwFlowsdata.docs.concat(editableFlowsdata.docs)
  return data.map(doc => ({ ...doc.data(), id: doc.id }))
};

// Future use when we will have flows subCollection inside users collection, geting user flow id's from subcollection
export const getUserSubFlows = async (userId) => {
  const db = firebase.firestore();
  const userFlows = await db
    .collection('users').doc(userId).collection('flows')
    .get();

  const userFlowsId = userFlows.docs.map(doc => doc.data())

  console.log('in getUserSubFlows userFlowsId >>>>>> ', userFlowsId);
  const flowsData = await db
    .collection('flows').doc(userFlowsId)
    // .where("doc", "in", userFlowsId)
    .get();

  return flowsData.docs.map(doc => doc.data())
};

export const addAPI = async (collectionName, flowId, body) => {
  const db = firebase.firestore();
  await db.collection(`flows/${flowId}/${collectionName}`).add(body);
  return true;
};

export const updateAPI = async (collectionName, flowId, id, body) => {
  const db = firebase.firestore();
  const document = await db.collection(`flows/${flowId}/${collectionName}`).doc(id).get();
  const reqObj = { ...document.data(), ...body };
  await db.collection(`flows/${flowId}/${collectionName}`).doc(id).set(reqObj);
  return true;
};

export const deleteAPI = async (collectionName, flowId, details) => {
  const db = firebase.firestore();

  // Get a new write batch
  const batch = db.batch();
  const documents = await getAPI(`flows/${flowId}/${collectionName}`);

  console.log("in deleteAPI >>> ", documents, documents.length);

  const deleteDoc = db.collection(`flows/${flowId}/${collectionName}`).doc(details.id);

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

export const createFlow = (userId, flowName) => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const db = firebase.firestore();
    var flowsRef = db.collection("flows");
    flowsRef.add({
      Access: {
        Editors: [userId],
        Viewers: [],
      },
      created_at: date,
      name: flowName || "",
      owner: userId,
      updated_at: date,
    })
      .then((updatedDetails) => {
        console.log('in createFlow ?? .> >>>> ', updatedDetails);
        resolve(updatedDetails.id);
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const db = firebase.firestore();
    var usersRef = await db.collection("users");
    usersRef.doc(user.uid).set({
      email: user.email,
      Name: user.email
    })
      .then((updatedDetails) => {
        console.log('in createUser ?? .> >>>> ', updatedDetails);
        resolve(user);
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const handleSingup = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.clear();
        console.log('in handleLogin >>> ', res.user)
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('userId', res.user.uid);
        createUser(res.user);
      })
      .then(res => {
        console.log('in handleLogin after createUserAPI>>> ', res)
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};


export const handleLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.clear();
        console.log('in handleLogin >>> ', res.user)
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('userId', res.user.uid);
        resolve(res.user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const handelLogout = () => {
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

export const handelDeleteAll = (collectionName, except) => {
  const allSteps = getAPI(collectionName);
  console.log('in handelDeleteAll >> ', allSteps)
  debugger;
  allSteps.foreach(doc => {
    debugger;
    if (doc.id !== except)
      doc.ref.delete()
  })
}

export const provideAccess = (docId, access) => { //access can be edit or view
  const db = firebase.firestore();
  var washingtonRef = db.collection("flows").doc(docId);
  const property = "Access" + access;
  // Atomically add a new region to the "regions" array field.
  washingtonRef.update({
    property: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
  });
}

export const removeAccess = (docId, access) => {//access can be edit or view
  const db = firebase.firestore();
  var flowsRef = db.collection("flows").doc(docId);
  const property = "Access" + access;

  // Atomically add a new region to the "regions" array field.
  flowsRef.update({
    property: firebase.firestore.FieldValue.arrayRemove("greater_virginia")
  });
}

export const incPosition = (collectionName, docId, value) => { //value to inc the position by
  const db = firebase.firestore();
  var flowsRef = db.collection("flows").doc(docId);

  flowsRef.update({
    positon: firebase.firestore.FieldValue.increment(value)
  });
}
export const decPosition = (collectionName, docId, value) => { //value to inc the position by
  const db = firebase.firestore();
  var flowsRef = db.collection("flows").doc(docId);

  flowsRef.update({
    positon: firebase.firestore.FieldValue.decrement(value)
  });
}

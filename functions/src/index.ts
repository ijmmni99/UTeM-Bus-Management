import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();

export const createScheduleLog = functions.firestore
  .document('jadual/{jadualID}')
  .onUpdate((snapshot, context) => {
    const jadualData = snapshot.after.data();
    if(jadualData){
      if(jadualData.status == "Finish"){
        return admin.firestore().collection('jadual-log').doc(snapshot.after.id).set(jadualData)
      }
      else
        return null;
    }
    else
      return null;
});

export const registerStudent = functions.https.onRequest(async (req, res) => {
  if(req.body){
    await admin.firestore().collection('pelajar').add(req.body);
    res.status(201).send();
  }
})

export const registerDriver = functions.https.onRequest(async (req, res) => {
  if(req.body){
    await admin.firestore().collection('pemandu').add(req.body);
    res.status(201).send();
  }
})
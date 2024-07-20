// transferData.js
import { db, realtimeDb } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, set } from "firebase/database";

async function transferData() {
  try {
    const usersCollection = await getDocs(collection(db, 'Users'));
    const usersData = {};
    usersCollection.forEach(doc => {
      usersData[doc.id] = doc.data();
    });

    await set(ref(realtimeDb, 'Users'), usersData);
    console.log('done');
  } catch (error) {
    console.error('error', error);
  }
}

export default transferData;

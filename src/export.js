const fs = require("fs");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json"))
});

const db = admin.firestore();

/**
 * Export all collections and nested subcollections
 */
async function exportFirestore() {
  const collections = await db.listCollections();
  
  let exportData = {};

  for (const collection of collections) {
    console.log(`📁 Exportando colección: ${collection.id}`);
    exportData[collection.id] = await exportCollection(collection);
  }

  fs.writeFileSync("firestore_export.json", JSON.stringify(exportData, null, 2));
  console.log("✅ Exportación completa → firestore_export.json");
}

/**
 * Export a collection recursively
 */
async function exportCollection(collectionRef) {
  const snapshot = await collectionRef.get();
  let documents = {};

  for (const doc of snapshot.docs) {
    const docData = doc.data();
    const subcollections = await doc.ref.listCollections();

    if (subcollections.length > 0) {
      docData._subcollections = {};

      for (const sub of subcollections) {
        console.log(`   ↳ Subcolección: ${sub.id} en documento ${doc.id}`);
        docData._subcollections[sub.id] = await exportCollection(sub);
      }
    }

    documents[doc.id] = docData;
  }

  return documents;
}

exportFirestore().catch(console.error);

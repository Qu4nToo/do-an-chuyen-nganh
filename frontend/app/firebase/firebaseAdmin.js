import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "doanchuyennganh-90022",
      clientEmail: "firebase-adminsdk-19ghp@doanchuyennganh-90022.iam.gserviceaccount.com",
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: "https://doanchuyennganh-90022-default-rtdb.firebaseio.com",
  });
}

const adminAuth = admin.auth();
export default adminAuth;

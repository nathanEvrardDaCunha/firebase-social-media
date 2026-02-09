import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);

// firebase login
// firebase init
// firebase deploy

// https://www.youtube.com/watch?v=2hR-uWjBAgw = > 47:34

// TODO: Add prettier to format

/*

# ======== AUTHENTIFICATION ======== #

- Dont forget to use Zod and React Form to handle form easily. => (verify email are email type...)
- Make the form accessible even for deaf and blind, color-blind, adhd people

=> Is it possible to make firebase (the so called backend) verify the user send the right file, and did not temper with the client validation system ?

- 1) Create a form component
- 2) Import { auth } from this firebase
- 3) Import { createuserWithEmailAndPassword } from firebase package
- 4) Create "signIn" async function in the form and add "await createuserWithEmailAndPassword(auth, email, password)" => And add try/catch ?
- 5) Same as 4, but with "signOut" using the firebase signOut(auth...)

# ======== CRUD ======== #

- For message, create/use anti-slur system

- 1) Create the Interface (with Zod validation) of the different entities of your project for the database.
- 2) Go to "Firestore Database" and create a collection(s) of entities yo uwant to store (ex: users, comments, post/tweets...)

- getDocs(moviesCollectionRed) and getDoc() and collection(db, "movies")
=> Will probably fail because rule are set to "false" (make it "true" for anyone to read/write, or change them if needed)

  const data = await getDocs(moviesCollectionRef);

  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }))


# ======== RULES ======== #

  (auth is part of firebase so "import {auth} from firebase" or somehting like that)
  - To get user auth.currentUser.uid

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRed, {
      
        title:...
        releaseDate:...
      
      })
    } catch (err) {
     console.error(err)}
  }

  const deleteMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(moieDoc)
    } catch (err) {
     console.error(err)}
  }

  const updateMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(moieDoc, {

        title:...
        releaseDate:...

      })
    } catch (err) {
     console.error(err)}
  }


  ----------------------------------------------------------

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write, update, delete: if request.auth != null && request.auth.uid == request.ressource.data.userId;
      allow read: if true;
    }
  }
}


(To note: the "userId" from "request.ressource.data.userId" is from the firebase ressource)




# ======== HOSTING ======== #

- /!\ Build your React app before doing "firebase init" /!\
- "where do you want to use your public directory ?" => Choose either public or build folder depending on where reside your final code

- https://www.youtube.com/watch?v=2hR-uWjBAgw = > 1:29:30

*/

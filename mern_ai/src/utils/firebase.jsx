
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0srrjBNeR2qRwUFg9gaCVtL9zDNNXQMA",
  authDomain: "mernai-ed5b5.firebaseapp.com",
  projectId: "mernai-ed5b5",
  storageBucket: "mernai-ed5b5.firebasestorage.app",
  messagingSenderId: "732974370725",
  appId: "1:732974370725:web:002d047eb568fe6bab624c",
  measurementId: "G-NN4FTH5DR0"
};


const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const provider=new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export {auth,provider};

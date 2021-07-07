import {useState} from 'react'
import './App.css';
import Login from './Login';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"
import firebaseConfig from './config'

initializeApp(firebaseConfig);
const db = getFirestore();



function App() {

  
  const [showLogin, setShowLogin] = useState(true)
  return (
    <div className="App">
        {showLogin && <Login setShow={setShowLogin} db={db} />}
    </div>
    

  );
}

export default App;

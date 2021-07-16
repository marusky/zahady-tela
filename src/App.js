import {useState, useEffect} from 'react'
import './App.css';
import Login from './Login';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore"
import firebaseConfig from './config'
import logo from './logo.png'
import Question from './Question';
import dataImport from './data'
import Admin from './Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


initializeApp(firebaseConfig);
const db = getFirestore();



function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [data, setData] = useState([])
  const [team, setTeam] = useState(0)
  const [questionNum, setQuestionNum] = useState('')

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "questionNum", "num"), (doc) => {
      setQuestionNum(doc.data().num)
    });
    return () => {
      unsub()
    }
  })

  useEffect(() => {
    setData(dataImport) 
  }, [])
  return (
    <Router>
      <Switch>
          <Route path="/admin">
            <Admin db={db}/>
          </Route>
          <Route path="/">
            <div className="App">
            <div className='logo'><img src={logo} alt="zahady tela"/></div>
            {showLogin 
              ? <Login setShow={setShowLogin} db={db} setTeam={setTeam}/> 
              : <Question {...data[questionNum]} num={questionNum} team={team} db={db}/>}  
            </div>
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App;

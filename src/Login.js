import React, {useState} from 'react'
import { collection, addDoc } from "firebase/firestore"



const Login = ({setShow, db}) => {

    const addUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

    const [username, setUsername] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username);
        setShow(false)
        addUser()
    }
    return (
        
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button>log in!</button>

        </form>
    )
}

export default Login

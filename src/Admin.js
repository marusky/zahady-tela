import React, {useState, useEffect} from 'react'
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore"
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdRefresh } from 'react-icons/io';


const Admin = ({db, num}) => {
    const [team1, setTeam1] = useState(0)
    const [team2, setTeam2] = useState(0)
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "questionNum", "team1"), (doc) => {
        setTeam1(doc.data().points)
        });
        return () => {
        unsub()
        }
    })
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "questionNum", "team2"), (doc) => {
        setTeam2(doc.data().points)
        });
        return () => {
        unsub()
        }
    })
    const resetPoints = () => {
        setDoc(doc(db, "questionNum", 'team1'), {points: 0});
        setDoc(doc(db, "questionNum", 'team2'), {points: 0});
    }
    const nextQuestion = async () => {
        const docRef = doc(db, "questionNum", 'num');
        const docSnap = await getDoc(docRef);
        const newNum = docSnap.data().num + 1;
        setDoc(doc(db, "questionNum", 'num'), {num: newNum});
    }
    const prevQuestion = async () => {
        const docRef = doc(db, "questionNum", 'num');
        const docSnap = await getDoc(docRef);
        const newNum = docSnap.data().num - 1;
        setDoc(doc(db, "questionNum", 'num'), {num: newNum});
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === 'mamradkecy') {
            setLoggedIn(true)
        }
        setPassword('')
    }
    if (!loggedIn) {
        return (
            <form>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button type='submit' onClick={(e) => handleSubmit(e)}>login</button>
            </form>
        )
    }
    return (
        <main className='admin'>
            <section className='box'>
                Team 1
                <h1>{team1}</h1>
            </section>
            <section className='box blue'>
                Team 2
                <h1>{team2}</h1>
            </section>
            <section className='buttons'>
                <div onClick={resetPoints} className='circle reset'>
                    <IoMdRefresh/>
                </div>
                <div onClick={prevQuestion} className='circle prev'>
                    <IoMdArrowRoundBack/>
                </div>
                <div onClick={nextQuestion} className='circle next'>
                    <IoMdArrowRoundForward/>
                </div>
            </section>
            
        </main>
    )
}

export default Admin

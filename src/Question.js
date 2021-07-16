import React, {useState, useEffect} from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore"; 


const Question = ({task, num, correct, team, db}) => {
    const [answer, setAnswer] = useState(0)
    const [shown, setShown] = useState(true)
    useEffect(() => {
        setShown(true)
        setAnswer(0)
    }, [num])
    // useEffect(() => {
    //     console.log(localStorage.getItem('zahadyTela1'));
    //     setShown(localStorage.getItem('zahadyTela1'))
    // }, [])
    const handleSubmit = async () => {
        if (correct === answer) {
            const docRef = doc(db, "questionNum", `team${team}`);
            const docSnap = await getDoc(docRef);
            const newPoints = docSnap.data().points + 1
            setDoc(doc(db, "questionNum", `team${team}`), {points: newPoints});
            localStorage.setItem('zahadyTela1', false);
            setShown(false)
        } else if (answer === 0) {
            
        } else {
            setShown(false)
        }
        
    }

    if (shown) {
        return (
            <section className='question'>
                <h3>{task}</h3>
                <div className={`btn ${answer === 1 && 'set'}`} onClick={() => setAnswer(1)}>Fakt</div>
                <div className={`btn ${answer === 2 && 'set'}`} onClick={() => setAnswer(2)}>Mýtus</div>
                <div className={'btnSend'} style={{backgroundColor: answer > 0 ? 'palegreen' : 'gainsboro'}} onClick={handleSubmit}>Odoslať</div>
                <footer>playing for team {team}</footer>
            </section>
    )
    }
    return (
        <section className='question'>
            <h3>Odpoveď bola započítaná.</h3>
        </section>
    )
}

export default Question

import React from 'react'


const Login = ({setShow, db, setTeam}) => {

    const handleClick = (team) => {
      setTeam(team)
      setShow(false)
    }
    return (
        <section className='login'>
          <div className='red square' onClick={() => handleClick(1)}>
            Team 1
          </div>
          <div className='blue square' onClick={() => handleClick(2)}>
            Team 2
          </div>
        </section>
    )
}

export default Login

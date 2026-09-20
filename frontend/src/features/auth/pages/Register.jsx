import React, { useState } from 'react'

import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    //all the logic related to the hooks state and api call is handled in useAuth handleRegister
    const {loading,handleRegister} = useAuth()
    const handleSubmit = (e)=>{
        e.preventDefault();
        handleRegister({username,email,password})
        navigate("/")
    }
    if(loading){
        return (<main><h1>Loading.....</h1></main>)
    }
  return (
     <main>
        <div className="form-container"> 
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Email</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} type="username" id='username' name='username' placeholder='Enter username' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id='email' name='email' placeholder='Enter Email Address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Email</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id='password' name='password' placeholder='Enter Password' />
                </div>
                <button className='button primary-button' >Register</button>
            </form>
            <p>Already Have An Account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
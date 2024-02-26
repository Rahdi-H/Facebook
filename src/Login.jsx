import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Login.css'
import { IconButton } from '@mui/material';
import supabase from '../supabase_config';
import { SpeakerPhone } from '@mui/icons-material';
import UserContext from './context/UserContext';

function Login() {
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [errors, setErrors] = useState([])
    const {setUser} = useContext(UserContext)
    async function sign_in(e){
        e.preventDefault()
        const {data, error} = await supabase.auth.signInWithPassword({email, password})

        setEmail('')
        setPassword('')
    }
    async function sign_in(e){
        e.preventDefault()
        const {data: signInData, error} = await supabase.auth.signInWithPassword({email:email, password:password})
        console.log(signInData, error);
        if (signInData.user && error == null) {
            const {data, error} = await supabase
            .from('Profiles')
            .select('*')
            .eq('email', signInData.user.email)
            if (data[0] && error == null){
                setUser(data[0])
            }
            console.log(data);
        }
    }
    async function sign_up(e){
        e.preventDefault()
        console.log(firstname);
        console.log(lastname);
        console.log(gender);
        console.log(dob);
        console.log(email);
        console.log(password);
        try {
            const {data: signInData, error} = await supabase.auth.signUp({email:email, password:password})
            if (signInData.user && error == null && firstname && email && gender && dob && password){
                try {
                    const {data, error} = await supabase
                    .from('Profiles')
                    .insert({firstname:firstname, lastname:lastname, dob:dob, user_id:signInData.user.id,gender:gender,email:email })
                    .select()
                    console.log(data, error);
                    if (data && error == null) {
                        setLogin(true)
                        alert("Check your email and confirm")
                    }
                } catch (error) {
                    setErrors([...errors, error.message])
                    console.log(error.message);
                }
            }
        } catch (error) {
            console.log(error.message);   
            setErrors([...errors, error.message])
        }
    }
  return (
    <div className='login'>
        <div className="login__top">
            <div className="login__left">
                <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook" />
                <p>Facebook helps you connect and share with the people in your life.</p>
            </div>
            <div className="login__right">
                <div className='login__formContainer'>
                    {login ? 
                    <>
                        <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <button className='login__button' onClick={sign_in}>Login</button>
                        <p>Forgotten password?</p>
                        <hr />
                        <button onClick={()=> setLogin(false)} className='createAccount'>Create new account</button>
                    </>
                    :
                    <>
                    <div className='close__icon'>
                            <CloseIcon onClick={()=> setLogin(true)} />
                    </div>
                    <div className='name'>
                        <input type="text" placeholder='First Name' onChange={e => setFirstname(e.target.value)} />
                        <input type="text" placeholder='Last Name' onChange={e => setLastname(e.target.value)}/>
                    </div>
                    <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password'onChange={e=>setPassword(e.target.value)}/>
                    <label htmlFor="date">Date of Birth :</label>
                    <input type="date" name="date" id="date" placeholder='Date of Birth' onChange={e=>setDob(e.target.value)}/>
                    <label htmlFor="gender">Gender :</label>
                    <select name="gender" id="gender" onChange={e=>{setGender(e.currentTarget.value) 
                        console.log(e.currentTarget.value);}}>
                        <option value="---">---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div className='sign__up'>
                        <button onClick={sign_up}>Sign Up</button>
                    </div>
                    </>
                    }
                </div>
            </div>
        </div>
        <div className="login__bottom">
            <h5>All rights reserved</h5>
        </div>
    </div>
  )
}

export default Login;
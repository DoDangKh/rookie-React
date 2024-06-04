import React, { Component } from 'react'
import { request, setAuthToken } from '../../../axios_helper';
import './AdminLogin.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {


    const state = {
        email: "",
        password: "",
    }

    const onChangeHandler = (event) => {
        // console.log("testting:", event.target.n`ame, event.target.id)
        let name = event.target.name
        let value = event.target.value
        state[name] = value
    }

    const navigate = useNavigate()



    const onSubmitLogin = (event) => {
        event.preventDefault();
        request("POST", "/auth/login",
            {
                email: state.email, password: state.password
            }
        ).then((response) => {
            console.log(response.data);
            setAuthToken(response.data.token);
            window.localStorage.setItem("user", response.data.id)
            window.localStorage.setItem("email", response.data.email)
            navigate("/Admin/Category")
        }).catch((error) => {
            console.log(error)
        })
        // this.state.onLogin(e, this.state.login, this.state.password)
    }

    const onRegister = (e) => {
        e.preventDefault()
        navigate("/register")
    }




    return (

        <div className='bg-gradient-to-br from-indigo-300  grid p-3  h-full  place-items-center'>

            <form className='space-y-2 align-center justify-center bg-white w-1/4 h-3/4 px-20 py-3' onSubmit={onSubmitLogin}>
                <h4 className='text-center'>Login</h4>
                <div className='grid space-y-2'>
                    <label htmlFor="Email">Email</label>
                    <input id="Email" name="email" className='border-b-2 pt-2  focus:outline-none' onChange={onChangeHandler}></input>
                </div>
                <div className='grid space-y-2'>
                    <label htmlFor="Password">Password</label>
                    <input type='password' id="Password" name="password" className='border-b-2 pt-2 focus:outline-none' onChange={onChangeHandler}></input>
                </div>
                <div className='grid space-y-5 pt-3 '>
                    <Button variant='contained' className=' bg-gradient-to-br from-indigo-300 to-white place-items-center rounded-xl py-2 text-white font-bold on' type='submit'>
                        Login
                    </Button>

                </div>
            </form >
        </div >
    )
}

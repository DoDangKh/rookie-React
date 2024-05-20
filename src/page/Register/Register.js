import React, { Component } from 'react'
import './Register.css'
import { request, setAuthToken } from '../../axios_helper';
import { Button } from '@mui/material'

export default class Regsiter extends Component {

    onChangeHandler = (event) => {
        console.log("testting:", event.target.name, event.target.id)
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
        console.log(this.state.FirstName)
    }


    state = {
        FirstName: "",
        LastName: "",
        password: "",
        email: "",
    }

    onSubmitRegister = (e) => {
        e.preventDefault();
        request("POST", "/auth/register",
            {
                email: this.state.email,
                password: this.state.password,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName

            }
        ).then((response) => {
            setAuthToken(response.data.token);
            console.log('success');
        }).catch((error) => {
            console.log(error)
        })
        // this.state.onLogin(e, this.state.login, this.state.password)
    }


    render() {
        return (
            <div className='bg-gradient-to-br from-indigo-300  grid p-3  h-full  place-items-center' >

                <form className='space-y-2 align-center justify-center bg-white w-1/4 h-3/4 px-20 py-3' onSubmit={this.onSubmitRegister} >
                    <h4 className='text-center'>Register</h4>
                    <div className='grid space-y-2'>
                        <label htmlFor="Email">Email</label>
                        <input id="Email" name="email" className='border-b-2 pt-2  focus:outline-none' onChange={this.onChangeHandler}></input>
                    </div>
                    <div className='grid space-y-2'>
                        <label htmlFor="Password">Password</label>
                        <input type='password' id="Password" name="password" className='border-b-2 pt-2 focus:outline-none' onChange={this.onChangeHandler}></input>
                    </div>
                    <div className='grid space-y-2'>
                        <label htmlFor="FirstName">First Name</label>
                        <input id="FirstName" name="FirstName" className='border-b-2 pt-2 focus:outline-none' onChange={this.onChangeHandler}></input>
                    </div>
                    <div className='grid space-y-2'>
                        <label htmlFor="LastName">Last Name</label>
                        <input id="LastName" name="LastName" className='border-b-2 pt-2 focus:outline-none' onChange={this.onChangeHandler}></input>
                    </div>

                    <div className='flex justify-center space-x-5'>
                        <Button variant='contained' className=' bg-gradient-to-br from-indigo-300 to-white place-items-center rounded-xl py-2 text-white font-bold on' type='submit'>
                            Register
                        </Button>
                        <Button variant='contained' className='bg-gradient-to-br from-white to-indigo-300 place-items-center rounded-xl py-2 text-white font-bold on'
                            type='submit'>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}


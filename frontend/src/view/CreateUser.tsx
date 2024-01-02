import React from 'react';
import SignInViewModel from '../viewmodel/SignInViewModel';
import userService from '../services/userService';
import roleService from '../services/roleService';

import AsyncSelect from 'react-select/async';
import { createStore } from 'state-pool';
import { useState } from 'react';
import { useRef } from 'react';
import config from '../config';


function CreateUser() {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            borderColor: '#9e9e9e',
            minHeight: '30px',
            height: '30px',
            boxShadow: state.isFocused ? null : null,
            fontSize: '20px'
          }),
      
          valueContainer: (provided, state) => ({
            ...provided,
            height: '30px',
            padding: '0 6px',
            fontSize: '20px'

          }),
          
          menuList: (provided, state) => ({
            ...provided,
            margin: '0px',
            fontSize: '20px'
          }),

          input: (provided, state) => ({
            ...provided,
            margin: '0px',
            fontSize: '20px'
          }),
          indicatorSeparator: state => ({
            display: 'none',
          }),
          indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '30px',
          }),
      };


    let viewModel = new SignInViewModel(userService.instance, roleService.instance);


    const [user, setUser] = React.useState<string>(null);
    const [password, setPassword] = React.useState<string>(null);

    const [firstName, setFirstName] = React.useState<string>(null);
    const [lastName, setLastName] = React.useState<string>(null);
    const [email, setEmail] = React.useState<string>(null);
    
    const [role, setRole] = React.useState<string>(null);

    const handleSubmit = async (data:any) => {
        data.preventDefault();
        console.log("submit");
        let succOrFail = await viewModel.signUp(firstName,lastName,email,password,role);
        if(succOrFail == "success"){
            alert("User created");  
            setEmail(null);
            setPassword(null);
            setFirstName(null);
            setLastName(null);
            setRole(null);
            data.target.reset();
        } 
        else alert(succOrFail);
    };

    const promiseOptions = () =>
    new Promise<any[]>((resolve) => {  
        
        resolve(viewModel.getRoles());
    }
);

const handleInputChange =async (option: any) => {
    if (option) {
        setRole(option.value)
      }
}

    return (
        <div className='sign-page'>
            <form className='singform' onSubmit={handleSubmit} id='form'>
                <div className='formItem'>
                    <label htmlFor="firstName"> First Name: </label>
                    <input type="text" id="firstName" required onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="LastName"> Last Name: </label>
                    <input type="text" id="LastName" required onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="Email"> Email: </label>
                    <input type="text" id="Email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="password"> Contraseña: </label>
                    <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="role"> Role: </label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                </div>
                <button className="buttonSub" type="submit" > Create User </button>
            </form>
            
            </div>
    );
    }

export default CreateUser;
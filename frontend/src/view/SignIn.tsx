import React from 'react';

import './SignIn.css';
import SignInViewModel from '../viewmodel/SignInViewModel';
import userService from '../services/userService';
import { Sign } from 'crypto';

function SignIn()  {
    let viewModel = new SignInViewModel(userService.instance);

    const [user, setUser] = React.useState<string>(null);
    const [password, setPassword] = React.useState<string>(null);

    const submit = async (data:any) => {
        data.preventDefault();
        console.log("submit");
        await viewModel.login(user,password);
        window.location.href = '/';
    };

    return (
        <form className='singform' onSubmit={submit}>
             <div className='formItem'>
                <label htmlFor="user"> Usuario: </label>
                <input type="text" id="user" required onChange={(e) => setUser(e.target.value)}/>
            </div>
            <div className='formItem'>
                <label htmlFor="password"> Contraseña: </label>
                <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="buttonSub" type="submit" > Login </button>
        </form>)
        
}
export default SignIn;
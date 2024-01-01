import { Inject } from 'typedi';
import config from '../config';
import IUserService from '../services/IServices/IUserService';

export default class SignInViewModel {
    constructor(
        @Inject(config.services.user.name) private userService : IUserService
        )

    {};
    

    public isLogged() {
        return false;
    }

    public async login(email: string, password: string) {
        
        try {
            console.log("login " + email +" "+ password);
        let data = await this.userService.signIn(email, password);
        if(data.isSuccess) {
            let token = data.getValue().token;
            let userDTO = data.getValue().userDTO;
            localStorage.setItem('role', userDTO.role);
            localStorage.setItem('token', token);

        }
        else {
            console.log(data.error);
        }
    } catch (e) {
        throw e;
    }
    }
}
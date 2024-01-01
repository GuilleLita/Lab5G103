import { Inject } from 'typedi';
import config from '../config';
import IUserService from '../services/IServices/IUserService';
import IRoleService from '../services/IServices/IRoleService';

export default class SignInViewModel {
    constructor(
        @Inject(config.services.user.name) private userService : IUserService,
        @Inject(config.services.role.name) private roleService : IRoleService
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
            alert(data.error);
        }
    } catch (e) {
        throw e;
    }
    }

    public async getRoles() {
        let buildings: any[] = [];
        let buildingsOrError = (await this.roleService.GetRoles());
        if (buildingsOrError.isFailure) {
            return [];
        }
        let data = buildingsOrError.getValue().roleDTO;
        for (let i = 0; i < data.length; i++) {
            buildings.push({ value: data[i].id, label: data[i].name });
        }
        return buildings;
    }

    public async signUp(firstName: string, lastName: string, email: string, password:string, role: string) {
        let userDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        }
        let data = await this.userService.signUp(userDTO);
        if(data.isSuccess) {
            let token = data.getValue().token;
            let userDTO = data.getValue().userDTO;
            localStorage.setItem('role', userDTO.role);
            localStorage.setItem('token', token);

        }
        else {
            console.log(data.error);
        }
    }
}
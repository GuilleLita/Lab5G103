
import { Inject } from 'typedi';
import config from '../config';
import IUserService from '../services/IServices/IUserService';
import IRoleService from '../services/IServices/IRoleService';


export default class AppViewModel {


    constructor(
        @Inject(config.services.user.name) private userService : IUserService,
        @Inject(config.services.role.name) private roleService : IRoleService
        )

    {};


    public async getHeaders(role: string) {
        let roleOrError = await this.roleService.getRole(role);
        if(roleOrError.isFailure) {
            return "error";
        }
        else{
            let name = roleOrError.getValue().roleDTO;
            return name;
        }
    
    }

    public async isLogged() {
        let userOrError = await this.userService.getMe(localStorage.getItem('token'));
        if(userOrError.isFailure) {
            return false;
        }
        else {
            return true;
        }
    }
}

import { Inject } from 'typedi';
import config from '../config';
import IUserService from '../services/IServices/IUserService';


export default class AppViewModel {
    constructor(
        @Inject(config.services.user.name) private buildingService : IUserService
        )

    {};
    

    public isLogged() {
        return false;
    }
}
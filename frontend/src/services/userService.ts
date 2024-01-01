import { IUserDTO } from "../dto/IUserDTO";
import IUserService from "./IServices/IUserService";
import { Result } from "../core/logic/Result";
import config from "../config";
import {Service} from "typedi";

@Service()
export default class userService implements IUserService {
    private static _instance : userService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new userService())
    }

    public async signIn(email: string, password: string): Promise<Result<{userDTO: IUserDTO, token: any}>> {
        
        try {
            console.log("singIn " + email +" "+ password); 
            const res = await fetch(config.ServerURL + '/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, password: password})
            });
            if(res.status === 200){
                const data = await res.json();
                return Result.ok<{userDTO: IUserDTO, token: any}>(data);
            }
            else{
                return Result.fail<{userDTO: IUserDTO, token: any}>(await res.text());
            }

        } catch (e) {
            throw e;
        }
    }


    public async signUp(user: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: any}>> {
        try {
            console.log(JSON.stringify(user));
            const res = await fetch(config.ServerURL + '/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                });
            if(res.status === 201){
                const data = await res.json();
                return Result.ok<{userDTO: IUserDTO, token: any}>(data);
            }
            else{

                return Result.fail<{userDTO: IUserDTO, token: any}>(await res.text());
            }
        }
        catch (e) {
            throw e;
        }
    }
}
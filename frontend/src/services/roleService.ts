import IRoleService  from "./IServices/IRoleService";
import { Result } from "../core/logic/Result";
import config from "../config";
import {Service} from "typedi";
import IRoleDTO from "../dto/IRoleDTO";

@Service()
export default class roleService implements IRoleService {
    private static _instance : roleService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new roleService())
    }

    public async GetRoles () : Promise<Result<{ roleDTO: IRoleDTO[]; }>>{
        
        try {
            const res = await fetch(config.ServerURL + '/api/roles/all');
            const Roles = await res.json().then((data) => {
                return data.roleDTO;
            });
            console.log(Roles);
            
            if (Roles === null) {
              return Result.fail<{roleDTO: any[]}>("Role not found");
            }
            else {
              return Result.ok<{roleDTO: any[]}>( {roleDTO: Roles} )
              }
          } catch (e) {
            throw e;
          }
    }

    public async getRole (id: string) : Promise<Result<{ roleDTO: IRoleDTO; }>>{
            
            try {
                const res = await fetch(config.ServerURL + '/api/roles/?id='+id);
                const Role = await res.json().then((data) => {
                    console.log(data);
                    return data;
                });
                
                if (Role === null) {
                return Result.fail<{roleDTO: any}>("Role not found");
                }
                else {
                return Result.ok<{roleDTO: any}>( {roleDTO: Role.name} )
                }
            } catch (e) {
                throw e;
            }
        }

}
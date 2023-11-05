import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import config from "../../config";
import ITypeRobotDTO from '../dto/ITypeRobotDTO';
import { TypeRobot } from "../domain/typerobot";
import ITypeRobotRepo from './IRepos/ITypeRobotRepo';
import ITypeRobotService from './IServices/ITypeRobotService';
import { Result } from "../core/logic/Result";
import { TypeRobotMap } from "../mappers/TypeRobotMap";

@Service()
export default class TypeRobotService implements ITypeRobotService {
  constructor(
      @Inject(config.repos.typerobot.name) private typerobotRepo : ITypeRobotRepo
  ) {}


  public async createTypeRobot(typerobotDTO: ITypeRobotDTO): Promise<Result<ITypeRobotDTO>> {
    try {

      const typerobotOrError = await TypeRobot.create( typerobotDTO );

      if (typerobotOrError.isFailure) {
        return Result.fail<ITypeRobotDTO>(typerobotOrError.errorValue());
      }

      const typerobotResult = typerobotOrError.getValue();

      await this.typerobotRepo.save(typerobotResult);

      const typerobotDTOResult = TypeRobotMap.toDTO( typerobotResult ) as ITypeRobotDTO;
      return Result.ok<ITypeRobotDTO>( typerobotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTypeRobot(typerobotDTO: ITypeRobotDTO): Promise<Result<ITypeRobotDTO>> {
    try {
      const typerobot = await this.typerobotRepo.findByrobotType(typerobotDTO.robotType);

      if (typerobot === null) {
        return Result.fail<ITypeRobotDTO>("TypeRobot not found");
      }
      else {
        typerobot.robotType = typerobotDTO.robotType;
        await this.typerobotRepo.save(typerobot);

        const typerobotDTOResult = TypeRobotMap.toDTO( typerobot ) as ITypeRobotDTO;
        return Result.ok<ITypeRobotDTO>( typerobotDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}

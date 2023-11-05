import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import ITypeRobotDTO from "../dto/ITypeRobotDTO";

interface TypeRobotProps {
    robotType: string;
    mark: string;
    model: string;
}

export class TypeRobot extends AggregateRoot<TypeRobotProps> {
 
  get robotType (): string {
    return this.props.robotType;
  }

  get mark (): string {
    return this.props.mark;
  }

  get model(): string {
    return this.props.model;
  }

  set robotType ( value: string) {
    this.props.robotType = value;
  }

  set mark ( value: string) {
    this.props.mark = value;
  }

  set model ( value: string) {
    this.props.model = value;
  }

  private constructor (props: TypeRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (typerobotDTO: ITypeRobotDTO, id?: UniqueEntityID): Result<TypeRobot> {
    const type = typerobotDTO.robotType;
    const mark = typerobotDTO.mark;
    const model = typerobotDTO.model;

    if (!!type === false || type.length === 0) {
      return Result.fail<TypeRobot>('Must provide a type name')
    } else {
      const role = new TypeRobot({ robotType: type, mark: mark, model: model }, id);
      return Result.ok<TypeRobot>( role )
    }
  }
}

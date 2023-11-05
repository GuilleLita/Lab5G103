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
    const guardedProps = [
      { argument: props.robotType, argumentName: 'robotType' },
      { argument: props.mark, argumentName: 'mark' },
      { argument: props.model, argumentName: 'model' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TypeRobot>(guardResult.message)
    }

      const role = new TypeRobot({ ...props }, id);
      return Result.ok<TypeRobot>( role )
    }
  }


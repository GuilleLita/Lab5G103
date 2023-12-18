import { Identifier } from './Identifier'
// remove by JRT : import uuid from 'uuid/v4';
const uuid = require('uuid').v4  // Added by JRT


export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : uuid())
  }
}
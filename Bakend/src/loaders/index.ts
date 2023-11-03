import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import BuildingController from '../controllers/buildingController';

import { flatMap, floor } from 'lodash';
import e from 'express';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const hallwaySchema = {
    name: 'hallwaySchema',
    schema: '../persistence/schemas/hallwaySchema',
  };

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const floorSchema = {
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const roomSchema = {
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const elevatorSchema = {
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const hallwayService = {
    name: config.services.hallway.name,
    path: config.services.hallway.path
  }

  const hallwayRepo = {
    name: config.repos.hallway.name,
    path: config.repos.hallway.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      floorSchema,
      hallwaySchema,
      roomSchema,
      elevatorSchema
    ],
    controllers: [
      roleController,
      buildingController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      floorRepo,
      hallwayRepo,
      roomRepo,
      elevatorRepo
    ],
    services: [
      roleService,
      buildingService,
      floorService,
      hallwayService,
      roomService,
      elevatorService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

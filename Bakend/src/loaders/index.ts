import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import BuildingController from '../controllers/buildingController';

import { flatMap, floor } from 'lodash';

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

  const hallwayService = {
    name: config.services.hallway.name,
    path: config.services.hallway.path
  }

  const hallwayRepo = {
    name: config.repos.hallway.name,
    path: config.repos.hallway.path
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
      hallwaySchema
    ],
    controllers: [
      roleController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      floorRepo,
      hallwayRepo
    ],
    services: [
      roleService,
      buildingService,
      floorService,
      hallwayRepo
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

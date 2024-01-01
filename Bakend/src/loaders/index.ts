import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import BuildingController from '../controllers/buildingController';

import { flatMap, floor } from 'lodash';
import e from 'express';
import { type } from 'os';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };
  const taskSchema = {
    name: 'taskSchema',
    schema: '../persistence/schemas/taskSchema',
  };

  const typerobotSchema = {
    name: 'typerobotSchema',
    schema: '../persistence/schemas/typerobotSchema',
  };

  const robotSchema = {
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const hallwaySchema = {
    name: 'hallwaySchema',
    schema: '../persistence/schemas/hallwaySchema',
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

  const userSchema = {
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const hallwayService = {
    name: config.services.hallway.name,
    path: config.services.hallway.path
  }
  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path
  }
  const typerobotService = {
    name: config.services.typerobot.name,
    path: config.services.typerobot.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const hallwayRepo = {
    name: config.repos.hallway.name,
    path: config.repos.hallway.path
  }

  const taskRepo = {
    name: config.repos.task.name,
    path: config.repos.task.path
  }

  const typerobotRepo = {
    name: config.repos.typerobot.name,
    path: config.repos.typerobot.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
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


  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }
  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path
  }
  const typeRobotController = {
    name: config.controllers.typerobot.name,
    path: config.controllers.typerobot.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }

  const hallwayController = {
    name: config.controllers.hallway.name,
    path: config.controllers.hallway.path
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

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      buildingSchema,
      floorSchema,
      hallwaySchema,
      roomSchema,
      elevatorSchema,
      robotSchema,
      typerobotSchema,
      taskSchema,
      userSchema,
      roleSchema
    ],
    controllers: [
      buildingController,
      robotController,
      floorController,
      typeRobotController,
      elevatorController,
      hallwayController,
      taskController,

      roleController
    ],
    repos: [
      buildingRepo,
      floorRepo,
      hallwayRepo,
      roomRepo,
      elevatorRepo,
      robotRepo,
      typerobotRepo,
      taskRepo,
      userRepo,
      roleRepo

    ],
    services: [
      buildingService,
      floorService,
      hallwayService,
      roomService,
      elevatorService,
      robotService,
      typerobotService,
      taskService,
      userService,
      roleService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

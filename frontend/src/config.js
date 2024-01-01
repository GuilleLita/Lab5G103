

export default {

    ServerURL: "http://localhost:4000",

  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 


  services: {

    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    hallway: {
      name: "HallwayService",
      path: "../services/hallwayService"
    },
    room: {
      name: "RoomService",
      path: "../services/roomService"
    },
    elevator: {
      name: "ElevatorService",
      path: "../services/elevatorService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
    typerobot: {
      name: "TypeRobotService",
      path: "../services/typeRobotService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
  },
};

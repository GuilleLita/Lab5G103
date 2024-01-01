import { Router } from 'express';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import hallway from './routes/hallwayRoute';
import room from './routes/roomRoute';
import robot from './routes/robotRoute';
import typerobot from './routes/typerobotRoute';
import elevator from './routes/elevatorRoute';
import task from './routes/taskRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';

export default () => {
	const app = Router();

	building(app);
	floor(app);
	hallway(app);
	room(app);
	robot(app);
	typerobot(app);
	elevator(app);
	task(app);
	user(app)
	role(app)

	
	return app
}
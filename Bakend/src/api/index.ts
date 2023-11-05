import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import hallway from './routes/hallwayRoute';
import room from './routes/roomRoute';
import robot from './routes/robotRoute';
import typerobot from './routes/typerobotRoute';
import elevator from './routes/elevatorRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	hallway(app);
	room(app);
	robot(app);
	typerobot(app);
	elevator(app);

	
	return app
}
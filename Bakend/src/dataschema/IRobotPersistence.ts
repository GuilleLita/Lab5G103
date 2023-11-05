export interface IRobotPersistence {
	robotId: string;
	robotType: string;
	taskspermited: string[];
    currentlytask: string;
    destinationPosition: string[];
	status: string;	//you can inhibit, being working, stop...
  }
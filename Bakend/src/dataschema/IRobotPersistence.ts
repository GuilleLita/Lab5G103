export interface IRobotPersistence {
	robotId: string;
	robotType: string;
	taskspermited: string[];
    currentlytask: string;
	currentlyPosition: string[];
    destinationPosition: string[];
	status: string;	//you can inhibit, being working, stop...
  }
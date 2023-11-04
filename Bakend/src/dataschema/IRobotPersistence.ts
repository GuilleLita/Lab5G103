export interface IRobotPersistence {
	robotId: string;
	robotType: string;
    mark: string;
    model: string;
	taskspermited: string[];
    currentlytask: string;
    destinationPosition: string[];
	status: string;	//you can inhibit, being working, stop...
  }
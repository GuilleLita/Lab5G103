import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITaskService from "../src/services/IServices/ITaskService";
import TaskController from "../src/controllers/taskController";
import {ITaskDTO} from '../src/dto/ITaskDTO';
import { Task } from '../src/domain/task';
import LoggerInstance from '../src/loaders/logger';

describe('task controller', function () {
    this.timeout(5000);

    const sandbox = sinon.createSandbox();

    beforeEach(function (done) {
        Container.reset();

        let LoggerInstance = require("../src/loaders/logger").default;
        Container.set('logger', LoggerInstance);
        let taskSchemaInstance = require("../src/persistence/schemas/taskSchema").default;
        Container.set("taskSchema", taskSchemaInstance);

        let taskRepoClass = require("../src/repos/taskRepo").default;
        let taskRepoInstance = Container.get(taskRepoClass);
        Container.set("TaskRepo", taskRepoInstance);

        let taskServiceClass = require("../src/services/taskService").default;
        let taskServiceInstance = Container.get(taskServiceClass);
        Container.set("TaskService", taskServiceInstance);

        done();
    });


afterEach(function() {
    sandbox.restore();
});
it('taskController unit test using taskService stub', async function () {
    // Arrange
    let body = { 
    "taskName": "fotos",
    "buildingsCode": ["a", "b"],
    "floorsId": ["a2", "b2"],
    "initialPoint": [3, 3],
    "destinationPoint": [3, 3],
    "status": "working" };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
        json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let taskServiceInstance = Container.get("TaskService");
   sinon.stub(taskServiceInstance, "CreateTask").returns( Result.ok<ITaskDTO>( {
        "taskId": "123",
        "taskName": "fotos",
        "buildingsCode": ["a", "b"],
        "floorsId": ["a2", "b2"],
        "initialPoint": [3, 3],
        "destinationPoint": [3, 3],
        "status": "working"
    } ));

    const ctrl = new TaskController(taskServiceInstance as ITaskService);

    // Act
    await ctrl.createTask(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
    "taskId": "123",
    "taskName": "fotos",
    "buildingsCode": ["a", "b"],
    "floorsId": ["a2", "b2"],
    "initialPoint": [3, 3],
    "destinationPoint": [3, 3],
    "status": "working"}));
    
});

});
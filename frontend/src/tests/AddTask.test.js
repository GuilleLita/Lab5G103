import { render, fireEvent } from '@testing-library/react';
import App from '../view/App';
import { taskService, taskService } from '../services/taskService';

global.fetch = jest.fn();

const ITaskDTO = {
    "taskName": "fotos",
    "buildingsCode": [
        "a",
        "b"
    ],
    "floorsId": [
        "a2",
        "b2"
    ],
    "initialPoint": [
        3,
        3
    ],
    "destinationPoint": [
        3,
        3
    ],
    "status": "aceptada"
};

test('addTask function', async () => {
    let taskService = new taskService();
    const { getByText } = render(<App />);
    const addTask = getByText('Add Task');
    fireEvent.click(addTask);

    const createTask = getByText('Create Task');
    fireEvent.click(createTask);

    const task = await addTaskViewModel.createTask(ITaskDTO);
    expect(task).toEqual(ITaskDTO);

});
// tests for the default page
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../view/App';

test('display RobDroneGo correctly', () =>{
    const { getByText } = render(<App/>);
    const element = getByText('RobDroneGo'); 
    expect(element).toBeInTheDocument();
});

test('display Edit Floor correctly', () =>{
    const { getByText } = render(<App/>);
    const element = getByText('Edit Floor'); 
    expect(element).toBeInTheDocument();
});

test('clicking on "List elevators in building" button changes body to ListElevators', () => {

    const { getByText } = render(<App/>);
    // Get the "List elevators in building" button and click it
    const listElevatorsButton = getByText('List elevators in building');
    fireEvent.click(listElevatorsButton);
  
    // Check if the body now displays "ListElevators"
    const listElevatorsText = screen.getByText('Select building to lists their elevators');
    expect(listElevatorsText).toBeInTheDocument();
  });

  test('clicking  "Edit Floor" button changes body ', () => {

    const { getByText } = render(<App/>);
    // Get the "List elevators in building" button and click it
    const editFloorButton = getByText('Edit Floor');
    fireEvent.click(editFloorButton);
  
    // Check if the body now displays "ListElevators"
    const editFloorText = screen.getByText('Edit any propety and click Update floor to edit the floor with the new values');
    expect(editFloorText).toBeInTheDocument();
  });

  test('clicking  "Add Hallway" button changes body ', () => {

    const { getByText } = render(<App/>);
    // Get the  button and click it
    const addHallwayButton = getByText('Add Hallway');
    fireEvent.click(addHallwayButton);
  
    // Check if the body now displays the text
    const addHallwayText = screen.getByText('Building 1');
    expect(addHallwayText).toBeInTheDocument();
  });



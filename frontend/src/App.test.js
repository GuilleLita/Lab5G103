// tests for the default page
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

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
    const listElevatorsText = screen.getByText('ListElevators');
    expect(listElevatorsText).toBeInTheDocument();
  });


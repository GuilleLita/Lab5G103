// tests for the default page
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ListElevators from './ListElevators';

test('display RobDroneGo correctly', () =>{
    const { getByText } = render(<ListElevators/>);
    const element = getByText('Select building to lists their elevators'); 
    expect(element).toBeInTheDocument();
});


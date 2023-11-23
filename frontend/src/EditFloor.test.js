// tests for the default page
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import EditFloor from './EditFloor';

test('display test h2', () =>{
    const { getByText } = render(<EditFloor/>);
    const element = getByText('Edit any propety and click Update floor to edit the floor with the new values'); 
    expect(element).toBeInTheDocument();
});

test('display test building', () =>{
    const { getByText } = render(<EditFloor/>);
    const element = getByText('In wich building is the floor located?'); 
    expect(element).toBeInTheDocument();
});

test('display test floor', () =>{
    const { getByText } = render(<EditFloor/>);
    const element = getByText('What floor do you want to edit?'); 
    expect(element).toBeInTheDocument();
});

test('display test floor', () =>{
    const { getByText } = render(<EditFloor/>);
    const element = getByText('Floor name'); 
    expect(element).toBeInTheDocument();
});

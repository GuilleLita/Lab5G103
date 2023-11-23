// tests for the default page
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';
import AddHallway from './AddHallway';

test('display Edit Floor correctly', () =>{
    const { getByText } = render(<AddHallway/>);
    const element = getByText('Building 1'); 
    expect(element).toBeInTheDocument();
});
test('display Edit Floor correctly', () =>{
    const { getByText } = render(<AddHallway/>);
    const element = getByText('Building 2'); 
    expect(element).toBeInTheDocument();
});

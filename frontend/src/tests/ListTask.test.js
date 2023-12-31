import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ListTaskViewModel from '../viewmodel/ListTaskViewModel';
import config from '../config';

// Mock the fetch function
global.fetch = jest.fn();

// Mock the response data
const mockData = {
  taskDTO: [
    {
        "taskName": "fotos",
        "status": "aceptada"
    }
  ],
};

describe('searchListTasks function', () => {
    let viewModel = new ListTaskViewModel();
    it('fetches data and returns tasks for a specific status', async () => {
 
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
  

      const tasks = await viewModel.searchListTasks('aceptada');
  

      expect(global.fetch).toHaveBeenCalledWith(
        `${config.ServerURL}/api/task/getbystatus?status=aceptada`
      );
      expect(tasks).toEqual(mockData.taskDTO);
    });
  
    it('handles fetch error', async () => {
      
      global.fetch.mockRejectedValueOnce(new Error('Fetch error'));
  
 
      await expect(viewModel.searchListTasks('aceptada')).rejects.toThrow('Fetch error');
    });
  
  });


import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import '@testing-library/jest-dom'
import { Home } from './index';

let mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
   useNavigate: () => mockUseNavigate,
 }));

afterEach(() => {
    jest.clearAllMocks();
});

const history: any = createBrowserHistory();

test('loads and displays greeting', async () => {
    render(        
    <Router navigator={history} location={'/'}>
        <Home />
      </Router>
    )
  
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByRole('heading')).toHaveTextContent('Hello world!')

    fireEvent.click(screen.getByText('Click Me'))
    expect(screen.getByRole('heading')).toHaveTextContent('Goodbye world!')
})

test('Button navigates to form screen on click', async () => {
    render(        
    <Router navigator={history} location={'/'}>
        <Home />
      </Router>
    )
  
    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByText('To Form!'))
    expect(mockUseNavigate).toHaveBeenCalledWith('/Form')
})
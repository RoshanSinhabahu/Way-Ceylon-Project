import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LocationDetails from './LocationDetails';

const mockPlace = {
    name: 'Test Location',
    image: 'test-image.jpg',
    description: 'Test Description',
    cost: 100,
    duration: 3,
    weather: {
        condition: 'Sunny',
        avgTemp: '25°C',
    },
    lat: 0,
    lon: 0,
};

describe('LocationDetails Component', () => {
    test('renders location details correctly', () => {
        const onBack = jest.fn();
        render(<LocationDetails place={mockPlace} onBack={onBack} />);

        expect(screen.getByText('Test Location')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Location Details')).toBeInTheDocument();

        // Check for "Back to Search Results" button
        expect(screen.getByText(/Back to Search Results/i)).toBeInTheDocument();
    });

    test('calls onBack when back button is clicked', () => {
        const onBack = jest.fn();
        render(<LocationDetails place={mockPlace} onBack={onBack} />);

        const backButton = screen.getByText(/Back to Search Results/i);
        fireEvent.click(backButton);

        expect(onBack).toHaveBeenCalledTimes(1);
    });
});

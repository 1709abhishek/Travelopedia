import React from 'react';
import { render, screen } from '@testing-library/react';
import BudgetProcess from '../BudgetProcess';

describe('BudgetProcess Component', () => {
    it('renders the steps with correct labels', () => {
        render(<BudgetProcess step={1} />);
        expect(screen.getByText(/Add Items/i)).toBeInTheDocument();
        expect(screen.getByText(/Preview/i)).toBeInTheDocument();
        expect(screen.getByText(/Confirm & Save/i)).toBeInTheDocument();
    });

    it('highlights the current step', () => {
        render(<BudgetProcess step={2} />);
        const currentStep = screen.getByText(/2/i);
        expect(currentStep).toHaveClass('bg-blue-600 text-white');
    });

    it('marks completed steps as green', () => {
        render(<BudgetProcess step={3} />);
        const completedSteps = screen.getAllByText(/✓/i); // Get all checkmarks
        expect(completedSteps).toHaveLength(2); // Expect two steps to be completed
        completedSteps.forEach((step) => {
            expect(step).toHaveClass('bg-green-600 text-white');
        });
    });

    it('displays remaining steps as gray', () => {
        render(<BudgetProcess step={1} />);
        const remainingStep = screen.getByText(/2/i);
        expect(remainingStep).toHaveClass('bg-gray-700 text-gray-400');
    });

    it('renders the correct numbers or checkmarks for steps', () => {
        render(<BudgetProcess step={3} />);
        const checkmarks = screen.getAllByText(/✓/i);
        expect(checkmarks).toHaveLength(2); // Two completed steps have checkmarks
        expect(screen.getByText(/3/i)).toBeInTheDocument(); // Step 3 has its number
    });
});

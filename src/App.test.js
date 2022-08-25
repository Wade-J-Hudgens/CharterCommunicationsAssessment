import { render, screen } from '@testing-library/react';
import App from './App';
import CalculatePointsSection from './components/CalculatePointsSection/CalculatePointsSection';
import CustomersTable from './components/CustomersTable/CustomersTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';

test('renders customers', () => {
  render(<CustomersTable />);
  expect(screen.getByText('Customers')).toBeInTheDocument();
});

test('renders transactions', () => {
  render(<TransactionsTable />);
  expect(screen.getByText('Transactions')).toBeInTheDocument();
});

test('renders calculation', () => {
  render(<CalculatePointsSection />);
  expect(screen.getByText('Calculate Points For A Customer')).toBeInTheDocument();
});
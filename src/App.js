import logo from './logo.svg';
import './App.css';

import CustomersTable from './components/CustomersTable/CustomersTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';

import {GetAllCustomers, GetAllTransactions, CalculateRewardPointsForCustomer} from "./APIs/APIs"
import CalculatePointsSection from './components/CalculatePointsSection/CalculatePointsSection';

function App() {
  return (
    <div className="App">
      <CustomersTable />
      <TransactionsTable />
      <CalculatePointsSection />
    </div>
  );
}

export default App;

import { ITransaction, ITransactionCategory } from '../models/transaction.model';

export const MOCK_TRANSACTION_CATEGORIES: ITransactionCategory[] = [
  { id: '1', name: 'Food & Dining' },
  { id: '2', name: 'Transport' },
  { id: '3', name: 'Utilities' },
  { id: '4', name: 'Entertainment' },
  { id: '5', name: 'Healthcare' },
  { id: '6', name: 'Income' },
];

export const MOCK_TRANSACTIONS: ITransaction[] = [
  {
    id: '1',
    description: 'Grocery Store',
    category: 'Food & Dining',
    amount: 120.5,
    type: 'expense',
    date: new Date('2025-02-24'),
    notes: 'Weekly groceries',
  },
  {
    id: '2',
    description: 'Office Salary',
    category: 'Income',
    amount: 3200.0,
    type: 'income',
    date: new Date('2025-02-23'),
    notes: 'Monthly salary',
  },
  {
    id: '3',
    description: 'Gas Station',
    category: 'Transport',
    amount: 45.75,
    type: 'expense',
    date: new Date('2025-02-22'),
    notes: 'Fuel',
  },
  {
    id: '4',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 15.99,
    type: 'expense',
    date: new Date('2025-02-20'),
    notes: 'Monthly subscription',
  },
  {
    id: '5',
    description: 'Electric Bill',
    category: 'Utilities',
    amount: 89.5,
    type: 'expense',
    date: new Date('2025-02-18'),
    notes: 'February bill',
  },
];

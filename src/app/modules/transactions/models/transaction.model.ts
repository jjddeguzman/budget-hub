export interface ITransaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  notes?: string;
}

export interface ITransactionCategory {
  id: string;
  name: string;
  icon?: string;
}

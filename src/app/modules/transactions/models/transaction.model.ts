export interface ITransaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  notes?: string;
}

export interface IFormattedTransaction extends ITransaction {
  formattedAmount: string;
}

export interface ITransactionCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface IAddTransaction {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

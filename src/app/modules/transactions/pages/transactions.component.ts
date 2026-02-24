import { Component, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITransaction, IFormattedTransaction } from '../models/transaction.model';
import { MOCK_TRANSACTIONS } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionsTableComponent],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Transactions</h1>
          <p class="text-gray-600 mt-1">Track and manage all your financial transactions.</p>
        </div>
        <button
          class="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
        >
          + Add Transaction
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search transactions..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>All Categories</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Utilities</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>All Types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <app-transactions-table [transactions]="formattedTransactions()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private transactions$: Signal<ITransaction[]> = signal<ITransaction[]>(MOCK_TRANSACTIONS);

  transactions = this.transactions$;

  /**
   * Formats transactions for display with amount signs and currency symbol
   */
  formattedTransactions = computed<IFormattedTransaction[]>(() =>
    this.transactions$().map((tx) => ({
      ...tx,
      formattedAmount: `${tx.type === 'income' ? '+' : '-'}$${tx.amount}`,
    })),
  );
}

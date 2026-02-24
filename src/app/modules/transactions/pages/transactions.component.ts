import { Component, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITransaction, IFormattedTransaction } from '../models/transaction.model';
import { MOCK_TRANSACTIONS } from '../mocks/transaction.mock';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (item of formattedTransactions(); track item.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-900">{{ item.description }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ item.category }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ item.date | date: 'MMM dd, yyyy' }}
                </td>
                <td
                  [ngClass]="{
                    'text-green-600': item.type === 'income',
                    'text-gray-900': item.type === 'expense',
                  }"
                  class="px-6 py-4 text-sm text-right font-medium"
                >
                  {{ item.formattedAmount }}
                </td>
                <td class="px-6 py-4 text-sm text-center">
                  <button class="text-teal-600 hover:text-teal-700 font-medium">Edit</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500 text-sm">
                  No transactions found
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
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

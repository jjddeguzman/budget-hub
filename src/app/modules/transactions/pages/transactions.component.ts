import { Component, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITransaction, IFormattedTransaction } from '../models/transaction.model';
import { MOCK_TRANSACTIONS, MOCK_TRANSACTION_CATEGORIES } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../components/transactions-filters/transactions-filters.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionsTableComponent, TransactionsFiltersComponent],
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
      <app-transactions-filters [categories]="categories" />

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
   * Available transaction categories for filtering
   */
  categories = MOCK_TRANSACTION_CATEGORIES;

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

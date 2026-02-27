import { Component, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITransaction, IFormattedTransaction } from '../models/transaction.model';
import { MOCK_TRANSACTIONS, MOCK_TRANSACTION_CATEGORIES } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../components/transactions-filters/transactions-filters.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TransactionsTableComponent,
    TransactionsFiltersComponent,
    PageHeaderComponent,
  ],
  template: `
    <div class="space-y-8">
      <!-- Page Header -->
      <app-page-header
        [title]="pageTitle()"
        [description]="pageDescription()"
        [buttonLabel]="pageButtonLabel()"
        (onButtonClick)="onAddTransaction()"
      />

      <!-- Filters -->
      <app-transactions-filters [categories]="categories" />

      <!-- Transactions Table -->
      <app-transactions-table [transactions]="formattedTransactions()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private transactions$: Signal<ITransaction[]> = signal<ITransaction[]>([]);
  categories = MOCK_TRANSACTION_CATEGORIES;
  transactions = this.transactions$;

  pageTitle = (): string => 'Transactions';

  pageDescription = (): string => 'Track and manage all your financial transactions.';

  pageButtonLabel = (): string => '+ Add Transaction';

  /**
   * Formats transactions for display with amount signs and currency symbol
   */
  formattedTransactions: Signal<IFormattedTransaction[]> = computed<IFormattedTransaction[]>(() =>
    this.transactions$().map((tx) => ({
      ...tx,
      formattedAmount: `${tx.type === 'income' ? '+' : '-'}$${tx.amount}`,
    })),
  );

  onAddTransaction = (): void => console.log('Add Transaction button clicked');
}

import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  Signal,
  OnInit,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import {
  ITransaction,
  IFormattedTransaction,
  ITransactionCategory,
} from '../models/transaction.model';
import { MOCK_TRANSACTIONS, MOCK_TRANSACTION_CATEGORIES } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../components/transactions-filters/transactions-filters.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
      <app-transactions-filters [categories]="categories$()" [filtersForm]="filtersForm" />

      <!-- Transactions Table -->
      <app-transactions-table [transactions]="formattedTransactions$()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  public transactions$: Signal<ITransaction[]> = signal<ITransaction[]>(MOCK_TRANSACTIONS);
  public categories$: Signal<ITransactionCategory[]> = signal<ITransactionCategory[]>(
    MOCK_TRANSACTION_CATEGORIES,
  );

  /**
   * Tracks form filter values reactively
   */

  /**
   * Formats and filters transactions based on active filters
   * Applies search, category, type, and date range filters
   */
  public formattedTransactions$: Signal<IFormattedTransaction[]> = computed<
    IFormattedTransaction[]
  >(() => this.filterTransactions(this.transactions$()));

  // Filter form group
  filtersForm: FormGroup;

  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.initFiltersForm();
  }

  private formFilters$ = signal({
    search: '',
    category: 'All Categories',
    type: 'All Types',
    dateRange: '',
  });

  ngOnInit(): void {
    // Subscribe to form value changes and update signal with 300ms debounce
    this.filtersForm.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        this.formFilters$.set(values);
      });
  }

  /**
   * Filter transactions based on active filters and format them for display
   */
  private filterTransactions(transactions: ITransaction[]): IFormattedTransaction[] {
    const filters = this.formFilters$();

    return transactions
      .filter((tx) => {
        // Search filter - matches against description or category
        if (filters.search.trim()) {
          const searchTerm = filters.search.toLowerCase().trim();
          const matchesSearch =
            tx.description.toLowerCase().includes(searchTerm) ||
            tx.category.toLowerCase().includes(searchTerm);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category !== 'All Categories') {
          if (tx.category !== filters.category) return false;
        }

        // Type filter (income/expense)
        if (filters.type !== 'All Types') {
          const typeMap: { [key: string]: string } = {
            Income: 'income',
            Expenses: 'expense',
          };
          if (tx.type !== typeMap[filters.type]) return false;
        }

        // Date range filter
        if (filters.dateRange) {
          const txDate = new Date(tx.date).getTime();
          const rangeDate = new Date(filters.dateRange).getTime();
          if (txDate > rangeDate) return false;
        }

        return true;
      })
      .map((tx) => ({
        ...tx,
        formattedAmount: `${tx.type === 'income' ? '+' : '-'}$${tx.amount}`,
      }));
  }

  /**
   * Initialize filter form group
   */
  private initFiltersForm(): FormGroup {
    return this.fb.group({
      search: [''],
      category: ['All Categories'],
      type: ['All Types'],
      dateRange: [''],
    });
  }

  pageTitle = (): string => 'Transactions';

  pageDescription = (): string => 'Track and manage all your financial transactions.';

  pageButtonLabel = (): string => '+ Add Transaction';

  onAddTransaction = (): void => console.log('Add Transaction button clicked');
}

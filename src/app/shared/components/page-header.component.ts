import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="buttonLabel() ? 'flex justify-between items-start' : ''">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">{{ title() }}</h1>
        <p class="text-gray-500 mt-2">{{ description() }}</p>
      </div>
      @if (buttonLabel()) {
        <button
          (click)="onButtonClick.emit()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {{ buttonLabel() }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  /**
   * The main title of the page
   */
  title = input.required<string>();

  /**
   * The description subtitle below the title
   */
  description = input.required<string>();

  /**
   * Optional button label - if provided, button will be shown
   */
  buttonLabel = input<string | undefined>(undefined);

  /**
   * Emits when the button is clicked
   */
  onButtonClick = output<void>();
}

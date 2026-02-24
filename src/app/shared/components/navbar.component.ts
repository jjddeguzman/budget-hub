import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky top-0 z-50 bg-gradient-to-r from-teal-700 to-teal-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-white text-lg">Budget Hub</span>
          </div>

          <!-- Navigation Links -->
          <div class="flex gap-1">
            <a
              routerLink="/dashboard"
              routerLinkActive="bg-teal-800"
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-4 py-2 text-white rounded-md transition-colors hover:bg-teal-800"
            >
              Dashboard
            </a>
            <a
              routerLink="/transactions"
              routerLinkActive="bg-teal-800"
              class="px-4 py-2 text-white rounded-md transition-colors hover:bg-teal-800"
            >
              Transactions
            </a>
            <a
              routerLink="/budgets"
              routerLinkActive="bg-teal-800"
              class="px-4 py-2 text-white rounded-md transition-colors hover:bg-teal-800"
            >
              Budgets
            </a>
            <a
              routerLink="/settings"
              routerLinkActive="bg-teal-800"
              class="px-4 py-2 text-white rounded-md transition-colors hover:bg-teal-800"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}

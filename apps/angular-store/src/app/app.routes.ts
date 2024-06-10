import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'ui',
    loadComponent: () =>
      import('@angular-monorepo/ui').then((m) => m.BannerComponent),
  },
];

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    // importProvidersFrom(
    //   ...sources:RouterModule.forRoot(appRoutes:[
    //     {
    //       path:'login',
    //       loadChildren:()=> import('@angular-monorepo/user').then(onfulfilled:(lib)=>lib.userRoutes)
    //     }
    //   ])
    // )
    
  ],
};

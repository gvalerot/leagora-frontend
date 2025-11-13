import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const authLink = new SetContextLink((prevContext, operation) => {
          const token = localStorage.getItem('jwt_token');

          // Tomamos los headers previos si existen y los fusionamos
          const prevHeaders = prevContext.headers ?? {};
          const headers = new HttpHeaders({
            ...prevHeaders,
            Authorization: token ? `Bearer ${token}` : '',
          });

          return { headers }; // ahora es HttpHeaders, compatible con Apollo
        });

        return {
          cache: new InMemoryCache(),
          link: authLink.concat(
            httpLink.create({ uri: 'http://localhost:8080/graphql' })
          ),
        };
      },
      deps: [HttpLink],
    },
    Apollo
  ],
});

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/layout/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

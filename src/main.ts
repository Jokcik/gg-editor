import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {GgSpoilerModule} from './app/gg-spoiler/gg-spoiler.module';

if (environment.production) {
  enableProdMode();
}

// async function func() {
//   platformBrowserDynamic().bootstrapModule(GgSpoilerModule)
//     .catch(err => console.log(err));

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
// }


// func();

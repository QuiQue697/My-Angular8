import 'hammerjs';
import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// import { enableProdMode } from '@angular/core';            *** MDisabled 06/10/2020 ***
// import { environment } from './environments/environment';

// if (environment.production) {  *** MDisabled 06/10/2020 ***
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {  *** Modified 06/04/2020 ***
  // Ensure Angular destroys itself on hot reloads.
  // if (window['ngRef']) {
  //   window['ngRef'].destroy();
  // }
  // window['ngRef'] = ref;

// Otherwise, log the boot error
// }).catch(err => console.error(err)); *** Modified 06/04/2020 ***

// *** Enable CORS method ***//
// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     app.enableCors();
//     await app.listen(3000);
//   }
// bootstrap();

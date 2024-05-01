import { router } from './routers';
import logger from './logger';
import createApp from './app';
// import { setKeyVerify } from './middleware';
import { connectToMongo } from './database';
import { configsApp } from './configs';
import { setKeyVerify } from './middleware/role.verification';

function main(): void {
     const app = createApp(router, configsApp);
     const port = Number(configsApp.app.port);
     const host = configsApp.app.host;
     setKeyVerify(configsApp.keys.public_key);
     const startApp = (): void => {
          app.listen(Number(port), host, () => {
               logger.info('Listening on: %s:%d', host, port);
          });
     };

     connectToMongo(() => {
          startApp();
     });
}

main();

import myServer from './services/server';
import Config from './config';
import { Logger } from './services/logger';

const puerto = Config.PORT;

myServer.listen(puerto, () => Logger.info(`Server up puerto ${puerto}`));

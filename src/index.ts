import myServer from './services/server';
import Config from './config';
import { Logger } from './services/logger';
import { Server } from 'socket.io';
import { init } from './services/socketIO';

const io = new Server(myServer);
const puerto = Config.PORT;

init(io);

myServer.listen(puerto, () => Logger.info(`Server up puerto ${puerto}`));

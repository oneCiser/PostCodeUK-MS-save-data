import Server from './server/Server';
import './config/dotenv';
import { logger } from './utils';
import Database from './config/database';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server: Server = Server.init(PORT);

// Connect to database
Database.connect();


// START
// eslint-disable-next-line no-console
if (process.env.NODE_ENV !== 'test') {
  server.listen(() => logger.info(`🚀 App listening on the port ${PORT}`));
}
export default server;

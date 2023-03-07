import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '../config';

const AppDataConnection = new DataSource({
  type: config.db.dialect as 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.userName,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});

export const connect = async () => {
  try {
    const connection = await AppDataConnection.initialize();

    console.log('DB connected');

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      console.log('DB connection is disconnected due to application termination');
      process.exit(0);
    });

    return connection;
  } catch (err) {
    console.log('DB connection error: ', err.message);
    process.exit(1);
  }
};

export default AppDataConnection;

import AppDataConnection from './data-connection';

export const createConnection = async () => {
  const connect = await AppDataConnection.initialize().catch((err) => {
    console.log('DB connection error: ', err.message);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    connect.destroy().then(() => {
      process.exit(0);
    });
  });
};

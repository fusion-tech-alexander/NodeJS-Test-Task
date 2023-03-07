process.env.TZ = 'UTC';

export const isProd = false;
const config = {
  port: 3000,
  db: {
    host: '127.0.0.1',
    port: 5432,
    userName: 'lex',
    password: '0000',
    database: 'test',
    dialect: 'postgres',
  },
};

export default config;

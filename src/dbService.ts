import pg, { ClientConfig } from 'pg';

const { Client } = pg;

export const queryDb = async () => {
  let client:  pg.Client;
  try {
    const pgConfig: ClientConfig = {
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    };

    client = new Client(pgConfig);

    client.connect();
    const { rows } = await client.query(`
      SELECT *, NOW()
      FROM roles ;`);

    client.end();
    console.log({ rows });
    return rows;
  } catch (err) {
    console.error(err);
    // client.end();
    return err;
  }
};

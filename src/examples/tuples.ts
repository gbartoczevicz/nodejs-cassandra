import { Client, types } from 'cassandra-driver';

const { Tuple, TimeUuid, BigDecimal } = types;

export const tuples = async (client: Client) => {
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS examples 
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }
  `);

  await client.execute(
    `CREATE TABLE IF NOT EXISTS examples.tuple_forex (
      name text, 
      time timeuuid, 
      currencies frozen<tuple<text, text>>, 
      value decimal, 
      PRIMARY KEY (name, time)
    )`
  );

  const name = `Market ${TimeUuid.now().toString()}`;

  await client.execute(
    `INSERT INTO examples.tuple_forex (name, time, currencies, value) 
     VALUES (?, ?, ?, ?)`,
    [name, TimeUuid.now(), new Tuple('USD', 'EUR'), new BigDecimal(11, 1)],
    { prepare: true }
  );

  const result = await client.execute(
    `SELECT name, time, currencies, value 
       FROM examples.tuple_forex 
      WHERE name = ?`,
    [name],
    { prepare: true }
  );

  const rawData = result.rows;

  rawData.forEach((data) => {
    console.log({
      name: data.name,
      time: data.time,
      currencies: data.currencies,
      value: data.value,
    });
  });
};

import { Client, types as CassandraTypes } from 'cassandra-driver';

const id = CassandraTypes.Uuid.random();

export const intro = async (
  client: Client,
  namespace: string,
  table: string
) => {
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS ${namespace} 
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }
  `);

  await client.execute(
    `CREATE TABLE IF NOT EXISTS ${namespace}.${table} (
      id uuid, 
      txt text, 
      val int, 
      
      PRIMARY KEY(id)
    )`
  );

  await client.execute(
    `INSERT INTO ${namespace}.${table} (id, txt, val) VALUES (?, ?, ?)`,
    [id, 'Hello!', 100],
    { prepare: true }
  );

  const result = await client.execute(
    `SELECT id, txt, val FROM ${namespace}.${table} WHERE id = ?`,
    [id],
    { prepare: true }
  );

  const rawData = result.rows;

  rawData.forEach((data) => {
    console.log({ id: data.id.toString(), txt: data.txt, val: data.val });
  });
};

import { types as CassandraTypes } from 'cassandra-driver';
import { client } from '@infra/cassandra';

const id = CassandraTypes.Uuid.random();

const main = async () => {
  await client.connect();

  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS examples 
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS examples.basic (
      id uuid, 
      txt text, 
      val int, 
      PRIMARY KEY(id)
    )
  `);

  await client.execute(
    `
    INSERT INTO examples.basic (id, txt, val)
    VALUES (?, ?, ?)
  `,
    [id, 'Hello!', 100],
    { prepare: true }
  );

  const result = await client.execute(
    `
    SELECT id, txt, val 
      FROM examples.basic 
     WHERE id = ?
  `,
    [id],
    { prepare: true }
  );

  const rawData = result.rows;

  rawData.forEach((data) => {
    console.log({ id: data.id.toString(), txt: data.txt, val: data.val });
  });

  await client.shutdown();
};

main().catch((err) => {
  console.log('Unexpected Error', err.message);

  process.exit(1);
});

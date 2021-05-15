import { client } from '@infra/cassandra';
import { tuples, intro } from './examples';

const main = async () => {
  await client.connect();

  await intro(client);
  await tuples(client);

  await client.shutdown();
};

main().catch((err) => {
  console.log('Unexpected Error', err.message);

  process.exit(1);
});

import { client } from '@infra/cassandra';
import { tuples, intro, userDefinedType, metadata } from './examples';

const namespace = 'examples';
const udt = 'address';
const tables = ['basic', 'tuple_forex', 'user_with_address_udt'];

const main = async () => {
  console.log('\nConnecting into Cassandra ...');
  await client.connect();

  await intro(client, namespace, tables[0]);
  await tuples(client, namespace, tables[1]);
  await userDefinedType(client, namespace, tables[2], udt);
  await metadata(client, namespace, tables, udt);

  await client.shutdown();

  console.log('\nDisconected from Cassandra');
};

main().catch((err) => {
  console.log('Unexpected Error', err.message);

  process.exit(1);
});

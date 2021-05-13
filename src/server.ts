import { client } from '@infra/cassandra';

const main = async () => {
  await client.connect();

  console.log(`Keyspaces: ${client.metadata.keyspaces}`);

  await client.shutdown();
};

main().catch((err) => console.log('Unexpected Error', err));

import { Client } from 'cassandra-driver';

export const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'nosql_intro_datacenter',
  protocolOptions: { port: 9042 },
  credentials: {
    username: 'cassandra',
    password: 'cassandra',
  },
});

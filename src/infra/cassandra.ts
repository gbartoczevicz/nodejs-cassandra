import { Client } from 'cassandra-driver';

export const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

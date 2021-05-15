import { Client } from 'cassandra-driver';

export const metadata = async (
  client: Client,
  namespace: string,
  tables: string[],
  udt: string
) => {
  console.log('\n *** Executing Metadata Queries ***\n');

  const tablePromises = tables.map((table) =>
    client.metadata.getTable(namespace, table)
  );

  const tablesMeta = await Promise.all(tablePromises);

  tablesMeta.forEach((tableMeta) => {
    console.log(`\nTable ${tableMeta.name} Metadata`, {
      columns: JSON.stringify(tableMeta.columns),
      partition_keys: JSON.stringify(tableMeta.partitionKeys),
      clustering_keys: JSON.stringify(tableMeta.clusteringKeys),
      indexes: JSON.stringify(tableMeta.indexes),
    });
  });

  const udtMeta = await client.metadata.getUdt(namespace, udt);

  console.log(`\nUDT ${udtMeta.name} Metadata`, {
    fields: JSON.stringify(udtMeta.fields),
  });
};

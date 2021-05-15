import { Client } from 'cassandra-driver';

export const userDefinedType = async (client: Client) => {
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS examples 
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }
  `);

  await client.execute(
    `CREATE TYPE IF NOT EXISTS examples.address (
      street text, 
      city text, 
      state text, 
      zip int, 
      phones set<text>
    )`
  );

  await client.execute(
    `CREATE TABLE IF NOT EXISTS examples.user_with_address_udt (
      name text, 
      email text, 
      address frozen<address>,
      PRIMARY KEY (name)
    )`
  );

  const userWithAddressUDT = {
    name: `Bruno Henrique ${Date.now()}`,
    email: 'bruno_henrique@email.com',
    address: {
      city: 'Londrina',
      state: 'PR',
      street: 'Avenida Inglaterra',
      zip: 9999,
      phones: ['(43) 98787-6969', '(43) 96635-9511'],
    },
  };

  await client.execute(
    `INSERT INTO examples.user_with_address_udt (name, email, address) 
     VALUES (?, ?, ?)`,
    [
      userWithAddressUDT.name,
      userWithAddressUDT.email,
      userWithAddressUDT.address,
    ],
    { prepare: true }
  );

  const result = await client.execute(
    `SELECT name, email, address 
       FROM examples.user_with_address_udt 
      WHERE name = ?`,
    [userWithAddressUDT.name],
    { prepare: true }
  );

  const rawData = result.rows;

  rawData.forEach((data) => {
    console.log({
      name: data.name,
      email: data.email,
      address: data.address,
    });
  });
};

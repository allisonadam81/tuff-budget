const { Pool } = require('pg');

// Link to ElephantSQL DB
const PG_URI =
  'postgres://inucuasp:t2etowENokOEaU8Jickz8FFBKtDYmBTZ@heffalump.db.elephantsql.com/inucuasp';

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text: any, params: any, callback: any) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};

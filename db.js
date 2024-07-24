/** Database for lunchly */
const { Client } = require("pg"); 

const pg = require("pg");

//const db = new pg.Client("postgresql:///lunchly");
DB_URI = "postgres://karl:Bonfire500@localhost:5432/lunchly";

let db = new Client({
    connectionString: DB_URI
  });

db.connect();

module.exports = db;

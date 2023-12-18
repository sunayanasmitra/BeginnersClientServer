const MYSQL = require('./../../../../../sys/node/node_modules/mysql');
const mysqlpromise = require('./../../../../../../sys/node/node_modules/promise-mysql');
const MySQLConnector = require('./mysqlConnector');
/*
const mmysqlConnections = [
  {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database',
    mysqlCommands: [
      //have to add specific commands
    ],
  },
  {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database',
    mysqlCommands: [
      //have to add specific commands
    ],
  },
];
*/
const mysqlConfig = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database',
};
const connector = new MySQLConnector(mysqlConfig);
connector.connect();
// perform database operations
connector.close();

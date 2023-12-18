const mysql = require('mysql');

class MySQLConnector {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
      }
      console.log('Connected to MySQL database');
    });
  }

  close() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        throw err;
      }
      console.log('MySQL connection closed');
    });
  }
}

module.exports = MySQLConnector;

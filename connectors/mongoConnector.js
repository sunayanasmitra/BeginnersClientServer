const { MongoClient } = require('mongodb');

class MongoDBConnector {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(this.url);
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }

  close() {
    this.client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = MongoDBConnector;

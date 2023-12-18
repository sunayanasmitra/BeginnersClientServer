const mongodb = require('./../../../../../../sys/node/node_modules/mongodb');
const MongoConn = require('./mongoConnector');
//const express = require('express');
//CODE NOT YET TESTED: have to create pages associated with my "mongo connections" in the client because i currently have the databaseName associated with the page url it will be retrieved from
//const app = express();
//const port = 3000;
const mongoConnections = [
    {
        url: 'mongodb://localhost:27017',
        dbName: 'diaryEntries',
    },
    {
        url: 'mongodb://localhost:27017',
        dbName: 'farmStand',
    },
];
app.use(async (req, res, next) => {
    const { command, collection, document, query } = req.body;
    const connection = mongoConnections.find((conn) => req.url.includes(conn.dbName));
    if (!connection) {
        return res.status(404).json({ error: 'Database not found' });
    }
    const connector = new MongoConn(connection.url, connection.dbName);
    try {
        await connector.connect();
        switch (command) {
            case 'insertOne':
                await connector.db.collection(collection).insertOne(document);
                res.json({ message: `Document inserted into ${collection}` });
                break;
            case 'find':
                const result = await connector.db.collection(collection).find(query).toArray();
                res.json({ result });
                break;
            default:
                res.status(400).json({ error: 'Invalid command' });
        }
    }
    catch (error) {
        console.error('Error processing MongoDB command:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        connector.close();
    }
});
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

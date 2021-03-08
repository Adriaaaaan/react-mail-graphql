const { MongoClient } = require('mongodb');

var url = 'mongodb://localhost:27017';

// Use connect method to connect to the Server
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = 'angularMail';

module.exports = async function (app) {
  await client.connect();
  const db = client.db(dbName)
  const messages = db.collection('messages');

  function byID(request) {
    return { id: request.params.id };
  }

  app.get('/rest/messages', async function (_req, res) {
    const items = await messages.find().toArray();
    res.json(items);
  });
  
  app.get('/rest/messages/:id', async function (req, res) {
    const query = byID(req);
    const message = await messages.findOne(query);
    res.json(message);
  });
  
  app.delete('/rest/messages/:id', async function (req, res) {
    const query = byID(req);
    await messages.deleteOne(query);
    res.status(200).send();
  });
  
  app.post('/rest/messages', async function (req, res) {
    const result = await collection.insertMany(req.body);
    if(result === null || result.insertedCount === 0) {
      return res.status(400);
    }
    return res.status(201).send();
  });
};

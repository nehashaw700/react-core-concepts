import { MongoClient } from 'mongodb';

// Connection URL
// changed @ to %40
const url = 'mongodb+srv://nehashaw700:Seema%40123@backend-db.qtdmrgn.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'USER_DB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('USER');

  const data = [{
    "fname": "saloni",
    "lname": "shaw",
    "age": 25,
  },
  {
    "fname": "neha",
    "lname": "shaw",
    "age": 27,
  },
  {
    "fname": "manjit",
    "lname": "shaw",
    "age": 23,
  }]

  // const insertData = await collection.insertMany(data); // to insert many data
  // const result = await collection.find().toArray(); // to get all data
  // const result = await collection.find({}, {fname:1}).toArray();
  // const result = await collection.find({fname:"neha"}).toArray(); //to filter data
  const result = await collection.updateOne({fname: "neha"}, {$set: {age: 28}});

  console.log(result);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());